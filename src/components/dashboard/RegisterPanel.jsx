import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { useAccount } from 'wagmi'
import { isAddress, parseUnits } from 'viem'
import {
  Users, GitBranch, CheckCircle, Loader2, AlertCircle, ArrowRight,
  Copy, Check, ExternalLink, Link2, UserPlus, Share2, Zap,
} from 'lucide-react'
import { INFINITE_ABUNDANCE_ADDRESS, INFINITE_ABUNDANCE_ABI } from '../../config/contracts'
import { usePlacementPreview } from '../../hooks/useUserData'

const ENTRY_FEE = parseUnits('5', 18)
const MIN_BNB = parseUnits('0.0001', 18)

const ZERO = '0x0000000000000000000000000000000000000000'
const REFERRER_KEY = 'infinite_abundance_referrer'

function shortAddr(addr) {
  if (!addr || addr === ZERO) return 'None'
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

const PLACEMENT_OPTIONS = [
  { value: 2, label: 'Auto (Weakest Leg)', desc: 'System finds the best open spot for network balance' },
  { value: 0, label: 'Force Left', desc: 'Place at the deepest open left slot under referrer' },
  { value: 1, label: 'Force Right', desc: 'Place at the deepest open right slot under referrer' },
]

function ReferralCard({ address, user }) {
  const [copied, setCopied] = useState(false)

  const refLink = `${window.location.origin}/?ref=${address}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(refLink)
    } catch {
      const el = Object.assign(document.createElement('input'), { value: refLink })
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const directCount = user?.directReferralCount ?? 0
  const referralIncome = Number(user?.totalDirect ?? 0).toFixed(2)

  return (
    <div className="space-y-5">

      {/* Stats row */}
      <div className="flex gap-3">
        <div className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="text-xs text-gray-400 mb-1">Direct Referrals</div>
          <div className="font-display font-bold text-2xl text-yellow-500 truncate">{directCount}</div>
          <div className="text-xs text-gray-400 mt-1">active members</div>
        </div>
        <div className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="text-xs text-gray-400 mb-1">Referral Income</div>
          <div className="font-display font-bold text-2xl text-teal-400 truncate">${referralIncome}</div>
          <div className="text-xs text-gray-400 mt-1">USDT earned</div>
        </div>
      </div>

      {/* Link card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-yellow-600/10 text-yellow-500 flex items-center justify-center flex-shrink-0">
            <Link2 size={15} />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-sm">Your Referral Link</h3>
            <p className="text-gray-400 text-xs mt-0.5">
              Anyone who registers through this link becomes your direct referral.
            </p>
          </div>
        </div>

        {/* Link + copy */}
        <div className="flex flex-col xs:flex-row gap-2">
          <input
            readOnly
            value={refLink}
            onFocus={(e) => e.target.select()}
            className="flex-1 min-w-0 px-3 py-2.5 bg-white/10 border border-white/10 rounded-xl font-mono text-xs text-gray-400 outline-none cursor-text overflow-hidden text-ellipsis whitespace-nowrap"
          />
          <button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all flex-shrink-0 ${copied
              ? 'bg-teal-500/10 border border-teal-500/30 text-teal-400'
              : 'bg-yellow-600 hover:bg-yellow-700 text-white'
              }`}
          >
            {copied
              ? <><Check size={14} /> Copied!</>
              : <><Copy size={14} /> Copy</>}
          </button>
        </div>

        {/* Address row */}
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs pt-1 border-t border-white/10">
          <span className="text-gray-400">Linked to your address</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-white">{shortAddr(address)}</span>
            <a
              href={`https://bscscan.com/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition-all"
              title="View on BSCScan"
            >
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
          How referrals work
        </div>
        <div className="space-y-2.5">
          {[
            { icon: Share2, label: 'Share your referral link', color: 'text-yellow-500' },
            { icon: UserPlus, label: 'Friend registers using your link', color: 'text-blue-400' },
            { icon: Zap, label: 'They make their first purchase to activate', color: 'text-purple-400' },
            { icon: CheckCircle, label: 'You earn affiliate commission instantly', color: 'text-teal-400' },
          ].map(({ icon: Icon, label, color }, i) => (
            <div key={i} className="flex items-center gap-3 text-xs text-gray-400">
              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Icon size={11} className={color} />
              </div>
              {label}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default function RegisterPanel({ onSuccess, isRegistered = false, user, usdtBalanceRaw }) {
  const { address } = useAccount()
  const [searchParams] = useSearchParams()

  const { data: bnbData } = useBalance({ address })
  const bnbRaw = bnbData?.value ?? 0n
  const hasEnoughBnb = bnbRaw >= MIN_BNB

  const usdtRaw = usdtBalanceRaw ?? 0n
  const hasEnoughUsdt = usdtRaw >= ENTRY_FEE

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref && isAddress(ref)) {
      localStorage.setItem(REFERRER_KEY, ref)
      setReferrer(ref)
    }
  }, [searchParams])

  const [referrer, setReferrer] = useState(() => {
    try { return localStorage.getItem(REFERRER_KEY) || '' } catch { return '' }
  })
  const [group, setGroup] = useState(2)

  const validReferrer = referrer.trim() && isAddress(referrer.trim())
  const isSelf = validReferrer && referrer.trim().toLowerCase() === address?.toLowerCase()

  const { placement } = usePlacementPreview(validReferrer && !isSelf ? referrer.trim() : undefined, group)
  const sponsorFound = !!placement
  const placedAt = placement?.[0]
  const placedSide = placement?.[1] ? 'Right' : 'Left'

  const { writeContract, data: txHash, isPending, isError, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash })

  const canRegister = validReferrer && !isSelf && sponsorFound && hasEnoughUsdt && hasEnoughBnb

  const handleRegister = () => {
    if (!canRegister) return
    writeContract({
      address: INFINITE_ABUNDANCE_ADDRESS,
      abi: INFINITE_ABUNDANCE_ABI,
      functionName: 'register',
      args: [referrer.trim(), group],
    })
  }

  if (isRegistered) {
    return <ReferralCard address={address} user={user} />
  }

  if (isSuccess) {
    return (
      <div className="text-center py-10 max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-teal-400" />
        </div>
        <h3 className="font-display font-bold text-xl text-white mb-2">Registered!</h3>
        <p className="text-gray-400 text-sm mb-6">
          You are now part of the Infinite Abundance network. Make your first purchase to activate rewards.
        </p>
        <button onClick={onSuccess} className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold">
          Continue to Purchase <ArrowRight size={14} className="inline ml-1" />
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-lg">

      {/* Requirements checklist */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Requirements
        </div>
        <RequirementRow
          ok={hasEnoughUsdt}
          label="Minimum 5 USDT in wallet"
          detail={`Your balance: ${(Number(usdtRaw) / 1e18).toFixed(2)} USDT`}
        />
        <RequirementRow
          ok={hasEnoughBnb}
          label="BNB for gas fee"
          detail={`Your balance: ${(Number(bnbRaw) / 1e18).toFixed(4)} BNB`}
        />
        <RequirementRow
          ok={validReferrer && !isSelf && sponsorFound}
          pending={validReferrer && !isSelf && !sponsorFound}
          label="Valid sponsor address"
          detail={
            !validReferrer ? 'Enter a sponsor address below' :
              isSelf ? 'Cannot use your own address' :
                !sponsorFound ? 'Address is not a registered member' :
                  'Sponsor confirmed on-chain'
          }
        />
      </div>

      {/* Referrer address */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Referrer / Sponsor Address <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={referrer}
          onChange={(e) => setReferrer(e.target.value.trim())}
          placeholder="0x…"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm
                     focus:border-yellow-600/50 focus:ring-2 focus:ring-yellow-600/10 outline-none transition-all"
        />
        {referrer && !isAddress(referrer.trim()) && (
          <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
            <AlertCircle size={11} /> Invalid address format
          </p>
        )}
        {isSelf && (
          <p className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
            <AlertCircle size={11} /> Self-referral is not allowed
          </p>
        )}
        {validReferrer && !isSelf && !sponsorFound && (
          <p className="mt-1.5 text-gray-400 text-xs flex items-center gap-1">
            <Loader2 size={11} className="animate-spin" /> Checking sponsor on-chain…
          </p>
        )}
        {validReferrer && !isSelf && sponsorFound && (
          <p className="mt-1.5 text-teal-400 text-xs flex items-center gap-1">
            <CheckCircle size={11} /> Sponsor confirmed
          </p>
        )}
      </div>

      {/* Placement group */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${sponsorFound ? 'text-gray-400' : 'text-gray-400/40'}`}>
          Binary Placement
        </label>
        <div className="space-y-2">
          {PLACEMENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => sponsorFound && setGroup(opt.value)}
              disabled={!sponsorFound}
              className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl border transition-all text-left disabled:opacity-40 disabled:cursor-not-allowed ${group === opt.value
                ? 'border-yellow-600/40 bg-yellow-600/8 ring-1 ring-yellow-600/20'
                : 'border-white/10 bg-white/5 hover:border-yellow-600/20 hover:bg-white/10'
                }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${group === opt.value ? 'border-yellow-500' : 'border-white/10'
                }`}>
                {group === opt.value && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
              </div>
              <div>
                <div className={`text-sm font-semibold ${group === opt.value ? 'text-yellow-500' : 'text-white'}`}>
                  {opt.label}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Placement preview */}
      {sponsorFound && placement && (
        <div className="bg-white/5 border border-yellow-600/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-yellow-500">
            <GitBranch size={14} />
            Placement Preview
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Placed Under</div>
              <div className="font-mono text-xs text-white">{shortAddr(placedAt)}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Position</div>
              <div className={`text-sm font-bold ${placedSide === 'Left' ? 'text-yellow-500' : 'text-teal-400'}`}>
                {placedSide} Child
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
          <AlertCircle size={13} className="flex-shrink-0 mt-0.5" />
          <span>{error?.shortMessage || error?.message || 'Transaction failed'}</span>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleRegister}
        disabled={!canRegister || isPending || isConfirming}
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
      >
        {isPending || isConfirming ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {isConfirming ? 'Confirming on-chain…' : 'Confirm in wallet…'}
          </>
        ) : (
          <>
            <Users size={16} />
            Register Account
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Registration requires 5 USDT in your wallet and BNB for gas. Rewards activate after your first purchase.
      </p>
    </div>
  )
}

function RequirementRow({ ok, pending = false, label, detail }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">
        {ok ? <CheckCircle size={14} className="text-teal-400" /> :
          pending ? <Loader2 size={14} className="text-yellow-500 animate-spin" /> :
            <AlertCircle size={14} className="text-red-400/70" />}
      </div>
      <div>
        <div className={`text-xs font-semibold ${ok ? 'text-white' : 'text-gray-400'}`}>{label}</div>
        <div className="text-[11px] text-gray-400 mt-0.5">{detail}</div>
      </div>
    </div>
  )
}
