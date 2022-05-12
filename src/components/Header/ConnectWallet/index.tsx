import { useState } from 'react';
import { Container } from './styles';

interface IConnectWalletProps {
  walletAddress: string;
}

const ConnectWallet: React.FC<IConnectWalletProps> = ({ walletAddress }) => {
  const [text, setText] = useState(
    `${walletAddress.slice(0, 8)}... ${walletAddress.slice(-8)}`,
  );

  const handleClick = () => {
    navigator.clipboard.writeText(walletAddress);
    setText('Copied to clipboard');
    setTimeout(() => {
      setText(`${walletAddress.slice(0, 8)}... ${walletAddress.slice(-8)}`);
    }, 1000);
  };
  return (
    <Container walletAddress={!!walletAddress} onClick={handleClick}>
      {walletAddress ? <>{text}</> : <></>}
    </Container>
  );
};

export default ConnectWallet;
