# ASH - Deployment Checklist

## ✅ **Ready to Deploy!**

### **Your Configuration:**
- **Dev Fee Wallet**: `0xf2082112688b1bb19b8c8697ddae1ef68d26b1d1`
- **Testnet HYPE**: `0x7317beb7cceed72ef0b346074cc8e7ab`
- **Chain ID**: 998 (HyperEVM Testnet)
- **RPC**: `https://rpcs.chain.link/hyperevm/testnet`

### **Still Need:**
- **WalletConnect Project ID** (get from cloud.walletconnect.com)
- **Testnet DEX Router Address** (for swaps)
- **Testnet DEX Factory Address** (for token pairs)

## 🚀 **Deployment Steps:**

### **1. Get WalletConnect Project ID (5 min)**
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com/)
2. Create new project
3. Copy Project ID

### **2. Upload to GitHub (10 min)**
1. Create GitHub repository: `ash-wallet-cleaner`
2. Upload all files from `C:\ash-wallet-cleaner\ash-wallet-cleaner\`
3. Make repository public

### **3. Deploy to Vercel (5 min)**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   ```
   VITE_WALLETCONNECT_PROJECT_ID = your-project-id
   VITE_DEV_FEE_WALLET = 0xf2082112688b1bb19b8c8697ddae1ef68d26b1d1
   VITE_HYPE_TOKEN_ADDRESS = 0x7317beb7cceed72ef0b346074cc8e7ab
   ```
4. Deploy!

### **4. Test Your App (5 min)**
1. Open your Vercel URL
2. Connect Rabby wallet
3. Switch to HyperEVM Testnet
4. Test wallet connection

## 🎯 **What Works Now:**
- ✅ Beautiful RainbowKit wallet connection
- ✅ HyperEVM Testnet support
- ✅ Dev fee wallet configured
- ✅ HYPE token address set
- ✅ Professional UI

## 🔧 **Next Steps After Deploy:**
1. Find testnet DEX router address
2. Add real token balance detection
3. Implement real swap logic
4. Test with testnet tokens

---

**Ready to deploy ASH with your configuration?** 🚀
