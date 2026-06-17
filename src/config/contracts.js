// ─── Contract Addresses ───────────────────────────────────────────────────────
export const INFINITE_ABUNDANCE_ADDRESS = '0x19176d7BA657D0697C67873d6ad38e27213D7B87'
export const INFINITE_ABUNDANCE_ADDRESS_OLD = '0xCac3c8Cdc5649fa2575da8F6F06431af6D529494'
export const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'
export const FBMX_ADDRESS = '0x5951F937ff590239D38c10e871F9982359E56C36'

// ─── ERC20 ABI ────────────────────────────────────────────────────────────────
export const ERC20_ABI = [
  {
    name: 'approve', type: 'function', stateMutability: 'nonpayable',
    inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [{ type: 'bool' }]
  },
  {
    name: 'allowance', type: 'function', stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }],
    outputs: [{ type: 'uint256' }]
  },
  {
    name: 'balanceOf', type: 'function', stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }]
  },
  {
    name: 'decimals', type: 'function', stateMutability: 'view',
    inputs: [], outputs: [{ type: 'uint8' }]
  },
  {
    name: 'symbol', type: 'function', stateMutability: 'view',
    inputs: [], outputs: [{ type: 'string' }]
  },
  {
    name: 'transfer', type: 'function', stateMutability: 'nonpayable',
    inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [{ type: 'bool' }]
  },
]

