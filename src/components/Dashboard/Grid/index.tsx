import Loader from 'components/Loading/Loader';
import { useEffect, useState } from 'react';
import Button from '../../Button';
import { IAddButton } from '../Flex';
import {
  ButtonContainer,
  Container,
  Content,
  EmptyTab,
  FilterContainer,
} from './styles';

interface IGridDashboardProps {
  items: any[];
  buttons?: IAddButton[];
  loading?: boolean;
  ItemComponent: React.FC<any>;
  ModalComponent?: React.FC<any>;
}

const GridDashboard: React.FC<IGridDashboardProps> = ({
  items,
  buttons,
  ItemComponent,
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
      <Content>
        {items.map((item, index) => (
          <ItemComponent item={item} setSelectedItem={setSelectedItem} />
        ))}
      </Content>
      {loading && <Loader />}
      {!loading && items.length === 0 && (
        <EmptyTab>
          <span>No items</span>
        </EmptyTab>
      )}
    </Container>
  );
};

export default GridDashboard;
