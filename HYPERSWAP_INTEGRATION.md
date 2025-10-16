# ASH - Hyperswap Integration Guide

## 🔄 **Hyperswap Integration for ASH**

Based on your successful testnet swap via Hyperswap, here's how to integrate it into ASH:

### **✅ What You've Confirmed:**
- Hyperswap works on HyperEVM testnet
- You can swap tokens successfully
- Integration is possible

### **🔧 Integration Steps:**

#### **1. Get Hyperswap Contract Addresses**
You need to find these on HyperEVM testnet:
- **Router Address** (for swaps)
- **Factory Address** (for token pairs)
- **WETH Address** (wrapped native token)

#### **2. Update Configuration**
Add to `src/config/hyperevm.ts`:
```typescript
contracts: {
  HYPE: '0x7317beb7cceed72ef0b346074cc8e7ab', // ✅ Already set
  HYPERSWAP_ROUTER: '0x...', // TODO: Add Hyperswap router address
  HYPERSWAP_FACTORY: '0x...', // TODO: Add Hyperswap factory address
  WETH: '0x...', // TODO: Add WETH address
}
```

#### **3. Create Swap Hook**
Create `src/hooks/useHyperswap.ts`:
```typescript
import { useWriteContract } from 'wagmi'
import { HYPEREVM_CONFIG } from '../config/hyperevm'

export function useHyperswap() {
  const { writeContract } = useWriteContract()

  const swapTokens = async (tokenIn: string, tokenOut: string, amountIn: string) => {
    // Implement Hyperswap swap logic
    // This will use the router contract to execute swaps
  }

  return { swapTokens }
}
```

#### **4. Update Token Detection**
Add more testnet tokens to `useRealTokenBalances.ts`:
```typescript
const testnetTokens = [
  '0x7317beb7cceed72ef0b346074cc8e7ab', // HYPE
  '0x...', // Add other testnet tokens you have
]
```

### **🎯 Next Steps:**

#### **Immediate:**
1. **Find Hyperswap contract addresses** on testnet
2. **Add them to config**
3. **Test with your existing tokens**

#### **Implementation:**
1. **Create swap hook** with Hyperswap integration
2. **Add real swap logic** to the clean function
3. **Test with small amounts**

### **🔍 How to Find Contract Addresses:**

#### **Method 1: Check Transaction**
- Look at your successful swap transaction
- Check the "To" address (that's the router)
- Check the contract interactions

#### **Method 2: HyperEVM Explorer**
- Go to HyperEVM testnet explorer
- Search for "Hyperswap" or "Router"
- Find the contract addresses

#### **Method 3: Ask Community**
- Check HyperEVM Discord/Telegram
- Ask for Hyperswap contract addresses
- Get help from the community

### **🚀 Expected Result:**
- Real token detection from your wallet
- Actual swaps via Hyperswap
- HYPE tokens in your wallet after cleaning

---

**Ready to find those Hyperswap contract addresses?** 🔍
