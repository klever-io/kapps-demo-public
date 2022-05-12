import React from 'react';
import { useCallback, useEffect } from 'react';
import api from 'services/api';
import { IAccount, IBucket, IResponse } from 'types';
import StakingItem, { IBucketProps } from '../../components/Cards/StakingItem';
import FlexDashboard from '../../components/Dashboard/Flex';
import { Container, Title } from 'pages/styles';
import Header from 'components/Pages/Header';

export interface IBucketDictionary {
  [key: string]: IBucket[];
}

export interface IAccountResponse extends IResponse {
  data: {
    account: IAccount;
  };
}

const Staking = () => {
  const [buckets, setBuckets] = React.useState<IBucketProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  const buttons = [
    {
      label: 'Freeze',
      route: '/staking/freeze',
    },
  ];

  const headers = ['Balance', 'Delegation', 'Actions'];

  const walletAddress = sessionStorage.getItem('walletAddress') || '';

  const getAddress = useCallback(async () => {
    const response: IAccountResponse = await api.get({
      route: `address/${walletAddress}`,
    });

    if (response.error) {
      return;
    }

    const auxBuckets: IBucketProps[] = [];

    Object.entries(response.data.account.assets).forEach(([, asset]) => {
      asset.buckets?.length &&
        asset.buckets?.length > 0 &&
        asset.buckets.forEach(bucket => {
          auxBuckets.push({
            bucket,
            asset: asset,
          });
        });
    });

    setBuckets(auxBuckets);
    setLoading(false);
  }, [walletAddress]);

  useEffect(() => {
    getAddress();
  }, []);

  const reload = () => {
    setLoading(true);
    setBuckets([]);
    getAddress();
  };

  return (
    <Container>
      <Header reload={reload}>
        <Title>My Stakings</Title>
      </Header>
      <FlexDashboard
        items={buckets}
        ItemComponent={StakingItem}
        buttons={buttons}
        headers={headers}
        loading={loading}
      />
    </Container>
  );
};
export default Staking;
