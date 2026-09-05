# CertiFlow

CertiFlow is a premium Web3 platform frontend for issuing and publicly verifying soulbound academic certificates.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/certiflow/src/App.tsx` — application shell, routes, and MetaMask wallet state
- `artifacts/certiflow/src/pages/CertiFlowPages.tsx` — landing, verify, issuer, credentials, and admin pages
- `artifacts/certiflow/src/components/CertiFlowComponents.tsx` — shared CertiFlow UI components
- `artifacts/certiflow/src/lib/wallet.ts` — MetaMask provider detection, Sepolia chain ID, and address formatting
- `artifacts/certiflow/src/data/mockData.ts` — current mock certificate and issuer records
- `artifacts/certiflow/src/index.css` — CertiFlow visual theme and utility styles
- `README.md` — GitHub setup, feature, and publishing instructions

## Architecture decisions

- The first release is frontend-only and uses mock data so the full product experience can be reviewed before smart contracts are finalized.
- MetaMask is accessed through the browser-injected EIP-1193 provider and wrapped with ethers v6 `BrowserProvider`.
- Sepolia is the required network for issuer actions; the app checks chain ID `11155111` and does not silently switch networks.
- Wallet state lives in `App.tsx` and is passed to shared navigation and wallet-dependent pages so account and network changes stay synchronized.

## Product

CertiFlow helps institutions issue portable academic credentials, lets students view wallet-owned achievements, and gives anyone a public way to verify a certificate without connecting a wallet. Smart contract integration is intentionally deferred.

## User preferences

- Keep the UI premium, responsive, and suitable for a hackathon demo.

## Gotchas

- The frontend can run without Replit by using the Vite defaults in `artifacts/certiflow/vite.config.ts`.
- The credentials and issuer flows are mock interactions until contract reads/writes are added.
- MetaMask must be installed and the active account must be on Sepolia before the issuer mint action is enabled.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
