import { useSdk } from '../../../hooks';
import Button from 'components/Button';
import { ISellOrderItem } from 'components/Cards/SellOrderItem';
import Input from 'components/Input';
import Loading from 'components/Loading';
import Loader from 'components/Loading/Loader';
import { IMarketplaceBuysResponse } from 'pages/Marketplaces/MarketplaceOrders';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from 'services/api';
import { IBroadcastResponse } from 'types';
import { getFeedback } from 'utils';
import ConfirmModal from '../Confirm';
import {
  BidRow,
  ButtonsRow,
  Container,
  Content,
  DetailsRow,
  LoaderText,
} from './styles';

interface ISellOrderModalProps {
  item: ISellOrderItem;
  closeModal: () => void;
}

const SellOrderModal: React.FC<ISellOrderModalProps> = ({
  item,
  closeModal,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const [actionType, setActionType] = useState('');
  const [highestBid, setHighestBid] = useState(0);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const sdk = useSdk();
  const account = sdk.getAccount();

  const handleClose = () => {
    closeModal();
  };

  const handleBuy = async () => {
    setSubmitLoading(true);

    try {
      const response = (await account?.sendBuyOrder(payload)) as
        | IBroadcastResponse
        | undefined;
      getFeedback(response, () => setPayload(response));
      setSubmitLoading(false);
    } catch (e) {
      toast.error(String(e));
      setSubmitLoading(false);
    }
  };

  const handleBid = async () => {
    setSubmitLoading(true);

    try {
      const response = (await account?.sendBuyOrder(payload)) as
        | IBroadcastResponse
        | undefined;
      getFeedback(response, () => setPayload(response));
      setSubmitLoading(false);
    } catch (e) {
      toast.error(String(e));
      setSubmitLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    setSubmitLoading(true);

    try {
      const response = (await account?.sendCancelMarketOrder(payload)) as
        | IBroadcastResponse
        | undefined;
      getFeedback(response, () => setPayload(response));
      setSubmitLoading(false);
    } catch (e) {
      toast.error(String(e));
      setSubmitLoading(false);
    }
  };

  //TODO: Handle claim for bidder

  const handleClaimNFT = async () => {
    setSubmitLoading(true);

    try {
      const response = (await account?.sendClaim(payload)) as
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
      case 'buy':
        setPayload({
          amount: item.price,
          buyType: 1,
          currencyId: item.currencyID,
          id: item.orderID,
        });
        break;
      case 'bid':
        setPayload({
          amount: quantity,
          buyType: 1,
          currencyId: item.currencyID,
          id: item.orderID,
        });
        break;
      case 'cancel':
        setPayload({
          orderId: item.orderID,
        });
        break;
      case 'claim':
        setPayload({
          id: item.orderID,
          claimType: 2,
        });
        break;
      default:
        break;
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    switch (actionType) {
      case 'buy':
        handleBuy();
        break;
      case 'bid':
        handleBid();
        break;
      case 'cancel':
        handleCancelOrder();
        break;
      case 'claim':
        handleClaimNFT();
        break;
      default:
        break;
    }
  };

  const isExpired = () => {
    return item.endTime * 1000 < Date.now();
  };

  const isOwner = () => {
    return item.owner === account?.getAddress();
  };

  useEffect(() => {
    const getHighestBid = async () => {
      const buyOrders: IMarketplaceBuysResponse = await api.get({
        route: `transaction/list`,
        query: {
          status: 'success',
          orderid: item.orderID,
          type: 17,
          limit: 100,
        },
      });

      //get highest amount
      const highestBid = buyOrders.data.transactions.reduce((acc, curr) => {
        return acc.contract[0].parameter.amount >
          curr.contract[0].parameter.amount
          ? acc
          : curr;
      }, buyOrders.data.transactions[0]);

      setHighestBid(highestBid?.contract[0].parameter.amount);
    };
    const getIsCanceled = async () => {
      const cancelOrders: IMarketplaceBuysResponse = await api.get({
        route: `transaction/list`,
        query: {
          status: 'success',
          orderid: item.orderID,
          type: 19,
          limit: 10,
        },
      });

      setIsCanceled(cancelOrders.data.transactions.length > 0);
    };
    const getIsClaimed = async () => {
      const claimOrders: IMarketplaceBuysResponse = await api.get({
        route: `transaction/list`,
        query: {
          status: 'success',
          orderid: item.orderID,
          type: 9,
          limit: 10,
        },
      });

      setIsClaimed(claimOrders.data.transactions.length > 0);
    };

    const fetchState = async () => {
      const isClaimedPromise = new Promise(async (resolve, reject) => {
        try {
          resolve(getIsClaimed());
        } catch (e) {
          reject(e);
        }
      });

      const isCanceledPromise = new Promise(async (resolve, reject) => {
        try {
          resolve(getIsCanceled());
        } catch (e) {
          reject(e);
        }
      });

      const highestBidPromise = new Promise(async (resolve, reject) => {
        try {
          resolve(getHighestBid());
        } catch (e) {
          reject(e);
        }
      });

      await Promise.all([
        isClaimedPromise,
        isCanceledPromise,
        highestBidPromise,
      ]);

      setInitialLoading(false);
    };
    fetchState();
  }, [item.orderID]);

  const handleCloseModal = () => {
    setOpen(false);
    handleClose();
  };

  const getOwnerButton = () => {
    if (isClaimed) {
      return <></>;
    }
    if (isExpired()) {
      return (
        <Button onClick={() => handleOpenModal('claim')}>Claim NFT</Button>
      );
    }

    if (isCanceled) {
      return <></>;
    }

    return (
      <Button onClick={() => handleOpenModal('cancel')} styleType="outlined">
        Remove Sell Order
      </Button>
    );
  };

  return (
    <Container onMouseDown={handleClose}>
      {submitLoading && <Loading />}
      {open && (
        <ConfirmModal
          closeModal={() => setOpen(false)}
          handleConfirm={handleSubmit}
          payload={payload}
          handleBack={handleCloseModal}
          singleButton
        />
      )}
      <Content onMouseDown={e => e.stopPropagation()}>
        <h1>#{item.assetID}</h1>
        <DetailsRow>
          {'Expiration date: ' + new Date(item.endTime * 1000).toLocaleString()}
          {isExpired() && <span> (Expired)</span>}
        </DetailsRow>
        <DetailsRow>
          {'Type: ' +
            (item.marketType === 'BuyItNowMarket' ? 'Instant Buy' : 'Auction')}
        </DetailsRow>
        {item.marketType === 'BuyItNowMarket' ? (
          <DetailsRow>
            {' '}
            {'Price: ' + item.price?.toLocaleString() + ' ' + item.currencyID}
          </DetailsRow>
        ) : (
          <>
            {item?.price && (
              <DetailsRow>
                {'Instant Buy Price: ' +
                  item.price?.toLocaleString() +
                  ' ' +
                  item.currencyID}
              </DetailsRow>
            )}
            <DetailsRow>
              {' '}
              {'Reserve Price: ' + item.reservePrice + ' ' + item.currencyID}
            </DetailsRow>
          </>
        )}
        {item.marketType === 'BuyItNowMarket' ? (
          item.sold && <DetailsRow>Sold</DetailsRow>
        ) : (
          <DetailsRow>
            <DetailsRow>
              {'Highest Bid: ' + highestBid + ' ' + item.currencyID}
            </DetailsRow>
          </DetailsRow>
        )}
        {initialLoading && (
          <>
            <Loader />
            <LoaderText>Updating Status...</LoaderText>
          </>
        )}
        <ButtonsRow>
          <Button onClick={handleClose} styleType="secondary">
            Close
          </Button>
          {!initialLoading && isOwner() && !item.sold && (
            <>{getOwnerButton()}</>
          )}
        </ButtonsRow>
        {!initialLoading && !isExpired() && !item.sold && !isCanceled && (
          <ButtonsRow>
            {item.marketType === 'BuyItNowMarket' ? (
              <Button onClick={() => handleOpenModal('buy')}>Buy</Button>
            ) : (
              <BidRow>
                <Input
                  title="Amount"
                  type="number"
                  value={quantity}
                  onChange={(e: any) => setQuantity(Number(e.target.value))}
                />
                <Button onClick={() => handleOpenModal('bid')}>Bid</Button>
              </BidRow>
            )}
          </ButtonsRow>
        )}
      </Content>
    </Container>
  );
};
export default SellOrderModal;
