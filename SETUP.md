# ASH - HyperEVM Wallet Cleaner Setup

## 🧪 **RECOMMENDED: Start with Testnet!**

We're configured for **HyperEVM Testnet** first. This is safer and faster for development.

### ✅ **Already Configured:**
- **Chain ID**: 998 (HyperEVM Testnet)
- **RPC URL**: `https://rpcs.chain.link/hyperevm/testnet`
- **Network**: HyperEVM Testnet

### 🔧 **What You Need to Find (Testnet):**

```typescript
// In src/config/hyperevm.ts - Replace these testnet addresses:

export const HYPEREVM_CONFIG = {
  chainId: 998, // ✅ Already set
  rpcUrl: 'https://rpcs.chain.link/hyperevm/testnet', // ✅ Already set
  
  contracts: {
    HYPE: '0x...', // 🔍 Find testnet HYPE token address
    ROUTER: '0x...', // 🔍 Find testnet DEX router address
    FACTORY: '0x...', // 🔍 Find testnet DEX factory address
  },
}
```

### 2. **WalletConnect Project ID**
1. Go to [https://cloud.walletconnect.com/](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy your Project ID
4. Replace in `src/config/hyperevm.ts`:
   ```typescript
   export const WALLETCONNECT_PROJECT_ID = 'your-actual-project-id'
   ```

### 3. **Dev Fee Wallet**
Replace in `src/config/fees.ts`:
```typescript
export const DEV_FEE_WALLET = '0x...' // Your wallet address for receiving 0.3% fees
```

## 🚀 How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:3000
   ```

## 🔧 What Works Now

- ✅ Real wallet connection (MetaMask, Rabby, WalletConnect)
- ✅ HyperEVM-only focus
- ✅ Token selection with checkboxes
- ✅ 0.3% dev fee calculation
- ✅ Confirmation dialog with balance sheet
- ✅ Responsive dark theme UI

## 🔮 What's Next (Future Development)

- Real token balance detection
- Actual swap transactions
- Real HYPE token integration
- Cross-chain bridging (if we get adoption)

## 📝 Current Status

This is a **demo version** with mock data. To make it fully functional, you need to provide the HyperEVM network details above.

---

**ASH** - *Burn your dust. Worship the HYPE.* 🔥
