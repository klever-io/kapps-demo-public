import Loader from 'components/Loading/Loader';
import { useEffect, useState } from 'react';
import Button from '../../Button';
import {
  ButtonContainer,
  Container,
  Content,
  EmptyTab,
  FilterContainer,
  Headers,
} from './styles';

export interface IAddButton {
  label: string;
  route: string;
}
interface IFlexDashboardProps {
  items: any[];
  buttons?: IAddButton[];
  headers?: string[];
  loading?: boolean;
  ItemComponent: React.FC<any>;
  ModalComponent?: React.FC<any>;
}

const FlexDashboard: React.FC<IFlexDashboardProps> = ({
  items,
  ItemComponent,
  buttons,
  headers,
  ModalComponent,
  loading,
}) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setModalOpen(true);
    }
  }, [selectedItem]);

  const handleClose = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalOpen]);

  return (
    <Container>
      {ModalComponent && modalOpen && (
        <ModalComponent item={selectedItem} closeModal={handleClose} />
      )}
      <FilterContainer>
        {buttons &&
          buttons.map((button: IAddButton, index: number) => (
            <ButtonContainer to={button.route} key={String(index)}>
              <Button styleType="outlined">{button.label}</Button>
            </ButtonContainer>
          ))}
      </FilterContainer>

      {items.length > 0 && (
        <>
          <Headers>
            {headers &&
              headers.map((header: string, index: number) => (
                <span key={String(index)}>{header}</span>
              ))}
          </Headers>
          <Content>
            {items.map((item, index) => {
              return (
                <ItemComponent
                  item={item}
                  key={String(index)}
                  setSelectedItem={setSelectedItem}
                />
              );
            })}
          </Content>
        </>
      )}

      {loading && <Loader />}

      {items.length === 0 && !loading && (
        <EmptyTab>
          <span>None found</span>
        </EmptyTab>
      )}
    </Container>
  );
};

export default FlexDashboard;
