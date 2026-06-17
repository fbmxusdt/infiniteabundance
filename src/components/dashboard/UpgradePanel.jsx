import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Layers, Loader2, CheckCircle, AlertCircle, TrendingUp, Info, Zap } from 'lucide-react'
import { INFINITE_ABUNDANCE_ADDRESS, INFINITE_ABUNDANCE_ABI, MAX_RANK } from '../../config/contracts'
import { formatUnits } from 'viem'

const RANK_LABELS = [
  'Registered', 'Bronze Partner', 'Silver Partner', 'Gold Partner', 'Platinum Partner', 'Diamond Elite',
  'Master Distributor', 'Premium Distributor', 'Founder', 'Executive', 'Director', 'VP', 'President', 'Chairman', 'Founder Circle', 'Legend'
]

const RANK_COLORS = [
  '#D4A574', '#CD7F32', '#C0C0C0', '#F5A623', '#E5E4E2', '#00D4AA',
  '#3B82F6', '#A855F7', '#EC4899', '#F97316', '#EF4444', '#8B5CF6', '#06B6D4', '#F59E0B', '#F5A623', '#FFD700'
]

function inferJumpTargetLevel(walletBalanceFmt, max) {
  const ENTRY_FEE = 5
  const balance = Number(walletBalanceFmt)
  if (balance <= 0) return null
  for (let t = 1; t <= max; t++) {
    const cost = ENTRY_FEE * ((2 ** t) - 1)
    if (Math.abs(balance - cost) < 0.01) return t
  }
  return null
}

