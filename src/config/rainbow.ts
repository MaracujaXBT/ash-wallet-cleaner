import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { defineChain } from 'viem'
import { HYPEREVM_CONFIG, WALLETCONNECT_PROJECT_ID } from './hyperevm'

// Define HyperEVM testnet chain for RainbowKit
const hyperevm = defineChain({
  id: HYPEREVM_CONFIG.chainId,
  name: HYPEREVM_CONFIG.name,
  nativeCurrency: {
    decimals: 18,
    name: 'HYPE',
    symbol: 'HYPE',
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

export const config = getDefaultConfig({
  appName: 'ASH - Wallet Cleaner',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [hyperevm],
  ssr: false, // If your dApp uses server side rendering (SSR)
})
