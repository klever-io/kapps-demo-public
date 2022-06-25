import React, { useEffect, useState } from 'react';

import {
  Container,
  TableBody,
  TableContainer,
  TableHeader,
  TableRow,
  ButtonContainer,
} from './styles';

import { toast } from 'react-toastify';
import { EmptyTab } from '../../../pages/Wallet/styles';
import api from 'services/api';
import { useSdk } from '../../../hooks';
import { IAccountAsset, IAddressResponse } from 'types';
import Loader from 'components/Loading/Loader';
import Button from 'components/Button';

interface IAsset {
  name: string;
  assetId: string;
  balance: number;
  precision: number;
}

export interface IAssetsProps {
  reload: () => void;
}

const Asset: React.FC<IAssetsProps> = ({ reload }) => {
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

  const handleRequestKLV = async () => {
    setLoading(true);

    const response = await api.post({
      route: `transaction/send-user-funds/${sdk.getAccount()?.getAddress()}`,
    });

    if (response.code === 'internal_error') {
      toast.error('You already ordered KLV in less than 24 hours!');
      return;
    } else {
      toast.success('Test KLV request successful!');

      setTimeout(() => {
        reload();
      }, 3000);
    }
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
          <ButtonContainer>
            <Button onClick={handleRequestKLV}>Request Test KLV</Button>
          </ButtonContainer>
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
