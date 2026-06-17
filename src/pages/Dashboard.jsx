import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAccount, useSwitchChain, useConnect, useReadContract } from 'wagmi'
import {
  Wallet, LayoutDashboard, UserPlus, Coins, Layers, TrendingDown,
  GitBranch, ArrowDownCircle, Network, ChevronDown, RefreshCw,
  AlertTriangle, Users, BarChart3, Zap, Clock, TrendingUp, Construction, BadgeDollarSign, History,
} from 'lucide-react'
import { BSC_CHAIN_ID } from '../config/wagmi'
import { INFINITE_ABUNDANCE_ADDRESS_OLD, INFINITE_ABUNDANCE_ABI } from '../config/contracts'
import { useUserData } from '../hooks/useUserData'
import { useCountdown } from '../hooks/useCountdown'
import RegisterPanel from '../components/dashboard/RegisterPanel'
import DepositPanel from '../components/dashboard/DepositPanel'
import UpgradePanel from '../components/dashboard/UpgradePanel'
import { CollectPassivePanel, CollectBinaryPanel, WithdrawPanel } from '../components/dashboard/CollectWithdrawPanels'

const ZERO = '0x0000000000000000000000000000000000000000'

const RANK_COLORS = [
  '#D4A574', '#A78C5D', '#8A7D66', '#C9B08C', '#D9A876', '#8FA88A',
  '#7FB59F', '#6FA8B4', '#5FA8C4', '#4FA8D4', '#6B8AC9', '#7B6BC9', '#8B4CC9', '#9B2CC9', '#A70CC9', '#B700C9'
]
const RANK_LABELS = [
  'Registered', 'Bronze Partner', 'Silver Partner', 'Gold Partner', 'Platinum Partner', 'Diamond Elite',
  'Master Distributor', 'Premium Distributor', 'Founder', 'Executive', 'Director', 'VP', 'President', 'Chairman', 'Founder Circle', 'Legend'
]

export const ALL_TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, requiresReg: false },
  { id: 'register', label: 'Join', labelIfReg: 'My Network', icon: UserPlus, requiresReg: false },
  { id: 'deposit', label: 'Purchase', icon: Coins, requiresReg: true },
  { id: 'upgrade', label: 'Upgrade Tier', icon: Layers, requiresReg: true },
  { id: 'passive', label: 'Commissions', icon: TrendingDown, requiresReg: true },
  { id: 'binary', label: 'Sales Volume', icon: GitBranch, requiresReg: true },
  { id: 'withdraw', label: 'Withdraw', icon: ArrowDownCircle, requiresReg: true },
  { id: 'tree',    label: 'Network Tree', icon: Users,   requiresReg: true },
  { id: 'history', label: 'History',   icon: History, requiresReg: true },
]

function StatCard({ label, value, sub, icon: Icon, color = 'gold', pulse }) {
  const colorClasses = {
    gold: 'bg-yellow-600/10 text-yellow-500',
    teal: 'bg-teal-600/10 text-teal-400',
    blue: 'bg-blue-600/10 text-blue-400',
    red: 'bg-red-600/10 text-red-400',
    purple: 'bg-purple-600/10 text-purple-400',
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-5 transition-all hover:bg-white/10">
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center ${colorClasses[color] || colorClasses.gold}`}>
          <Icon size={15} />
        </div>
        {pulse && <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse mt-1" />}
      </div>
      <div className="text-sm sm:text-lg font-mono font-bold text-white mb-0.5 truncate">{value}</div>
      <div className="text-[11px] sm:text-xs text-gray-400 leading-tight">{label}</div>
      {sub && <div className="text-[10px] sm:text-[11px] text-yellow-500/80 mt-1 truncate">{sub}</div>}
    </div>
  )
}

function LiveCooldownRow({ label, endsAt, color }) {
  const { formatted, isActive } = useCountdown(endsAt)
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-xs font-mono font-bold ${isActive ? (color === 'red' ? 'text-red-400' : 'text-amber-400') : 'text-teal-400'}`}>
        {isActive ? formatted : 'Ready ✓'}
      </span>
    </div>
  )
}

function MigrationNotice() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mx-auto mb-6">
          <Construction size={32} className="text-yellow-400" />
        </div>
        <h2 className="font-display font-bold text-2xl text-white mb-3">Dashboard Maintenance</h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          Updating user interface to interact with the smart contract.
        </p>
        <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-4 mb-6 text-left space-y-2">
          <div className="text-xs text-gray-400">Please try again later.</div>
        </div>
      </div>
    </div>
  )
}

