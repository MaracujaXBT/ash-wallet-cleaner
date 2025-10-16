import { createConfig, http } from 'wagmi'
import { defineChain } from 'viem'
import { injected, walletConnect, metaMask } from 'wagmi/connectors'
import { HYPEREVM_CONFIG, WALLETCONNECT_PROJECT_ID } from './config/hyperevm'

// Define HyperEVM chain
const hyperevm = defineChain({
  id: HYPEREVM_CONFIG.chainId,
  name: HYPEREVM_CONFIG.name,
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [HYPEREVM_CONFIG.rpcUrl],
    },
    public: {
      http: [HYPEREVM_CONFIG.rpcUrl],
    },
  },
  blockExplorers: {
    default: { 
      name: 'HyperEVM Explorer', 
      url: HYPEREVM_CONFIG.explorerUrl 
    },
  },
})

export const config = createConfig({
  chains: [hyperevm],
  connectors: [
    // Rabby first since it's the primary wallet for HYPE users
    injected({
      target: 'rabby',
    }),
    injected({
      target: 'metaMask',
    }),
    metaMask(),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
    }),
  ],
  transports: {
    [hyperevm.id]: http(),
  },
})
