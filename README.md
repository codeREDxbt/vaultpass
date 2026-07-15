# VaultPass

**Your Identity. Under Lock and Key.**

VaultPass is a privacy-preserving access-gating dApp for the **Midnight Moonshots Level 3** track. Operators deploy a Compact gate with a Merkle allowlist and nullifiers; members prove membership without revealing the raw credential. The app covers full Admin and Member Preview flows: deploy, enroll, prove, vault briefing, restore-from-contract, explorer links, and disconnect.

[![CI](https://github.com/codeREDxbt/vaultpass/actions/workflows/ci.yml/badge.svg)](https://github.com/codeREDxbt/vaultpass/actions/workflows/ci.yml)

| Resource | Link |
|----------|------|
| **Repository** | https://github.com/codeREDxbt/vaultpass |
| **Live demo** | _Deploy after first push — see [Deployment](#deployment-notes)_ |
| **Demo video** | _Record 60–90s after live URL is live — see [Demo](#demo)_ |
| **Trust model** | [TRUST_MODEL.md](./TRUST_MODEL.md) |

## Why VaultPass exists

Web3 communities, private events, and token-gated tools often force users to doxx identity or expose history just to prove access. VaultPass is a zero-knowledge gateway on Midnight Preview: the user proves allowlist membership, the app unlocks a demo vault for the browser session, and the chain records a nullifier-backed success—not the secret.

## Features

- **Compact gate:** `valid_credentials` Merkle tree + `used_nullifiers` set (`contracts/src/vault_pass.compact`).
- **Operator console:** deploy, enroll credential hashes, copy member secret, share `?contract=` link, restore published gate from address.
- **Member gate:** connect wallet → prove → vault destination with explorer links.
- **Session UX:** vault unlock via `sessionStorage` after a confirmed proof (**demo ACL**, not a second cryptographic gate).
- **Midnight-aligned UI:** WalletSessionBar, transaction stages, Preview explorer deep links.

## Stack

- **Smart contract:** Compact (`vault_pass.compact`) with prebuilt managed artifacts under `contracts/src/managed` and app static ZK assets.
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS.
- **Wallet / chain:** Midnight dApp connector (Lace / 1AM), low-level prove → balance → submit path in `app/src/lib/midnight-client.ts`.
- **Tests:** Jest **behavioral mocks** of access rules (not Compact circuit tests)—see below.
- **CI:** GitHub Actions (`npm ci` → `npm test` → `npm run build`).

## Architecture

Monorepo (npm workspaces):

| Path | Role |
|------|------|
| `contracts/` | Compact source, managed compiler output, Jest behavioral tests |
| `app/` | Next.js UI + Midnight client, gate store, session unlock |
| `.github/workflows/ci.yml` | CI pipeline |

Circuits:

1. **`add_valid_credential`** — admin-only insert of a credential leaf hash into the Merkle tree.
2. **`verify_access`** — prove secret → leaf in tree; derive nullifier; reject replay; insert nullifier.

## Setup

```bash
git clone https://github.com/codeREDxbt/vaultpass.git
cd vaultpass
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Requirements for Preview demo:** Midnight Lace or 1AM on **Preview**, browser extension installed, DUST/fee balance as required by the network.

## Test instructions

```bash
npm test
```

Runs Jest in `contracts/`. These tests **simulate** allowlist + nullifier + admin rules with in-memory structures. They **do not** compile Compact, run testkit, or generate ZK proofs. See comments at the top of `contracts/tests/vault_pass.test.ts` and [TRUST_MODEL.md](./TRUST_MODEL.md).

To recompile Compact when the toolchain is available:

```bash
npm run compile --workspace=contracts
```

## Deployment notes

### Frontend (Vercel)

1. Push this repo to GitHub (already targeted as `codeREDxbt/vaultpass`).
2. Import in Vercel with **root directory = repository root** (uses `vercel.json`: install at root, build `app` workspace).
3. Framework: Next.js. No secrets required for a public Preview demo UI.
4. Paste the production URL into the [Demo](#demo) section of this README.

### Contract

Gates are **deployed from the Admin console** on Preview by the operator wallet—not from CI. Each operator deploy creates a new contract address; member links embed `?contract=…`.

## On-chain verification (explorer)

| Resource | Pattern |
|----------|---------|
| Explorer home | https://preview.midnightexplorer.com |
| Transaction | `https://preview.midnightexplorer.com/transactions/0x…` |
| Contract | `https://preview.midnightexplorer.com/contracts/0x…` |

In the app, use **View on explorer** next to deploy, enrollment, and access proof IDs (Admin, Gate, Vault).

## Privacy & trust model (summary)

**Observer can learn**

- That an access attempt occurred and whether it succeeded.
- Public ledger data: admin key bytes, Merkle structure evolution, used nullifiers, contract address.

**Observer cannot learn (circuit design)**

- The member’s raw credential secret.
- Off-chain identity of the prover without external correlation.

**Demo limitations (read fully: [TRUST_MODEL.md](./TRUST_MODEL.md))**

- Admin check uses a **witness** `get_caller()` compared to stored admin—honest wallet path only for the demo.
- Vault unlock is **sessionStorage** UX after a confirmed proof; forgeable in the browser.
- Operator keys / gate metadata are local; use **Restore published gate** + share links for recovery.

## How to demo (Preview)

### Operator path

1. Open `/admin` (footer → Operators).
2. Connect the administrator wallet → save gate name/description → deploy.
3. Wait until the gate is **Published** (indexer lag is normal).
4. Generate a credential → enroll its hash → copy the raw secret privately.
5. Copy the **member gate link** (`?contract=` embedded).

### Member path

1. Open the share link (`/gate?…`).
2. Connect a wallet on Preview → paste the raw secret → generate proof.
3. Open the protected vault for this browser session.
4. Optionally open the proof transaction on Midnight Explorer.

### Restore

If browser storage is cleared: **Admin → Restore published gate** with the contract address. The on-chain gate remains; signing keys for some ops may still be lost (see trust model).

## Demo

- **Live demo:** _pending first Vercel production deploy_
- **Demo video (60–90s script):** problem → admin enroll → member prove → vault + explorer

Suggested video beats:

1. **0–15s** — Landing: private allowlist without doxxing.
2. **15–40s** — Admin deploy + enroll + copy secret + share link.
3. **40–70s** — Member prove + vault unlock + explorer link.
4. **70–90s** — One line on nullifiers / what observers cannot see.

### Screenshots

Add 2–3 PNGs under `docs/screenshots/` after UI freeze:

1. Landing / judge script  
2. Admin published + enroll  
3. Member proof success + vault  

## License

Private submission / demo project unless otherwise stated by the author.