function ConnectPrompt() {
  const { connect, connectors } = useConnect()
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-2xl bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Wallet size={32} className="text-yellow-500" />
        </div>
        <h2 className="font-display font-bold text-2xl text-white mb-3">Connect Your Wallet</h2>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Connect a BSC-compatible wallet to access the Infinite Abundance dashboard and manage your account.
        </p>
        <div className="relative inline-block">
          <button onClick={() => setOpen(!open)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3.5 rounded-xl flex items-center gap-2 mx-auto font-semibold transition-colors">
            <Wallet size={16} />Connect Wallet
            <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white/5 border border-white/20 rounded-xl overflow-hidden shadow-lg z-10">
              {connectors.map((c) => (
                <button key={c.uid} onClick={() => { connect({ connector: c }); setOpen(false) }}
                  className="w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-left border-b border-white/10 last:border-0">
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function WrongNetworkBanner() {
  const { switchChain } = useSwitchChain()
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} className="text-red-400" />
        </div>
        <h2 className="font-display font-bold text-2xl text-white mb-3">Wrong Network</h2>
        <p className="text-gray-400 text-sm mb-8">Infinite Abundance is deployed on Binance Smart Chain. Switch to continue.</p>
        <button onClick={() => switchChain({ chainId: BSC_CHAIN_ID })}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3.5 rounded-xl flex items-center gap-2 mx-auto font-semibold transition-colors">
          <Network size={16} />Switch to BSC
        </button>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { address, isConnected, chain } = useAccount()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'
  const setActiveTab = (id) => setSearchParams({ tab: id }, { replace: true })

  const { data: isOldUser } = useReadContract({
    address: INFINITE_ABUNDANCE_ADDRESS_OLD,
    abi: INFINITE_ABUNDANCE_ABI,
    functionName: 'isUser',
    args: [address],
    query: { enabled: !!address && isConnected },
  })

  const {
    user, isLoading, refetch, isRegistered,
    passivePercentage, referralIncomeRaw,
    usdtBalance, fbmxBalance,
    usdtBalanceRaw, fbmxBalanceRaw,
    usdtAllowanceRaw, fbmxAllowanceRaw,
    isPassiveCooldown, passiveCooldownEnds,
    isBinaryCooldown, binaryCooldownEnds,
    isWithdrawCooldown, withdrawCooldownEnds,
    isGlobalCooldown, globalCooldownEnds,
    txCooldownSecs,
    stats,
  } = useUserData()

  const wrongNetwork = isConnected && chain?.id !== BSC_CHAIN_ID

  useEffect(() => {
    if (user && !isRegistered && activeTab === 'overview') setActiveTab('register')
  }, [isRegistered])

  if (!isConnected) return <ConnectPrompt />
  if (wrongNetwork) return <WrongNetworkBanner />
  if (isOldUser && !isRegistered) return <MigrationNotice />

  const tabs = ALL_TABS.filter((t) => {
    if (t.requiresReg && !isRegistered) return false
    return true
  })

  return (
    <div className="pt-16 lg:pt-16 min-h-screen bg-gradient-to-b from-ink to-ink/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-8">
          <div>
            <h1 className="font-display font-black text-3xl text-white">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1 font-mono">
              {address?.slice(0, 8)}…{address?.slice(-6)}
              {isRegistered && (
                <span className="ml-3 px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-[11px] border border-teal-500/20 font-sans">
                  ✓ Registered
                </span>
              )}
            </p>
          </div>
          <button onClick={refetch}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-yellow-600/30 bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-400 hover:text-white">
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            Refresh Data
          </button>
        </div>

        {/* Stat cards (only when registered) */}
        {isRegistered && user && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Account Balance" value={`$${Number(user.walletBalance).toFixed(2)}`}
              sub={`For purchases & withdrawal`} icon={Coins} color="gold" />
            <StatCard label="Commission Rewards" value={`$${Number(user.passiveReward).toFixed(2)}`}
              sub={`Active Volume: $${Number(user.activeEquity).toFixed(2)}`} icon={TrendingDown} color="gold"
              pulse={!isPassiveCooldown} />
            <StatCard label="Sales Volume" value={`$${Math.min(Number(user.leftVolume), Number(user.rightVolume)).toFixed(2)}`}
              sub={`L:$${Number(user.leftVolume).toFixed(2)} R:$${Number(user.rightVolume).toFixed(2)}`}
              icon={GitBranch} color="teal" pulse={!isBinaryCooldown} />
            <StatCard label="Network Tier" value={`${RANK_LABELS[user.level] ?? `Tier ${user.level}`}`}
              sub={passivePercentage != null ? `${passivePercentage.toFixed(2)}% commission/DAY` : 'N/A'} icon={Zap} color="purple" />
          </div>
        )}

        {/* Layout */}
        <div className="grid lg:grid-cols-4 gap-6">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Nav — hidden on mobile; Navbar submenu handles those */}
            <div className="hidden lg:block bg-white/5 border border-white/10 rounded-2xl p-2 space-y-1">
              {tabs.map(({ id, label, labelIfReg, icon: Icon }) => {
                const hasCooldown =
                  (id === 'passive' && isPassiveCooldown) ||
                  (id === 'binary' && isBinaryCooldown) ||
                  (id === 'withdraw' && isWithdrawCooldown)
                const displayLabel = isRegistered && labelIfReg ? labelIfReg : label
                return (
                  <button key={id} onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${activeTab === id
                      ? 'bg-yellow-600/10 text-yellow-500 border border-yellow-600/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}>
                    <Icon size={15} />
                    <span className="flex-1">{displayLabel}</span>
                    {hasCooldown && <Clock size={11} className="text-amber-400 animate-pulse" />}
                  </button>
                )
              })}
            </div>

            {/* Token balances */}
            <div className="hidden lg:block bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Wallet Balances</div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">USDT</span>
                <span className="font-mono text-white">{Number(usdtBalance).toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">FBMX</span>
                <span className="font-mono text-yellow-500">{Number(fbmxBalance).toFixed(4)}</span>
              </div>
              {user && (
                <>
                  <div className="border-t border-white/10 pt-2 flex justify-between text-xs">
                    <span className="text-gray-400">FBMX (contract)</span>
                    <span className="font-mono text-yellow-500">{Number(user.fbmxInContract).toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Total Income</span>
                    <span className="font-mono text-white">${Number(user.totalIncome).toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>

            {/* Cooldowns */}
            {isRegistered && (
              <div className="hidden lg:block bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock size={11} /> Cooldowns
                </div>
                <LiveCooldownRow label="Commissions (24h)" endsAt={passiveCooldownEnds} color="amber" />
                <LiveCooldownRow label="Sales Volume (24h)" endsAt={binaryCooldownEnds} color="amber" />
                <LiveCooldownRow label="Withdraw (24h)" endsAt={withdrawCooldownEnds} color="amber" />
                <LiveCooldownRow label={`Global lock (${txCooldownSecs}s)`} endsAt={globalCooldownEnds} color="red" />
              </div>
            )}
          </div>

          {/* Content area */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 min-h-[420px]">

              {/* OVERVIEW ─────────────────────────────────────────────────── */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h2 className="font-display font-bold text-xl text-white">Account Overview</h2>
                  {!isRegistered ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-2xl bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center mx-auto mb-4">
                        <UserPlus size={24} className="text-yellow-500" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-white mb-2">Not Yet Registered</h3>
                      <p className="text-gray-400 text-sm mb-5">Join Infinite Abundance to start earning affiliate commissions and build your network.</p>
                      <button onClick={() => setActiveTab('register')} className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                        Register Now
                      </button>
                    </div>
                  ) : user && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Tier card */}
                      <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 flex flex-row items-center gap-3 sm:gap-5">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-display font-black text-2xl sm:text-3xl text-white flex-shrink-0 shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${RANK_COLORS[user.level]}, ${RANK_COLORS[user.level]}88)` }}>
                          {user.level}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-400 text-[11px] sm:text-xs mb-0.5">Network Tier</div>
                          <div className="font-display font-bold text-white text-base sm:text-xl truncate">{RANK_LABELS[user.level] ?? `Tier ${user.level}`}</div>
                          <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-2 flex-wrap text-[11px] sm:text-xs">
                            <span className="text-yellow-500">
                              {passivePercentage != null ? `${passivePercentage.toFixed(2)}% / DAY` : '…% / DAY'}
                            </span>
                            <span className="text-gray-400 hidden xs:inline">·</span>
                            <span className="text-gray-400 hidden xs:inline">Active Volume: <span className="text-white">${Number(user.activeEquity).toFixed(2)}</span></span>
                          </div>
                        </div>
                        <button onClick={() => setActiveTab('upgrade')} className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs flex-shrink-0 font-semibold transition-colors">
                          Upgrade
                        </button>
                      </div>
                      {/* Referral info */}
                      <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="text-xs text-gray-400 mb-3 flex items-center gap-1.5"><Users size={12} />Your Network</div>
                        {[
                          ['Total Referral Income', `$${Number(user.totalDirect).toFixed(2)} USDT`],
                          ['Direct Network Members', user.directReferralCount],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between text-xs py-1 border-b border-white/10 last:border-0">
                            <span className="text-gray-400">{k}</span>
                            <span className="font-mono text-white">{v}</span>
                          </div>
                        ))}
                      </div>
                      {/* Sales info */}
                      <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="text-xs text-gray-400 mb-3 flex items-center gap-1.5"><BarChart3 size={12} />Sales Performance</div>
                        {[
                          ['Left Sales Volume', `$${Number(user.leftVolume).toFixed(2)}`],
                          ['Right Sales Volume', `$${Number(user.rightVolume).toFixed(2)}`],
                          ['Next Tier Cost', `${user.upgradeAmountFmt} USDT`],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between text-xs py-1 border-b border-white/10 last:border-0">
                            <span className="text-gray-400">{k}</span>
                            <span className="font-mono text-white">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* REGISTER / MY NETWORK */}
              {activeTab === 'register' && (
                <div>
                  <div className="mb-6">
                    <h2 className="font-display font-bold text-xl text-white">
                      {isRegistered ? 'My Network' : 'Register'}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {isRegistered
                        ? 'Share your referral link and earn affiliate commission from every direct sale.'
                        : 'Enter a sponsor address and choose your binary placement.'}
                    </p>
                  </div>
                  <RegisterPanel
                    isRegistered={isRegistered}
                    user={user}
                    usdtBalanceRaw={usdtBalanceRaw}
                    onSuccess={() => { setActiveTab('deposit'); refetch() }}
                  />
                </div>
              )}

              {/* DEPOSIT */}
              {activeTab === 'deposit' && (
                <div>
                  <div className="mb-6">
                    <h2 className="font-display font-bold text-xl text-white">Purchase</h2>
                    <p className="text-gray-400 text-sm mt-1">Deposit USDT to your wallet balance, or FBMX to cover transaction fees.</p>
                  </div>
                  <DepositPanel
                    user={user}
                    hasActivated={user?.hasActivated}
                    usdtBalance={usdtBalance} usdtBalanceRaw={usdtBalanceRaw}
                    fbmxBalance={fbmxBalance} fbmxBalanceRaw={fbmxBalanceRaw}
                    usdtAllowanceRaw={usdtAllowanceRaw}
                    fbmxAllowanceRaw={fbmxAllowanceRaw}
                    onSuccess={() => { refetch() }}
                  />
                </div>
              )}

              {/* UPGRADE */}
              {activeTab === 'upgrade' && (
                <div>
                  <div className="mb-6">
                    <h2 className="font-display font-bold text-xl text-white">Upgrade Tier</h2>
                    <p className="text-gray-400 text-sm mt-1">Advance your tier to unlock higher commissions and rewards.</p>
                  </div>
                  <UpgradePanel user={user} onSuccess={() => { refetch(); setActiveTab('overview') }} />
                </div>
              )}

              {/* PASSIVE */}
              {activeTab === 'passive' && (
                <div>
                  <div className="mb-6">
                    <h2 className="font-display font-bold text-xl text-white">Commission Rewards</h2>
                    <p className="text-gray-400 text-sm mt-1">Daily commission income based on your volume and referral ratio.</p>
                  </div>
                  <CollectPassivePanel
                    user={user}
                    passiveCooldownEnds={passiveCooldownEnds}
                    globalCooldownEnds={globalCooldownEnds}
                    txCooldownSecs={txCooldownSecs}
                    onSuccess={refetch}
                  />
                </div>
              )}

              {/* BINARY */}
              {activeTab === 'binary' && (
                <div>
                  <div className="mb-6">
                    <h2 className="font-display font-bold text-xl text-white">Sales Rewards</h2>
                    <p className="text-gray-400 text-sm mt-1">Collect your weaker-side sales volume once every 24 hours.</p>
                  </div>
                  <CollectBinaryPanel
                    user={user}
                    binaryCooldownEnds={binaryCooldownEnds}
                    globalCooldownEnds={globalCooldownEnds}
                    txCooldownSecs={txCooldownSecs}
                    onSuccess={refetch}
                  />
                </div>
              )}

              {/* WITHDRAW */}
              {activeTab === 'withdraw' && (
                <div>
                  <div className="mb-6">
                    <h2 className="font-display font-bold text-xl text-white">Withdraw</h2>
                    <p className="text-gray-400 text-sm mt-1">Withdraw using a fixed tier amount based on your tier level.</p>
                  </div>
                  <WithdrawPanel
                    user={user}
                    withdrawCooldownEnds={withdrawCooldownEnds}
                    globalCooldownEnds={globalCooldownEnds}
                    txCooldownSecs={txCooldownSecs}
                    onSuccess={refetch}
                  />
                </div>
              )}

              {/* TREE & HISTORY (PLACEHOLDER) */}
              {(activeTab === 'tree' || activeTab === 'history') && (
                <div className="text-center py-12">
                  <p className="text-gray-400">Dashboard section "{activeTab}" coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
