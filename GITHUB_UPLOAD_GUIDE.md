# ASH - GitHub Upload Guide

## 🚀 **Upload ASH to GitHub (Fixed Structure)**

### ✅ **Problem Fixed:**
- Moved all files to correct location: `C:\ash-wallet-cleaner\`
- No more nested folder structure
- Ready for GitHub upload

### 📁 **Current Structure:**
```
C:\ash-wallet-cleaner\
├── src/
│   ├── config/
│   │   ├── fees.ts
│   │   ├── hyperevm.ts
│   │   └── rainbow.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── vercel.json
├── .vercelignore
├── .gitignore
└── README.md
```

### 🎯 **Upload Steps:**

#### **Method 1: GitHub Web Interface (Easiest)**
1. Go to [github.com](https://github.com)
2. Create new repository: `ash-wallet-cleaner`
3. Make it **Public**
4. Click "uploading an existing file"
5. Select **ALL files** from `C:\ash-wallet-cleaner\`
6. Drag and drop them to GitHub
7. Commit with message: "Initial ASH wallet cleaner setup"

#### **Method 2: GitHub Desktop**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Clone your repository
3. Copy all files from `C:\ash-wallet-cleaner\` to your cloned repo folder
4. Commit and push

#### **Method 3: Git Command Line**
```bash
cd C:\ash-wallet-cleaner
git init
git add .
git commit -m "Initial ASH wallet cleaner setup"
git branch -M main
git remote add origin https://github.com/yourusername/ash-wallet-cleaner.git
git push -u origin main
```

### ✅ **Files to Upload:**
- ✅ All files in `C:\ash-wallet-cleaner\`
- ✅ Include `src/` folder
- ✅ Include `package.json`
- ✅ Include `vercel.json`
- ✅ Include `.gitignore`

### 🚫 **Files to Ignore:**
- ❌ `node_modules/` (handled by .gitignore)
- ❌ `dist/` (handled by .gitignore)
- ❌ `.env` files (handled by .gitignore)

### 🎯 **After Upload:**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables
4. Deploy!

---

**Ready to upload ASH to GitHub?** 🚀
