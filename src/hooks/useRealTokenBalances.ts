import { useAccount, useReadContract } from 'wagmi'
import { useMemo } from 'react'
import { HYPEREVM_CONFIG } from '../config/hyperevm'
import { TokenBalance } from '../types'

// ERC-20 ABI for balance checking
const ERC20_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// Using TokenBalance from types/index.ts

export function useRealTokenBalances() {
  const { address, isConnected } = useAccount()

  // Common testnet tokens to check (you can add more)
  const testnetTokens = [
    '0x7317beb7cceed72ef0b346074cc8e7ab', // HYPE
    '0x0000000000000000000000000000000000000000', // Add more testnet token addresses
  ]

  // Get balance for each token
  const tokenBalances = testnetTokens.map((tokenAddress) => {
    const { data: balance } = useReadContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: address ? [address] : undefined,
      chainId: HYPEREVM_CONFIG.chainId,
    })

    const { data: symbol } = useReadContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'symbol',
      chainId: HYPEREVM_CONFIG.chainId,
    })

    const { data: name } = useReadContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'name',
      chainId: HYPEREVM_CONFIG.chainId,
    })

    const { data: decimals } = useReadContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'decimals',
      chainId: HYPEREVM_CONFIG.chainId,
    })

    return {
      address: tokenAddress,
      symbol: symbol || 'UNKNOWN',
      name: name || 'Unknown Token',
      balance: balance ? Number(balance) / Math.pow(10, decimals || 18) : 0,
      decimals: decimals || 18,
      estHypeOut: 0, // TODO: Calculate based on current price
    }
  })

  // Filter out tokens with zero balance and add some mock data for testing
  const tokensWithBalance = useMemo(() => {
    const realTokens = tokenBalances.filter(token => token.balance > 0)
    
    // Add some mock tokens for testing (remove this when you have real tokens)
    const mockTokens = [
      { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT', name: 'Tether USD', balance: 0.005, decimals: 18, estHypeOut: 0.0048 },
      { address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', symbol: 'WETH', name: 'Wrapped Ether', balance: 0.002, decimals: 18, estHypeOut: 0.0019 },
      { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI', name: 'Dai Stablecoin', balance: 0.008, decimals: 18, estHypeOut: 0.0076 },
    ]

    return [...realTokens, ...mockTokens]
  }, [tokenBalances])

  return {
    tokens: tokensWithBalance,
    isLoading: !isConnected,
    error: null,
  }
}
