import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Wallet, ChevronDown } from 'lucide-react'

const shortAddr = (addr) => addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : ''

export default function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [walletOpen, setWalletOpen] = useState(false)

  return (
    <div className="flex items-center gap-3">
      {!isConnected ? (
        <div className="relative">
          <button
            onClick={() => setWalletOpen(!walletOpen)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1.5 font-semibold transition-colors"
          >
            <Wallet size={14} />
            Connect Wallet
            <ChevronDown size={14} className={`transition-transform ${walletOpen ? 'rotate-180' : ''}`} />
          </button>
          {walletOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white/5 border border-white/20 rounded-xl shadow-lg overflow-hidden z-50">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => { connect({ connector }); setWalletOpen(false) }}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-yellow-600/10 hover:text-yellow-500 transition-colors text-gray-300 border-b border-white/10 last:border-0"
                >
                  {connector.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => disconnect()}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:border-yellow-600/30 bg-white/5 hover:bg-white/10 transition-all text-sm"
        >
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="font-mono text-xs text-white">{shortAddr(address)}</span>
        </button>
      )}
    </div>
  )
}
