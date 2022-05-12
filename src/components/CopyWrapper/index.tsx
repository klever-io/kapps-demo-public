import { useState } from 'react';
import { Container } from './styles';

interface ICopyWrapperProps {
  children: React.ReactNode;
  hoverLabel?: string;
  value: string;
  width?: number;
}

const CopyWrapper: React.FC<ICopyWrapperProps> = ({
  children,
  hoverLabel,
  value,
  width,
  ...props
}) => {
  const [label, setLabel] = useState(hoverLabel);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setLabel('Copied to clipboard');

    setTimeout(() => {
      setLabel(hoverLabel);
    }, 1000);
  };

  return (
    <Container hoverLabel={label} width={width} onClick={handleCopyToClipboard}>
      {children}
    </Container>
  );
};

export default CopyWrapper;
