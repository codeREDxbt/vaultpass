"use client";

import { AlertCircle, CheckCircle2, Info, LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";

export type StatusTone = "neutral" | "info" | "success" | "warning" | "error" | "busy";

type StatusBannerProps = {
  tone?: StatusTone;
  title?: string;
  children: ReactNode;
  className?: string;
};

const toneStyles: Record<StatusTone, string> = {
  neutral: "border-white/10 bg-white/[0.02] text-white/70",
  info: "border-accent-soft/30 bg-accent/5 text-accent-faint",
  success: "border-accent-soft/30 bg-accent/5 text-accent-faint",
  warning: "border-amber-300/30 bg-amber-300/5 text-amber-100",
  error: "border-red-300/30 bg-red-300/5 text-red-100",
  busy: "border-accent-soft/30 bg-accent/5 text-accent-faint",
};

const toneIcons: Record<StatusTone, typeof AlertCircle> = {
  neutral: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: AlertCircle,
  busy: LoaderCircle,
};

export function StatusBanner({ tone = "neutral", title, children, className = "" }: StatusBannerProps) {
  const Icon = toneIcons[tone];
  return (
    <div
      className={`flex items-start gap-3 border p-4 text-sm leading-6 ${toneStyles[tone]} ${className}`}
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
    >
      <Icon
        size={17}
        className={`mt-0.5 shrink-0 ${tone === "busy" ? "animate-spin" : ""}`}
        aria-hidden="true"
      />
      <div className="min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? "mt-1" : ""}>{children}</div>
      </div>
    </div>
  );
}

type StageBadgeProps = {
  label: string;
  tone?: StatusTone;
};

export function StageBadge({ label, tone = "neutral" }: StageBadgeProps) {
  const dot =
    tone === "success"
      ? "bg-accent"
      : tone === "error"
        ? "bg-red-300"
        : tone === "warning"
          ? "bg-amber-300"
          : tone === "busy"
            ? "bg-accent animate-pulse"
            : "bg-white/30";

  const shell =
    tone === "success"
      ? "border-accent-soft/40 bg-accent/10 text-accent-faint"
      : tone === "error"
        ? "border-red-300/40 bg-red-300/10 text-red-200"
        : tone === "warning"
          ? "border-amber-300/40 bg-amber-300/10 text-amber-100"
          : tone === "busy"
            ? "border-accent-soft/40 bg-accent/10 text-accent-faint"
            : "border-white/15 bg-white/[0.03] text-white/60";

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${shell}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  );
}
