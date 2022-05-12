import { useSdk } from '@klever/sdk';
import Button from 'components/Button';
import Loading from 'components/Loading';
import Loader from 'components/Loading/Loader';
import ConfirmModal from 'components/Modals/Confirm';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import api, { Service } from 'services/api';
import { IAccountAsset, IBroadcastResponse, IBucket } from 'types';
import { getFeedback } from 'utils';
import { ButtonsContainer, Container, ItemCol } from './styles';
export interface IStakingProps {
  item: IBucketProps;
}

export interface IBucketProps {
  asset: IAccountAsset;
  bucket: IBucket;
}

const StakingItem: React.FC<IStakingProps> = ({ item }) => {
  const { bucket, asset } = item;

  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [payload, setPayload] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [currentEpoch, setCurrentEpoch] = useState(0);

  const sdk = useSdk();
  const account = sdk.getAccount();
  const history = useHistory();

  //TODO: get minEpochs dynamically from asset?
  const minEpochsToWithdraw = 2;
  const minEpochsToUnstake = 1;

  useEffect(() => {
    const getCurrentEpoch = async () => {
      const response = await api.get({
        route: `node/metricsjson`,
        service: Service.NODE,
      });

      setCurrentEpoch(response.data.metrics.klv_epoch_number);
      setFetchLoading(false);
    };

    getCurrentEpoch();
  }, []);

  const handleUnfreeze = async () => {
    setSubmitLoading(true);

    try {
      const response = (await account?.sendUnfreeze(payload)) as
        | IBroadcastResponse
        | undefined;
      getFeedback(response, () => setPayload(response));
      setSubmitLoading(false);
    } catch (e) {
      toast.error(String(e));
      setSubmitLoading(false);
    }
  };

  const isWithdrawLocked = () => {
    return bucket.unstakedEpoch - currentEpoch + minEpochsToWithdraw > 0;
  };

  const isUnfreezeLocked = () => {
    return currentEpoch + minEpochsToUnstake - bucket.stakeAt > 0;
  };

  const handleWithdraw = async () => {
    setSubmitLoading(true);

    try {
      const response = (await account?.sendWithdraw(payload)) as
        | IBroadcastResponse
        | undefined;
      getFeedback(response, () => setPayload(response));
      setSubmitLoading(false);
    } catch (e) {
      toast.error(String(e));
      setSubmitLoading(false);
    }
  };

  const handleUndelegate = async () => {
    setSubmitLoading(true);

    try {
      const response = (await account?.sendUndelegate(payload)) as
        | IBroadcastResponse
        | undefined;
      getFeedback(response, () => setPayload(response));
      setSubmitLoading(false);
    } catch (e) {
      toast.error(String(e));
      setSubmitLoading(false);
    }
  };

  const handleOpenModal = (type: string) => {
    setActionType(type);

    switch (type) {
      case 'unfreeze':
        setPayload({
          asset: asset.assetId,
          bucketID: bucket.id,
        });
        break;
      case 'withdraw':
        setPayload({
          assetId: asset.assetId,
        });
        break;
      case 'undelegate':
        setPayload({
          bucketID: bucket.id,
        });
        break;
      default:
        break;
    }
    setOpen(true);
  };

  const getButton = () => {
    if (bucket?.unstakedEpoch === 4294967295) {
      if (bucket.delegation) {
        return (
          <ButtonsContainer>
            <Button
              onClick={() => handleOpenModal('undelegate')}
              styleType="transparent"
            >
              Undelegate
            </Button>
            <Button
              onClick={() => handleOpenModal('unfreeze')}
              styleType="transparent"
            >
              Unfreeze
            </Button>
          </ButtonsContainer>
        );
      }
      return (
        <Button
          onClick={() => handleOpenModal('unfreeze')}
          styleType="transparent"
        >
          Unfreeze
        </Button>
      );
    } else {
      if (isWithdrawLocked() || isUnfreezeLocked()) {
        if (bucket.delegation) {
          return (
            <ButtonsContainer>
              <Button
                onClick={() => handleOpenModal('undelegate')}
                styleType="transparent"
              >
                Undelegate
              </Button>
              {fetchLoading ? (
                <Button>
                  <Loader inline />
                </Button>
              ) : (
                <Button onClick={() => null} disabled>
                  Locked (
                  {isWithdrawLocked()
                    ? bucket.unstakedEpoch - currentEpoch + minEpochsToWithdraw
                    : bucket.unstakedEpoch -
                      currentEpoch +
                      minEpochsToUnstake}{' '}
                  epochs)
                </Button>
              )}
            </ButtonsContainer>
          );
        }
        return (
          <>
            {fetchLoading ? (
              <Button>
                <Loader inline />
              </Button>
            ) : (
              <Button onClick={() => null} disabled>
                Locked (
                {isWithdrawLocked()
                  ? bucket.unstakedEpoch - currentEpoch + minEpochsToWithdraw
                  : bucket.unstakedEpoch -
                    currentEpoch +
                    minEpochsToUnstake}{' '}
                epochs)
              </Button>
            )}
          </>
        );
      } else {
        if (bucket.delegation) {
          return (
            <ButtonsContainer>
              <Button
                onClick={() => handleOpenModal('undelegate')}
                styleType="transparent"
              >
                Undelegate
              </Button>
              <Button onClick={() => handleOpenModal('withdraw')}>
                Withdraw
              </Button>
            </ButtonsContainer>
          );
        }
        return (
          <Button onClick={() => handleOpenModal('withdraw')}>Withdraw</Button>
        );
      }
    }
  };

  const handleSubmit = async () => {
    switch (actionType) {
      case 'unfreeze':
        handleUnfreeze();
        break;
      case 'withdraw':
        handleWithdraw();
        break;
      case 'undelegate':
        handleUndelegate();
        break;
      default:
        break;
    }
  };

  const getDelegation = () => {
    if (bucket.delegation) {
      return (
        <>
          {bucket.delegation?.slice(0, 8)}...{bucket.delegation?.slice(-8)}
        </>
      );
    } else {
      if (asset.assetId === 'KLV') {
        return (
          <Button
            styleType="transparent"
            onClick={() => {
              history.push(`/staking/delegate/${bucket.id}`);
            }}
          >
            Delegate
          </Button>
        );
      } else {
        return <>--</>;
      }
    }
  };

  return bucket ? (
    <Container>
      {submitLoading && <Loading />}
      {open && (
        <ConfirmModal
          closeModal={() => setOpen(false)}
          handleConfirm={handleSubmit}
          payload={payload}
          BackButtonLabel={'Close'}
          handleBack={() => setOpen(false)}
          singleButton
        />
      )}
      <ItemCol>
        {asset?.precision &&
          (bucket?.balance / 10 ** asset.precision).toLocaleString()}{' '}
        {asset.assetId}
      </ItemCol>
      <ItemCol>{getDelegation()}</ItemCol>
      <ItemCol>{getButton()}</ItemCol>
    </Container>
  ) : null;
};
export default StakingItem;
