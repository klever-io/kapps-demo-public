import { useSdk } from '@klever/sdk';
import { IDropdownItem } from 'components/Form/FormInput/Select';
import Loader from 'components/Loading/Loader';
import ConfirmModal from 'components/Modals/Confirm';
import { Container, Title } from 'pages/styles';
import Header from 'components/Pages/Header';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from 'services/api';
import { IAccountAsset, IAddressResponse, IBroadcastResponse } from 'types';
import { getFeedback } from 'utils';
import Form, { ISection } from '../../../components/Form';
import sections from './formsections';

const Freeze = () => {
  const sdk = useSdk();
  const account = sdk.getAccount();

  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [formSections, setFormSections] = useState<ISection[]>([]);

  const handleOpenModal = (values: any) => {
    setOpen(true);
    setPayload(values);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = (await account?.sendFreeze(payload)) as
        | IBroadcastResponse
        | undefined;
      getFeedback(response, () => setPayload(response));
      setLoading(false);
    } catch (e) {
      toast.error(String(e));
      setLoading(false);
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
          if (!asset.assetId.includes('/')) {
            assets.push({
              label: asset.assetId,
              value: asset.assetId,
            });
          }
        },
      );

      setLoading(false);
      setFormSections(sections(assets));
    };

    getSections();
  }, []);

  return (
    <Container>
      {open && (
        <ConfirmModal
          closeModal={() => setOpen(false)}
          handleConfirm={handleSubmit}
          payload={payload}
        />
      )}
      <Header>
        <Title>Freeze</Title>
      </Header>
      {loading && <Loader />}
      {!loading && (
        <Form
          sections={formSections}
          key={String(formSections)}
          onSubmit={handleOpenModal}
        />
      )}
    </Container>
  );
};
export default Freeze;
