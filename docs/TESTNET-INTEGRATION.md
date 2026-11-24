# Testnet integration handoff

Preserve the user-facing layout and replace the simulation at the boundaries below.

## Wallet and identity

Replace `connect`, `chooseWallet` and the fixed wallet display in `dist/app.js` with the real wallet provider and STRATO account mapping. Handle rejection, disconnect, chain switching, account changes and pending requests. Scope balances, allowances and pending transactions to the active account/network; discard stale requests after switching accounts.

## Token and chain metadata

Replace the snapshot and fixture rates in `dist/funding.js` with the configured environment's actual token registry and bridge routes. Match by chain and contract address, not ticker. Use actual token decimals. Native ETH has no ERC-20 contract; the ETH representation on STRATO does.

The design snapshot was obtained from the public mainnet token registry and `/api/bridge/networkConfigs` plus `/api/bridge/bridgeableTokens/{chainId}`. Select the corresponding testnet backend and verify its current API schema. Do not use mainnet addresses for testnet execution.

## Quotes and swap execution

`StratoSwap.quote` and `StratoSwap.apply` in `dist/swap.js` are simulation-only. Replace them with router quotes and actual contract execution. Preserve the confirmed from/to asset identities, input units, minimum received, slippage, receiving chain and wallet. Support exact-input swaps, quote expiry, price changes and insufficient liquidity. Never consume staked STRATO as available swap balance.

Keep the form's source amount stable while market prices move. Changing either token or reversing a pair must invalidate the old quote. The confirmation and processing states should use an immutable transaction/quote snapshot.

## Bridge journey

A native source swaps on STRATO. An external source first bridges the selected asset into its configured STRATO representation, then submits one router swap to the chosen receiving asset. Treat approval and bridge as separate requests when needed; native source-chain ETH does not need an ERC-20 allowance.

Replace `request`/`perform` timers in `dist/app.js` with real wallet requests and transaction state. Read actual allowances, use the approved amount, monitor source-chain receipts and relayer confirmation, then refresh STRATO balances. Recover pending deposits after reload. Failed/cancelled swaps must leave the bridged asset visible and available. Prevent duplicate submissions and double-crediting.

Swapping out of STRATO means selling into another asset **on STRATO**. This design does not implement bridge-out as part of the swap. External withdrawals need a separate explicit flow.

## Portfolio, staking and advanced screens

Replace fixture balances, local history, APYs, projections, validator details, unbonding period and liquidity positions with live environment data. Refresh balances from confirmed receipts instead of optimistic local arithmetic. Distinguish available, staked and unbonding balances.

The current 9.70% staking APY, 12.01% pool APY, seven-day unbonding period and account balances are design fixtures, not protocol specifications. The sponsored-gas messaging must match the real launch sponsorship configuration and still show any source-chain gas the user pays.

## Persistence and verification

Local storage currently holds the simulated session (`strato-trade-experience-2`). Replace it with account/network-scoped state and backend/on-chain reconciliation. Never store wallet keys or access tokens in this state.

Test buys, sells, non-STRATO pairs, pair reversal, native versus ERC-20 funding, source-account changes, wallet rejection, approval-only completion, bridge pending/failed states, quote expiry, insufficient available balances, network failures and cancelled post-bridge swaps. Validate dark mode, mobile overflow, copied addresses and keyboard access. The included unit tests validate the design engine only.
