import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatUnits } from 'viem'
import {
  Clock, Loader2, CheckCircle, TrendingDown, GitBranch,
  ArrowDownCircle, AlertCircle, Info, Zap
} from 'lucide-react'
import {
  INFINITE_ABUNDANCE_ADDRESS, INFINITE_ABUNDANCE_ABI, WITHDRAW_TIERS, MIN_FBMX_REQUIRED
} from '../../config/contracts'
import { useCountdown } from '../../hooks/useCountdown'

function CooldownBar({ label, endsAt, color = 'amber' }) {
  const { formatted, isActive } = useCountdown(endsAt)
  return (
    <div className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs ${isActive
      ? color === 'red'
        ? 'bg-red-500/10 border-red-500/20'
        : 'bg-amber-500/10 border-amber-500/20'
      : 'bg-teal-500/10 border-teal-500/20'
      }`}>
      <div className={`flex items-center gap-1.5 ${isActive ? (color === 'red' ? 'text-red-400' : 'text-amber-400') : 'text-teal-400'}`}>
        {isActive ? <Clock size={11} className="animate-pulse" /> : <CheckCircle size={11} />}
        <span>{label}</span>
      </div>
      <span className={`font-mono font-bold ${isActive ? (color === 'red' ? 'text-red-400' : 'text-amber-400') : 'text-teal-400'}`}>
        {isActive ? formatted : 'Ready'}
      </span>
    </div>
  )
}

function CollectCard({ icon: Icon, title, color, balance, balanceLabel, endsAt, globalEndsAt, txCooldownSecs = 60, functionName, fbmxInContract, onSuccess, note }) {
  const { isActive: cooldownActive } = useCountdown(endsAt)
  const { isActive: globalActive } = useCountdown(globalEndsAt)
  const disabled = cooldownActive || globalActive
  const hasFbmx = BigInt(Math.round(Number(fbmxInContract ?? 0) * 1e18)) >= MIN_FBMX_REQUIRED

  const { writeContract, data: txHash, isPending, isError, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash })
  const busy = isPending || isConfirming

  const handleAction = () => {
    writeContract(
      { address: INFINITE_ABUNDANCE_ADDRESS, abi: INFINITE_ABUNDANCE_ABI, functionName, args: [] },
      { onSuccess }
    )
  }

  const colorMap = {
    gold: { ring: 'ring-yellow-600/20', bg: 'bg-yellow-600/10', text: 'text-yellow-500', btn: 'bg-yellow-600 hover:bg-yellow-700 text-white' },
    green: { ring: 'ring-teal-600/20', bg: 'bg-teal-600/10', text: 'text-teal-400', btn: 'bg-teal-600 hover:bg-teal-700 text-white' },
  }
  const c = colorMap[color] ?? colorMap.gold

  return (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 transition-all ${!disabled ? `ring-1 ${c.ring}` : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center`}>
          <Icon size={18} />
        </div>
        <div>
          <h3 className="font-display font-bold text-white">{title}</h3>
          {note && <p className="text-gray-400 text-xs mt-0.5">{note}</p>}
        </div>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
        <div className="text-xs text-gray-400 mb-1">{balanceLabel}</div>
        <div className={`font-mono font-bold text-2xl ${c.text}`}>
          {Number(balance ?? 0).toFixed(4)}
          <span className="text-sm ml-1 text-gray-400 font-normal">USDT</span>
        </div>
      </div>

      <div className={`flex items-center gap-2 p-3 rounded-lg border text-xs ${hasFbmx
        ? 'bg-white/5 border-white/10 text-gray-400'
        : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
        <Zap size={11} className="flex-shrink-0" />
        <span>
          Requires <strong>0.05 FBMX</strong> in contract.
          {hasFbmx
            ? <> You have <span className="text-white font-mono"> {Number(fbmxInContract).toFixed(4)}</span> FBMX.</>
            : <> Deposit FBMX first.</>}
        </span>
      </div>

      <div className="space-y-2">
        <CooldownBar label="24h personal cooldown" endsAt={endsAt} color="amber" />
        <CooldownBar label={`${txCooldownSecs}s global lock`} endsAt={globalEndsAt} color="red" />
      </div>

      {isError && (
        <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
          <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
          {error?.shortMessage || error?.message || 'Transaction failed'}
        </div>
      )}

      <button
        onClick={handleAction}
        disabled={disabled || busy || Number(balance ?? 0) <= 0 || !hasFbmx}
        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all font-display font-bold
          disabled:opacity-40 disabled:cursor-not-allowed ${c.btn}`}
      >
        {busy
          ? <><Loader2 size={16} className="animate-spin" />{isConfirming ? 'Confirming…' : 'Processing…'}</>
          : isSuccess
            ? <><CheckCircle size={16} />Collected!</>
            : disabled
              ? <><Clock size={16} />Cooldown Active</>
              : !hasFbmx
                ? <><Zap size={16} />Deposit FBMX First</>
                : <><Icon size={16} />{title}</>
        }
      </button>
    </div>
  )
}

