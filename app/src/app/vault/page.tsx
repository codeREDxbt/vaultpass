"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clipboard,
  FileLock2,
  KeyRound,
  Lock,
  ShieldCheck,
  Unlock,
} from "lucide-react";
import { gateUrl } from "@/lib/gate-store";
import { getGateAccess, type AccessSession } from "@/lib/access-session";
import { useGate } from "@/hooks/useGate";
import { PageShell } from "@/components/ui/PageShell";
import { LoadingState, PageLoadingFallback } from "@/components/ui/LoadingState";
import { StageBadge, StatusBanner } from "@/components/ui/StatusBanner";
import { ProofReference } from "@/components/ui/ProofReference";

/** Demo payload shown only after a confirmed proof session in this browser. */
const PROTECTED_PAYLOAD = {
  launchCode: "VP-GENESIS-7K9M-LAUNCH",
  channel: "midnight-moonshots-private",
  briefing:
    "Member briefing for this gate: you have proven allowlist membership without revealing your raw credential. Use the launch code below for the private channel check-in. Do not post the code publicly.",
  nextSteps: [
    {
      title: "Use the launch code",
      detail: "Copy the launch code above and use it as the access phrase for the private operator channel.",
    },
    {
      title: "One-time proof on-chain",
      detail: "This credential cannot be replayed on-chain. A used nullifier blocks a second successful verify_access.",
    },
    {
      title: "Keep the raw secret offline",
      detail: "Only the hash was enrolled. Do not post the raw credential in public chats or GitHub issues.",
    },
  ],
};

