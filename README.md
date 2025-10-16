# ASH - Wallet Cleaner

> **Burn your dust. Worship the HYPE.**

A simple HyperEVM cleaner that converts small token balances (dust) into HYPE tokens on HyperEVM testnet.

## 🌈 **Features**

- **Beautiful RainbowKit** wallet connection
- **HyperEVM Testnet** support
- **Rabby wallet** optimized
- **0.3% dev fee** on conversions
- **Professional UI** with modern design

## 🚀 **Quick Start**

### **1. Upload to GitHub**
- Create GitHub repository: `ash-wallet-cleaner`
- Upload all files from `C:\ash-wallet-cleaner\`
- Make repository public

### **2. Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables:
  ```
  VITE_WALLETCONNECT_PROJECT_ID = your-project-id
  VITE_DEV_FEE_WALLET = 0xf2082112688b1bb19b8c8697ddae1ef68d26b1d1
  VITE_HYPE_TOKEN_ADDRESS = 0x7317beb7cceed72ef0b346074cc8e7ab
  ```
- Deploy!

### **3. Test Your App**
- Open your Vercel URL
- Connect Rabby wallet
- Switch to HyperEVM Testnet
- Test the beautiful wallet connection!

## 🔧 **Configuration**

### **Your Settings:**
- **Dev Fee Wallet**: `0xf2082112688b1bb19b8c8697ddae1ef68d26b1d1`
- **Testnet HYPE**: `0x7317beb7cceed72ef0b346074cc8e7ab`
- **Chain ID**: 998 (HyperEVM Testnet)
- **RPC**: `https://rpcs.chain.link/hyperevm/testnet`

### **Still Need:**
- **WalletConnect Project ID** (get from cloud.walletconnect.com)
- **Testnet DEX Router Address** (for swaps)
- **Testnet DEX Factory Address** (for token pairs)

## 📁 **Project Structure**

```
src/
├── config/
│   ├── fees.ts          # Dev fee configuration
│   ├── hyperevm.ts      # HyperEVM testnet config
│   └── rainbow.ts       # RainbowKit configuration
├── App.tsx              # Main application
├── App.css              # Styles
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🎯 **What Works Now**

- ✅ Beautiful RainbowKit wallet connection
- ✅ HyperEVM Testnet support
- ✅ Dev fee wallet configured
- ✅ HYPE token address set
- ✅ Professional UI

## 🔧 **Next Steps**

1. Find testnet DEX router address
2. Add real token balance detection
3. Implement real swap logic
4. Test with testnet tokens

## 📚 **Guides**

- `GITHUB_UPLOAD_GUIDE.md` - Upload to GitHub
- `VERCEL_DEPLOYMENT_GUIDE.md` - Deploy to Vercel
- `DEPLOYMENT_CHECKLIST.md` - Complete checklist

---

**Ready to deploy ASH?** 🚀