export function CollectPassivePanel({ user, passiveCooldownEnds, globalCooldownEnds, txCooldownSecs = 60, onSuccess }) {
  return (
    <CollectCard
      icon={TrendingDown}
      title="Collect Commission Rewards"
      color="gold"
      balance={user?.passiveReward}
      balanceLabel="Pending Commission Reward"
      endsAt={passiveCooldownEnds}
      globalEndsAt={globalCooldownEnds}
      txCooldownSecs={txCooldownSecs}
      functionName="collectPassiveRewards"
      fbmxInContract={user?.fbmxInContract}
      onSuccess={onSuccess}
      note="Rate: 1%–8% / day based on referral income ÷ active volume"
    />
  )
}

export function CollectBinaryPanel({ user, binaryCooldownEnds, globalCooldownEnds, txCooldownSecs = 60, onSuccess }) {
  const binaryReward = Math.min(
    Number(user?.leftVolume ?? 0),
    Number(user?.rightVolume ?? 0)
  )
  return (
    <CollectCard
      icon={GitBranch}
      title="Collect Sales Rewards"
      color="green"
      balance={binaryReward}
      balanceLabel="Claimable Sales (weaker side)"
      endsAt={binaryCooldownEnds}
      globalEndsAt={globalCooldownEnds}
      txCooldownSecs={txCooldownSecs}
      functionName="collectBinaryRewards"
      fbmxInContract={user?.fbmxInContract}
      onSuccess={onSuccess}
      note="Earn 10% of weaker side volume · 24h cooldown"
    />
  )
}

