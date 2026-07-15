"use client";

import { useEffect, useRef } from "react";
import { Check, Shield, X } from "lucide-react";
import type { WalletOption } from "@/lib/midnight-client";

type WalletConnectModalProps = {
  open: boolean;
  wallets: WalletOption[];
  selectedRdns?: string | null;
  onClose: () => void;
  onSelect: (wallet: WalletOption) => void;
};

function walletKey(wallet: WalletOption): string {
  return `${wallet.rdns}:${wallet.apiVersion}`;
}

function initials(name: string): string {
  return name.trim().slice(0, 2).toUpperCase() || "W";
}

export function WalletConnectModal({ open, wallets, selectedRdns, onClose, onSelect }: WalletConnectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-4 sm:items-center" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="w-full max-w-lg border border-white/15 bg-surface shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="wallet-modal-title" aria-describedby="wallet-modal-description">
        <div className="flex items-start justify-between border-b border-white/10 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-muted">Wallet connection</p>
            <h2 id="wallet-modal-title" className="mt-2 text-2xl font-bold text-white">Choose a wallet</h2>
            <p id="wallet-modal-description" className="mt-2 text-sm leading-6 text-white/60">Select the wallet you want to use for this Preview session. VaultPass will request permission only from that wallet.</p>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center text-white/60 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Close wallet selection"><X size={19} /></button>
        </div>

        <div className="space-y-3 p-6">
          {wallets.map((wallet) => {
            const selected = wallet.rdns === selectedRdns;
            return <button key={walletKey(wallet)} type="button" onClick={() => onSelect(wallet)} className={`flex min-h-16 w-full items-center gap-4 border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${selected ? "border-accent-soft/60 bg-accent/10" : "border-white/10 bg-white/[0.02] hover:border-accent-soft/40 hover:bg-accent/5"}`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 font-semibold text-accent-faint" aria-hidden="true">{initials(wallet.name)}</span>
              <span className="min-w-0 flex-1"><span className="block font-semibold text-white">{wallet.name}</span><span className="mt-1 block truncate font-mono text-xs text-white/45">{wallet.rdns} · API {wallet.apiVersion}</span></span>
              {selected ? <Check size={18} className="text-accent-muted" aria-label="Selected" /> : <Shield size={18} className="text-white/30" aria-hidden="true" />}
            </button>;
          })}
          {wallets.length === 0 && <div className="border border-amber-300/30 bg-amber-300/5 p-4 text-sm leading-6 text-amber-100">No compatible Midnight wallet is available. Enable Lace or 1AM, then reload this page.</div>}
        </div>
        <div className="border-t border-white/10 px-6 py-4 text-xs leading-5 text-white/45">Your wallet stays in the extension. VaultPass never receives your seed phrase or private keys.</div>
      </section>
    </div>
  );
}
