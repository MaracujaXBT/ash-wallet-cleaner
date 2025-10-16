// Dev fee configuration
export const DEV_FEE_BPS = 30 // 0.3% = 30 basis points
export const DEV_FEE_WALLET = process.env.VITE_DEV_FEE_WALLET || '0xf2082112688b1bb19b8c8697ddae1ef68d26b1d1'

// Calculate dev fee from gross amount
export const calculateDevFee = (grossAmount: number): number => {
  return (grossAmount * DEV_FEE_BPS) / 10000
}

// Calculate net amount after dev fee
export const calculateNetAmount = (grossAmount: number): number => {
  return Math.max(grossAmount - calculateDevFee(grossAmount), 0)
}
