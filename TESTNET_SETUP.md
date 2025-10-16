# ASH - HyperEVM Testnet Setup

## 🧪 **Testnet Configuration Complete!**

### ✅ **What's Already Configured:**
- **Chain ID**: 998 (HyperEVM Testnet)
- **RPC URL**: `https://rpcs.chain.link/hyperevm/testnet`
- **Network Name**: HyperEVM Testnet

### 🔧 **What You Need to Find:**

#### **1. Testnet Contract Addresses**
You need to find these on HyperEVM testnet:

```typescript
// In src/config/hyperevm.ts - Replace these:
contracts: {
  HYPE: '0x...', // Testnet HYPE token address
  ROUTER: '0x...', // Testnet DEX router address  
  FACTORY: '0x...', // Testnet DEX factory address
}
```

#### **2. Testnet Token Addresses**
For dust detection, find testnet addresses of:
- USDT
- USDC  
- DAI
- WETH
- Any other common tokens

#### **3. WalletConnect Project ID**
- Go to [https://cloud.walletconnect.com/](https://cloud.walletconnect.com/)
- Create a project
- Copy the Project ID
- Replace in `src/config/hyperevm.ts`

#### **4. Your Testnet Wallet**
- Set your dev fee wallet in `src/config/fees.ts`
- Make sure you have testnet ETH for gas fees

### 🚀 **How to Test:**

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Add HyperEVM Testnet to MetaMask:**
   - Network Name: HyperEVM Testnet
   - RPC URL: `https://rpcs.chain.link/hyperevm/testnet`
   - Chain ID: 998
   - Currency Symbol: ETH

3. **Get testnet tokens:**
   - Look for a testnet faucet
   - Get testnet ETH for gas
   - Get testnet HYPE tokens

4. **Test the app:**
   - Connect wallet
   - Select tokens
   - Try the swap flow

### 🔍 **Where to Find Contract Addresses:**

1. **HyperEVM Explorer** (if available)
2. **HyperEVM Documentation**
3. **Discord/Telegram** communities
4. **GitHub repositories**

### 📝 **Next Steps:**

1. **Find the contract addresses** above
2. **Update the config files**
3. **Test wallet connection**
4. **Test with small amounts**

---

**Ready to find those testnet addresses?** 🔍
