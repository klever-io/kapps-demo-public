import { useSdk } from '@klever/sdk';
import CustomITOForm from 'components/CustomForm/ITO';
import { IDropdownItem } from 'components/Form/FormInput/Select';
import Loading from 'components/Loading';
import ConfirmModal from 'components/Modals/Confirm';
import { IAssetResponse } from 'pages/KDA';
import { Container, Title } from 'pages/styles';
import Header from 'components/Pages/Header';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from 'services/api';
import { IAsset, IBroadcastResponse } from 'types';
import { getFeedback } from 'utils';
import Form, { ISection } from '../../../components/Form';
import sections from './formSections';
import Loader from 'components/Loading/Loader';

const CreateITO = () => {
  const sdk = useSdk();
  const account = sdk.getAccount();

  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formSections, setFormSections] = useState<ISection[]>([]);

  const parsePackInfo = (values: any) => {
    const parsedValues = JSON.parse(JSON.stringify(values));

    delete parsedValues.pack;

    const packInfo: {
      [key: string]: any;
    } = {};

    values.pack.forEach((item: any) => {
      const itemContent = { packItems: item.packItem };
      if (item.packCurrencyID) {
        packInfo[item.packCurrencyID] = itemContent;
      } else {
        packInfo['KLV'] = itemContent;
      }
    });

    parsedValues.packInfo = packInfo;

    return parsedValues;
  };

  const handleOpenModal = (values: any) => {
    setOpen(true);
    setPayload(parsePackInfo(values));
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    try {
      const response = (await account?.sendConfigITO(payload)) as
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
      const walletAddress = sessionStorage.getItem('walletAddress') || '';

      const response: IAssetResponse = await api.get({
        route: `assets/kassets`,
        query: {
          owner: walletAddress,
        },
      });

      if (response.error) {
        return;
      }
      const assets: IDropdownItem[] = [];

      Object.entries(response.data.assets).forEach(
        ([, asset]: [string, IAsset]) => {
          assets.push({
            label: asset.assetId,
            value: asset.assetId,
          });
        },
      );

      setInitialLoading(false);
      setFormSections(sections(assets));
    };

    getSections();
  }, []);

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
        <Title>Create ITO</Title>
      </Header>
      {initialLoading && <Loader />}

      {!initialLoading && (
        <Form
          sections={formSections}
          key={String(formSections)}
          onSubmit={handleOpenModal}
        >
          <CustomITOForm />
        </Form>
      )}
    </Container>
  );
};
export default CreateITO;
