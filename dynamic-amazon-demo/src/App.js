import React from 'react';
import { DynamicContextProvider, DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WalletIntegration from './components/WalletIntegration';
import NFTMinting from './components/NFTMinting';
import HomeTab from './components/Home';
import 'react-tabs/style/react-tabs.css';
import './App.css';

const Header = () => {
  const { isAuthenticated } = useDynamicContext();

  return (
    <header className="App-header">
      <div className="header-content">
        <img src={`${process.env.PUBLIC_URL}/logo-primary.png`} className="header-logo" alt="Amazon.xyz Logo" /> {/* Corrected path */}
        <h1 className="header-title">Amazon.xyz</h1>
        <div className="right-header">
          <div className={`connection-status ${isAuthenticated ? 'connected' : 'disconnected'}`}>
            {isAuthenticated ? 'Connected' : 'Not Connected'}
          </div>
          <DynamicWidget />
        </div>
      </div>
    </header>
  );
};

const App = () => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.REACT_APP_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
      }}>
      <div className="App">
        <Header />

        <Tabs>
          <TabList>
            <Tab>Home</Tab>
            <Tab>Wallet Integration</Tab>
            <Tab>Code Snippets</Tab>
          </TabList>

          <TabPanel>
            <div className="tab-content">
              <HomeTab/>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <DynamicWidget />
              <WalletIntegration />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <NFTMinting />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </DynamicContextProvider>
  );
};

export default App;
