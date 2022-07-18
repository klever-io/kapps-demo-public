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
          <>
            {item.price && (
              <span>
                {' '}
                {'Price: ' +
                  item.price?.toLocaleString() +
                  ' ' +
                  item.currencyID}
              </span>
            )}
            {!item.price && <span> No price set</span>}
          </>
        ) : (
          <>
            {item.reservePrice && (
              <span>
                {' '}
                {'reservePrice: ' + item.reservePrice + ' ' + item.currencyID}
              </span>
            )}{' '}
            {!item.reservePrice && <span> No reserve price</span>}
          </>
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
