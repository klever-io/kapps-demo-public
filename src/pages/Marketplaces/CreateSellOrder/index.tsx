import { useSdk } from '../../../hooks';
import Form, { ISection } from 'components/Form';
import { IDropdownItem } from 'components/Form/FormInput/Select';
import Loading from 'components/Loading';
import Loader from 'components/Loading/Loader';
import ConfirmModal from 'components/Modals/Confirm';
import Header from 'components/Pages/Header';
import Select, { ISelectItem, Sizes } from 'components/Select';
import { Container, Title } from 'pages/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import api from 'services/api';
import {
  IAccountAsset,
  IAddressResponse,
  IBroadcastResponse,
  ICollectionResponse,
} from 'types';
import { getFeedback } from 'utils';
import sections from './formSections';
import { InputContainer } from './styles';

const CreateMarketplace = () => {
  const sdk = useSdk();
  const account = sdk.getAccount();
  const params: { id: string } = useParams();
  const marketplaceID = params.id;

  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<any>({});

  const [submitLoading, setSubmitLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [assetIDLoading, setAssetIDLoading] = useState(false);

  const [formSections, setFormSections] = useState<ISection[]>([]);
  const [assets, setAssets] = useState<IDropdownItem[]>([]);
  const [NFTs, setNFTs] = useState<IDropdownItem[]>([]);
  const [assetID, setAssetID] = useState<string>();

  const handleOpenModal = (values: any) => {
    setOpen(true);
    setPayload({ ...values, AssetID: assetID });
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    try {
      const response = (await account?.sendSellOrder(payload)) as
        | IBroadcastResponse
        | undefined;

      getFeedback(response, () => setPayload(response));
      setSubmitLoading(false);
    } catch (e) {
      toast.error(String(e));
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    const getSections = async () => {
      const response: IAddressResponse = await api.get({
        route: `address/${sdk.getAccount()?.getAddress()}`,
      });
      if (response.error) {
        return;
      }
      const assets: IDropdownItem[] = [];

      Object.entries(response.data.account.assets).forEach(
        ([, asset]: [string, IAccountAsset]) => {
          if (asset.assetType === 1) {
            assets.push({
              label: asset.assetId,
              value: asset.assetId,
            });
          }
        },
      );

      setAssets(assets);
      setInitialLoading(false);
      setFormSections(sections(marketplaceID));
    };

    getSections();
  }, []);

  const handleSelectCollection = async (asset: ISelectItem) => {
    setAssetIDLoading(true);

    const response: ICollectionResponse = await api.get({
      route: `address/${sdk.getAccount()?.getAddress()}/collection/${
        asset.value
      }`,
      query: {
        limit: 400,
      },
    });
    if (response.error) {
      return;
    }

    setAssetIDLoading(false);

    const auxItems = [] as IDropdownItem[];

    response.data.collection
      .sort(
        (a, b) =>
          Number(a.assetId.split('/')[1]) - Number(b.assetId.split('/')[1]),
      )
      .forEach(item =>
        auxItems.push({
          label: item.assetId.split('/')[1],
          value: item.assetId,
        }),
      );

    setNFTs(auxItems);
  };

  const handleSelectID = (asset: ISelectItem) => {
    setAssetID(asset.value);
  };

  return (
    <Container>
      {submitLoading && <Loading />}
      {open && (
        <ConfirmModal
          closeModal={() => setOpen(false)}
          handleConfirm={handleSubmit}
          payload={payload}
        />
      )}
      <Header>
        <Title>Create Sell Order</Title>
      </Header>
      {initialLoading && <Loader />}

      {!initialLoading && (
        <InputContainer>
          <Select
            title="Asset"
            placeholder="Select a NFT collection"
            data={assets}
            onChange={e => handleSelectCollection(e)}
          />
          <Select
            title="Asset ID"
            placeholder="ID"
            data={NFTs}
            onChange={e => handleSelectID(e)}
            disabled={NFTs.length === 0}
            size={Sizes.Small}
            loading={assetIDLoading}
          />
        </InputContainer>
      )}

      <Form
        sections={formSections}
        key={JSON.stringify(formSections)}
        onSubmit={handleOpenModal}
      />
    </Container>
  );
};
export default CreateMarketplace;
