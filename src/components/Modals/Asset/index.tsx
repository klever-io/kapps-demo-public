import { Container, Content, DetailsRow } from './styles';
import { IAsset } from 'types';
import Button from '../../Button';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

interface IAssetModalProps {
  item: IAsset;
  closeModal: () => void;
}

const AssetModal: React.FC<IAssetModalProps> = ({
  item: asset,
  closeModal,
}) => {
  const handleClose = () => {
    closeModal();
  };

  return (
    <Container onClick={handleClose}>
      <Content onClick={e => e.stopPropagation()}>
        <h1>{asset?.assetId}</h1>
        <DetailsRow>
          <SyntaxHighlighter
            customStyle={{ height: '40rem', backgroundColor: 'transparent' }}
            style={dracula}
            language="json"
            wrapLines={true}
            wrapLongLines={true}
          >
            {JSON.stringify(asset, null, 2)}
          </SyntaxHighlighter>
        </DetailsRow>
        <Button onClick={handleClose}> Close</Button>
      </Content>
    </Container>
  );
};
export default AssetModal;
