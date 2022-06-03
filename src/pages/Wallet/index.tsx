import Header from 'components/Pages/Header';
import Balance from 'components/Wallet/Balance';
import { Container, Title } from 'pages/styles';
import React, { useEffect, useState } from 'react';
import Asset from '../../components/Wallet/Asset';
import NFTs from '../../components/Wallet/NFTs';
import {
  EmptyTab,
  TabContainer,
  TabIndicator,
  TabItem,
  TabsContent,
  WalletHeader,
} from './styles';

const Wallet: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [reload, setReload] = useState(false);

  const tabItems = ['Assets', 'NFTs'];

  const handleTabItem = (index: number) => {
    if (index !== selectedTab) {
      setSelectedTab(index);
    }
  };

  const TabComponent: React.FC = () => {
    switch (selectedTab) {
      case 0:
        return <Asset reload={reloadFunc} />;
      case 1:
        return <NFTs />;
      default:
        return (
          <EmptyTab>
            <span>Nothing to show here</span>
          </EmptyTab>
        );
    }
  };

  const reloadFunc = () => {
    setReload(true);
  };

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  const headerProps = {
    border: 'none',
    reload: reloadFunc,
  };

  return (
    <Container>
      <WalletHeader>
        <Header {...headerProps}>
          <Title>Wallet</Title>
        </Header>
        {!reload && <Balance />}
      </WalletHeader>

      {!reload && (
        <TabContainer>
          {tabItems.map((item, index) => (
            <TabItem key={String(index)} onClick={() => handleTabItem(index)}>
              <span>{item}</span>
              <TabIndicator selected={selectedTab === index} />
            </TabItem>
          ))}
        </TabContainer>
      )}

      <TabsContent>
        <TabComponent />
      </TabsContent>
    </Container>
  );
};

export default Wallet;
