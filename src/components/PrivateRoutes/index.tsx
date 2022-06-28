import { Account } from '@klever/sdk';
import { useSdk } from '../../hooks';
import { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoutes: React.FC = ({ children, ...rest }) => {
  const sdk = useSdk();
  const account = sdk.getAccount();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const walletAddress = sessionStorage.getItem('walletAddress');
    const privateKey = sessionStorage.getItem('privateKey');

    if (!account && privateKey && walletAddress) {
      sdk.setAccount(new Account(walletAddress, privateKey));
    } else {
      setLoading(false);
    }
  }, [sdk.getAccount()]);
  return (
    <>
      {!loading && (
        <Route
          {...rest}
          render={() =>
            sessionStorage.getItem('walletAddress') ? (
              <>{children}</>
            ) : (
              <Redirect
                to={{
                  pathname: '/connect',
                }}
              />
            )
          }
        />
      )}
    </>
  );
};

export default PrivateRoutes;
