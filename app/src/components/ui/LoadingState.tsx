"use client";

import type { ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

type LoadingStateProps = {
  label?: string;
  detail?: string;
  compact?: boolean;
  className?: string;
};

export function LoadingState({
  label = "Loading",
  detail,
  compact = false,
  className = "",
}: LoadingStateProps) {
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 text-sm text-white/65 ${className}`} role="status" aria-live="polite">
        <LoaderCircle size={16} className="animate-spin text-accent-muted" aria-hidden="true" />
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div className={`border border-white/10 bg-white/[0.02] p-6 sm:p-8 ${className}`} role="status" aria-live="polite">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent-soft/40 text-accent-muted" aria-hidden="true">
          <LoaderCircle size={22} className="animate-spin" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-muted">Working</p>
          <p className="mt-2 text-lg font-semibold text-white">{label}</p>
          {detail && <p className="mt-2 text-sm leading-6 text-white/55">{detail}</p>}
        </div>
      </div>
      <div className="mt-6 space-y-2" aria-hidden="true">
        <div className="h-2 w-full animate-pulse bg-white/10" />
        <div className="h-2 w-[80%] animate-pulse bg-white/10" />
        <div className="h-2 w-[65%] animate-pulse bg-white/10" />
      </div>
    </div>
  );
}

export function PageLoadingFallback({ title = "Loading page" }: { title?: string }) {
  return (
    <main className="flex-1 px-5 pb-20 pt-32 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-5xl">
        <LoadingState label={title} detail="Preparing the VaultPass interface for this route." />
      </div>
    </main>
  );
}

type BusyButtonContentProps = {
  busy: boolean;
  busyLabel: string;
  idleLabel: ReactNode;
  icon?: ReactNode;
};

export function BusyButtonContent({ busy, busyLabel, idleLabel, icon }: BusyButtonContentProps) {
  if (busy) {
    return (
      <>
        <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />
        {busyLabel}
      </>
    );
  }
  return (
    <>
      {icon}
      {idleLabel}
    </>
  );
}
