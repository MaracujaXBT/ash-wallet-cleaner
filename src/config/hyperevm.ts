// HyperEVM Testnet Configuration
export const HYPEREVM_CONFIG = {
  chainId: 998,
  name: 'HyperEVM Testnet',
  rpcUrl: 'https://rpcs.chain.link/hyperevm/testnet',
  explorerUrl: 'https://explorer.hyperliquid.xyz', // TODO: Verify testnet explorer URL
  
  // Contract addresses (testnet)
  contracts: {
    HYPE: '0x7317beb7cceed72ef0b346074cc8e7ab', // ✅ Testnet HYPE token address
    HYPERSWAP_ROUTER_V3: process.env.VITE_HYPERSWAP_ROUTER_V3 || '0x4e2960a8cd19b467b82d26d83facb0fae26b094d', // ✅ Hyperswap V3 Router
    HYPERSWAP_ROUTER_V3_2: process.env.VITE_HYPERSWAP_ROUTER_V3_2 || '0x6d99e7f6747af2cdbb5164b6dd50e40d4fde1e77', // ✅ Hyperswap V3 Router 2
    HYPERSWAP_FACTORY_V3: process.env.VITE_HYPERSWAP_FACTORY_V3 || '0xB1c0fa0B789320044A6F623cFe5eBda9562602E3', // ✅ Hyperswap V3 Factory
    WHYPE: process.env.VITE_WHYPE_ADDRESS || '0x5555555555555555555555555555555555555555', // ✅ WHYPE (Wrapped HYPE)
  },
  
  // Common tokens for dust detection (testnet)
  commonTokens: [
    '0x0000000000000000000000000000000000000000', // TODO: Add testnet token addresses
  ],
}

// WalletConnect Project ID
export const WALLETCONNECT_PROJECT_ID = process.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-walletconnect-project-id'
