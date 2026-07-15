"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

/** Member-facing primary destinations only. Operators live in the footer. */
const links = [
  { href: "/", label: "Overview" },
  { href: "/gate", label: "Access gate" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setNavigating(false);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;
      if (href === pathname) return;
      setNavigating(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-surface/95 backdrop-blur-md" aria-label="Primary navigation">
      {navigating && (
        <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-white/5" role="status" aria-live="polite" aria-label="Loading page">
          <div className="nav-progress-bar h-full w-1/3 bg-accent" />
        </div>
      )}
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center bg-accent text-white" aria-hidden="true">
            <ShieldCheck size={20} strokeWidth={1.7} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">VaultPass</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? "text-accent-muted"
                  : "text-white/65 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {pathname !== "/gate" && (
            <Link
              href="/gate"
              className="hidden bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex"
            >
              Open gate
            </Link>
          )}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-white/75 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-surface px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded px-3 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    ? "bg-accent/10 text-accent-muted"
                    : "text-white/75 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/gate"
              onClick={() => setOpen(false)}
              className="mt-2 rounded border border-accent-soft/40 px-3 py-3 text-sm font-semibold text-accent-faint"
            >
              Open gate
            </Link>
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="rounded px-3 py-3 text-sm text-white/45 hover:text-white/70"
            >
              Operators · Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
