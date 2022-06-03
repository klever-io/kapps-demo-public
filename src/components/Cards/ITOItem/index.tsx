import { useSdk } from '../../../hooks';
import Loading from 'components/Loading';
import ConfirmModal from 'components/Modals/Confirm';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { IAsset, IBroadcastResponse } from 'types';
import { getFeedback } from 'utils';
import Input from '../../Input';
import {
  AssetRow,
  Container,
  Content,
  InputRow,
  ItemData,
  ItemId,
  ItemImage,
  PackPrice,
  PriceContainer,
  PriceRange,
  PriceRangeTitle,
  PriceRow,
  StyledButton,
} from './styles';

interface IITOItemProps {
  asset: IAsset;
}

const ITODashboardItem: React.FC<IITOItemProps> = ({ asset }) => {
  const [quantity, setQuantity] = useState(0);

  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const packData = asset.ito?.packData;

  const history = useHistory();
  const sdk = useSdk();
  const account = sdk.getAccount();

  const handleOpenModal = (amount?: number, currencyID?: string) => {
    if (asset.assetType === 'NonFungible') {
      const values = {
        amount: amount,
        buyType: 0,
        currencyId: currencyID,
        id: asset.assetId,
      };

      setPayload(values);
    } else {
      const values = {
        amount: quantity,
        buyType: 0,
        currencyId: currencyID,
        id: asset.assetId,
      };

      setPayload(values);
    }

    setOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = (await account?.sendBuyOrder(payload)) as
        | IBroadcastResponse
        | undefined;
      getFeedback(response, () => setPayload(response));
      setLoading(false);
    } catch (e) {
      toast.error(String(e));
      setLoading(false);
    }
  };

  const handleGoToWallet = () => {
    history.push(`/wallet`);
  };

  return (
    <>
      {loading && <Loading />}
      {open && (
        <ConfirmModal
          closeModal={() => setOpen(false)}
          handleConfirm={handleSubmit}
          payload={payload}
          BackButtonLabel={'Wallet'}
          handleBack={handleGoToWallet}
        />
      )}
      {asset.assetType === 'NonFungible' ? (
        <>
          {packData &&
            packData.map(({ key, packs }, index) =>
              packs.map((pack, innerIndex) => (
                <Container
                  key={String(
                    index + innerIndex / 10 ** String(innerIndex).length,
                  )}
                >
                  <ItemId>{key}</ItemId>
                  <ItemData>
                    {asset.logo && (
                      <ItemImage
                        src={asset.logo}
                        width={60}
                        height={60}
                        alt="Logo"
                      />
                    )}
                    <small>
                      {pack.amount} {asset.name}
                    </small>
                    <span>
                      {pack.price.toLocaleString()} {key}
                    </span>
                  </ItemData>
                  <StyledButton
                    onClick={() => handleOpenModal(pack.amount, key)}
                  >
                    Buy
                  </StyledButton>
                </Container>
              )),
            )}
        </>
      ) : (
        //Fungible ===========================================================================================
        <>
          {packData &&
            packData.map(({ key, packs }, index) => (
              <Container fungible key={String(index)}>
                <Content>
                  <AssetRow>
                    {asset.logo && (
                      <ItemImage
                        src={asset.logo}
                        width={60}
                        height={60}
                        alt="Logo"
                      />
                    )}
                    <ItemId>
                      {asset.name} ({asset.assetId}){' '}
                      <span> {asset.assetType}</span>
                    </ItemId>
                  </AssetRow>
                  <ItemData>
                    <InputRow>
                      <Input
                        title="Amount"
                        type="number"
                        value={quantity}
                        onChange={(e: any) =>
                          setQuantity(Number(e.target.value))
                        }
                      />
                    </InputRow>
                  </ItemData>
                  <StyledButton onClick={() => handleOpenModal(undefined, key)}>
                    Buy Token
                  </StyledButton>
                </Content>
                <Content>
                  <PriceContainer>
                    <PriceRangeTitle>Price Range</PriceRangeTitle>
                    {packs?.map((pack, index) => (
                      <PriceRow key={String(index)}>
                        <PriceRange>
                          {index - 1 >= 0
                            ? packs && packs[index - 1].amount.toLocaleString()
                            : '0'}{' '}
                          - {pack.amount.toLocaleString()} ...
                        </PriceRange>
                        <PackPrice>
                          {pack.price && pack.price.toLocaleString()} {key}
                        </PackPrice>
                      </PriceRow>
                    ))}
                  </PriceContainer>
                </Content>
              </Container>
            ))}
        </>
      )}
    </>
  );
};
export default ITODashboardItem;
