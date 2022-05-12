import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';

import ICO from '../pages/ICO';
import KDA from '../pages/KDA';
import Staking from '../pages/Staking';
import CreateICO from '../pages/ICO/CreateICO';
import CreateKDA from '../pages/KDA/CreateKDA';
import Marketplaces from '../pages/Marketplaces';
import CreateMarketplace from '../pages/Marketplaces/CreateMarketplace';
import SellOrder from '../pages/Marketplaces/CreateSellOrder';
import Wallet from '../pages/Wallet';
import ConnectWallet from 'pages/ConnectWallet';
import PrivateRoutes from 'components/PrivateRoutes';
import Marketplace from 'pages/Marketplaces/MarketplaceOrders';
import KDATrigger from 'pages/KDA/AssetTrigger';
import Delegate from 'pages/Staking/Delegate';
import Freeze from '../pages/Staking/Freeze';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/connect" component={ConnectWallet} />

        <Layout>
          <PrivateRoutes>
            <Route exact path="/marketplaces" component={Marketplaces} />

            <Route path="/marketplace/:id" component={Marketplace} />

            <Route exact path="/marketplaces/sell/:id" component={SellOrder} />
            <Route
              exact
              path="/marketplaces/create"
              component={CreateMarketplace}
            />

            <Route exact path="/ico" component={ICO} />
            <Route exact path="/ico/create" component={CreateICO} />

            <Route exact path="/kda" component={KDA} />
            <Route exact path="/kda/create" component={CreateKDA} />
            <Route exact path="/kda/trigger/:id" component={KDATrigger} />

            <Route exact path="/staking" component={Staking} />
            <Route exact path="/staking/freeze" component={Freeze} />
            <Route exact path="/staking/delegate/:id" component={Delegate} />

            <Route exact path="/wallet" component={Wallet} />
          </PrivateRoutes>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
