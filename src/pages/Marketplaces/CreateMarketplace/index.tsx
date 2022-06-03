import { useSdk } from '../../../hooks';
import Form from '../../../components/Form';
import { Container, Title } from 'pages/styles';
import Header from 'components/Pages/Header';

import sections from './formSections';
import { IBroadcastResponse } from 'types';
import { getFeedback } from 'utils';
import ConfirmModal from 'components/Modals/Confirm';
import { useState } from 'react';
import Loading from 'components/Loading';
import { toast } from 'react-toastify';

const CreateMarketplace = () => {
  const sdk = useSdk();
  const account = sdk.getAccount();

  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (values: any) => {
    setOpen(true);
    setPayload(values);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = (await account?.sendCreateMarketplace(payload)) as
        | IBroadcastResponse
        | undefined;
      getFeedback(response, () => setPayload(response));
      setLoading(false);
    } catch (e) {
      toast.error(String(e));
      setLoading(false);
    }
  };
  return (
    <Container>
      {loading && <Loading />}
      {open && (
        <ConfirmModal
          closeModal={() => setOpen(false)}
          handleConfirm={handleSubmit}
          payload={payload}
        />
      )}
      <Header>
        <Title>Create Marketplace</Title>
      </Header>
      <Form
        sections={sections()}
        key={JSON.stringify(sections())}
        onSubmit={handleOpenModal}
      />
    </Container>
  );
};
export default CreateMarketplace;
