import MarketplaceItem from 'components/Cards/MarketplaceItem';
import FlexDashboard from 'components/Dashboard/Flex';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from 'services/api';
import { IMarketplace, IResponse } from 'types';
import { Container, Title } from 'pages/styles';
import Header from 'components/Pages/Header';

interface IMarketplaceTransaction {
  sender: string;
  receipts: any[];
  contract: {
    parameter: {
      name: string;
      referralAddress: string;
      referralPercentage: number;
    };
  }[];
}
export interface IMarketplaceTransactionsResponse extends IResponse {
  data: {
    transactions: IMarketplaceTransaction[];
  };
}

const Marketplaces = () => {
  const [marketplaces, setMarketplaces] = useState<IMarketplace[]>(
    [] as IMarketplace[],
  );
  const [loading, setLoading] = useState(true);

  const buttons = [
    {
      label: 'Create Marketplace',
      route: '/marketplaces/create',
    },
  ];

  const headers = ['Name', 'ID', 'Actions'];

  const getMarketplaces = async () => {
    let response: IMarketplaceTransactionsResponse;

    try {
      response = await api.get({
        route: `transaction/list`,
        query: {
          type: 20,
        },
      });
    } catch (e) {
      toast.error(String(e));
      setLoading(false);
      return;
    }

    const auxMarketplaces: IMarketplace[] = [];

    try {
      response.data.transactions.forEach(
        (transaction: IMarketplaceTransaction) => {
          auxMarketplaces.push({
            id: transaction.receipts[1].marketplaceId,
            name: transaction.contract[0].parameter.name,
            ownerAddress: transaction.sender,
            referralAddress: transaction.contract[0].parameter.referralAddress,
            referralPercentage:
              transaction.contract[0].parameter.referralPercentage,
          });
        },
      );

      setMarketplaces(auxMarketplaces);
      setLoading(false);
    } catch (e) {
      toast.error(String(e));
      setLoading(false);
    }
  };

  useEffect(() => {
    getMarketplaces();
  }, []);

  const reload = () => {
    setLoading(true);
    setMarketplaces([]);
    getMarketplaces();
  };

  return (
    <Container>
      <Header reload={reload}>
        <Title>Marketplaces</Title>
      </Header>
      <FlexDashboard
        items={marketplaces}
        buttons={buttons}
        ItemComponent={MarketplaceItem}
        headers={headers}
        loading={loading}
      />
    </Container>
  );
};
export default Marketplaces;
