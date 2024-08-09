import React from 'react';

const NFTMinting = () => {
  return (
    <div>
      <h2>NFT Minting Overview</h2>
      <p>Dynamic supports NFT minting functionality, particularly for EVM-compatible chains using Wagmi. Here's a brief overview of how to implement NFT minting:</p>
      <ul>
        <li>Use the <code>useContractWrite</code> and <code>usePrepareContractWrite</code> hooks from Wagmi to interact with the NFT contract.</li>
        <li>Set up the contract configuration, including the ABI and contract address.</li>
        <li>Implement a minting function that calls the contract's mint function.</li>
        <li>Use <code>useWaitForTransaction</code> to track the minting process and display the status to the user.</li>
      </ul>
      <p>Here's a simplified example of the minting component:</p>
      <pre>
        <code>
{`import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

export const NFTMintingComponent = () => {
  const { config } = usePrepareContractWrite({
    abi: [{ inputs: [], name: 'mint', outputs: [], stateMutability: 'nonpayable', type: 'function' }],
    address: 'YOUR_CONTRACT_ADDRESS',
    functionName: 'mint',
  });

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  return (
    <div>
      <button onClick={() => write?.()}>
        {isLoading ? 'Minting...' : 'Mint NFT'}
      </button>
      {isSuccess && <p>Successfully minted your NFT!</p>}
    </div>
  );
};`}
        </code>
      </pre>
      <p>Additionally, Dynamic supports NFT gating features, allowing you to restrict access based on NFT ownership. This can be used in conjunction with minting to create exclusive experiences for NFT holders.</p>
    </div>
  );
};

export default NFTMinting;

