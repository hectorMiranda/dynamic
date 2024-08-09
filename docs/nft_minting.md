
# NFT Minting with Dynamic's Embedded Wallet

This guide walks you through the process of minting NFTs using Dynamic's embedded wallet. We'll cover the essential steps and provide code snippets to help you get started.

## Prerequisites

Before you begin, ensure you have the following:
- A connected wallet using Dynamic's widget.
- Your environment properly configured with `REACT_APP_ENVIRONMENT_ID`.
- A basic understanding of React and the Dynamic SDK.

## Step 1: Setting Up the Wallet Integration

To start, ensure your wallet is properly integrated and connected. If you haven't done this yet, follow the steps in the `WalletIntegration.js` file, as outlined below:

```javascript
import React, { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const WalletIntegration = () => {
  const { primaryWallet, isAuthenticated } = useDynamicContext();
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    if (isAuthenticated && primaryWallet) {
      const address = primaryWallet.address;
      setWalletAddress(address);
    }
  }, [primaryWallet, isAuthenticated]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Wallet Address:</h2>
          <p>{walletAddress}</p>
        </div>
      ) : (
        <p>Please connect your wallet to begin.</p>
      )}
    </div>
  );
};

export default WalletIntegration;
```

## Step 2: Implementing NFT Minting Functionality

Now that your wallet is connected, you can implement the NFT minting functionality. Here’s a basic example:

```javascript
import React, { useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const MintNFT = () => {
  const { primaryWallet } = useDynamicContext();
  const [mintStatus, setMintStatus] = useState('');

  const mintNFT = async () => {
    try {
      if (!primaryWallet) {
        setMintStatus('No wallet connected');
        return;
      }

      // Replace with your NFT minting logic, this is a placeholder
      const transaction = await primaryWallet.connector.sendTransaction({
        to: '0xYourNFTContractAddress',
        data: '0xYourMintingFunctionData',
        value: '0xAmountInWei',
      });

      setMintStatus('NFT minted successfully!');
    } catch (error) {
      setMintStatus(`Minting failed: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={mintNFT}>Mint NFT</button>
      {mintStatus && <p>{mintStatus}</p>}
    </div>
  );
};

export default MintNFT;
```

### Explanation:
- **Transaction Object**: The `sendTransaction` method is used to interact with the smart contract responsible for minting the NFT. The `to` field should be your NFT contract address, and `data` should be the encoded function call for minting the NFT.

## Step 3: Testing the Minting Process

After implementing the minting logic, deploy your application and test the minting functionality:

1. Connect your wallet using the Dynamic widget.
2. Navigate to the NFT minting section.
3. Click on "Mint NFT" and verify the transaction.

Ensure that you check the transaction status on a blockchain explorer to confirm that the NFT has been successfully minted.

## Additional Resources

For more details on interacting with smart contracts and handling transactions, refer to the official [Dynamic SDK Documentation](https://docs.dynamic.xyz).

## Conclusion

This guide provided an overview of how to mint NFTs using Dynamic's embedded wallet. By following these steps, you can integrate NFT minting into your application with ease.

