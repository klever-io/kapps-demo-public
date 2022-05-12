import Loader from 'components/Loading/Loader';
import { useState } from 'react';
import { IAsset } from 'types';
import Button from '../../../Button';
import ICODashboardItem from '../../../Cards/ICOItem';
import Filter, { IFilter, IFilterItem } from '../../../Filter';
import {
  ButtonContainer,
  Container,
  Content,
  EmptyTab,
  FilterContainer,
} from './styles';

export interface IICODashboardProps {
  assets: IAsset[];
  loading: boolean;
}

const ICODashboard: React.FC<IICODashboardProps> = ({ assets, loading }) => {
  const defaultFilter: IFilterItem = {
    name: 'None',
    value: 'none',
  };

  const [asset, setAsset] = useState(defaultFilter);
  const coins: IFilterItem[] = [];

  assets.forEach(asset => {
    coins.push({ name: asset.assetId, value: asset });
  });

  const filters: IFilter[] = [
    {
      title: 'Asset',
      data: coins,
      onClick: selected => {
        if (asset.value !== selected.value) {
          setAsset(selected);
        }
      },
    },
  ];

  return (
    <Container>
      {!loading && (
        <>
          <FilterContainer>
            {filters.map((filter, index) => (
              <Filter key={String(index)} {...filter} />
            ))}
            <ButtonContainer to="/ico/create">
              <Button styleType="outlined">Create ICO</Button>
            </ButtonContainer>
          </FilterContainer>
          <Content>
            {asset.value && <ICODashboardItem asset={asset.value} />}
          </Content>
        </>
      )}
      {loading && <Loader />}

      {!loading && asset.value === 'none' && (
        <EmptyTab>
          <span>Choose an asset</span>
        </EmptyTab>
      )}
    </Container>
  );
};

export default ICODashboard;
