import React, { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import './WalletIntegration.css';  

const WalletIntegration = () => {
  const { primaryWallet, handleLogOut, isAuthenticated } = useDynamicContext();
  const [balance, setBalance] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const fetchWalletDetails = async () => {
      if (primaryWallet) {
        // Fetch wallet balance using the walletConnector directly from primaryWallet
        const balance = await primaryWallet.connector.getBalance();
        setBalance(balance);

        // Fetch wallet address
        const address = primaryWallet.address;
        setWalletAddress(address);
      }
    };

    if (isAuthenticated) {
      fetchWalletDetails();
    }
  }, [primaryWallet, isAuthenticated]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Wallet Details</h2>
          <p><strong>Address:</strong> {walletAddress}</p>
          <p><strong>Balance:</strong> {balance ? `${balance} ETH` : 'Loading...'}</p>
          <button className="logout-button" onClick={handleLogOut}>Log out</button>
        </div>
      ) : (
        <p>Please connect your wallet to see details.</p>
      )}
    </div>
  );
};

export default WalletIntegration;
