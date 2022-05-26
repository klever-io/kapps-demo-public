import AssetModal from 'components/Modals/Asset';
import Header from 'components/Pages/Header';
import { Container, Title } from 'pages/styles';
import React, { useCallback, useEffect } from 'react';
import api from 'services/api';
import { IAsset, IResponse } from 'types';
import KDADashboardItem from '../../components/Cards/KDAItem';
import FlexDashboard from '../../components/Dashboard/Flex';

export interface IAssetResponse extends IResponse {
  data: {
    assets: IAsset[];
  };
}

const Marketplace = () => {
  const [assets, setAssets] = React.useState<IAsset[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const buttons = [
    {
      label: 'Create KDA',
      route: '/kda/create',
    },
  ];

  const headers = ['ID', 'Circulating Supply', 'Actions'];

  const walletAddress = sessionStorage.getItem('walletAddress') || '';

  const getAssets = useCallback(async () => {
    setAssets([]);
    setLoading(true);
    const response: IAssetResponse = await api.get({
      route: `assets/kassets`,
      query: {
        owner: walletAddress,
        page,
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
    setPage(
      response.pagination.next !== response.pagination.previous
        ? response.pagination.next - 1
        : response.pagination.next,
    );
    setTotalPages(response.pagination.totalPages);

    setLoading(false);
  }, [walletAddress, page]);

  useEffect(() => {
    getAssets();
  }, [page]);

  const reload = () => {
    getAssets();
    setPage(0);
  };

  const dashboardProps = {
    items: assets,
    ItemComponent: KDADashboardItem,
    buttons,
    headers,
    ModalComponent: AssetModal,
    loading,
    page,
    setPage,
    totalPages,
  };

  return (
    <Container>
      <Header reload={reload}>
        <Title>My Klever Digital Assets</Title>
      </Header>
      <FlexDashboard {...dashboardProps} />
    </Container>
  );
};
export default Marketplace;
