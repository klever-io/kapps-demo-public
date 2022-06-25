import { useSdk } from '../../../hooks';
import Form, { ISection } from 'components/Form';
import Loading from 'components/Loading';
import ConfirmModal from 'components/Modals/Confirm';
import Header from 'components/Pages/Header';
import Select, { ISelectItem } from 'components/Select';
import { useDidUpdateEffect } from 'hooks';
import { Container, Title } from 'pages/styles';
import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { IBroadcastResponse } from 'types';
import { getFeedback } from 'utils';
import sections, { options } from './formSections';
import { InputContainer } from './styles';

const KDATrigger = () => {
  const sdk = useSdk();
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState<ISelectItem>({
    label: '',
    value: null,
  });
  const [formSections, setFormSections] = useState<ISection[]>([]);

  const params: { id: string } = useParams();
  const assetId = params.id;

  const parseValues = (values: any) => {
    const parsedValues = JSON.parse(JSON.stringify(values));

    if (parsedValues.role) {
      !parsedValues.role.address && delete parsedValues.role;
    }
    delete parsedValues.uris;

    if (values.uris) {
      const uris = {};

      values.uris.forEach((uri: any) => {
        if (uri.label && uri.address) {
          uris[uri.label] = uri.address;
        }
      });

      if (Object.keys(uris).length > 0) {
        parsedValues.uris = uris;
      }
    }
    parsedValues['triggerType'] = type.value;

    return parsedValues;
  };

  const handleOpenModal = (values: any) => {
    setOpen(true);
    setPayload(parseValues(values));
  };

  const handleSubmit = async () => {
    if (sdk.getAccount() === null) {
      return;
    }
    setLoading(true);

    try {
      const response = (await sdk.getAccount()?.sendAssetTrigger(payload, {
        metadata: payload.data,
      })) as IBroadcastResponse | undefined;
      getFeedback(response, () => setPayload(response));
      setLoading(false);
    } catch (e) {
      toast.error(String(e));
      setLoading(false);
    }
  };

  const handleSelect = async (type: ISelectItem) => {
    setType(type);
    setLoading(true);

    let timeout: any;

    await new Promise(
      resolve =>
        (timeout = setTimeout(() => {
          resolve(setLoading(false));
        }, 200)),
    );

    clearTimeout(timeout);
  };

  useDidUpdateEffect(() => {
    const Load = async () => {
      setLoading(true);

      let timeout: any;

      await new Promise(
        resolve =>
          (timeout = setTimeout(() => {
            resolve(setLoading(false));
          }, 200)),
      );

      return clearTimeout(timeout);
    };

    setFormSections(sections(assetId, Number(type.value)));
    Load();
  }, [type]);

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
        <Title>Create KDA Trigger</Title>
      </Header>
      <InputContainer>
        <Select
          title="Trigger Type"
          data={options}
          onChange={e => handleSelect(e)}
        />
      </InputContainer>
      <Form
        sections={formSections}
        key={JSON.stringify(formSections)}
        onSubmit={handleOpenModal}
        buttonLabel="Trigger"
        cancelOnly={!type.label}
      />
    </Container>
  );
};
export default KDATrigger;
