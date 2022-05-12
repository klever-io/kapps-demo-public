import { useSdk } from '@klever/sdk';
import Loading from 'components/Loading';
import ConfirmModal from 'components/Modals/Confirm';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IBroadcastResponse } from 'types';
import { getFeedback } from 'utils';
import Form from '../../../components/Form';
import { Container, Title } from 'pages/styles';
import Header from 'components/Pages/Header';
import { useParams } from 'react-router';

const Delegate = () => {
  const sdk = useSdk();
  const account = sdk.getAccount();
  const params: { id: string } = useParams();
  const bucketID = params.id;

  const sections = [
    {
      fields: [
        { label: 'Receiver' },
        { label: 'bucketID', props: { defaultValue: bucketID } },
      ],
    },
  ];

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
      const response = (await account?.sendDelegate(payload)) as
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
        <Title>Delegate</Title>
      </Header>
      <Form sections={sections} onSubmit={handleOpenModal} />
    </Container>
  );
};
export default Delegate;
