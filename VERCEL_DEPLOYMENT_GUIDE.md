# ASH - Vercel Deployment Guide

## 🚀 **Complete Step-by-Step Vercel Deployment**

### **Phase 1: Prepare Your Project**

#### **Step 1: Create GitHub Repository**
1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `ash-wallet-cleaner`
3. Make it **Public** (for free Vercel deployment)
4. Don't initialize with README (we already have files)

#### **Step 2: Upload Your Code to GitHub**
1. Download [GitHub Desktop](https://desktop.github.com/) or use Git command line
2. Clone your new repository locally
3. Copy all files from `C:\ash-wallet-cleaner\ash-wallet-cleaner\` to your cloned repo folder
4. Commit and push to GitHub

**OR use GitHub Web:**
1. Go to your repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop all files from your project folder
4. Commit with message: "Initial ASH wallet cleaner setup"

### **Phase 2: Configure for Vercel**

#### **Step 3: Update Configuration Files**

**Update `src/config/hyperevm.ts`:**
```typescript
// Replace with your actual values
export const WALLETCONNECT_PROJECT_ID = process.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-project-id-here'
```

**Update `src/config/fees.ts`:**
```typescript
// Replace with your actual wallet address
export const DEV_FEE_WALLET = '0x...' // Your wallet address for receiving 0.3% fees
```

#### **Step 4: Create Vercel Configuration**

Create `.vercelignore` file:
```
node_modules
.git
.env.local
dist
```

Create `vercel.json` file:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install"
}
```

### **Phase 3: Deploy to Vercel**

#### **Step 5: Connect Vercel to GitHub**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your `ash-wallet-cleaner` repository
5. Vercel will auto-detect it's a Vite project

#### **Step 6: Configure Environment Variables**
In Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. Add these variables:

```
VITE_WALLETCONNECT_PROJECT_ID = your-actual-project-id
VITE_DEV_FEE_WALLET = 0xf2082112688b1bb19b8c8697ddae1ef68d26b1d1
VITE_HYPE_TOKEN_ADDRESS = 0x7317beb7cceed72ef0b346074cc8e7ab
VITE_DEX_ROUTER_ADDRESS = 0x... (when you find it)
VITE_DEX_FACTORY_ADDRESS = 0x... (when you find it)
```

#### **Step 7: Deploy**
1. Click "Deploy" in Vercel
2. Wait for build to complete (2-3 minutes)
3. Your app will be live at: `https://ash-wallet-cleaner.vercel.app`

### **Phase 4: Test Your Deployment**

#### **Step 8: Test the Live App**
1. Open your Vercel URL
2. Connect your Rabby wallet
3. Switch to HyperEVM Testnet
4. Test wallet connection
5. Test token selection (mock data)

#### **Step 9: Get Testnet Contract Addresses**
You still need to find:
- **Testnet HYPE token address**
- **Testnet DEX router address**
- **Testnet DEX factory address**

Add these to Vercel environment variables when you find them.

### **Phase 5: Make It Production Ready**

#### **Step 10: Add Real Token Detection**
Once you have testnet addresses:
1. Update `src/config/hyperevm.ts` with real addresses
2. Implement real ERC-20 balance scanning
3. Add real swap logic

#### **Step 11: Custom Domain (Optional)**
1. In Vercel → Settings → Domains
2. Add your custom domain
3. Configure DNS settings

### **Phase 6: Launch Strategy**

#### **Step 12: Testnet Launch**
1. Share with HYPE community
2. Get feedback
3. Fix any issues
4. Test thoroughly

#### **Step 13: Mainnet Migration**
1. Update configs for mainnet
2. Add mainnet contract addresses
3. Deploy to production
4. Announce to community

---

## 🔧 **Quick Commands Reference**

```bash
# Local development (when npm works)
npm install
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 **Checklist Before Deploying**

- [ ] GitHub repository created
- [ ] Code uploaded to GitHub
- [ ] WalletConnect Project ID obtained
- [ ] Dev fee wallet address set
- [ ] Vercel account created
- [ ] Environment variables configured
- [ ] Testnet contract addresses found (when available)

## 🎯 **Expected Timeline**

- **Setup**: 30 minutes
- **Deploy**: 10 minutes
- **Test**: 15 minutes
- **Total**: ~1 hour

---

**Ready to deploy ASH to Vercel?** 🚀
