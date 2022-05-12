import AssetModal from 'components/Modals/Asset';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import api from 'services/api';
import { IAsset, IResponse } from 'types';
import KDADashboardItem from '../../components/Cards/KDAItem';
import FlexDashboard from '../../components/Dashboard/Flex';
import { Container, Title } from 'pages/styles';
import Header from 'components/Pages/Header';

export interface IAssetResponse extends IResponse {
  data: {
    assets: IAsset[];
  };
}

const Marketplace = () => {
  const [assets, setAssets] = React.useState<IAsset[]>([]);
  const [loading, setLoading] = React.useState(true);

  const buttons = [
    {
      label: 'Create KDA',
      route: '/kda/create',
    },
  ];

  const headers = ['ID', 'Circulating Supply', 'Actions'];

  const walletAddress = sessionStorage.getItem('walletAddress') || '';

  const getAsset = useCallback(async () => {
    const response: IAssetResponse = await api.get({
      route: `assets/kassets`,
      query: {
        owner: walletAddress,
      },
    });

    if (response.error) {
      return;
    }

    const auxAssets: IAsset[] = [];

    response.data.assets.forEach(asset => {
      auxAssets.push(asset);
    });

    setAssets(auxAssets);
    setLoading(false);
  }, [walletAddress]);

  useEffect(() => {
    getAsset();
  }, []);

  const reload = () => {
    setLoading(true);
    setAssets([]);
    getAsset();
  };

  return (
    <Container>
      <Header reload={reload}>
        <Title>My Klever Digital Assets</Title>
      </Header>
      <FlexDashboard
        items={assets}
        ItemComponent={KDADashboardItem}
        buttons={buttons}
        headers={headers}
        ModalComponent={AssetModal}
        loading={loading}
      />
    </Container>
  );
};
export default Marketplace;
