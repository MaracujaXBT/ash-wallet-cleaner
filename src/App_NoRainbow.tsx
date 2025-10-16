import { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config/rainbow'
import { calculateDevFee, calculateNetAmount } from './config/fees'
import { useRealTokenBalances } from './hooks/useRealTokenBalances'
import { useHyperswapV3 } from './hooks/useHyperswapV3'
import { HYPEREVM_CONFIG } from './config/hyperevm'
import './App.css'

const queryClient = new QueryClient()

function AppContent() {
  const { isConnected, address } = useAccount()
  const { tokens, isLoading } = useRealTokenBalances()
  const { swapTokens, isPending } = useHyperswapV3()
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [ack, setAck] = useState(false)
  const [swapProgress, setSwapProgress] = useState('')

  const selectedTokens = useMemo(() => {
    return tokens.filter(t => selected[t.address])
  }, [tokens, selected])

  const grossHype = useMemo(() => {
    return selectedTokens.reduce((sum, t) => sum + t.estHypeOut, 0)
  }, [selectedTokens])

  const feeHype = useMemo(() => {
    return calculateDevFee(grossHype)
  }, [grossHype])

  const netHype = useMemo(() => {
    return calculateNetAmount(grossHype)
  }, [grossHype])

  const allSelected = useMemo(() => {
    return tokens.length > 0 && selectedTokens.length === tokens.length
  }, [tokens.length, selectedTokens.length])

  const toggleAll = (checked: boolean) => {
    const newSelected: Record<string, boolean> = {}
    if (checked) {
      tokens.forEach(t => { newSelected[t.address] = true })
    }
    setSelected(newSelected)
  }

  const toggleOne = (addr: string, checked: boolean) => {
    setSelected(prev => ({ ...prev, [addr]: checked }))
  }

  const handleClean = () => {
    if (selectedTokens.length === 0) return
    setShowConfirm(true)
    setAck(false)
  }

  const handleConfirmClean = async () => {
    if (!ack) return
    setBusy(true)
    setSwapProgress('Starting swap process...')

    try {
      // Process each selected token
      for (let i = 0; i < selectedTokens.length; i++) {
        const token = selectedTokens[i]
        setSwapProgress(`Swapping ${token.symbol} (${i + 1}/${selectedTokens.length})...`)
        
        // Swap token to HYPE using Hyperswap
        await swapTokens(
          token.address,
          HYPEREVM_CONFIG.contracts.HYPE,
          token.balance.toString(),
          (step) => setSwapProgress(`Swapping ${token.symbol}: ${step}`)
        )
      }

      setSwapProgress('All swaps completed!')
      setShowConfirm(false)
      setSelected({})
      setAck(false)
    } catch (error) {
      console.error('Swap failed:', error)
      setSwapProgress(`Swap failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setBusy(false)
    }
  }

  const handleCancelClean = () => {
    setShowConfirm(false)
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
          {isConnected ? (
            <div className="text-center">
              <div className="status connected">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</div>
              <div className="text-sm text-secondary mt-2">HyperEVM Testnet</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-secondary">Please connect your wallet using your browser extension</div>
            </div>
          )}
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2>Dust Tokens ({tokens.length})</h2>
            {tokens.length > 0 && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox" checked={allSelected} onChange={(e) => toggleAll(e.target.checked)} />
                <span>Select All</span>
              </label>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-secondary">Loading your tokens...</div>
            </div>
          ) : tokens.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-secondary">No dust tokens found in your wallet</div>
              <div className="text-sm text-secondary mt-2">Make sure you're connected to HyperEVM Testnet</div>
            </div>
          ) : (
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
          )}

          {selectedTokens.length > 0 && (
            <div className="mt-4 flex justify-center">
              <button 
                className="btn" 
                onClick={handleClean}
                disabled={busy}
              >
                {busy ? 'Processing...' : `Clean ${selectedTokens.length} Token${selectedTokens.length > 1 ? 's' : ''}`}
              </button>
            </div>
          )}
        </div>

        {showConfirm && (
          <div className="card">
            <h2>Confirm Clean</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Gross HYPE:</span>
                <span className="font-mono">{grossHype.toFixed(6)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Dev Fee (0.3%):</span>
                <span className="font-mono">-{feeHype.toFixed(6)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Net HYPE:</span>
                <span className="font-mono text-accent-color">{netHype.toFixed(6)}</span>
              </div>
              <div className="text-sm text-secondary">
                You will receive {netHype.toFixed(6)} HYPE after fees
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ack}
                  onChange={(e) => setAck(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">I acknowledge slippage and fees</span>
              </label>
              {swapProgress && (
                <div className="text-sm text-secondary bg-gray-100 p-3 rounded">
                  {swapProgress}
                </div>
              )}
              <div className="flex gap-2">
                <button 
                  className="btn flex-1" 
                  onClick={handleConfirmClean}
                  disabled={!ack || busy || isPending}
                >
                  {busy ? 'Processing...' : 'Confirm Clean'}
                </button>
                <button 
                  className="btn btn-secondary flex-1" 
                  onClick={handleCancelClean}
                  disabled={busy}
                >
                  Cancel
                </button>
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
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
