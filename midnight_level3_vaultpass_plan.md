# Midnight Level 3 Project Plan: VaultPass

## Overview

VaultPass is a privacy-preserving access-gating dApp built for the Midnight Moonshots Level 3 submission. It is designed around the idea of proving membership or credential validity without revealing identity, which matches the approved ideas list for confidential credentials and private allowlist access.

The project uses Midnight's Compact smart contract language and selective disclosure model to let users prove they are allowed in, while keeping the underlying credential, membership data, and identity hidden from observers.

## Why this project wins

VaultPass is a stronger competition project than a simple voting app because it feels like a real product, not just a blockchain demo. It solves a practical problem that exists across Web3 communities, private events, token-gated platforms, internal tools, and premium content systems.

It is also a better fit for judges because the privacy story is easy to explain: the user proves access, the app grants access, and the chain only shows that a valid proof was accepted. That is a clean demonstration of Midnight's privacy-first model.

## Product concept

VaultPass is a private membership verification app. An admin creates a gate for a community, event, or product area, and a user can unlock access by proving they are on the allowlist or possess a valid credential.

### Primary use cases

- Token-gated communities.
- Private launch pages.
- Internal team tools.
- VIP event check-in.
- Confidential partner portals.

### Core promise

- Prove eligibility without revealing identity.
- Verify membership without exposing the raw allowlist.
- Grant access only when the proof is valid.
- Keep public observers from learning who belongs to the group.

## Why this is better than competitors

VaultPass has a more original product angle than private voting, and it is far more feasible than sealed-bid auctions or payroll-style apps. It can be presented as a reusable privacy layer for multiple applications, which makes it feel more ambitious and reusable.

It also gives you a polished UI opportunity. A gate-style interface with a lock/unlock flow, credential badge, and access confirmation will look stronger in a demo than a generic tally screen.

## Privacy model

The privacy model is the main strength of VaultPass. The goal is to reveal only the minimum needed for access decisions.

### What an observer can learn

- A user attempted to access a protected area.
- Whether the access proof was valid.
- Which gate or membership group is active, if that metadata is public.
- Aggregate access counts, if you choose to show them.

### What an observer cannot learn

- The user's real identity.
- The exact credential or membership secret.
- The private allowlist contents.
- Any hidden proof inputs used during validation.

### Disclosure principle

Use selective disclosure so only the access decision is public, while the credential verification details remain private. That aligns directly with Midnight's privacy-first contract model.

## Technical architecture

VaultPass should be built as a monorepo with a Compact contract, a TypeScript app layer, and a Next.js frontend. Keep the architecture small and production-like.

### Stack

| Layer | Suggested choice | Reason |
|---|---|---|
| Smart contract | Compact | Native Midnight language for private smart contracts. |
| Test layer | Compact testing tools | Required for contract validation and Level 3 proof of quality. |
| Frontend | Next.js + TypeScript | Fast to build and easy to demo. |
| UI | Tailwind CSS or shadcn/ui | Helps you make the app look premium quickly. |
| CI/CD | GitHub Actions | Needed for compile and test on every push. |
| Hosting | Vercel | Good for a clean public demo. |

### Repo structure

```text
vaultpass/
├─ contracts/
│  ├─ src/
│  │  └─ vault_pass.compact
│  ├─ tests/
│  │  └─ vault_pass.test.ts
│  └─ package.json
├─ app/
│  ├─ src/
│  │  ├─ app/
│  │  ├─ components/
│  │  ├─ lib/
│  │  └─ hooks/
│  └─ package.json
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ docs/
│  └─ product-proposal.md
└─ README.md
```

## Contract design

The contract should stay focused on verifying one thing very well: access eligibility. Do not overbuild general identity management or account recovery systems.

### Contract responsibilities

- Create an access gate.
- Store public metadata for the gate.
- Verify a private credential or membership proof.
- Mark a proof as used if one-time access is required.
- Optionally record a public access count.
- Return a success/failure result for the app to display.

### State model

Use public state for gate metadata and access status, and private state for the credential validation data. This keeps the observer view minimal while still allowing verifiable access enforcement.

### Suggested access flow

1. Admin creates a gate.
2. User opens the gate page.
3. User connects wallet.
4. User submits a private proof.
5. Contract verifies the proof.
6. Contract grants access or rejects it.
7. UI updates with a private access-confirmed state.

## Feature scope

Keep the scope lean and high quality.

### Must-have features

- One working privacy gate.
- Wallet connect flow.
- Private credential or allowlist proof.
- Access granted / denied states.
- At least 3 passing tests.
- GitHub Actions CI workflow.
- Public README with privacy model section.
- Live demo link.
- 10 meaningful commits.

### Nice-to-have features

- Multiple gates.
- Admin dashboard.
- Access log counter.
- Custom gate themes.
- QR-style invite flow.
- Exportable access report.

### Avoid

- Full identity management.
- Complex KYC logic.
- Multi-role DAO permissions.
- NFT marketplace features.
- Too many proof types.

