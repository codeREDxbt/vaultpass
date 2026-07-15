import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  maxWidth?: "4xl" | "5xl" | "6xl" | "7xl";
};

const maxWidthClass = {
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
} as const;

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  children,
  maxWidth = "5xl",
}: PageShellProps) {
  return (
    <main className="flex-1 px-5 pb-20 pt-32 sm:px-8 sm:pt-36">
      <div className={`mx-auto ${maxWidthClass[maxWidth]}`}>
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-muted">{eyebrow}</p>
            )}
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-6xl">
              {title}
            </h1>
            {description && (
              <div className="mt-4 max-w-2xl text-base leading-7 text-white/60">{description}</div>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
        {children}
      </div>
    </main>
  );
}
