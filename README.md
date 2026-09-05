# CertiFlow

CertiFlow is a premium Web3 academic credential frontend for issuing, managing, and publicly verifying soulbound certificates.

The current version is a polished React + TypeScript + Tailwind CSS UI with realistic mock certificate data and a real MetaMask connection flow. Smart contract reads and writes are intentionally not included yet.

## Features

- Premium dark navy, indigo, and cyan glassmorphism interface
- Landing page with product overview, live stats, and certificate preview
- Public verification by token ID or wallet address
- Issuer dashboard with a simulated certificate mint flow
- Student credentials page filtered by the connected wallet
- Admin issuer authorization console with mock session state
- MetaMask wallet connection using ethers v6
- Shortened connected wallet address display
- MetaMask availability messaging
- Sepolia Testnet network detection using chain ID `11155111`
- Responsive navigation and layouts
- QR code certificate sharing modal
- Toast feedback and loading states

## Routes

| Route | Purpose |
| --- | --- |
| `/` | CertiFlow landing page |
| `/verify` | Public certificate verification |
| `/issuer` | Issuer dashboard and mock mint form |
| `/credentials` | Connected wallet credential collection |
| `/admin` | Issuer wallet authorization console |

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- ethers v6
- Lucide React
- qrcode.react
- React Hot Toast
- pnpm workspace

## Getting started

### Requirements

- Node.js 20 or newer
- pnpm 10 or newer
- MetaMask browser extension for wallet connection features

### Install

```bash
pnpm install
```

### Run the app

```bash
pnpm --filter @workspace/certiflow run dev
```

The frontend starts on `http://localhost:5173`.

If you want to run it on another port:

```bash
PORT=4173 BASE_PATH=/ pnpm --filter @workspace/certiflow run dev
```

### Check the project

```bash
pnpm --filter @workspace/certiflow run typecheck
PORT=4173 BASE_PATH=/ pnpm --filter @workspace/certiflow run build
```

## MetaMask behavior

CertiFlow uses the browser-injected MetaMask provider through ethers v6:

- Clicking **Connect MetaMask** requests the user's account.
- The connected address is shown in shortened form.
- Account and network changes are detected automatically.
- The UI displays a clear message when MetaMask is unavailable.
- The UI warns when the active network is not Sepolia.
- Issuer minting is blocked unless the active chain is Sepolia.
- No wallet private keys, seed phrases, or secrets are stored.

The app currently does not call a smart contract. Minting, credentials, and issuer authorization remain mock UI flows until the contract layer is added.

## Project structure

```text
artifacts/certiflow/
├── src/
│   ├── components/
│   │   └── CertiFlowComponents.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── lib/
│   │   └── wallet.ts
│   ├── pages/
│   │   └── CertiFlowPages.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

The reusable UI includes `Navbar`, `WalletButton`, `CertificateCard`, `StatusBadge`, `VerifySearch`, `QRCodeModal`, and `LoadingSkeleton`.

## Publishing to GitHub

From the repository root:

```bash
git init
git add .
git commit -m "Build CertiFlow credential platform UI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Do not commit `node_modules`, build output, `.env` files, or private keys. The repository `.gitignore` already excludes generated dependencies and build artifacts.