"use client";

import { LogOut, WalletCards } from "lucide-react";

type WalletSessionBarProps = {
  walletName?: string | null;
  address?: string | null;
  network?: string | null;
  busy?: boolean;
  onDisconnect: () => void;
  onSwitch?: () => void;
  className?: string;
};

function shortAddress(address: string): string {
  if (address.length <= 18) return address;
  return `${address.slice(0, 10)}…${address.slice(-6)}`;
}

export function WalletSessionBar({
  walletName,
  address,
  network,
  busy = false,
  onDisconnect,
  onSwitch,
  className = "",
}: WalletSessionBarProps) {
  return (
    <div
      className={`flex flex-col gap-3 border border-accent-soft/30 bg-accent/5 p-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="min-w-0 flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-accent/40 text-accent-muted" aria-hidden="true">
          <WalletCards size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-accent-faint">
            {walletName || "Wallet"} connected
            {network ? <span className="font-normal text-white/50"> · {network}</span> : null}
          </p>
          {address && (
            <p className="mt-1 break-all font-mono text-xs text-white/55" title={address}>
              {shortAddress(address)}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {onSwitch && (
          <button
            type="button"
            onClick={onSwitch}
            disabled={busy}
            className="inline-flex min-h-10 items-center justify-center border border-white/15 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Switch wallet
          </button>
        )}
        <button
          type="button"
          onClick={onDisconnect}
          disabled={busy}
          className="inline-flex min-h-10 items-center justify-center gap-2 border border-white/20 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-red-300/50 hover:bg-red-300/10 hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        >
          <LogOut size={14} aria-hidden="true" />
          Disconnect
        </button>
      </div>
    </div>
  );
}