export function WithdrawPanel({ user, withdrawCooldownEnds, globalCooldownEnds, txCooldownSecs = 60, onSuccess }) {
  const userLevel = user?.level ?? 0
  const walletBal = Number(user?.walletBalance ?? 0)
  const hasFbmx = Number(user?.fbmxInContract ?? 0) >= 0.01
  const [selectedTier, setSelectedTier] = useState(null)

  const { isActive: cooldownActive } = useCountdown(withdrawCooldownEnds)
  const { isActive: globalActive } = useCountdown(globalCooldownEnds)
  const disabled = cooldownActive || globalActive

  const { writeContract, data: txHash, isPending, isError, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash })
  const busy = isPending || isConfirming

  const handleWithdraw = () => {
    if (!selectedTier) return
    writeContract(
      { address: INFINITE_ABUNDANCE_ADDRESS, abi: INFINITE_ABUNDANCE_ABI, functionName: 'withdrawBalance', args: [selectedTier.amount] },
      { onSuccess }
    )
  }

  const eligibleTiers = WITHDRAW_TIERS.filter((t) => userLevel >= t.minLevel)
  const tierAmount = selectedTier ? Number(formatUnits(selectedTier.amount, 18)) : 0

  return (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 transition-all ${!disabled ? 'ring-1 ring-blue-500/20' : ''}`}>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
          <ArrowDownCircle size={18} />
        </div>
        <div>
          <h3 className="font-display font-bold text-white">Withdraw Balance</h3>
          <p className="text-gray-400 text-xs mt-0.5">Select a tier · 24h cooldown · 0.05 FBMX fee</p>
        </div>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
        <div className="text-xs text-gray-400 mb-1">Available in Wallet</div>
        <div className="font-mono font-bold text-2xl text-blue-400">
          {walletBal.toFixed(4)}
          <span className="text-sm ml-1 text-gray-400 font-normal">USDT</span>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-gray-400 mb-3">Withdrawal Tier</div>
        {WITHDRAW_TIERS.length === 0 ? null : (
          <div className="grid grid-cols-3 xs:grid-cols-5 gap-2">
            {WITHDRAW_TIERS.map((tier) => {
              const unlocked = userLevel >= tier.minLevel
              const canAfford = walletBal >= Number(formatUnits(tier.amount, 18))
              const isSelected = selectedTier?.label === tier.label
              return (
                <button
                  key={tier.label}
                  onClick={() => unlocked && setSelectedTier(tier)}
                  disabled={!unlocked}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-blue-500/50 bg-blue-500/10 ring-1 ring-blue-500/30'
                      : unlocked
                      ? 'border-white/10 bg-white/5 hover:border-blue-500/30 hover:bg-white/10'
                      : 'border-white/10 bg-ink/50 opacity-30 cursor-not-allowed'
                  }`}
                >
                  <div className={`font-display font-bold text-sm sm:text-base ${isSelected ? 'text-blue-400' : unlocked ? 'text-white' : 'text-gray-400'}`}>
                    {tier.label}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">Lvl {tier.minLevel}+</div>
                  {unlocked && !canAfford && (
                    <div className="text-[9px] text-red-400 mt-0.5 leading-tight">Low bal</div>
                  )}
                </button>
              )
            })}
          </div>
        )}
        {eligibleTiers.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-4">
            No tiers unlocked yet. Activate Tier 1 to unlock $15 withdrawals.
          </p>
        )}
      </div>

      <div className={`flex items-center gap-2 p-3 rounded-lg border text-xs ${
        hasFbmx ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
      }`}>
        <Zap size={11} className="flex-shrink-0" />
        <span>
          Requires <strong>0.05 FBMX</strong> in contract.
          {hasFbmx
            ? <> You have <span className="text-white font-mono"> {Number(user?.fbmxInContract ?? 0).toFixed(4)}</span> FBMX.</>
            : <> Deposit FBMX first.</>}
        </span>
      </div>

      <div className="space-y-2">
        <CooldownBar label="24h withdraw cooldown" endsAt={withdrawCooldownEnds} color="amber" />
        <CooldownBar label={`${txCooldownSecs}s global lock`} endsAt={globalCooldownEnds} color="red" />
      </div>

      {isError && (
        <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
          <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
          {error?.shortMessage || error?.message || 'Transaction failed'}
        </div>
      )}

      <button
        onClick={handleWithdraw}
        disabled={disabled || busy || !selectedTier || tierAmount > walletBal || !hasFbmx}
        className="w-full py-4 rounded-xl flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700
                   text-white font-display font-bold text-base transition-colors
                   disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
      >
        {busy
          ? <><Loader2 size={16} className="animate-spin" />{isConfirming ? 'Confirming…' : 'Processing…'}</>
          : isSuccess
          ? <><CheckCircle size={16} />Withdrawn!</>
          : disabled
          ? <><Clock size={16} />Cooldown Active</>
          : selectedTier
          ? <><ArrowDownCircle size={16} />Withdraw {selectedTier.label}</>
          : <><ArrowDownCircle size={16} />Select Tier</>
        }
      </button>
    </div>
  )
}