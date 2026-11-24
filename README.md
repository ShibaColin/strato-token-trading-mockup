# STRATO Token Trading Mockup

Interactive UX/UI handoff for the engineering team building the STRATO testnet trading experience.

## Run locally

Requires Node.js 18 or later. No dependencies or API keys are needed.

```sh
git clone --branch mockups/strato-token-swap --single-branch https://github.com/ShibaColin/strato-token-trading-mockup.git
cd strato-token-trading-mockup
npm run dev
```

Open **http://127.0.0.1:4173**. Use `?theme=dark#trade` or `?theme=light#trade` to start in either theme.

```sh
npm test
npm run export
```

The export command also requires Python 3 and produces a standalone HTML file and a static-site ZIP in `exports/`.

## Included experience

- Compact STRATO banner and animated candlestick chart with distinct time ranges.
- Token selection on both sides, pair reversal, STRATO buys/sells, and swaps between the supported assets.
- External source-chain selection and a bridge-before-swap journey.
- Explicit review, wallet approval, network confirmation and success states.
- Real mainnet contract metadata with copy controls; native ETH is identified separately.
- Portfolio holdings, staking positions/rewards, and advanced liquidity/bridge screens.
- Light/dark themes, mobile layout, and local session persistence.

## Simulation boundary

This is a **design prototype**, not a wallet-connected or testnet-enabled trading app. Wallet connections, approvals, signatures and transactions are simulated in the browser. Prices, conversion rates, balances, APYs and reward progression are illustrative. No funds are moved and no private keys are requested.

Token addresses are real **mainnet** metadata captured from the official STRATO registry/bridge configuration. They must be replaced and reverified for the intended testnet. Asset eligibility, pair availability, pool liquidity, token decimals, rates and fees must come from the real backend/contracts before enabling transactions.

Receiving assets stay **on STRATO**. Reversing a pair does not bridge assets out to Ethereum, Base, Linea or Robinhood.

## Source map

| File | Role |
| --- | --- |
| `dist/app.js` | UI, routes, browser session, simulated wallet and transaction flow |
| `dist/funding.js` | Source-chain/token identities and fixture conversion rates |
| `dist/swap.js` | Pure quote and balance engine for the simulated swaps |
| `dist/market.js` | Synthetic OHLC data, live ticks and chart rendering |
| `dist/style.css` | Responsive light/dark UI and interaction states |
| `dist/assets/` | STRATO/token/wallet artwork and bundled Inter font |
| `tests/` | Quote, balance-isolation, route, contract and chart checks |
| `docs/TESTNET-INTEGRATION.md` | Engineering integration checklist and boundaries |

The pure swap tests cover all 110 ordered native-asset pairs, round-trip value conservation, insufficient available funds, stake isolation and quote locking. Production execution must use real router quotes and transaction receipts instead.

## Asset scope and identity

The prototype uses STRATO plus USDST, ETH, USDC, USDT, cbDOGE, GOLDST, SILVST, SPY, NVDA and BOOE. WBTC is excluded. Source routes are network-specific; identical tickers on different chains have different addresses. Contract metadata was checked on **24 November 2026** against the official STRATO contract documentation, token registry and bridge configuration. It is a snapshot, not an evergreen allowlist.

Reference: [STRATO contract documentation](https://docs.strato.nexus/build-apps/contract-addresses/).

STRATO artwork is supplied for this product handoff. Third-party wallet/token marks belong to their respective owners. The bundled Inter font is covered by `dist/assets/Inter-LICENSE.txt`.
