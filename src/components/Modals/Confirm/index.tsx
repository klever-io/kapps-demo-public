import {
  ButtonsRow,
  Container,
  Content,
  DetailsRow,
  Link,
  LinkRow,
} from './styles';
import Button from '../../Button';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useHistory } from 'react-router';

interface IConfirmModalProps {
  payload: any;
  closeModal: () => void;
  handleConfirm: () => void;
  handleBack?: () => void;
  BackButtonLabel?: string;
  singleButton?: boolean;
}

const ConfirmModal: React.FC<IConfirmModalProps> = ({
  payload,
  closeModal,
  handleConfirm,
  handleBack,
  BackButtonLabel = 'Back',
  singleButton = false,
}) => {
  const history = useHistory();

  const handleClose = () => {
    closeModal();
  };

  const isDisabled = () => {
    return payload?.txCount !== undefined;
  };

  const handleGoBack = () => {
    history.goBack();
    closeModal();
  };

  return (
    <Container onMouseDown={handleClose}>
      <Content onMouseDown={e => e.stopPropagation()}>
        <h1>Transaction Payload:</h1>
        <DetailsRow>
          <SyntaxHighlighter
            customStyle={{ height: '30rem', backgroundColor: 'transparent' }}
            style={dracula}
            language="json"
            wrapLines={true}
            wrapLongLines={true}
          >
            {JSON.stringify(payload, null, 2)}
          </SyntaxHighlighter>
        </DetailsRow>
        {payload?.txHashes !== undefined && (
          <LinkRow>
            <Link
              href={`${
                process.env.REACT_APP_DEFAULT_EXPLORER_HOST ||
                'https://testnet.kleverscan.org'
              }/transaction/${payload.txHashes[0]}`}
              target="_blank"
            >
              View on explorer
            </Link>
          </LinkRow>
        )}
        <ButtonsRow>
          {!singleButton ||
            (payload?.txHashes === undefined && (
              <Button onClick={handleClose} styleType="secondary">
                {' '}
                Close
              </Button>
            ))}
          {!isDisabled() && (
            <Button onClick={handleConfirm} disabled={isDisabled()}>
              {' '}
              Send
            </Button>
          )}
          {isDisabled() && (
            <Button onClick={handleBack ? handleBack : handleGoBack}>
              {' '}
              {BackButtonLabel}
            </Button>
          )}
        </ButtonsRow>
      </Content>
    </Container>
  );
};
export default ConfirmModal;
