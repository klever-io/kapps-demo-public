import { useHistory } from 'react-router';
import { IAsset } from 'types';
import { Container, IdCol, ItemCol, ItemId, StyledButton } from './styles';
interface IKDAProps {
  item: IAsset;
  setSelectedItem: (item: IAsset) => void;
}

const KDADashboardItem: React.FC<IKDAProps> = ({
  item: asset,
  setSelectedItem,
}) => {
  const history = useHistory();

  return (
    <Container>
      <IdCol>
        <ItemId>{asset.assetId}</ItemId>
        <span>{asset.assetType}</span>
      </IdCol>
      <ItemCol>
        {(asset.circulatingSupply / 10 ** asset.precision).toLocaleString()}
      </ItemCol>
      <ItemCol>
        <StyledButton
          onClick={() => {
            history.push(`/kda/trigger/${asset.assetId}`);
          }}
          styleType="transparent"
        >
          Trigger
        </StyledButton>
        <StyledButton
          onClick={() => setSelectedItem(asset)}
          styleType="transparent"
        >
          Details
        </StyledButton>
      </ItemCol>
    </Container>
  );
};
export default KDADashboardItem;
