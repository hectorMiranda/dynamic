import React, { useEffect, useState, useCallback } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { BrowserProvider, Contract } from 'ethers'; // Import BrowserProvider directly
import './NFTGating.css';

const NFTGating = () => {
  const { primaryWallet, isAuthenticated } = useDynamicContext();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const nftContractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;
  const nftTokenId = process.env.REACT_APP_NFT_TOKEN_ID; // If checking for a specific token ID

  const checkNFTGating = useCallback(async () => {
    if (primaryWallet && nftContractAddress) {
      try {
        // Get the provider from the wallet connector
        const provider = new BrowserProvider(window.ethereum);

        // Create a contract instance
        const nftContract = new Contract(
          nftContractAddress,
          [
            // ABI snippet for checking ownership
            "function ownerOf(uint256 tokenId) external view returns (address)",
            // Add other relevant ABI functions here
          ],
          provider.getSigner()
        );

        // Check if the wallet owns a specific NFT
        const ownerAddress = await nftContract.ownerOf(nftTokenId);

        // Compare the ownerAddress with the primary wallet's address
        setHasAccess(ownerAddress.toLowerCase() === primaryWallet.address.toLowerCase());
      } catch (error) {
        console.error("Error checking NFT ownership:", error);
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

  return (
    <div className="nft-gating-container">
      {hasAccess ? (
        <div className="gated-content">
          <h2>Welcome to the Exclusive Content! 🎉</h2>
          <p>You have access to this content because you own the required NFT.</p>
          {/* Insert your gated content here */}
        </div>
      ) : (
        <div className="no-access">
          <h2>Access Restricted 🚫</h2>
          <p>You need to own a specific NFT to view this content.</p>
          {/* You could include a link to purchase the NFT here */}
        </div>
      )}
    </div>
  );
};

export default NFTGating;
