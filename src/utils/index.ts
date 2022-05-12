import { toast } from 'react-toastify';
import api from 'services/api';
import { IBroadcastResponse, ITransactionResponse } from 'types';
const parseData = (data: any) => {
  const dataEntries = Object.entries(data);

  dataEntries.forEach(([key, value]) => {
    if (value === '') {
      delete data[key];
    } else if (typeof value === 'object') {
      parseData(value);
    } else if (
      typeof value === 'string' &&
      new RegExp(
        '^((19|20)\\d\\d)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])',
      ).test(value)
    ) {
      data[key] = new Date(value).getTime() / 1000;
    } else if (isNaN(value as any)) {
      switch (value) {
        case 'true':
          data[key] = true;
          break;
        case 'false':
          data[key] = false;
          break;
        default:
          data[key] = value;
          break;
      }
    } else {
      data[key] = Math.floor(Number(value));
    }
  });

  return data;
};

const getTransactionStatus = async (hash: string) => {
  let status = 'error';
  const maxAttempts = 10;
  let attempts = 0;

  let interval: NodeJS.Timeout;

  await new Promise<void>(resolve => {
    interval = setInterval(async () => {
      const response: ITransactionResponse = await api.get({
        route: `transaction/${hash}`,
      });

      if (response.data !== null) {
        status = response.data.transaction.status;
        clearInterval(interval);
        resolve();
      }

      attempts++;

      if (attempts >= maxAttempts) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });

  return status;
};

const getFeedback = async (
  response: IBroadcastResponse | undefined,
  callback?: () => void,
) => {
  if (response === undefined) {
    toast.error('Failed to broadcast transaction');
    return;
  }
  if (callback) {
    callback();
  }
};

export { parseData, getTransactionStatus, getFeedback };
