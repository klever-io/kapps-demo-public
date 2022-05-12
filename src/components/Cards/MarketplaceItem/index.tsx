import Button from 'components/Button';
import React from 'react';
import { useHistory } from 'react-router';
import { IMarketplace } from 'types';
import { Container, ItemCol } from './styles';
interface IStakingProps {
  item: IMarketplace;
}

const MarketplaceItem: React.FC<IStakingProps> = ({ item: marketplace }) => {
  const history = useHistory();

  const handleNavigate = () => {
    history.push(`/marketplace/${marketplace.id}`);
  };

  return (
    <Container>
      <ItemCol>{marketplace.name}</ItemCol>
      <ItemCol>{marketplace.id}</ItemCol>
      <ItemCol>
        <Button onClick={handleNavigate} styleType="transparent">
          See Items
        </Button>
      </ItemCol>
    </Container>
  );
};
export default MarketplaceItem;
