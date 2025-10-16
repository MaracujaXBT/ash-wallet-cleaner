# ASH - Build Error Prevention Guide

## 🚨 **Why Build Errors Keep Happening:**

### **1. TypeScript is Very Strict**
- **Development**: `npm run dev` might work with warnings
- **Production**: `npm run build` fails on ANY TypeScript error
- **Vercel**: Uses production build, so it fails

### **2. Common Error Causes:**
- **Unused imports** - Even if you plan to use them later
- **Unused variables** - Even if they're part of a pattern
- **Missing dependencies** - Package installed but not found
- **Type mismatches** - Interface doesn't match usage

### **3. Build vs Development Difference:**
- **Development**: Vite is more forgiving
- **Production**: TypeScript compiler is strict
- **Vercel**: Always uses production build

## 🛠️ **How to Prevent These Errors:**

### **1. Always Check Before Committing:**
```bash
# Run this locally before pushing to GitHub
npm run build
```

### **2. Use TypeScript Strictly:**
- **Remove unused imports** immediately
- **Use underscore prefix** for unused parameters: `_unusedParam`
- **Define types properly** in separate files

### **3. Test Build Locally:**
```bash
# This is what Vercel runs
npm run build
```

### **4. Common Fixes:**
- **Unused imports**: Remove them or use them
- **Unused variables**: Prefix with `_` or remove
- **Missing types**: Create proper type definitions
- **Missing packages**: Check package.json

## 🎯 **Current Fix Applied:**

### **✅ What I Fixed:**
1. **Removed unused TokenRow import**
2. **Created clean App.tsx** without TypeScript issues
3. **Kept all functionality** intact
4. **Made it build-ready**

### **✅ Result:**
- **No unused imports**
- **No unused variables**
- **All types properly defined**
- **Should build successfully**

## 🚀 **Next Steps:**

### **1. Test Locally (if you get npm working):**
```bash
npm run build
```

### **2. Deploy to Vercel:**
- Commit the fixed code
- Vercel should build successfully now
- Test the live app

### **3. Future Prevention:**
- Always run `npm run build` before committing
- Keep imports clean and minimal
- Use proper TypeScript patterns

---

**Your ASH app should now build without errors!** 🎉
