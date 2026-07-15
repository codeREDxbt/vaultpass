"use client";

import { LoaderCircle } from "lucide-react";
import { progressDetail, progressLabel, type ProgressStage } from "@/lib/transaction-stages";

const ORDER: ProgressStage[] = ["preparing", "proving", "balancing", "awaiting_wallet", "submitted", "confirming", "confirmed"];

function stageIndex(stage: ProgressStage): number {
  const index = ORDER.indexOf(stage);
  return index >= 0 ? index : -1;
}

type ProgressPanelProps = {
  stage: ProgressStage;
  context?: "enroll" | "prove" | "deploy";
  message?: string;
};

export function ProgressPanel({ stage, context = "prove", message }: ProgressPanelProps) {
  const current = stageIndex(stage);
  const active = current >= 0 && stage !== "confirmed" && stage !== "error" && stage !== "idle";

  return (
    <div className="border border-white/10 bg-white/[0.02] p-5" role="status" aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Progress</p>
        <p className="text-xs font-semibold text-accent-faint">{progressLabel(stage, context)}</p>
      </div>
      <div className="mt-4 flex gap-1.5" aria-hidden="true">
        {ORDER.slice(0, 6).map((item, index) => {
          const done = current > index || stage === "confirmed";
          const here = current === index;
          return (
            <div
              key={item}
              className={`h-1 flex-1 ${done ? "bg-accent" : here ? "bg-accent/60 animate-pulse" : "bg-white/10"}`}
            />
          );
        })}
      </div>
      <div className="mt-4 flex items-start gap-3">
        {active && <LoaderCircle size={18} className="mt-0.5 shrink-0 animate-spin text-accent-muted" aria-hidden="true" />}
        <div>
          <p className="text-sm font-semibold text-white">{progressLabel(stage, context)}</p>
          <p className="mt-1 text-sm leading-6 text-white/55">{message || progressDetail(stage)}</p>
        </div>
      </div>
    </div>
  );
}
