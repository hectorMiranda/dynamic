import { DynamicContextProvider, DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WalletIntegration from './components/WalletIntegration';
import NFTMinting from './components/NFTMinting';
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
        environmentId: process.env.REACT_APP_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
      }}>
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
              <DynamicWidget />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
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