function VaultPageContent() {
  const searchParams = useSearchParams();
  const { gate, ready } = useGate({
    gate: searchParams.get("gate"),
    contract: searchParams.get("contract"),
    name: searchParams.get("name"),
    description: searchParams.get("description"),
    network: searchParams.get("network"),
  });
  const [access, setAccess] = useState<AccessSession | null>(null);
  const [accessReady, setAccessReady] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    if (!ready) return;
    setAccess(getGateAccess(gate.id));
    setAccessReady(true);
  }, [ready, gate.id]);

  const copyLaunchCode = async () => {
    try {
      await navigator.clipboard.writeText(PROTECTED_PAYLOAD.launchCode);
      setCodeCopied(true);
      window.setTimeout(() => setCodeCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  if (!ready || !accessReady) {
    return (
      <main className="flex-1 px-5 pb-20 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-4xl">
          <LoadingState label="Loading protected vault" detail="Checking gate configuration and session access." />
        </div>
      </main>
    );
  }

  const unlocked = Boolean(access);
  const published = gate.status === "published" && Boolean(gate.contractId);

  return (
    <PageShell
      eyebrow="Protected destination"
      title={unlocked ? `Welcome to ${gate.name}` : gate.name}
      description={
        unlocked
          ? gate.description
          : "Complete a private credential proof at the access gate to unlock this briefing for the current browser session."
      }
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <StageBadge
            label="Demo ACL (sessionStorage)"
            tone="warning"
          />
          <StageBadge
            label={unlocked ? "Unlocked this session" : published ? "Locked" : "Gate not published"}
            tone={unlocked ? "success" : published ? "warning" : "error"}
          />
        </div>
      }
      maxWidth="4xl"
    >
      <p className="mb-6 max-w-3xl border border-amber-300/20 bg-amber-300/[0.04] px-4 py-3 text-xs leading-5 text-amber-100/90">
        <strong className="font-semibold text-amber-50">Demo access control:</strong> vault unlock is a browser
        session flag after a confirmed on-chain proof—not a second cryptographic gate. Anyone who can write
        sessionStorage can forge this UI state. On-chain truth is the nullifier-backed <code className="font-mono">verify_access</code> proof.
      </p>
      <Link
        href={gateUrl(gate)}
        className="mb-8 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Back to gate
      </Link>

      {!unlocked ? (
        <div className="border border-amber-300/30 bg-amber-300/[0.04] p-7 sm:p-12">
          <div className="flex h-14 w-14 items-center justify-center border border-amber-300/40 text-amber-100" aria-hidden="true">
            <Lock size={28} />
          </div>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-amber-100">Access required</p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
            {gate.name} is locked
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
            The protected briefing, launch code, and member next steps stay hidden until VaultPass confirms a valid
            proof in this browser session.
          </p>
          {!published && (
            <div className="mt-6">
              <StatusBanner tone="warning" title="Gate not published">
                An operator still needs to deploy this gate and enroll credentials before members can unlock it.
              </StatusBanner>
            </div>
          )}
          <Link
            href={gateUrl(gate)}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 bg-accent px-6 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Open access gate <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border border-accent-soft/30 bg-accent/[0.06] p-7 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center border border-accent-soft/40 text-accent-muted" aria-hidden="true">
              <Unlock size={28} />
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-accent-muted">Unlocked destination</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">{PROTECTED_PAYLOAD.briefing}</p>

            {access?.txId && (
              <div className="mt-6">
                <StatusBanner tone="success" title="Session access confirmed">
                  <div className="space-y-3">
                    <ProofReference
                      value={access.txId}
                      label="Access proof transaction"
                      kind="transaction"
                      network={gate.network}
                    />
                    {(access.contractId || gate.contractId) && (
                      <ProofReference
                        value={access.contractId ?? gate.contractId!}
                        label="Gate contract"
                        kind="contract"
                        network={gate.network}
                      />
                    )}
                  </div>
                  <p className="mt-3 text-xs leading-5 text-accent-faint/80">
                    Use <strong className="font-semibold">View on explorer</strong> to verify on Midnight Explorer.
                    This vault view is session UX after that proof—not a second cryptographic gate. The chain is the
                    source of truth for eligibility.
                  </p>
                </StatusBanner>
              </div>
            )}
          </div>

          <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-muted">Member launch code</p>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Share only with people who already proved access. Treat this as the private payload for the demo.
            </p>
            <div className="mt-5 flex flex-col gap-4 border border-accent-soft/25 bg-accent/5 p-5 sm:flex-row sm:items-center sm:justify-between">
              <code className="break-all font-mono text-lg font-semibold tracking-wide text-accent-faint">
                {PROTECTED_PAYLOAD.launchCode}
              </code>
              <button
                type="button"
                onClick={() => void copyLaunchCode()}
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-accent-soft/40 px-4 text-sm font-semibold text-accent-faint transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {codeCopied ? <Check size={16} aria-hidden="true" /> : <Clipboard size={16} aria-hidden="true" />}
                {codeCopied ? "Copied" : "Copy launch code"}
              </button>
            </div>
            <p className="mt-4 text-sm text-white/50">
              Private channel: <span className="font-mono text-white/70">{PROTECTED_PAYLOAD.channel}</span>
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <p className="text-sm font-semibold text-white">Next steps for members</p>
            <ol className="mt-5 space-y-4">
              {PROTECTED_PAYLOAD.nextSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4 border border-white/10 bg-surface/40 p-4">
                  <span className="font-mono text-xs font-semibold text-accent-muted" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold tracking-normal text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 tracking-normal text-white/65">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="border border-white/10 bg-surface/60 p-5">
              <FileLock2 size={20} className="text-accent-muted" aria-hidden="true" />
              <p className="mt-5 text-sm font-semibold text-white">Private briefing</p>
              <p className="mt-2 text-xs leading-5 text-white/50">
                Access-controlled launch notes for {gate.name}.
              </p>
            </div>
            <div className="border border-white/10 bg-surface/60 p-5">
              <KeyRound size={20} className="text-accent-muted" aria-hidden="true" />
              <p className="mt-5 text-sm font-semibold text-white">Credential hidden</p>
              <p className="mt-2 text-xs leading-5 text-white/50">
                Only the access decision is carried into this experience.
              </p>
            </div>
            <div className="border border-white/10 bg-surface/60 p-5">
              <ShieldCheck size={20} className="text-accent-muted" aria-hidden="true" />
              <p className="mt-5 text-sm font-semibold text-white">
                {gate.oneTimeProof ? "One-time proof" : "Reusable access"}
              </p>
              <p className="mt-2 text-xs leading-5 text-white/50">
                {gate.oneTimeProof
                  ? "The gate prevents replay of a confirmed credential proof on-chain."
                  : "This gate allows reusable proofs according to its policy."}
              </p>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

export default function VaultPage() {
  return (
    <Suspense fallback={<PageLoadingFallback title="Loading protected vault" />}>
      <VaultPageContent />
    </Suspense>
  );
}
