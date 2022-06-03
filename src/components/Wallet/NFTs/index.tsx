import { useSdk } from '../../../hooks';
import Accordion from 'components/Accordion';
import Loader from 'components/Loading/Loader';
import { IAccountResponse } from 'pages/Staking';
import React, { useEffect, useState } from 'react';
import api from 'services/api';
import { IAccountAsset } from 'types';
import { EmptyTab } from '../styles';
import { Container, Grid } from './styles';

const NFTs: React.FC = () => {
  const [assets, setAssets] = useState<IAccountAsset[]>([]);
  const [loading, setLoading] = useState(true);

  const sdk = useSdk();

  const getAssets = async () => {
    const response: IAccountResponse = await api.get({
      route: `address/${sdk.getAccount()?.getAddress()}`,
    });
    if (response.error) {
      return;
    }

    const auxAssets: IAccountAsset[] = [];

    Object.entries(response.data.account.assets).forEach(
      ([key, value]: [string, IAccountAsset]) => {
        if (value.assetType === 1) {
          auxAssets.push(value);
        }
      },
    );

    setAssets(auxAssets);
    setLoading(false);
  };

  useEffect(() => {
    getAssets();
  }, []);

  return (
    <Container>
      {!loading && Object.entries(assets).length === 0 && (
        <EmptyTab>
          <span>No assets found</span>
        </EmptyTab>
      )}
      {loading && <Loader />}
      {Object.entries(assets).length > 0 && (
        <Grid>
          {assets.map(asset => (
            <Accordion
              key={String(asset.assetId)}
              title={`${asset.assetName} (${asset.balance} item${
                asset.balance > 1 ? 's' : ''
              })`}
              assetId={asset.assetId}
            ></Accordion>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default NFTs;
