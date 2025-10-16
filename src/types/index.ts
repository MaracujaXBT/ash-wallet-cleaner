// Shared TypeScript interfaces for ASH

export interface TokenRow {
  address: string
  symbol: string
  name: string
  balance: number
  estHypeOut: number // estimated hype output
}

export interface TokenBalance {
  address: string
  symbol: string
  name: string
  balance: number
  decimals: number
  estHypeOut: number
}
