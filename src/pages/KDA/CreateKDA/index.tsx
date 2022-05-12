import { useSdk } from '@klever/sdk';
import Form, { ISection } from 'components/Form';
import Input from 'components/Input';
import Loading from 'components/Loading';
import ConfirmModal from 'components/Modals/Confirm';
import Header from 'components/Pages/Header';
import { useDidUpdateEffect } from 'hooks';
import { Container, Title } from 'pages/styles';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IBroadcastResponse } from 'types';
import { getFeedback } from 'utils';
import sections from './formSections';
import {
  ChooseContainer,
  ChooseItem,
  ChooseItemText,
  InputContainer,
  NFTIcon,
  TokenIcon,
} from './styles';

const CreateKDA = () => {
  const sdk = useSdk();

  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState<string>('');
  const [formSections, setFormSections] = useState<ISection[]>([]);

  const parseValues = (values: any) => {
    const parsedValues = JSON.parse(JSON.stringify(values));

    !parsedValues.roles[0].address && delete parsedValues.roles;

    if (type === 'Token') {
      !parsedValues.royalties.address && delete parsedValues.royalties;
      (!parsedValues.royalties.transferPercentage.amount ||
        !parsedValues.royalties.transferPercentage.percentage) &&
        delete parsedValues.royalties.transferPercentage;
    }

    delete parsedValues.uris;

    if (values.uris) {
      const uris = {};

      values.uris.forEach((uri: any) => {
        if (uri.label && uri.address) {
          uris[uri.label] = uri.address;
        }
      });

      if (Object.keys(uris).length > 0) {
        parsedValues.uris = uris;
      }
    }

    if (type === 'Token') {
      parsedValues['type'] = 0;
      parsedValues['circulatingSupply'] = parsedValues['initialSupply'];
    }
    if (type === 'NFT') {
      parsedValues['type'] = 1;
    }

    return parsedValues;
  };

  const handleOpenModal = (values: any) => {
    setOpen(true);

    setPayload(parseValues(values));
  };

  const handleSubmit = async () => {
    if (sdk.getAccount() === null) {
      return;
    }
    setLoading(true);

    try {
      const response = (await sdk.getAccount()?.sendCreateAsset(payload)) as
        | IBroadcastResponse
        | undefined;
      getFeedback(response, () => setPayload(response));
      setLoading(false);
    } catch (e) {
      toast.error(String(e));
      setLoading(false);
    }
  };

  const handleClick = async (type: string) => {
    setType(type);
    setLoading(true);

    let timeout: any;

    await new Promise(
      resolve =>
        (timeout = setTimeout(() => {
          resolve(setLoading(false));
        }, 200)),
    );

    clearTimeout(timeout);
  };

  useDidUpdateEffect(() => {
    const Load = async () => {
      setLoading(true);

      let timeout: any;

      await new Promise(
        resolve =>
          (timeout = setTimeout(() => {
            resolve(setLoading(false));
          }, 200)),
      );

      return clearTimeout(timeout);
    };

    setFormSections(sections(type));
    Load();
  }, [type]);

  const ChooseKDA: React.FC = () => {
    return (
      <ChooseContainer>
        <ChooseItem onClick={() => handleClick('Token')}>
          <TokenIcon />
          <ChooseItemText>New Token</ChooseItemText>
        </ChooseItem>
        <ChooseItem onClick={() => handleClick('NFT')}>
          <NFTIcon />
          <ChooseItemText>New NFT</ChooseItemText>
        </ChooseItem>
      </ChooseContainer>
    );
  };

  return (
    <Container>
      {loading && <Loading />}
      {open && (
        <ConfirmModal
          closeModal={() => setOpen(false)}
          handleConfirm={handleSubmit}
          payload={payload}
        />
      )}
      <Header>
        <Title>Create KDA</Title>
      </Header>
      {!type && <ChooseKDA />}
      {type && (
        <InputContainer>
          <Input
            title="Type"
            type="checkbox"
            toggleOptions={['Token', 'NFT']}
            value={Number(type === 'NFT')}
            onChange={(e: any) => {
              setType(e.target.value === '1' ? 'Token' : 'NFT');
            }}
            checked={type === 'NFT'}
          />
        </InputContainer>
      )}
      <Form
        sections={formSections}
        key={String(formSections)}
        onSubmit={handleOpenModal}
        cancelOnly={!type}
      />
    </Container>
  );
};
export default CreateKDA;
