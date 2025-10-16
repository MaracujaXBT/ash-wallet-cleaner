import { useWriteContract, useReadContract } from 'wagmi'
import { useAccount } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { HYPEREVM_CONFIG } from '../config/hyperevm'

// Hyperswap V3 Router ABI (simplified for swaps)
const HYPERSWAP_V3_ROUTER_ABI = [
  {
    inputs: [
      {
        components: [
          { name: 'tokenIn', type: 'address' },
          { name: 'tokenOut', type: 'address' },
          { name: 'fee', type: 'uint24' },
          { name: 'recipient', type: 'address' },
          { name: 'deadline', type: 'uint256' },
          { name: 'amountIn', type: 'uint256' },
          { name: 'amountOutMinimum', type: 'uint256' },
          { name: 'sqrtPriceLimitX96', type: 'uint160' }
        ],
        name: 'params',
        type: 'tuple'
      }
    ],
    name: 'exactInputSingle',
    outputs: [{ name: 'amountOut', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'amountOut', type: 'uint256' },
      { name: 'path', type: 'bytes' },
      { name: 'recipient', type: 'address' }
    ],
    name: 'exactOutput',
    outputs: [{ name: 'amountIn', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'path', type: 'bytes' },
      { name: 'recipient', type: 'address' }
    ],
    name: 'exactInput',
    outputs: [{ name: 'amountOut', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function'
  }
] as const

// ERC-20 ABI for approvals
const ERC20_ABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const

export function useHyperswapV3() {
  const { address } = useAccount()
  const { writeContract, isPending, error } = useWriteContract()

  // Get quote for swap (simplified - in production you'd use a proper quote API)
  const getSwapQuote = async (_tokenIn: string, _tokenOut: string, amountIn: string) => {
    // This is a simplified implementation
    // In production, you'd call Hyperswap's quote API or use their SDK
    const amountInWei = parseUnits(amountIn, 18)
    const estimatedAmountOut = amountInWei * 95n / 100n // 5% slippage estimate
    return formatUnits(estimatedAmountOut, 18)
  }

  // Check if token is approved for router
  const checkAllowance = async (tokenAddress: string, amount: string) => {
    if (!address) return false
    
    const allowance = await useReadContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'allowance',
      args: [address, HYPEREVM_CONFIG.contracts.HYPERSWAP_ROUTER_V3 as `0x${string}`],
      chainId: HYPEREVM_CONFIG.chainId,
    })

    const amountWei = parseUnits(amount, 18)
    return allowance.data ? allowance.data >= amountWei : false
  }

  // Approve token for router
  const approveToken = async (tokenAddress: string, amount: string) => {
    if (!address) throw new Error('No wallet connected')

    const amountWei = parseUnits(amount, 18)
    
    return writeContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [HYPEREVM_CONFIG.contracts.HYPERSWAP_ROUTER_V3 as `0x${string}`, amountWei],
      chainId: HYPEREVM_CONFIG.chainId,
    })
  }

  // Execute swap using Hyperswap V3
  const executeSwap = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    amountOutMinimum: string,
    fee: number = 3000 // 0.3% fee tier
  ) => {
    if (!address) throw new Error('No wallet connected')

    const amountInWei = parseUnits(amountIn, 18)
    const amountOutMinWei = parseUnits(amountOutMinimum, 18)
    const deadline = Math.floor(Date.now() / 1000) + 1800 // 30 minutes

    const swapParams = {
      tokenIn: tokenIn as `0x${string}`,
      tokenOut: tokenOut as `0x${string}`,
      fee: fee as 3000,
      recipient: address,
      deadline: BigInt(deadline),
      amountIn: amountInWei,
      amountOutMinimum: amountOutMinWei,
      sqrtPriceLimitX96: 0n
    }

    return writeContract({
      address: HYPEREVM_CONFIG.contracts.HYPERSWAP_ROUTER_V3 as `0x${string}`,
      abi: HYPERSWAP_V3_ROUTER_ABI,
      functionName: 'exactInputSingle',
      args: [swapParams],
      chainId: HYPEREVM_CONFIG.chainId,
      value: tokenIn === '0x0000000000000000000000000000000000000000' ? amountInWei : 0n, // ETH value if swapping ETH
    })
  }

  // Main swap function that handles approval and execution
  const swapTokens = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    onProgress?: (step: string) => void
  ) => {
    try {
      onProgress?.('Getting quote...')
      const amountOut = await getSwapQuote(tokenIn, tokenOut, amountIn)
      const amountOutMin = (parseFloat(amountOut) * 0.95).toString() // 5% slippage

      onProgress?.('Checking allowance...')
      const isApproved = await checkAllowance(tokenIn, amountIn)
      
      if (!isApproved) {
        onProgress?.('Approving token...')
        await approveToken(tokenIn, amountIn)
        // Wait for approval transaction to be mined
        await new Promise(resolve => setTimeout(resolve, 5000))
      }

      onProgress?.('Executing swap...')
      const result = await executeSwap(tokenIn, tokenOut, amountIn, amountOutMin)
      
      onProgress?.('Swap completed!')
      return result
    } catch (error) {
      console.error('Swap failed:', error)
      throw error
    }
  }

  return {
    swapTokens,
    getSwapQuote,
    isPending,
    error,
  }
}
