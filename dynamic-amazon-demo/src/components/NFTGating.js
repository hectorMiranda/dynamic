import React, { useEffect, useState, useCallback } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { JsonRpcProvider, Contract } from 'ethers';
import './NFTGating.css';

const fallbackProviders = [
  `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
  'https://rpc.ankr.com/eth',
  'https://cloudflare-eth.com'
];

const NFTGating = () => {
  const { primaryWallet, isAuthenticated } = useDynamicContext();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const nftContractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;
  const nftTokenId = process.env.REACT_APP_NFT_TOKEN_ID;

  const checkNFTGating = useCallback(async () => {
    if (primaryWallet && nftContractAddress) {
      let provider;

      for (const rpcUrl of fallbackProviders) {
        try {
          provider = new JsonRpcProvider(rpcUrl);
          await provider.getNetwork(); // Check if provider is connected
          break; // Exit loop if connected successfully
        } catch (error) {
          console.error(`Failed to connect to ${rpcUrl}:`, error);
          continue; // Try the next provider
        }
      }

      if (!provider) {
        console.error("All providers failed to connect.");
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        // Create a contract instance
        const nftContract = new Contract(
          nftContractAddress,
          [
            "function ownerOf(uint256 tokenId) external view returns (address)"
          ],
          provider
        );

        // Check if the wallet owns a specific NFT
        const ownerAddress = await nftContract.ownerOf(nftTokenId);

        // Compare the ownerAddress with the primary wallet's address
        setHasAccess(ownerAddress.toLowerCase() === primaryWallet.address.toLowerCase());
      } catch (error) {
        console.error("Error checking NFT ownership:", error);
        setError(error.message || "Unknown error occurred");
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [primaryWallet, nftContractAddress, nftTokenId]);

  useEffect(() => {
    if (isAuthenticated && primaryWallet) {
      checkNFTGating();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, primaryWallet, checkNFTGating]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleErrorVisibility = () => {
    setShowError(!showError);
  };

  return (
    <div className="nft-gating-container">
      {hasAccess ? (
        <div className="gated-content">
          <h2>Welcome to the Exclusive Content! 🎉</h2>
          <p>You have access to this content because you own the required NFT.</p>
        </div>
      ) : (
        <div className="no-access">
          <h2>Access Restricted 🚫</h2>
          <p>You need to own a specific NFT to view this content.</p>
          {error && (
            <div className="error-container">
              <button className="toggle-error-button" onClick={toggleErrorVisibility}>
                {showError ? 'Hide Error Details' : 'Show Error Details'}
              </button>
              {showError && <div className="error-message"><pre>{error}</pre></div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NFTGating;
