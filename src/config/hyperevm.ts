// HyperEVM Testnet Configuration
export const HYPEREVM_CONFIG = {
  chainId: 998,
  name: 'HyperEVM Testnet',
  rpcUrl: 'https://rpcs.chain.link/hyperevm/testnet',
  explorerUrl: 'https://explorer.hyperliquid.xyz', // TODO: Verify testnet explorer URL
  
  // Contract addresses (testnet)
  contracts: {
    HYPE: '0x7317beb7cceed72ef0b346074cc8e7ab', // ✅ Testnet HYPE token address
    ROUTER: '0x0000000000000000000000000000000000000000', // TODO: Add testnet router address
    FACTORY: '0x0000000000000000000000000000000000000000', // TODO: Add testnet factory address
  },
  
  // Common tokens for dust detection (testnet)
  commonTokens: [
    '0x0000000000000000000000000000000000000000', // TODO: Add testnet token addresses
  ],
}

// WalletConnect Project ID
export const WALLETCONNECT_PROJECT_ID = process.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-walletconnect-project-id'
