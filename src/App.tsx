import React, { useMemo, useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit'
import { config } from './config/rainbow'
import { calculateDevFee, calculateNetAmount } from './config/fees'
import '@rainbow-me/rainbowkit/styles.css'
import './App.css'

interface TokenRow {
  address: string
  symbol: string
  name: string
  balance: number // token units
  estHypeOut: number // estimated hype output
}

const queryClient = new QueryClient()

function AppContent() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  
  const [tokens, setTokens] = useState<TokenRow[]>([
    { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT', name: 'Tether USD', balance: 0.005, estHypeOut: 0.0048 },
    { address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', symbol: 'WETH', name: 'Wrapped Ether', balance: 0.002, estHypeOut: 0.0019 },
    { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI', name: 'Dai Stablecoin', balance: 0.008, estHypeOut: 0.0076 },
  ])
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [ack, setAck] = useState(false)

  const selectedTokens = useMemo(() => tokens.filter(t => selected[t.address]), [tokens, selected])
  const grossHype = useMemo(() => selectedTokens.reduce((s, t) => s + t.estHypeOut, 0), [selectedTokens])
  const feeHype = useMemo(() => calculateDevFee(grossHype), [grossHype])
  const netHype = useMemo(() => calculateNetAmount(grossHype), [grossHype])

  const allSelected = tokens.length > 0 && selectedTokens.length === tokens.length

  const toggleAll = (checked: boolean) => {
    const next: Record<string, boolean> = {}
    tokens.forEach(t => { next[t.address] = checked })
    setSelected(next)
  }

  const toggleOne = (addr: string, checked: boolean) => {
    setSelected(prev => ({ ...prev, [addr]: checked }))
  }

  // RainbowKit handles connection automatically

  const handleClean = () => {
    if (selectedTokens.length === 0) return
    setShowConfirm(true)
    setAck(false)
  }

  const handleConfirm = async () => {
    if (!ack) return
    setBusy(true)
    // simulate
    await new Promise(r => setTimeout(r, 1200))
    setBusy(false)
    setShowConfirm(false)
    setSelected({})
    setAck(false)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>ASH</h1>
        <p>Burn your dust. Worship the HYPE.</p>
        <p className="text-secondary" style={{ marginTop: '0.25rem' }}>A simple HyperEVM cleaner</p>
      </header>
      <main className="main-content">
        <div className="card">
          <h2>Connect Wallet</h2>
          <p className="mb-3 text-secondary">
            Connect your wallet to start cleaning dust tokens and converting them to HYPE.
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
          {isConnected && (
            <div className="mt-4 text-center">
              <span className="status connected">Connected to HyperEVM Testnet</span>
            </div>
          )}
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2>Dust Tokens ({tokens.length})</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox" checked={allSelected} onChange={(e) => toggleAll(e.target.checked)} />
              <span>Select All</span>
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Token</th>
                  <th>Balance</th>
                  <th>Est. HYPE</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map(t => (
                  <tr key={t.address}>
                    <td>
                      <input type="checkbox" className="checkbox" checked={!!selected[t.address]} onChange={(e) => toggleOne(t.address, e.target.checked)} />
                    </td>
                    <td>
                      <div>
                        <div className="font-medium">{t.symbol}</div>
                        <div className="text-sm text-secondary">{t.name}</div>
                        <div className="text-xs text-secondary font-mono">{t.address.slice(0, 6)}...{t.address.slice(-4)}</div>
                      </div>
                    </td>
                    <td>
                      <div className="font-mono">{t.balance.toFixed(6)}</div>
                    </td>
                    <td>
                      <div className="font-mono text-accent-color">{t.estHypeOut.toFixed(6)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-secondary">Selected Tokens</div>
                <div className="font-medium">{selectedTokens.length} of {tokens.length}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-secondary">Estimated Total HYPE (gross)</div>
                <div className="font-medium text-accent-color">{grossHype.toFixed(6)}</div>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn" onClick={handleClean} disabled={selectedTokens.length === 0 || !isConnected}>
                {busy ? 'Processing...' : 'Clean Selected → HYPE'}
              </button>
            </div>
          </div>
        </div>

        {showConfirm && (
          <div className="card" style={{ borderColor: '#33FFD6' }}>
            <h2>Confirm Conversion</h2>
            <div className="mt-2">
              <div className="text-sm text-secondary">You will convert the following tokens:</div>
              <div className="mt-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Token</th>
                      <th>Amount Lost</th>
                      <th>Est. HYPE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTokens.map(t => (
                      <tr key={`confirm-${t.address}`}>
                        <td>{t.symbol}</td>
                        <td className="font-mono">{t.balance.toFixed(6)}</td>
                        <td className="font-mono text-accent-color">{t.estHypeOut.toFixed(6)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="font-medium">Gross</td>
                      <td className="font-mono text-secondary">—</td>
                      <td className="font-mono text-accent-color">{grossHype.toFixed(6)} HYPE</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Dev Fee (0.3%)</td>
                      <td className="font-mono text-secondary">—</td>
                      <td className="font-mono text-warning-color">-{feeHype.toFixed(6)} HYPE</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Net to You</td>
                      <td className="font-mono text-secondary">—</td>
                      <td className="font-mono text-accent-color">{netHype.toFixed(6)} HYPE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
                  <span className="text-sm text-secondary">I understand slippage and the 0.3% dev fee.</span>
                </label>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <button className="btn" onClick={handleConfirm} disabled={busy || !ack}>{busy ? 'Confirming...' : 'Confirm'}</button>
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)} disabled={busy}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AppContent />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
