import Button from 'components/Button';
import Loading from 'components/Loading';
import ConfirmModal from 'components/Modals/Confirm';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { IAccountAsset, IBroadcastResponse, IBucket } from 'types';
import { getFeedback } from 'utils';
import { useSdk } from '../../../hooks';
import { ButtonsContainer, Container, ItemCol } from './styles';
export interface IStakingProps {
  item: IBucketProps;
}

export interface IBucketProps {
  asset: IAccountAsset;
  bucket: IBucket;
  epoch: number;
}

const StakingItem: React.FC<IStakingProps> = ({ item }) => {
  const { bucket, asset, epoch: currentEpoch } = item;

  const [submitLoading, setSubmitLoading] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState('');

  const sdk = useSdk();
  const account = sdk.getAccount();
  const history = useHistory();

  const minEpochsToWithdraw = 2;
  const minEpochsToUnstake = 1;

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

  const withdrawEquation =
    bucket.unstakedEpoch - currentEpoch + minEpochsToWithdraw;

  const isWithdrawLocked = () => {
    if (bucket?.unstakedEpoch === 4294967295) {
      return false;
    }

    return withdrawEquation > 0;
  };

  const unfreezeEquation =
    bucket.stakedEpoch + minEpochsToUnstake - currentEpoch;
  const isUnfreezeLocked = () => {
    return unfreezeEquation > 0;
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

  const lockedText = () => {
    const textEquation = isWithdrawLocked()
      ? withdrawEquation
      : unfreezeEquation;
    return `${
      isWithdrawLocked() ? 'Withdraw' : 'Unfreeze'
    } Locked ( ${textEquation} epoch${textEquation > 1 ? 's' : ''} )`;
  };

  const getButton = () => {
    if (isUnfreezeLocked() || isWithdrawLocked()) {
      if (bucket.delegation) {
        return (
          <ButtonsContainer>
            <Button
              onClick={() => handleOpenModal('undelegate')}
              styleType="transparent"
            >
              Undelegate
            </Button>

            <Button onClick={() => null} disabled>
              {lockedText()}
            </Button>
          </ButtonsContainer>
        );
      }
      return (
        <Button onClick={() => null} disabled>
          {lockedText()}
        </Button>
      );
    } else if (bucket?.unstakedEpoch !== 4294967295) {
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
