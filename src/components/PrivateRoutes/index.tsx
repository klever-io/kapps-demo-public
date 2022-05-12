import { Account, useSdk } from '@klever/sdk';
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoutes: React.FC = ({ children, ...rest }) => {
  const sdk = useSdk();
  const account = sdk.getAccount();

  useEffect(() => {
    const walletAddress = sessionStorage.getItem('walletAddress');
    const privateKey = sessionStorage.getItem('privateKey');

    if (!account && privateKey && walletAddress) {
      sdk.setAccount(new Account(walletAddress, privateKey));
    }
  }, []);
  return (
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
  );
};

export default PrivateRoutes;
