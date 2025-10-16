import { useAccount } from 'wagmi'
import { useMemo } from 'react'
import { HYPEREVM_CONFIG } from '../config/hyperevm'

// TODO: Add ERC-20 ABI when implementing real token balance fetching

// Using inline types to avoid unused interface errors

export function useRealTokenBalances() {
  const { isConnected } = useAccount()

  // Common testnet tokens to check (you can add more)
  const commonTestnetTokens = useMemo(() => [
    // HyperEVM testnet tokens
    { address: HYPEREVM_CONFIG.contracts.HYPE, symbol: 'HYPE', name: 'HyperEVM HYPE' },
    { address: HYPEREVM_CONFIG.contracts.WHYPE, symbol: 'WHYPE', name: 'Wrapped HYPE' },
    
    // Common testnet tokens (these might not exist on HyperEVM testnet)
    { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT', name: 'Tether USD' },
    { address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', symbol: 'WETH', name: 'Wrapped Ether' },
    { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI', name: 'Dai Stablecoin' },
    { address: '0xA0b86a33E6441b8C4C8C0C4C8C0C4C8C0C4C8C0C4', symbol: 'USDC', name: 'USD Coin' },
    { address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', symbol: 'UNI', name: 'Uniswap' },
    
    // Add more testnet tokens as you discover them
    // You can get these from:
    // 1. HyperEVM testnet explorer
    // 2. Add tokens manually to your wallet
    // 3. Check what tokens you actually have
  ], [])

  // TODO: Implement real token balance fetching
  // For now, we'll use mock data to demonstrate the UI

  const tokenBalances = useMemo(() => {
    // For now, return the mock tokens since we're not fetching real balances yet
    // This will be fixed when we implement proper token detection
    return commonTestnetTokens.map((token) => ({
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      balance: 0, // No real balance for now
      decimals: 18,
      estHypeOut: 0, // TODO: Calculate based on current price
    }))
  }, [commonTestnetTokens])

  // Filter out tokens with zero balance and add some mock data for testing
  const tokensWithBalance = useMemo(() => {
    const realTokens = tokenBalances.filter(token => token.balance > 0)

    // Add some mock tokens for testing (remove this when you have real tokens)
    const mockTokens: Array<{
      address: string
      symbol: string
      name: string
      balance: number
      decimals: number
      estHypeOut: number
    }> = [
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