## UI plan

The UI should look like a premium access product. Use strong visual hierarchy and make the proof action feel important.

### Pages

- Landing page with the core privacy pitch.
- Gate page with access description.
- Proof submission area.
- Access granted screen.
- Admin page, optional.

### Components

- Wallet connect button.
- Gate card.
- Credential status badge.
- Submit proof button.
- Access result panel.
- Privacy explanation block.

### Visual direction

Use dark mode with an elegant accent color like neon blue, emerald, or purple. A strong lock/unlock animation or state transition will help the product feel more complete.

## Testing plan

Testing is a requirement, so write contract tests early.

### Minimum 3 tests

1. Valid credential grants access.
2. Invalid credential is rejected.
3. Reused proof or duplicate access attempt is blocked.

### Good extra tests

- Gate creation initializes correctly.
- Closed gate rejects access.
- Access count increments properly.
- Unsupported credential format fails.

### Testing strategy

Start with contract tests first, then add a minimal frontend smoke flow. A solid test screenshot will help satisfy the submission checklist.

## CI/CD plan

Set up GitHub Actions as soon as the contract compiles. The workflow should run on every push and pull request.

### Workflow tasks

- Install dependencies.
- Compile the Compact contract.
- Run the contract test suite.
- Run frontend build or lint checks.

### Example workflow

```yaml
name: CI

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run compile
      - run: npm test
```

## Development timeline

A compact 7-day build plan is realistic.

| Day | Goal | Output |
|---|---|---|
| Day 1 | Define scope and repo | Repo scaffold and proposal draft |
| Day 2 | Build contract core | Gate creation and proof validation |
| Day 3 | Add private access logic | One-time proof or allowlist logic |
| Day 4 | Write tests | 3 to 5 passing contract tests |
| Day 5 | Build frontend | Wallet connect and proof UI |
| Day 6 | Polish and deploy | Live demo and mobile cleanup |
| Day 7 | Add CI and finalize docs | Submission-ready package |

## Commit strategy

Make at least 10 commits that show real progress.

### Example commit list

1. `init vaultpass monorepo`
2. `add compact gate contract scaffold`
3. `implement gate creation state`
4. `add private credential verification flow`
5. `block duplicate access attempts`
6. `write access validation tests`
7. `add invalid credential rejection test`
8. `build frontend gate page`
9. `connect wallet and proof submission`
10. `add github actions ci workflow`
11. `polish README privacy model`
12. `prepare deployment and demo assets`

## README structure

Your README should feel like a product page and a submission document at the same time.

### Sections to include

- Project title and one-line pitch.
- Why VaultPass exists.
- Feature list.
- Stack.
- Architecture diagram or explanation.
- Setup instructions.
- Test instructions.
- Deployment notes.
- Privacy model section.
- Live demo link.
- Screenshots.
- Demo video.
- CI badge or workflow link.

## Demo video plan

Keep the demo short and sharp.

### Suggested script

- 0:00–0:10: Explain the privacy access problem.
- 0:10–0:20: Open the gate page.
- 0:20–0:35: Connect wallet and submit proof.
- 0:35–0:45: Show access granted without revealing identity.
- 0:45–0:55: Show tests and CI passing.
- 0:55–1:00: Show repo, README, and live link.

## Submission checklist mapping

| Requirement | VaultPass coverage |
|---|---|
| Functional dApp | Privacy gate with proof-based access |
| Minimum 3 tests | Access success, invalid proof, duplicate attempt |
| CI/CD workflow | GitHub Actions compile + test on push |
| Approved idea | Confidential credentials / private allowlist access |
| 10 meaningful commits | Planned commit sequence |
| Public GitHub repo | Monorepo with docs and workflow |
| Live demo link | Hosted frontend |
| Screenshot of tests | Terminal output after green tests |
| CI badge or workflow file | Included in README or repo |
| Demo video | 1-minute workflow video |
| Privacy model section | Dedicated README section |
| Product proposal | Can be submitted from this doc |

## Risks and mitigation

### Tooling friction

Start from the official Midnight docs and build the smallest version first. Midnight provides tutorials for Compact and testing guidance, so follow that path before expanding features.

### Over-scoping

Do not turn this into a full identity platform. The best version is a single elegant gate with a strong privacy story.

### Weak frontend polish

Use a strong dark UI, one accent color, and clear state changes. A beautiful first impression helps a lot in challenge judging.

### Late CI issues

Add the workflow mid-build, not at the end. That way you catch failures while there is still time to fix them.

## Final recommendation

If you want the strongest project that can outperform competitors, build **VaultPass**. It is practical, privacy-native, visually impressive, and much easier to position as a real product than a standard voting app.

## Build order

1. Scaffold the repo and write the README skeleton.
2. Build the Compact gate contract.
3. Add private credential verification.
4. Write contract tests until green.
5. Add GitHub Actions.
6. Build the frontend proof flow.
7. Polish UI, deploy, record the demo, and submit.
