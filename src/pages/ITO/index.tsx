import { IAssetResponse } from 'pages/KDA';
import React from 'react';
import { useEffect } from 'react';
import api from 'services/api';
import { IAsset } from 'types';
import ITODashboard from '../../components/Dashboard/Unique/ITO';
import { Container, Title } from 'pages/styles';
import Header from 'components/Pages/Header';

const ITO = () => {
  const [assets, setAssets] = React.useState<IAsset[]>([]);
  const [loading, setLoading] = React.useState(true);

  const walletAddress = sessionStorage.getItem('walletAddress') || '';

  const getAsset = async () => {
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
      if (asset.ito) {
        auxAssets.push(asset);
      }
    });

    setAssets(auxAssets);
    setLoading(false);
  };

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
        <Title>My ITOs</Title>
      </Header>
      <ITODashboard assets={assets} loading={loading} />
    </Container>
  );
};
export default ITO;
