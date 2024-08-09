import React from 'react';
import { DynamicContextProvider, DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WalletIntegration from './components/WalletIntegration'; 
import 'react-tabs/style/react-tabs.css';
import './App.css';

const Header = () => {
  const { isAuthenticated } = useDynamicContext();

  return (
    <header className="App-header">
      <div className="header-content">
        <h1 className="header-title">Amazon.xyz - Integration with Dynamic</h1>
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
        environmentId: process.env.REACT_APP_ENVIRONMENT_ID      }}>
      <div className="App">
        <Header />

        <Tabs>
          <TabList>
            <Tab>Home</Tab>
            <Tab>Dynamic Widget</Tab>
            <Tab>Wallet Integration</Tab>
            <Tab>Code Snippets</Tab>
          </TabList>

          <TabPanel>
            <div className="tab-content">
              <h2>Welcome</h2>
              <p>
                This application demonstrates the integration of Dynamic's embedded wallet for seamless NFT minting and advanced account abstraction features.
              </p>
              <p>
                Explore how our platform enables secure, scalable, and user-friendly experiences in the web3 ecosystem, tailored specifically for enterprise solutions.
              </p>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="widget-container tab-content">
              <h2>Dynamic Widget</h2>
              <DynamicWidget />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <h2>Wallet Integration</h2>
              <WalletIntegration />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <h2>Code Snippets</h2>
              <pre>
                <code>
                  
                </code>
              </pre>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </DynamicContextProvider>
  );
};

export default App;
