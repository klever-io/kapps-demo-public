import { useSdk } from '../../../hooks';
import Loader from 'components/Loading/Loader';
import { useState, useEffect } from 'react';
import { AmountContainer } from './styles';

const Balance: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const sdk = useSdk();

  const precision = 6; //KLV precision

  useEffect(() => {
    if (sdk.getAccount() && sdk.isLoaded()) {
      const fetchBalance = async () => {
        const balance = await sdk.getAccount()?.getBalance();

        setBalance(balance || 0);
        setLoading(false);
      };

      fetchBalance();
    }
  }, [sdk.isLoaded()]);
  return (
    <AmountContainer>
      <p>KLV BALANCE</p>
      {loading ? (
        <Loader />
      ) : (
        <span>{(balance / 10 ** precision).toLocaleString()}</span>
      )}
    </AmountContainer>
  );
};

export default Balance;
