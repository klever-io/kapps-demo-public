/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { Account, core, IURLs } from '@klever/sdk';

export const useDidUpdateEffect = (fn: Function, inputs: Array<any>): void => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
};

interface ISdkContext {
  isLoaded(): Promise<boolean>;
  getAccount(): Account | null;
  setAccount(account: Account): void;
  setUrls(newUrls: IURLs): void;
}

const SdkContext = createContext({} as ISdkContext);

const SdkProvider: React.FC = ({ children }) => {
  const [acc, setAcc] = useState<Account | null>(null);
  const [urls, setUrls] = useState<IURLs>({
    api:
      process.env.REACT_APP_DEFAULT_API_HOST ||
      'https://api.testnet.klever.finance/v1.0',
    node:
      process.env.REACT_APP_DEFAULT_NODE_HOST ||
      'https://node.testnet.klever.finance',
  });

  const values: ISdkContext = {
    isLoaded: async () => !!acc,
    getAccount: () => acc,
    setAccount: account => setAcc(account),
    setUrls: newUrls => setUrls(newUrls),
  };

  useEffect(() => {
    core.setURLs(urls);
  }, [urls]);

  return <SdkContext.Provider value={values}>{children}</SdkContext.Provider>;
};

const useSdk = () => useContext(SdkContext);

export { SdkContext, SdkProvider, useSdk };
