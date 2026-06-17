import { useReadContracts, useReadContract } from 'wagmi'
import { useAccount } from 'wagmi'
import { INFINITE_ABUNDANCE_ADDRESS, INFINITE_ABUNDANCE_ABI, USDT_ADDRESS, FBMX_ADDRESS, ERC20_ABI, COOLDOWN_TX_DEFAULT } from '../config/contracts'
import { formatUnits } from 'viem'

const ZERO = '0x0000000000000000000000000000000000000000'

export function useUserData() {
  const { address } = useAccount()

  const base = { address: INFINITE_ABUNDANCE_ADDRESS, abi: INFINITE_ABUNDANCE_ABI }

  const { data, isLoading, refetch } = useReadContracts({
    contracts: address ? [
      // 0  affiliates
      { ...base, functionName: 'affiliates',     args: [address] },
      // 1  binaries
      { ...base, functionName: 'binaries',       args: [address] },
      // 2  wallets
      { ...base, functionName: 'wallets',        args: [address] },
      // 3  passives
      { ...base, functionName: 'passives',       args: [address] },
      // 4  lastCallTime (global per-user anti-spam)
      { ...base, functionName: 'lastCallTime',   args: [address] },
      // 5  tokenBalance (FBMX deposited in contract)
      { ...base, functionName: 'tokenBalance',   args: [address] },
      // 6  isUser
      { ...base, functionName: 'isUser',         args: [address] },
      // 7  getPassiveReward
      { ...base, functionName: 'getPassiveReward', args: [address] },
      // 8  getUpgradeAmount
      { ...base, functionName: 'getUpgradeAmount', args: [address] },
      // 9  getContractStats
      { ...base, functionName: 'getContractStats' },
      // 10 USDT wallet balance
      { address: USDT_ADDRESS, abi: ERC20_ABI, functionName: 'balanceOf',  args: [address] },
      // 11 FBMX wallet balance
      { address: FBMX_ADDRESS, abi: ERC20_ABI, functionName: 'balanceOf',  args: [address] },
      // 12 USDT allowance to contract
      { address: USDT_ADDRESS, abi: ERC20_ABI, functionName: 'allowance',  args: [address, INFINITE_ABUNDANCE_ADDRESS] },
      // 13 FBMX allowance to contract
      { address: FBMX_ADDRESS, abi: ERC20_ABI, functionName: 'allowance',  args: [address, INFINITE_ABUNDANCE_ADDRESS] },
      // 14 hasActivated
      { ...base, functionName: 'hasActivated', args: [address] },
      // 15 transactionCooldown
      { ...base, functionName: 'transactionCooldown' },
      // 16 getChildren
      { ...base, functionName: 'getChildren', args: [address, 0n, 500n] },
    ] : [],
    query: { refetchInterval: 10000, enabled: !!address },
  })

  const extractResults = () => {
    if (!data || !address) return null

    const [
      affiliates, binaries, wallets, passives, lastCallTime, tokenBalance,
      isUser, passiveReward, upgradeAmount, stats,
      usdtBal, fbmxBal, usdtAllow, fbmxAllow, hasActivated, txCooldown, children
    ] = data.map(d => d.result)

    if (!isUser) return null

    const level = affiliates?.[3] ?? 0
    const parent = affiliates?.[0] ?? ZERO
    const directReferralCount = children?.length ?? 0
    const totalDirect = affiliates?.[2] ?? 0n

    const leftVol = binaries?.[3] ?? 0n
    const rightVol = binaries?.[4] ?? 0n
    const binaryCD = binaries?.[5] ?? 0n

    const walletBalance = wallets?.[0] ?? 0n
    const capping = wallets?.[1] ?? 0n
    const totalIncome = wallets?.[2] ?? 0n
    const walletCD = wallets?.[3] ?? 0n

    const totalPassive = passives?.[0] ?? 0n
    const activeEquity = passives?.[1] ?? 0n
    const passiveCD = passives?.[2] ?? 0n

    const upgradeAmountBigInt = upgradeAmount ?? 0n

    const usdtBalanceFmt = formatUnits(usdtBal ?? 0n, 18)
    const fbmxBalanceFmt = formatUnits(fbmxBal ?? 0n, 18)
    const fbmxInContractFmt = formatUnits(tokenBalance ?? 0n, 18)
    const passiveRewardFmt = formatUnits(passiveReward ?? 0n, 18)
    const walletBalanceFmt = formatUnits(walletBalance, 18)
    const cappingFmt = formatUnits(capping, 18)
    const totalIncomeFmt = formatUnits(totalIncome, 18)
    const upgradeAmountFmt = formatUnits(upgradeAmountBigInt, 18)
    const activeEquityFmt = formatUnits(activeEquity, 18)
    const leftVolFmt = formatUnits(leftVol, 18)
    const rightVolFmt = formatUnits(rightVol, 18)
    const totalDirectFmt = formatUnits(totalDirect, 18)

    const txCooldownSecs = Number(txCooldown ?? COOLDOWN_TX_DEFAULT)
    const now = Math.floor(Date.now() / 1000)

    const isPassiveCooldown = passiveCD > 0n && passiveCD > BigInt(now)
    const isBinaryCooldown = binaryCD > 0n && binaryCD > BigInt(now)
    const isWithdrawCooldown = walletCD > 0n && walletCD > BigInt(now)
    const isGlobalCooldown = lastCallTime && lastCallTime > 0n && (lastCallTime + BigInt(txCooldownSecs) > BigInt(now))

    const passiveCooldownEnds = Number(passiveCD)
    const binaryCooldownEnds = Number(binaryCD)
    const withdrawCooldownEnds = Number(walletCD)
    const globalCooldownEnds = lastCallTime ? Number(lastCallTime + BigInt(txCooldownSecs)) : 0

    const minSide = Math.min(Number(leftVolFmt), Number(rightVolFmt))
    let passivePercentage = 0
    if (activeEquity > 0n) {
      passivePercentage = (Number(passiveRewardFmt) / Number(activeEquityFmt)) * 100
    }

    const referralIncomeRaw = totalDirect

    return {
      user: {
        address,
        level,
        parent,
        walletBalance: walletBalanceFmt,
        passiveReward: passiveRewardFmt,
        leftVolume: leftVolFmt,
        rightVolume: rightVolFmt,
        activeEquity: activeEquityFmt,
        fbmxInContract: fbmxInContractFmt,
        capping: cappingFmt,
        totalIncome: totalIncomeFmt,
        directReferralCount,
        upgradeAmountFmt,
        totalDirect: totalDirectFmt,
        leftAddress: binaries?.[1] ?? ZERO,
        rightAddress: binaries?.[2] ?? ZERO,
      },
      isRegistered: isUser,
      isLoading,
      refetch,
      passivePercentage,
      referralIncomeRaw,
      usdtBalance: usdtBalanceFmt,
      fbmxBalance: fbmxBalanceFmt,
      usdtBalanceRaw: usdtBal ?? 0n,
      fbmxBalanceRaw: fbmxBal ?? 0n,
      usdtAllowanceRaw: usdtAllow ?? 0n,
      fbmxAllowanceRaw: fbmxAllow ?? 0n,
      isPassiveCooldown,
      passiveCooldownEnds,
      isBinaryCooldown,
      binaryCooldownEnds,
      isWithdrawCooldown,
      withdrawCooldownEnds,
      isGlobalCooldown,
      globalCooldownEnds,
      txCooldownSecs,
      stats: stats ? {
        totalUsers: stats[0],
        totalUSDT: formatUnits(stats[1], 18),
        totalFBMX: formatUnits(stats[2], 18),
        totalDeposits: formatUnits(stats[3], 18),
        totalRewards: formatUnits(stats[4], 18),
        totalWithdrawals: formatUnits(stats[5], 18),
        totalMarketingFunding: formatUnits(stats[6], 18),
        totalProjectFunding: formatUnits(stats[7], 18),
        totalLiquidityFunding: formatUnits(stats[8], 18),
      } : null,
    }
  }

  return extractResults() ?? {
    user: null,
    isRegistered: false,
    isLoading,
    refetch,
    passivePercentage: 0,
    referralIncomeRaw: 0n,
    usdtBalance: '0',
    fbmxBalance: '0',
    usdtBalanceRaw: 0n,
    fbmxBalanceRaw: 0n,
    usdtAllowanceRaw: 0n,
    fbmxAllowanceRaw: 0n,
    isPassiveCooldown: false,
    passiveCooldownEnds: 0,
    isBinaryCooldown: false,
    binaryCooldownEnds: 0,
    isWithdrawCooldown: false,
    withdrawCooldownEnds: 0,
    isGlobalCooldown: false,
    globalCooldownEnds: 0,
    txCooldownSecs: 60,
    stats: null,
  }
}

export function usePlacementPreview(referrerAddress, group) {
  const { data: placement } = useReadContract({
    address: INFINITE_ABUNDANCE_ADDRESS,
    abi: INFINITE_ABUNDANCE_ABI,
    functionName: 'getPlacement',
    args: [referrerAddress, group],
    query: { enabled: !!referrerAddress },
  })
  return { placement }
}

export function useChildrenPage(addr, startIndex, count) {
  return useReadContract({
    address: INFINITE_ABUNDANCE_ADDRESS,
    abi: INFINITE_ABUNDANCE_ABI,
    functionName: 'getChildren',
    args: [addr, BigInt(startIndex), BigInt(count)],
    query: { enabled: !!addr },
  })
}
