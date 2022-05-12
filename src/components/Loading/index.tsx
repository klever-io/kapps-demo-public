import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from './Loader';
import { Container, TimedOut } from './styles';

const Loading: React.FC = () => {
  const [timedOut, setTimedOut] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <Loader />

      {timedOut && (
        <TimedOut onClick={() => history.push('/wallet')}>
          Taking too long?
          <strong> Click here to go back</strong>
        </TimedOut>
      )}
    </Container>
  );
};

export default Loading;
