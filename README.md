<div align="center">
  <img src="app/public/logo.svg" alt="Vault Pass Logo" width="80" height="80" />
  <h1 align="center">Vault Pass</h1>
  <p align="center">
    <strong>Your Identity. Under Lock and Key.</strong>
    <br />
    A privacy-preserving zero-knowledge gateway built for the Midnight Moonshots Level 3 track.
  </p>

  <p align="center">
    <a href="https://github.com/codeREDxbt/vaultpass/actions/workflows/ci.yml">
      <img src="https://github.com/codeREDxbt/vaultpass/actions/workflows/ci.yml/badge.svg" alt="CI" />
    </a>
    <a href="https://nextjs.org/">
      <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js" />
    </a>
    <a href="https://midnight.network/">
      <img src="https://img.shields.io/badge/Midnight-Network-blueviolet" alt="Midnight Network" />
    </a>
  </p>
</div>

<br />

| Resource | Link |
|----------|------|
| **Live demo** | _Deploy after first push to Vercel_ |
| **Demo video** | _Record 60–90s after live URL is live_ |
| **Trust model** | [TRUST_MODEL.md](./TRUST_MODEL.md) |

---

## 🔐 Why Vault Pass?

Web3 communities, private events, and token-gated tools often force users to doxx their identity or expose their transaction history just to prove access. 

**Vault Pass** solves this. Built on the Midnight Preview network, it acts as a zero-knowledge gateway. Users can prove allowlist membership and unlock a demo vault for their browser session without revealing their raw credential. The chain only records a nullifier-backed success—never the secret.

## ✨ Features

- **Compact Gate (ZK Smart Contract)**: Utilizes a `valid_credentials` Merkle tree + `used_nullifiers` set (`contracts/src/vault_pass.compact`).
- **Operator Admin Console**: Deploy gates, enroll credential hashes, securely copy member secrets, generate `?contract=` shareable links, and restore published gates.
- **Member Flow**: Connect wallet ➔ Generate ZK Proof ➔ Unlock Vault ➔ View explorer links.
- **Session UX**: Once the proof is confirmed, the vault unlocks securely via `sessionStorage` for the duration of the browser session.
- **Midnight-Aligned UI**: Features the WalletSessionBar, real-time transaction stage feedback, and deep links into the Midnight Preview Explorer.

## 🛠️ Architecture & Stack

### Stack
- **Smart Contract**: Midnight Compact (`vault_pass.compact`)
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Wallet/Chain**: Midnight dApp connector (Lace / 1AM), low-level prove & submit path in `app/src/lib/midnight-client.ts`

### Monorepo Structure (npm workspaces)
| Path | Role |
|------|------|
| `contracts/` | Compact source, managed compiler output, Jest behavioral tests |
| `app/` | Next.js UI + Midnight client, gate store, session unlock |

### Zero-Knowledge Circuits
1. **`add_valid_credential`** — Admin-only insertion of a credential leaf hash into the Merkle tree.
2. **`verify_access`** — Proves the secret exists as a leaf in the tree, derives a nullifier, rejects replays, and inserts the nullifier into the set.

---

## 🚀 Getting Started (Local Development)

```bash
# Clone the repository
git clone https://github.com/codeREDxbt/vaultpass.git
cd vaultpass

# Install dependencies
npm install

# Start the frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** To run the Preview demo, you must have the Midnight Lace or 1AM browser extension installed, be connected to the **Preview network**, and have sufficient DUST/fee balance.

---

## 🧪 Testing

```bash
# Run Jest behavioral mocks
npm test
```
The tests simulate the allowlist, nullifier, and admin rules using in-memory structures (they do not generate real ZK proofs during testing). See comments in `contracts/tests/vault_pass.test.ts` and [TRUST_MODEL.md](./TRUST_MODEL.md) for details.

---

## 🌐 Deployment & Submission

### Frontend (Vercel)
Vault Pass is a static Next.js frontend and requires **zero environment variables** for production.

1. Push your repository to GitHub.
2. Import the project into Vercel. Ensure the **Root Directory** is set to the repository root. Vercel will automatically detect the Next.js framework in the `app` workspace.
3. Deploy! There are no secrets or `.env` files to configure.
4. Add the resulting production URL to the **Live demo** section above.

### Smart Contract
The ZK contracts are **deployed directly from the Admin console** on the Preview network by the operator's wallet, not via CI. Every operator deployment creates a new contract address.

---

## 🔍 On-chain Verification

| Resource | Pattern |
|----------|---------|
| Explorer home | https://preview.midnightexplorer.com |
| Transaction | `https://preview.midnightexplorer.com/transactions/0x…` |
| Contract | `https://preview.midnightexplorer.com/contracts/0x…` |

*In the app, you can use the **View on explorer** button next to deploy, enrollment, and access proof IDs.*

---

## 🎬 How to Demo

### Operator Path
1. Open `/admin` (via the footer).
2. Connect your administrator wallet, give the gate a name/description, and **Deploy**.
3. Wait until the gate status is **Published**.
4. Generate a credential, enroll its hash, and copy the raw secret privately.
5. Share the **member gate link** (contains the embedded `?contract=` parameter).

### Member Path
1. Open the shared link (`/gate?…`).
2. Connect a wallet (on the Preview network).
3. Paste the raw secret and click **Generate Proof**.
4. Access the protected vault!

---

<p align="center">
  <i>Private submission / demo project unless otherwise stated by the author.</i>
</p>
