import SellOrderItem, { ISellOrderItem } from 'components/Cards/SellOrderItem';
import SellOrderModal from 'components/Modals/Marketplace';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from 'services/api';
import GridDashboard from '../../../components/Dashboard/Grid';
import { Container, Title } from 'pages/styles';
import Header from 'components/Pages/Header';
import { IResponse } from 'types';
import Pagination from 'components/Pagination';
import { PaginationContainer } from './styles';

interface ISellOrderTransaction {
  sender: string;
  receipts: any[];
  contract: {
    parameter: {
      assetId: string;
      currencyID: string;
      price: number;
      reservePrice: number;
      endTime: number;
      marketType: string;
      marketplaceID: string;
    };
  }[];
}

interface IBuyOrderTransaction {
  sender: string;
  receipts: any[];
  contract: {
    parameter: {
      id: string;
      buyType: number;
      currencyID: string;
      amount: number;
    };
  }[];
}
export interface IMarketplaceSellsResponse extends IResponse {
  data: {
    transactions: ISellOrderTransaction[];
  };
}

export interface IMarketplaceBuysResponse extends IResponse {
  data: {
    transactions: IBuyOrderTransaction[];
  };
}

const Marketplace = () => {
  const params: { id: string } = useParams();

  const marketplaceID = params.id;

  const [items, setItems] = useState<ISellOrderItem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);

    const getSellOrders = api.get({
      route: `transaction/list`,
      query: {
        status: 'success',
        marketplaceid: marketplaceID,
        type: 18,
        limit: 10,
        page,
      },
    });

    const getBuyOrders = api.get({
      route: `transaction/list`,
      query: {
        status: 'success',
        marketplaceid: marketplaceID,
        type: 17,
        limit: 10,
        page,
      },
    });

    const [sellOrdersResponse, buyOrdersResponse]: [
      IMarketplaceSellsResponse,
      IMarketplaceBuysResponse,
    ] = await Promise.all([getSellOrders, getBuyOrders]);

    const sellOrders = sellOrdersResponse.data.transactions.map(
      (transaction: ISellOrderTransaction) => {
        console.log(transaction);
        return {
          owner: transaction.sender,
          assetID: transaction.contract[0].parameter.assetId,
          currencyID: transaction.contract[0].parameter.currencyID,
          price: transaction.contract[0].parameter.price,
          reservePrice: transaction.contract[0].parameter.reservePrice,
          endTime: transaction.contract[0].parameter.endTime,
          marketType: transaction.contract[0].parameter.marketType,
          marketplaceID: transaction.contract[0].parameter.marketplaceID,
          orderID: transaction.receipts[2].orderId,
          sold: false,
        };
      },
    );

    setTotalPages(sellOrdersResponse.pagination.totalPages);

    const buyOrders = buyOrdersResponse.data.transactions.map(
      (transaction: IBuyOrderTransaction) => {
        return {
          orderID: transaction.receipts[1].orderId,
          amount: transaction.contract[0].parameter.amount,
        };
      },
    );

    //TODO: Improve eficiency =================================================

    buyOrders.forEach((buyOrder: any) => {
      const sellOrderIndex = sellOrders.findIndex(
        (sellOrder: any) => sellOrder.orderID === buyOrder.orderID,
      );
      const sellOrder = sellOrders[sellOrderIndex];

      if (sellOrder?.marketType === 'BuyItNowMarket') {
        if (sellOrderIndex !== -1) {
          sellOrders[sellOrderIndex] = {
            ...sellOrders[sellOrderIndex],
            sold: true,
          };
        }
      } else {
        if (
          sellOrderIndex !== -1 &&
          sellOrder.price &&
          buyOrder.amount > sellOrder.price
        ) {
          sellOrders[sellOrderIndex] = {
            ...sellOrders[sellOrderIndex],
            sold: true,
          };
        }
      }
    });

    //TODO: ===================================================================

    setItems(sellOrders);
    setLoading(false);
  };
  useEffect(() => {
    fetchItems();
  }, [page]);

  const buttons = [
    {
      label: 'Back',
      route: '/marketplaces/',
    },
    {
      label: 'Create Sell Order',
      route: `/marketplaces/sell/${marketplaceID}`,
    },
  ];

  const reload = () => {
    setPage(0);
    setItems([]);
    fetchItems();
  };

  return (
    <Container>
      <Header reload={reload}>
        <Title>Marketplace</Title>
      </Header>
      <GridDashboard
        items={items}
        buttons={buttons}
        ItemComponent={SellOrderItem}
        ModalComponent={SellOrderModal}
        loading={loading}
      />
      <PaginationContainer>
        <Pagination
          count={totalPages}
          page={page ? page : 0}
          onPaginate={(page: any) => {
            setPage(page);
          }}
        />
      </PaginationContainer>
    </Container>
  );
};
export default Marketplace;
