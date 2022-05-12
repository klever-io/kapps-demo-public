import { useHistory } from 'react-router';
import { Container, ReloadIcon } from './styles';

interface IHeaderProps {
  border?: string;
  reload?: () => void;
}

const Header: React.FC<IHeaderProps> = ({ border, reload, children }) => {
  const history = useHistory();

  const handleReload = () => {
    if (reload) {
      reload();
    } else {
      history.go(0);
    }
  };
  return (
    <Container border={border}>
      {children}
      {reload && <ReloadIcon onClick={handleReload} />}
    </Container>
  );
};

export default Header;