export default function UpgradePanel({ user, onSuccess }) {
  const currentLevel = user?.level ?? 0
  const walletBalance = Number(user?.walletBalance ?? 0)

  const isPendingJump = !user?.hasActivated && currentLevel === 0 && walletBalance > 0
  const jumpTargetLevel = isPendingJump ? inferJumpTargetLevel(user?.walletBalance, MAX_RANK) : null

  const nextLevel = currentLevel + 1
  const canUpgrade = currentLevel < MAX_RANK

  const upgradeFmt = user?.upgradeAmountFmt ?? '—'
  const hasBalance = walletBalance >= Number(upgradeFmt)

  const { writeContract, data: txHash, isPending, isError, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash })

  const handleUpgrade = () => {
    writeContract({ address: INFINITE_ABUNDANCE_ADDRESS, abi: INFINITE_ABUNDANCE_ABI, functionName: 'activateRank', args: [] })
  }

  const busy = isPending || isConfirming

  return (
    <div className="space-y-6">

      {isPendingJump && (
        <div className="flex items-start gap-3 p-4 bg-yellow-600/5 border border-yellow-600/30 rounded-2xl">
          <Zap size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-display font-bold text-yellow-500 text-sm">
              Jump Activation Pending
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              You deposited for a jump to{' '}
              <span className="text-white font-semibold">
                {jumpTargetLevel ? `Tier ${jumpTargetLevel} — ${RANK_LABELS[jumpTargetLevel]}` : 'an unknown tier'}
              </span>.
              Press <span className="text-yellow-500 font-semibold">Activate Jump</span> to complete all {jumpTargetLevel} tier-ups in one transaction.
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 p-4 sm:p-5 bg-white/5 border border-white/10 rounded-2xl">
        <div
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-display font-black text-2xl sm:text-3xl text-white flex-shrink-0 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${RANK_COLORS[currentLevel]}, ${RANK_COLORS[currentLevel]}88)` }}
        >
          {currentLevel}
        </div>

        {isPendingJump && jumpTargetLevel && (
          <>
            <div className="text-yellow-500 font-bold text-lg">→</div>
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-display font-black text-2xl sm:text-3xl text-white flex-shrink-0 shadow-lg ring-2 ring-yellow-500 animate-pulse"
              style={{ background: `linear-gradient(135deg, ${RANK_COLORS[jumpTargetLevel]}, ${RANK_COLORS[jumpTargetLevel]}88)` }}
            >
              {jumpTargetLevel}
            </div>
          </>
        )}

        <div className="flex-1 min-w-0">
          <div className="text-[11px] sm:text-xs text-gray-400 mb-0.5">
            {isPendingJump ? 'Jump Target' : 'Current Tier'}
          </div>
          <div className="font-display font-bold text-white text-base sm:text-xl truncate">
            {isPendingJump && jumpTargetLevel
              ? RANK_LABELS[jumpTargetLevel] ?? `Tier ${jumpTargetLevel}`
              : RANK_LABELS[currentLevel] ?? `Tier ${currentLevel}`}
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 sm:mt-1.5 text-[11px] sm:text-xs text-gray-400">
            <span className="text-yellow-500 font-semibold">1–8%/day</span>
            <span className="hidden xs:inline">·</span>
            <span className="hidden xs:inline">Bal: <span className="text-white font-mono">${walletBalance.toFixed(2)}</span></span>
            {isPendingJump && jumpTargetLevel && (
              <>
                <span className="hidden xs:inline">·</span>
                <span className="text-yellow-500 font-semibold hidden xs:inline">
                  Cost: ${(5 * ((2 ** jumpTargetLevel) - 1)).toFixed(0)} USDT
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
        <Info size={15} className="text-yellow-500 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-gray-400 leading-relaxed space-y-1">
          {isPendingJump ? (
            <>
              <p><strong className="text-white">Jump Activation</strong> runs {jumpTargetLevel} sequential tier-ups in one transaction.</p>
              <p><strong className="text-white">Commission rewards</strong> are distributed per-level, matching exactly what {jumpTargetLevel} normal upgrades would produce.</p>
              <p><strong className="text-white">No extra deposit needed</strong> — your wallet balance already covers the full cost.</p>
            </>
          ) : (
            <>
              <p><strong className="text-white">Commission Rate</strong> = your <em>referralIncome ÷ activeVolume</em> ratio (capped 1%–8% per day).</p>
              <p><strong className="text-white">Upgrade Cost</strong> = <code className="text-yellow-500">5 USDT × 2^tier</code> — deducted from your wallet balance.</p>
              <p><strong className="text-white">Capping</strong> increases by <code className="text-yellow-500">upgradeAmount × 3</code> per tier.</p>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-5 gap-1.5 sm:gap-2">
        {RANK_LABELS.slice(0, MAX_RANK + 1).map((name, i) => {
          const isCurrentLevel  = i === currentLevel
          const isBelowCurrent  = i < currentLevel
          const isJumpTarget    = isPendingJump && jumpTargetLevel && i === jumpTargetLevel
          const isJumpFill      = isPendingJump && jumpTargetLevel && i > 0 && i < jumpTargetLevel
          const isNextNormal    = !isPendingJump && i === nextLevel

          let borderClass = 'border-white/10 bg-white/5 opacity-25'
          if (isCurrentLevel)  borderClass = 'border-yellow-600/50 bg-yellow-600/10 ring-1 ring-yellow-600/20'
          else if (isBelowCurrent) borderClass = 'border-white/10 bg-white/5 opacity-50'
          else if (isJumpTarget)   borderClass = 'border-yellow-600/70 bg-yellow-600/20 ring-2 ring-yellow-600/40'
          else if (isJumpFill)     borderClass = 'border-yellow-600/30 bg-yellow-600/5'
          else if (isNextNormal)   borderClass = 'border-teal-600/30 bg-teal-600/5'

          return (
            <div key={i} className={`rounded-xl p-2 sm:p-3 text-center border transition-all ${borderClass}`}>
              <div
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full mx-auto mb-1.5 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white"
                style={{ background: RANK_COLORS[i] ?? '#64748B' }}
              >
                {i}
              </div>
              <div className="text-[9px] sm:text-[10px] text-white font-semibold leading-tight truncate">{name}</div>
              {isCurrentLevel && !isPendingJump && <div className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500 mx-auto animate-pulse" />}
              {isJumpTarget   && <Zap size={9} className="text-yellow-500 mx-auto mt-1" />}
              {isBelowCurrent && <CheckCircle size={9} className="text-teal-400 mx-auto mt-1" />}
              {isJumpFill     && <div className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500/50 mx-auto" />}
            </div>
          )
        })}
      </div>

      {canUpgrade ? (
        <div className="space-y-3">
          {isPendingJump && jumpTargetLevel ? (
            <div className="p-4 bg-white/5 border border-yellow-600/20 rounded-xl space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Activating tiers</span>
                <span className="font-semibold text-white">1 → {jumpTargetLevel} ({jumpTargetLevel} levels)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total cost (pre-deposited)</span>
                <span className="font-mono font-bold text-yellow-500">${(5 * ((2 ** jumpTargetLevel) - 1)).toFixed(0)} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Target tier</span>
                <span className="font-semibold text-white">{RANK_LABELS[jumpTargetLevel]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Wallet balance</span>
                <span className="font-mono font-semibold text-teal-400">${walletBalance.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Upgrade to</span>
                <span className="font-semibold text-white">{RANK_LABELS[nextLevel] ?? `Tier ${nextLevel}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cost (from wallet)</span>
                <span className="font-mono font-bold text-yellow-500">{upgradeFmt} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Available balance</span>
                <span className={`font-mono font-semibold ${hasBalance ? 'text-teal-400' : 'text-red-400'}`}>
                  ${walletBalance.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {!isPendingJump && !hasBalance && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
              <AlertCircle size={12} />
              Insufficient wallet balance. Deposit USDT first, then upgrade.
            </div>
          )}

          {isError && (
            <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
              <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
              {error?.shortMessage || error?.message || 'Transaction failed'}
            </div>
          )}

          <button
            onClick={handleUpgrade}
            disabled={busy || (!isPendingJump && !hasBalance)}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-display font-bold text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy ? (
              <><Loader2 size={16} className="animate-spin" />{isConfirming ? 'Confirming…' : 'Confirm in wallet…'}</>
            ) : isSuccess ? (
              <><CheckCircle size={16} />Tier Activated!</>
            ) : isPendingJump && jumpTargetLevel ? (
              <><Zap size={16} />Activate Jump → {RANK_LABELS[jumpTargetLevel]}</>
            ) : (
              <><Layers size={16} />Activate Tier → {RANK_LABELS[nextLevel]}</>
            )}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-5 bg-yellow-600/5 border border-yellow-600/20 rounded-2xl">
          <CheckCircle size={24} className="text-yellow-500 flex-shrink-0" />
          <div>
            <div className="font-display font-bold text-yellow-500">Maximum Tier Reached</div>
            <div className="text-gray-400 text-xs mt-1">You are at Tier {MAX_RANK} ({RANK_LABELS[MAX_RANK]}). Enjoying maximum rewards.</div>
          </div>
        </div>
      )}
    </div>
  )
}
