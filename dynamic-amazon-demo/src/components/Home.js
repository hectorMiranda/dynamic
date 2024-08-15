import React from 'react';
import './HomeTab.css';

const HomeTab = () => {
  return (
    <div className="home-tab-container">
      <h1>Welcome to the Amazon-Dynamic Integration Demo App! 🌐</h1>
      <p>
        Explore the key features of this demo app and learn how to seamlessly integrate Dynamic's embedded wallet, mint NFTs, and much more.
        Click on the icons below to access detailed guides and documentation.
      </p>

      <div className="grid-container">
        <div className="grid-item">
          <a href="https://github.com/hectorMiranda/dynamic/blob/main/dynamic-amazon-demo/src/components/WalletIntegration.js" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="wallet">👛</span>
            <p>Wallet Integration</p>
          </a>
        </div>
        <div className="grid-item">
          <a href="https://github.com/hectorMiranda/dynamic/blob/main/docs/nft_minting.md" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="nft">🖼️</span>
            <p>NFT Minting Guide</p>
          </a>
        </div>
        <div className="grid-item">
          <a href="https://github.com/hectorMiranda/dynamic/blob/main/docs/account_abstraction.md" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="abstraction">🔗</span>
            <p>Account Abstraction</p>
          </a>
        </div>
        <div className="grid-item">
          <a href="https://github.com/hectorMiranda/dynamic/blob/main/docs/jwt_auth_guide.md" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="jwt">🔑</span>
            <p>JWT Auth Guide</p>
          </a>
        </div>
        <div className="grid-item">
          <a href="https://github.com/hectorMiranda/dynamic/blob/main/docs/token_verification.md" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="verification">🛡️</span>
            <p>Token Verification</p>
          </a>
        </div>
        <div className="grid-item">
          <a href="https://github.com/hectorMiranda/dynamic/blob/main/docs/react_resources.md" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="react">📚</span>
            <p>React Resources</p>
          </a>
        </div>
      </div>

      <p className="footer-note">
        Need help? Check out the <a href="https://github.com/hectorMiranda/dynamic">GitHub Repository</a> for more information or contact the Dynamic team for support. 
      </p>
    </div>
  );
};

export default HomeTab;
