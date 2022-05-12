import { Container, ItemData, ItemId, StyledButton } from './styles';

export interface ISellOrderItem {
  owner: string;
  assetID: string;
  currencyID: string;
  endTime: number;
  marketType: string;
  marketplaceID: string;
  price?: number;
  reservePrice?: number;
  orderID: string;
  sold: boolean;
}

interface IMakretplaceItemProps {
  item: ISellOrderItem;
  setSelectedItem: (item: ISellOrderItem) => void;
}

const SellOrderItem: React.FC<IMakretplaceItemProps> = ({
  item,
  setSelectedItem,
}) => {
  return (
    <Container>
      <ItemId>#{item.assetID}</ItemId>
      <ItemData>
        <span>
          {'Expiration date: ' + new Date(item.endTime * 1000).toLocaleString()}
        </span>
        <span>{item.marketType}</span>
        {item.marketType === 'BuyItNowMarket' ? (
          <span>
            {' '}
            {'Price: ' + item.price?.toLocaleString() + ' ' + item.currencyID}
          </span>
        ) : (
          <span>
            {' '}
            {'reservePrice: ' + item.reservePrice + ' ' + item.currencyID}
          </span>
        )}
        {item.marketType === 'BuyItNowMarket' ? (
          item.sold && <span>Sold</span>
        ) : (
          <span> {item.sold && <span>Bid's Made</span>}</span>
        )}
      </ItemData>
      <StyledButton onClick={() => setSelectedItem(item)} styleType="outlined">
        Details
      </StyledButton>
    </Container>
  );
};
export default SellOrderItem;
