import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useAccount } from 'wagmi'
import { parseUnits, maxUint256, formatUnits } from 'viem'
import { Coins, Loader2, CheckCircle, AlertCircle, Info, ArrowRight, Zap, Lock } from 'lucide-react'
import {
  INFINITE_ABUNDANCE_ADDRESS, INFINITE_ABUNDANCE_ABI,
  USDT_ADDRESS, FBMX_ADDRESS, ERC20_ABI,
  MIN_FBMX_REQUIRED, ENTRY_FEE, MAX_RANK,
} from '../../config/contracts'

function jumpCost(targetLevel) {
  if (targetLevel <= 0) return 0n
  return ENTRY_FEE * ((1n << BigInt(targetLevel)) - 1n)
}

export default function DepositPanel({
  user,
  hasActivated,
  usdtBalance, usdtBalanceRaw,
  fbmxBalance, fbmxBalanceRaw,
  usdtAllowanceRaw,
  fbmxAllowanceRaw,
  onSuccess,
}) {
  const [tab, setTab] = useState('usdt')

  return (
    <div className="space-y-6">
      <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl w-full xs:w-fit">
        {[
          { id: 'usdt', label: 'Deposit USDT', color: '#26A17B' },
          { id: 'fbmx', label: 'Deposit FBMX', color: '#EAB308' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 xs:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === t.id
              ? 'bg-white/10 border border-white/20 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: t.color }} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'usdt'
        ? <USDTDeposit user={user} hasActivated={hasActivated} usdtBalanceRaw={usdtBalanceRaw} usdtBalance={usdtBalance} usdtAllowanceRaw={usdtAllowanceRaw} onSuccess={onSuccess} />
        : <FBMXDeposit fbmxBalance={fbmxBalance} fbmxBalanceRaw={fbmxBalanceRaw} fbmxAllowanceRaw={fbmxAllowanceRaw} onSuccess={onSuccess} />
      }
    </div>
  )
}

function USDTDeposit({ user, hasActivated, usdtBalanceRaw, usdtBalance, usdtAllowanceRaw, onSuccess }) {
  const canJump = hasActivated === false
  const [jumpMode, setJumpMode] = useState(false)
  const [jumpTarget, setJumpTarget] = useState(1)

  const seqAmount = user?.upgradeAmount ?? 0n
  const seqFmt = user?.upgradeAmountFmt ?? '—'
  const jumpAmount = jumpMode && canJump ? jumpCost(jumpTarget) : 0n
  const jumpFmt = jumpMode && canJump ? Number(formatUnits(jumpAmount, 18)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—'

  const upgradeAmount = jumpMode && canJump ? jumpAmount : seqAmount
  const upgradeFmt = jumpMode && canJump ? jumpFmt : seqFmt

  const hasBalance = usdtBalanceRaw >= upgradeAmount
  const hasAllowance = usdtAllowanceRaw >= upgradeAmount
  const needsApproval = !hasAllowance && upgradeAmount > 0n

  const [step, setStep] = useState('idle')
  const { writeContract, data: txHash, isPending, isError, error, reset } = useWriteContract()
  const { isLoading: isConfirming, isSuccess, isError: isReceiptError } = useWaitForTransactionReceipt({ hash: txHash })

  useEffect(() => {
    if (!isSuccess) return
    if (step === 'approving') {
      setStep('idle')
      onSuccess?.()
    } else if (step === 'depositing') {
      setStep('done')
      onSuccess?.()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isReceiptError) setStep('idle')
  }, [isReceiptError])

  useEffect(() => {
    if (step !== 'done') return
    const t = setTimeout(() => setStep('idle'), 4000)
    return () => clearTimeout(t)
  }, [step])

  const handleApprove = () => {
    setStep('approving')
    writeContract(
      { address: USDT_ADDRESS, abi: ERC20_ABI, functionName: 'approve', args: [INFINITE_ABUNDANCE_ADDRESS, maxUint256] },
      { onError: () => setStep('idle') }
    )
  }

  const handleDeposit = () => {
    const target = jumpMode && canJump ? jumpTarget : 0
    setStep('depositing')
    writeContract(
      { address: INFINITE_ABUNDANCE_ADDRESS, abi: INFINITE_ABUNDANCE_ABI, functionName: 'depositUSDT', args: [target] },
      { onError: () => setStep('idle') }
    )
  }

  const busy = isPending || isConfirming

  return (
    <div className="space-y-5">
      {canJump && (
        <div className="flex items-center gap-3 p-4 bg-yellow-600/5 border border-yellow-600/20 rounded-xl">
          <Zap size={16} className="text-yellow-500 flex-shrink-0" />
          <div className="flex-1 text-xs text-gray-400 leading-relaxed">
            <strong className="text-white">First activation:</strong> you can jump directly to any level in one transaction.
          </div>
          <button
            onClick={() => { setJumpMode((v) => !v); setStep('idle'); reset?.() }}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${jumpMode
              ? 'bg-yellow-600 text-white border-yellow-600'
              : 'bg-transparent border-yellow-600/40 text-yellow-500 hover:border-yellow-600'
              }`}
          >
            {jumpMode ? 'Jump On' : 'Jump Off'}
          </button>
        </div>
      )}

      {canJump && jumpMode && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">Target Level</span>
            <span className="text-sm font-mono font-bold text-yellow-500">Level {jumpTarget}</span>
          </div>
          <input
            type="range"
            min={1} max={MAX_RANK} step={1}
            value={jumpTarget}
            onChange={(e) => { setJumpTarget(Number(e.target.value)); setStep('idle'); reset?.() }}
            className="w-full accent-yellow-500"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Lvl 1 — 5 USDT</span>
            <span>Lvl {MAX_RANK} — {Number(formatUnits(jumpCost(MAX_RANK), 18)).toLocaleString()} USDT</span>
          </div>
        </div>
      )}

      {!jumpMode && (
        <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
          <Info size={16} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-gray-400 leading-relaxed">
            USDT deposit amount is determined by your current rank.{' '}
            The contract calculates <strong className="text-white">entryFee × 2^level</strong>.
            Your next deposit is <strong className="text-yellow-500">{seqFmt} USDT</strong>.
          </div>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">{jumpMode && canJump ? `Jump to Level ${jumpTarget}` : 'Required deposit'}</span>
          <span className="font-mono font-bold text-white">{upgradeFmt} USDT</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Your USDT balance</span>
          <span className={`font-mono font-semibold ${hasBalance ? 'text-teal-400' : 'text-red-400'}`}>
            {Number(usdtBalance).toFixed(4)} USDT
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Approval status</span>
          {hasAllowance
            ? <span className="text-teal-400 text-xs font-semibold flex items-center gap-1"><CheckCircle size={11} /> Approved</span>
            : <span className="text-amber-400 text-xs font-semibold">Needs approval</span>}
        </div>
      </div>

      {!hasBalance && upgradeAmount > 0n && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
          <AlertCircle size={12} />
          Insufficient USDT. You need {upgradeFmt} USDT in your wallet.
        </div>
      )}

      {isError && (
        <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
          <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
          {error?.shortMessage || error?.message || 'Transaction failed'}
        </div>
      )}

      {needsApproval ? (
        <div className="space-y-2">
          <button
            onClick={handleApprove}
            disabled={step !== 'idle' || !hasBalance}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-display font-bold disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {step === 'approving'
              ? isPending
                ? <><Lock size={15} className="animate-pulse" /> Waiting for wallet…</>
                : <><Loader2 size={15} className="animate-spin" /> Confirming approval…</>
              : <><CheckCircle size={16} /> Step 1 — Approve USDT</>}
          </button>
          <div className="flex items-center gap-2 opacity-40">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-400">then</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <button disabled className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm cursor-not-allowed">
            Step 2 — Deposit USDT
          </button>
        </div>
      ) : (
        <button
          onClick={handleDeposit}
          disabled={step !== 'idle' || !hasBalance || !hasAllowance}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-display font-bold text-base disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {step === 'depositing'
            ? isPending
              ? <><Lock size={15} className="animate-pulse" /> Waiting for wallet…</>
              : <><Loader2 size={15} className="animate-spin" /> Confirming on-chain…</>
            : step === 'done'
              ? <><CheckCircle size={16} className="text-teal-400" /> Deposit Confirmed!</>
              : jumpMode && canJump
                ? <><Zap size={16} /> Jump to Level {jumpTarget} — {upgradeFmt} USDT</>
                : <><Coins size={16} /> Deposit {upgradeFmt} USDT</>}
        </button>
      )}
    </div>
  )
}

function FBMXDeposit({ fbmxBalance, fbmxBalanceRaw, fbmxAllowanceRaw, onSuccess }) {
  const [amount, setAmount] = useState('')
  const [step, setStep] = useState('idle')

  const amountRaw = amount ? parseUnits(amount, 18) : 0n
  const hasBalance = fbmxBalanceRaw >= amountRaw
  const hasAllowance = fbmxAllowanceRaw >= amountRaw
  const needsApproval = !hasAllowance && amountRaw > 0n

  const { writeContract, data: txHash, isPending, isError, error, reset } = useWriteContract()
  const { isLoading: isConfirming, isSuccess, isError: isReceiptError } = useWaitForTransactionReceipt({ hash: txHash })

  useEffect(() => {
    if (!isSuccess) return
    if (step === 'approving') {
      setStep('idle')
      onSuccess?.()
    } else if (step === 'depositing') {
      setStep('done')
      onSuccess?.()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isReceiptError) setStep('idle')
  }, [isReceiptError])

  useEffect(() => {
    if (step !== 'done') return
    const t = setTimeout(() => setStep('idle'), 4000)
    return () => clearTimeout(t)
  }, [step])

  const handleApprove = () => {
    setStep('approving')
    writeContract(
      { address: FBMX_ADDRESS, abi: ERC20_ABI, functionName: 'approve', args: [INFINITE_ABUNDANCE_ADDRESS, maxUint256] },
      { onError: () => setStep('idle') }
    )
  }

  const handleDeposit = () => {
    setStep('depositing')
    writeContract(
      { address: INFINITE_ABUNDANCE_ADDRESS, abi: INFINITE_ABUNDANCE_ABI, functionName: 'depositFBMX', args: [amountRaw] },
      { onError: () => setStep('idle') }
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
        <Info size={16} className="text-yellow-500 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-gray-400 leading-relaxed">
          FBMX held in the contract acts as a <strong className="text-white">utility fee</strong>.
          Each collect or withdraw burns <strong className="text-yellow-500">0.05 FBMX</strong> from your in-contract balance.
          Minimum deposit: 5 FBMX.
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-400">Amount (FBMX)</label>
          <button className="text-xs text-yellow-500 hover:underline" onClick={() => setAmount(Number(fbmxBalance).toFixed(6))}>
            Max: {Number(fbmxBalance).toFixed(4)} FBMX
          </button>
        </div>
        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-yellow-600/50 focus-within:ring-2 focus-within:ring-yellow-600/10">
          <input
            type="number" min="0" value={amount}
            onChange={(e) => { setAmount(e.target.value); setStep('idle'); reset?.() }}
            placeholder="5.00"
            className="flex-1 px-4 py-3 bg-transparent text-white font-mono text-sm outline-none"
          />
          <span className="px-4 text-yellow-500 text-sm font-bold border-l border-white/10">FBMX</span>
        </div>
        {amount && !hasBalance && (
          <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
            <AlertCircle size={11} /> Insufficient FBMX balance
          </p>
        )}
      </div>

      {isError && (
        <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
          <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
          {error?.shortMessage || error?.message || 'Transaction failed'}
        </div>
      )}

      {needsApproval ? (
        <div className="space-y-2">
          <button
            onClick={handleApprove}
            disabled={step !== 'idle' || !hasBalance || !amount}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-display font-bold disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {step === 'approving'
              ? isPending
                ? <><Lock size={15} className="animate-pulse" /> Waiting for wallet…</>
                : <><Loader2 size={15} className="animate-spin" /> Confirming approval…</>
              : <><CheckCircle size={16} /> Step 1 — Approve FBMX</>}
          </button>
          <button disabled className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm cursor-not-allowed">
            Step 2 — Deposit FBMX
          </button>
        </div>
      ) : (
        <button
          onClick={handleDeposit}
          disabled={step !== 'idle' || !amount || !hasBalance || amountRaw <= 0n}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-display font-bold text-base disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {step === 'depositing'
            ? isPending
              ? <><Lock size={15} className="animate-pulse" /> Waiting for wallet…</>
              : <><Loader2 size={15} className="animate-spin" /> Confirming on-chain…</>
            : step === 'done'
              ? <><CheckCircle size={16} className="text-teal-400" /> Deposit Confirmed!</>
              : <><Coins size={16} /> Deposit {amount || '0'} FBMX</>}
        </button>
      )}
    </div>
  )
}
