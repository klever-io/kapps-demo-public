import Header from 'components/Pages/Header';
import { Container, Title } from 'pages/styles';
import React, { useCallback, useEffect } from 'react';
import api from 'services/api';
import { IAccount, IBlock, IBucket, IResponse } from 'types';
import StakingItem, { IBucketProps } from '../../components/Cards/StakingItem';
import FlexDashboard from '../../components/Dashboard/Flex';

export interface IBucketDictionary {
  [key: string]: IBucket[];
}

export interface IAccountResponse extends IResponse {
  data: {
    account: IAccount;
  };
}
export interface IBlockResponse extends IResponse {
  data: {
    blocks: IBlock[];
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

  const getAddressAndBlocks = useCallback(async () => {
    const accountPromise = new Promise<IAccountResponse>((resolve, reject) => {
      try {
        const response = api.get({
          route: `address/${walletAddress}`,
        });
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });

    const blockPromise = new Promise<IBlockResponse>((resolve, reject) => {
      try {
        const response = api.get({
          route: `block/list`,
        });
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });

    const [accountResponse, blockResponse] = await Promise.allSettled([
      accountPromise,
      blockPromise,
    ]);

    if (
      accountResponse.status === 'rejected' ||
      blockResponse.status === 'rejected'
    ) {
      return;
    }

    const currentEpoch = blockResponse.value.data.blocks[0].epoch;

    const auxBuckets: IBucketProps[] = [];

    Object.entries(accountResponse.value.data.account.assets).forEach(
      ([, asset]) => {
        asset.buckets?.length &&
          asset.buckets?.length > 0 &&
          asset.buckets.forEach(bucket => {
            auxBuckets.push({
              bucket,
              asset: asset,
              epoch: currentEpoch,
            });
          });
      },
    );
    //order auxBuckets by stakeAt
    auxBuckets.sort((a, b) => {
      return a.bucket.stakeAt - b.bucket.stakeAt;
    });

    setBuckets(auxBuckets);
    setLoading(false);
  }, [walletAddress]);

  useEffect(() => {
    getAddressAndBlocks();
  }, []);

  const reload = () => {
    setLoading(true);
    setBuckets([]);
    getAddressAndBlocks();
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
