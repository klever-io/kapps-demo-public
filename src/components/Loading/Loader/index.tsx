import { Container, LdsDefault, LdsInline } from './styles';

interface ILoaderProps {
  inline?: boolean;
}

const Loader: React.FC<ILoaderProps> = ({ inline = false }) => {
  return (
    <Container>
      {inline ? (
        <LdsInline>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </LdsInline>
      ) : (
        <LdsDefault>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </LdsDefault>
      )}
    </Container>
  );
};

export default Loader;
