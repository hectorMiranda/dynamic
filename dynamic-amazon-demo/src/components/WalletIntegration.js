import React, { useEffect, useState, useCallback } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import './WalletIntegration.css';
import { parseEther } from 'viem';
import { getChain } from '@dynamic-labs/utils';

const WalletIntegration = () => {
  const { primaryWallet, handleLogOut, isAuthenticated } = useDynamicContext();
  const [balance, setBalance] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWalletDetails = useCallback(async () => {
    if (primaryWallet) {
      const balance = await primaryWallet.connector.getBalance();
      setBalance(balance);
      setWalletAddress(primaryWallet.address);
    }
  }, [primaryWallet]);

  useEffect(() => {
    if (isAuthenticated && primaryWallet) {
      fetchWalletDetails();
    }
  }, [primaryWallet, isAuthenticated, fetchWalletDetails]);

  const sendTransaction = async () => {
    if (!recipientAddress || !amountToSend) {
      setErrorMessage("Please fill all fields correctly.");
      return;
    }
    try {
      const provider = await primaryWallet.connector.getSigner();
      const transaction = {
        account: primaryWallet.address,
        chain: getChain(await provider.getChainId()),
        to: recipientAddress,
        value: parseEther(amountToSend),
      };
      const txResponse = await provider.sendTransaction(transaction);
      const client = await primaryWallet.connector.getPublicClient();
      const receipt = await client.getTransactionReceipt({ hash: txResponse.hash });
      setTransactionHash(receipt.transactionHash);
      setErrorMessage('');
    } catch (error) {
      console.error('Transaction Error:', error);
      setErrorMessage(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div className="wallet-container">
      {isAuthenticated ? (
        <>
          <div className="wallet-details">
            <h2>Wallet Details</h2>
            <p><strong>Address:</strong> {walletAddress}</p>
            <p><strong>Balance:</strong> {balance ? `${balance} ETH` : 'Loading...'}</p>
          </div>
          <div className="transaction-form">
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipientAddress}
              onChange={e => setRecipientAddress(e.target.value)}
              className="wallet-input"
            />
            <input
              type="text"
              placeholder="Amount to Send (ETH)"
              value={amountToSend}
              onChange={e => setAmountToSend(e.target.value)}
              className="wallet-input"
            />
            <button className="wallet-button" onClick={sendTransaction}>Send Transaction</button>
            {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <div className="actions">
            <button className="logout-button" onClick={handleLogOut}>Log out</button>
          </div>
        </>
      ) : (
        <p>Please connect your wallet to see details.</p>
      )}
    </div>
  );
};

export default WalletIntegration;
