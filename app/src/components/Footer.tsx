import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface px-5 py-10 sm:px-8">
      <div className="mx-auto grid max-w-screen-xl gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-start">
        <div>
          <p className="text-sm font-semibold text-white/80">VaultPass</p>
          <p className="mt-2 max-w-md text-xs leading-5 text-white/45">
            Private membership verification on Midnight. Members prove eligibility without revealing credentials.
            Operators deploy gates and enroll allowlist hashes.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-xs sm:justify-items-end">
          <div className="space-y-2 sm:text-right">
            <p className="font-semibold uppercase tracking-[0.14em] text-white/35">Members</p>
            <Link href="/gate" className="block text-white/55 transition-colors hover:text-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Access gate
            </Link>
            <Link href="/#how-it-works" className="block text-white/55 transition-colors hover:text-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              How it works
            </Link>
            <Link href="/#privacy" className="block text-white/55 transition-colors hover:text-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Privacy model
            </Link>
          </div>
          <div className="space-y-2 sm:text-right">
            <p className="font-semibold uppercase tracking-[0.14em] text-white/35">Operators</p>
            <Link href="/admin" className="block text-white/55 transition-colors hover:text-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Admin console
            </Link>
            <Link href="/#demo-script" className="block text-white/55 transition-colors hover:text-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Demo script
            </Link>
            <a
              href="https://docs.midnight.network"
              target="_blank"
              rel="noreferrer"
              className="block text-white/55 transition-colors hover:text-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Midnight docs
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-screen-xl flex-col gap-4 border-t border-white/5 pt-6 text-[11px] leading-5 text-white/30 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl">
          Preview demo: vault session unlock is browser-local UX after a confirmed proof. On-chain truth is the proof
          transaction—not this page alone.
        </p>
        <p className="font-mono text-[10px] tracking-wider text-white/40">
          Made by Vinayak (codeREDxbt)
        </p>
      </div>
    </footer>
  );
}
