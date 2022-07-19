import { Account, core } from '@klever/sdk';
import { Buffer } from 'buffer';
import Button from 'components/Button';
import Input from 'components/Input';
import Loader from 'components/Loading/Loader';
import Header from 'components/Pages/Header';
import { useDidUpdateEffect } from 'hooks';
import { Container, Network, Title } from 'pages/styles';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { getNetwork } from 'utils';
import { useSdk } from '../../hooks';
import {
  ButtonContainer,
  Content,
  ContentBody,
  ContentTitle,
  DragContainer,
  ErrorContainer,
  InfoIcon,
  InputFile,
  PasswordInput,
  PasswordLabel,
  StyledInput,
} from './styles';

const ConnectWallet: React.FC = () => {
  const [privateKey, setPrivateKey] = useState(
    sessionStorage.getItem('privateKey') || '',
  );
  const [walletAddress, setWalletAddress] = useState(
    sessionStorage.getItem('walletAddress') || '',
  );
  const [loading, setLoading] = useState(false);

  const [isDragging, setDragging] = useState(false);
  const [draggingOverlayCount, setDragginOverlayCount] = useState(0);

  const [isEncrypted, setIsEncrypted] = useState(false);

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const history = useHistory();

  const sdk = useSdk();

  const parserPemFile = (file: string) => {
    const splitter = '-----';
    const maxSplitSize = 5;

    if (!file.includes(splitter)) {
      return '';
    }

    const contents = file.split(splitter);
    if (contents.length !== maxSplitSize) {
      return '';
    }

    return contents;
  };

  const getPrivateKey = (contents: string | string[]) => {
    const privateKeyPosition = 2;

    if (contents === '') {
      return '';
    }

    return contents[privateKeyPosition];
  };

  const decodePrivateKey = (
    longPrivateKey: string,
    contents: string,
  ): string => {
    let pk: string;

    if (isEncrypted) {
      pk = window.kleverWeb.decodePEM(contents, password);
    } else {
      const decodedToBase64 = Buffer.from(longPrivateKey, 'base64');
      const decodedToHex = Buffer.from(decodedToBase64.toString(), 'hex');
      const privateKey = decodedToHex.slice(0, 32);

      pk = [...new Uint8Array(privateKey)]
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
    }

    return pk;
  };

  const encodePrivateKey = (privateKey: string): string => {
    const encodedToBase64 = Buffer.from(privateKey, 'latin1').toString(
      'base64',
    );

    return encodedToBase64;
  };

  const getWalletAddress = (contents: string | string[]) => {
    const splitter = 'for ';
    const walletAddressPosition = 1;

    if (contents === '') {
      return '';
    }

    const parsed = contents[walletAddressPosition];
    const walletAddress = parsed.split(splitter)[walletAddressPosition];

    return walletAddress;
  };

  const readFile = (files: FileList) => {
    if (files && files.length > 0) {
      const file = files[0];
      const fileExtension = /[^.]+$/.exec(file.name)![0];

      if (fileExtension !== 'pem') {
        setError('Invalid file format.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        let result = e.target?.result;
        if (typeof result !== 'string') {
          result = '';
        }

        const contents = parserPemFile(result);
        if (contents === '') {
          setError('Invalid PEM file.');
          return;
        }

        const privateKey = getPrivateKey(contents);
        if (privateKey === '') {
          setError('Invalid Private Key.');
          return;
        }

        const walletAddress = getWalletAddress(contents);
        if (walletAddress === '') {
          setError('Invalid Wallet Address.');
          setWalletAddress('');
          return;
        }

        setPrivateKey(decodePrivateKey(privateKey, result));
        setWalletAddress(walletAddress);
        setLoading(true);
        if (error !== '') setError('');
      };

      reader.readAsText(file);
    }
  };

  const preventEvent = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const processFile = (event: any, isDrop: boolean) => {
    preventEvent(event);
    const files = isDrop ? event.dataTransfer.files : event.target.files;

    readFile(files);
  };

  const handleDragEnter = (event: any) => {
    preventEvent(event);

    let count = draggingOverlayCount;
    count++;

    setDragginOverlayCount(count);
    setDragging(true);
  };

  const handleDragLeave = (event: any) => {
    preventEvent(event);

    let count = draggingOverlayCount;
    count--;

    setDragginOverlayCount(count);

    if (count === 0) {
      setDragging(false);
    }
  };

  useDidUpdateEffect(() => {
    const validateAddress = async () => {
      if (walletAddress === '') {
        if (error === '') {
          setError('Invalid Wallet Address.');
        }

        setLoading(false);
        return;
      }

      if (privateKey === '') {
        setError('Invalid Private Key.');
        setLoading(false);
        setWalletAddress('');
        return;
      }

      const account = new Account(
        walletAddress,
        privateKey,
        process.env.REACT_APP_DEFAULT_NODE_HOST ?? undefined,
      );
      sdk.setAccount(account);

      setLoading(false);

      if (!walletAddress.startsWith('klv')) {
        setError('Invalid Wallet Address.');
        setWalletAddress('');
        setLoading(false);
        return;
      }

      const { signature } = await window.kleverWeb.signTx(
        JSON.stringify({
          tx: {} as any,
          privateKey: privateKey,
        }),
      );

      if (signature === '') {
        setError('Invalid Private Key and Password combination.');
        setWalletAddress('');
        setLoading(false);
        return;
      }

      sessionStorage.setItem('privateKey', privateKey);
      sessionStorage.setItem('walletAddress', walletAddress);
      history.push('/wallet');
    };
    validateAddress();
  }, [privateKey, walletAddress]);

  const pemParser = (account: any) => {
    return `-----BEGIN PRIVATE KEY for ${
      account.Address
    }-----\n${encodePrivateKey(account.PrivateKey)}\n-----END PRIVATE KEY for ${
      account.Address
    }-----`;
  };

  const downloadTextFile = (text: string, filename: string) => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const handleGeneratePEM = async () => {
    const newAccount = await core.createAccount();
    const pem = pemParser(newAccount);

    downloadTextFile(pem, 'wallet.pem');

    return;
  };

  return (
    <DragContainer
      onDragOver={preventEvent}
      onDrop={(event: any) => processFile(event, true)}
      onChange={(event: any) => processFile(event, false)}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <Network>Running on Kleverchain {getNetwork()}</Network>
      <Container>
        <Header>
          <Title>Access your Account</Title>
        </Header>
        <Content>
          {!loading && (
            <>
              {' '}
              <ContentTitle>
                <h3>
                  Insert your PEM file to access your wallet and start using the
                  KApps
                </h3>
                <a
                  href="https://docs.klever.finance/klever-blockchain/how-to-create-a-wallet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How to get a pem file?
                  <InfoIcon />
                </a>{' '}
              </ContentTitle>
              <ContentBody>
                <InputFile isDragging={isDragging}>
                  {walletAddress ? (
                    <span>{walletAddress}</span>
                  ) : (
                    <>
                      {window.matchMedia('(max-device-width: 768px)')
                        .matches ? (
                        <>
                          <input id="input" type="file" accept=".pem" />
                          <label htmlFor="input">Select file</label>
                        </>
                      ) : (
                        <>
                          <input id="input" type="file" accept=".pem" />
                          <span>
                            Drag and drop your keystore file here, or{' '}
                            <label htmlFor="input">Select file</label>
                          </span>
                        </>
                      )}
                    </>
                  )}
                </InputFile>
                {error !== '' && (
                  <ErrorContainer>
                    <span>{error}</span>
                  </ErrorContainer>
                )}

                <PasswordLabel>
                  Password protected?
                  <Input
                    type="checkbox"
                    onChange={() => {
                      setIsEncrypted(!isEncrypted);
                    }}
                    key={String(isEncrypted)}
                    checked={isEncrypted}
                    title=""
                  />
                </PasswordLabel>
                <PasswordInput>
                  {isEncrypted && (
                    <>
                      <StyledInput
                        type="password"
                        onChange={(event: any) => {
                          setPassword(event.target.value);
                        }}
                        value={password}
                        title="Password"
                      />
                    </>
                  )}
                </PasswordInput>
              </ContentBody>
              <ButtonContainer>
                <Button styleType="outlined" onClick={handleGeneratePEM}>
                  Generate new account
                </Button>
              </ButtonContainer>
            </>
          )}
          {loading && <Loader />}
        </Content>
      </Container>
    </DragContainer>
  );
};
export default ConnectWallet;