// ─── INFINITE ABUNDANCE ABI (fbmxdao_v2.sol) ──────────────────────────────────
export const INFINITE_ABUNDANCE_ABI = [
  // ── Write functions ──
  {
    name: 'register', type: 'function', stateMutability: 'nonpayable',
    inputs: [{ name: '_referrer', type: 'address' }, { name: '_group', type: 'uint8' }],
    outputs: []
  },
  {
    name: 'depositUSDT', type: 'function', stateMutability: 'nonpayable',
    inputs: [{ name: 'targetLevel', type: 'uint8' }], outputs: []
  },
  {
    name: 'depositFBMX', type: 'function', stateMutability: 'nonpayable',
    inputs: [{ name: '_amount', type: 'uint256' }], outputs: []
  },
  {
    name: 'activateRank', type: 'function', stateMutability: 'nonpayable',
    inputs: [], outputs: []
  },
  {
    name: 'collectPassiveRewards', type: 'function', stateMutability: 'nonpayable',
    inputs: [], outputs: []
  },
  {
    name: 'collectBinaryRewards', type: 'function', stateMutability: 'nonpayable',
    inputs: [], outputs: []
  },
  {
    name: 'withdrawBalance', type: 'function', stateMutability: 'nonpayable',
    inputs: [{ name: '_amount', type: 'uint256' }], outputs: []
  },

  // ── View functions ──
  {
    name: 'getChildren', type: 'function', stateMutability: 'view',
    inputs: [{ name: '_user', type: 'address' }, { name: '_startIndex', type: 'uint256' }, { name: '_count', type: 'uint256' }],
    outputs: [{ name: 'childrenBatch', type: 'address[]' }]
  },
  {
    name: 'getPassiveReward', type: 'function', stateMutability: 'view',
    inputs: [{ name: '_user', type: 'address' }], outputs: [{ type: 'uint256' }]
  },
  {
    name: 'getPercentage', type: 'function', stateMutability: 'pure',
    inputs: [{ name: '_passiveEquity', type: 'uint256' }, { name: '_referralIncome', type: 'uint256' }],
    outputs: [{ type: 'uint256' }]
  },
  {
    name: 'getEquity', type: 'function', stateMutability: 'pure',
    inputs: [{ name: '_totalEquity', type: 'uint256' }, { name: '_totalIncome', type: 'uint256' }],
    outputs: [{ type: 'uint256' }]
  },
  {
    name: 'getUpgradeAmount', type: 'function', stateMutability: 'view',
    inputs: [{ name: '_user', type: 'address' }], outputs: [{ type: 'uint256' }]
  },
  {
    name: 'getPlacement', type: 'function', stateMutability: 'view',
    inputs: [{ name: '_user', type: 'address' }, { name: '_options', type: 'uint8' }],
    outputs: [{ name: '_address', type: 'address' }, { name: '_position', type: 'bool' }]
  },
  {
    name: 'getWithdrawAmount', type: 'function', stateMutability: 'pure',
    inputs: [{ name: '_userLevel', type: 'uint8' }, { name: '_amount', type: 'uint256' }],
    outputs: [{ type: 'uint256' }]
  },
  {
    name: 'getContractStats', type: 'function', stateMutability: 'view',
    inputs: [],
    outputs: [
      { name: '_totalUsers', type: 'uint256' },
      { name: '_totalUSDT', type: 'uint256' },
      { name: '_totalFBMX', type: 'uint256' },
      { name: '_totalDeposits', type: 'uint256' },
      { name: '_totalRewards', type: 'uint256' },
      { name: '_totalWithdrawals', type: 'uint256' },
      { name: '_totalMarketingFunding', type: 'uint256' },
      { name: '_totalProjectFunding', type: 'uint256' },
      { name: '_totalLiquidityFunding', type: 'uint256' },
    ]
  },

  // ── Mapping getters ──
  {
    name: 'affiliates', type: 'function', stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }],
    outputs: [
      { name: 'parent', type: 'address' },
      { name: 'agent', type: 'address' },
      { name: 'totalDirect', type: 'uint256' },
      { name: 'level', type: 'uint8' },
    ]
  },
  {
    name: 'binaries', type: 'function', stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }],
    outputs: [
      { name: 'parent', type: 'address' },
      { name: 'leftAddress', type: 'address' },
      { name: 'rightAddress', type: 'address' },
      { name: 'leftVolume', type: 'uint256' },
      { name: 'rightVolume', type: 'uint256' },
      { name: 'coolDown', type: 'uint256' },
    ]
  },
  {
    name: 'wallets', type: 'function', stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }],
    outputs: [
      { name: 'balance', type: 'uint256' },
      { name: 'capping', type: 'uint256' },
      { name: 'totalIncome', type: 'uint256' },
      { name: 'coolDown', type: 'uint256' },
    ]
  },
  {
    name: 'passives', type: 'function', stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }],
    outputs: [
      { name: 'totalPassive', type: 'uint256' },
      { name: 'totalEquity', type: 'uint256' },
      { name: 'coolDown', type: 'uint256' },
    ]
  },
  {
    name: 'lastCallTime', type: 'function', stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }], outputs: [{ type: 'uint256' }]
  },
  {
    name: 'tokenBalance', type: 'function', stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }], outputs: [{ type: 'uint256' }]
  },
  {
    name: 'isUser', type: 'function', stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }], outputs: [{ type: 'bool' }]
  },
  {
    name: 'hasActivated', type: 'function', stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }], outputs: [{ type: 'bool' }]
  },
  {
    name: 'transactionCooldown', type: 'function', stateMutability: 'view',
    inputs: [], outputs: [{ type: 'uint256' }]
  },

  // ── Owner ──
  {
    name: 'owner', type: 'function', stateMutability: 'view',
    inputs: [], outputs: [{ type: 'address' }]
  },
]

// ─── Domain Constants ──────────────────────────────────────────────────────────
export const ENTRY_FEE = 5n * 10n ** 18n
export const MIN_FBMX_REQUIRED = 5n * 10n ** 16n // 0.05 FBMX
export const MAX_RANK = 15
export const COOLDOWN_24H = 86400
export const COOLDOWN_TX_DEFAULT = 60

export const WITHDRAW_TIERS = [
  { label: '$15', amount: 15n * 10n ** 18n, minLevel: 1 },
  { label: '$50', amount: 50n * 10n ** 18n, minLevel: 4 },
  { label: '$100', amount: 100n * 10n ** 18n, minLevel: 7 },
  { label: '$500', amount: 500n * 10n ** 18n, minLevel: 10 },
  { label: '$1000', amount: 1000n * 10n ** 18n, minLevel: 13 },
]
