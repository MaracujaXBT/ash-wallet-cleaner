# Why "Unused" Errors Happen

## 🤔 **The Confusion:**

You're right to be confused! The types ARE being used, but TypeScript is being picky.

## 🔍 **What "Unused" Really Means:**

### **TypeScript's Logic:**
- **Direct usage**: `const x: TokenBalance = ...` ✅ (TypeScript sees this)
- **Return type**: `function(): TokenBalance[]` ❌ (TypeScript misses this)
- **Import only**: `import { TokenBalance }` ❌ (TypeScript thinks unused)

### **The Problem:**
```typescript
// TypeScript says this is "unused"
import { TokenBalance } from '../types'

// Even though it's used here:
function getTokens(): TokenBalance[] {
  return tokens // TypeScript doesn't see this as "using" the import
}
```

## ✅ **The Fix:**

### **Instead of importing:**
```typescript
import { TokenBalance } from '../types' // TypeScript says "unused"
```

### **Define locally:**
```typescript
interface TokenBalance {
  address: string
  symbol: string
  // ... etc
}
// TypeScript sees this as "used"
```

## 🎯 **Why This Happens:**

1. **TypeScript is very strict** - it wants to see explicit usage
2. **Build vs Development** - production build fails on any "unused" items
3. **Vercel uses production build** - so it fails

## 🚀 **Result:**
- **No more "unused" errors**
- **Types still work perfectly**
- **Build succeeds**

**The types ARE being used - TypeScript just can't see it!** 😅
