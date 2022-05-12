import React, { useEffect, useState } from 'react';

import {
  Container,
  TableBody,
  TableContainer,
  TableHeader,
  TableRow,
} from './styles';

import { EmptyTab } from '../../../pages/Wallet/styles';
import api from 'services/api';
import { useSdk } from '@klever/sdk';
import { IAccountAsset, IAddressResponse } from 'types';
import Loader from 'components/Loading/Loader';

interface IAsset {
  name: string;
  assetId: string;
  balance: number;
  precision: number;
}

const Asset: React.FC = () => {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [nonInitialized, setNonInitialized] = useState(false);

  const sdk = useSdk();

  const getAssets = async () => {
    const response: IAddressResponse = await api.get({
      route: `address/${sdk.getAccount()?.getAddress()}`,
    });
    if (response.error) {
      if (response.error === 'cannot find account in database') {
        setNonInitialized(true);
      }
      setLoading(false);
      return;
    }
    const auxAssets: IAsset[] = [];

    Object.entries(response.data.account.assets).forEach(
      ([, asset]: [string, IAccountAsset]) => {
        if (asset.assetType === 0) {
          auxAssets.push({
            name: asset.assetName,
            assetId: asset.assetId,
            balance: asset.balance,
            precision: asset.precision,
          });
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
      {!loading && !nonInitialized && assets.length === 0 && (
        <EmptyTab>
          <span>No assets found</span>
        </EmptyTab>
      )}
      {loading && <Loader />}
      {nonInitialized && (
        <EmptyTab>
          <span>
            Wallet address not initialized. Please make a transfer before
            procceeding
          </span>
        </EmptyTab>
      )}
      {assets.length > 0 && (
        <TableContainer>
          <TableHeader>
            <span>Asset Name</span>
            <span>Total</span>
          </TableHeader>
          <TableBody>
            {assets.map(
              (asset, index) =>
                asset.assetId !== 'KLV' && (
                  <TableRow key={String(index)}>
                    <span>{`${asset.name} (${asset.assetId})`}</span>
                    <span>
                      {(asset.balance / 10 ** asset.precision).toLocaleString()}
                    </span>
                  </TableRow>
                ),
            )}
          </TableBody>
        </TableContainer>
      )}
    </Container>
  );
};

export default Asset;
