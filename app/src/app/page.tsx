import Link from "next/link";
import {
  ArrowRight,
  EyeOff,
  KeyRound,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Connect privately",
    text: "Use a compatible Midnight wallet on Preview to start a gate check.",
  },
  {
    number: "02",
    icon: KeyRound,
    title: "Prove eligibility",
    text: "Generate a zero-knowledge proof without displaying your credential.",
  },
  {
    number: "03",
    icon: EyeOff,
    title: "Open the vault",
    text: "The gate records a valid decision, not the secret behind it.",
  },
];

const demoScript = [
  "Admin: connect Lace or 1AM on Preview",
  "Admin: save gate name and description",
  "Admin: deploy the gate and wait until Published",
  "Admin: generate credential → enroll hash → copy the secret",
  "Member: open the access gate link",
  "Member: connect wallet → paste secret → generate proof",
  "Member: open the protected vault for this browser session",
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44">
        <div className="mx-auto grid max-w-screen-2xl gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-accent-muted">
              Privacy-first access control
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.94] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Prove membership.
              <br />
              <span className="font-light italic text-accent-faint">Keep the secret.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              VaultPass verifies that a private credential is eligible for a gate without exposing the credential or
              your identity. Built as a Midnight Preview demo for private allowlist access.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/gate"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-accent px-6 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Enter as member <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/admin"
                className="inline-flex min-h-12 items-center justify-center border border-white/20 px-6 text-sm font-semibold text-white/75 transition-colors hover:border-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Open operator console
              </Link>
            </div>
            <p className="mt-4 text-xs leading-5 text-white/40">
              Members use the gate. Operators deploy and enroll credentials in Admin (also linked in the footer).
            </p>
          </div>
          <div className="border-l-2 border-accent pl-6 sm:pl-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">What becomes public</p>
            <p className="mt-5 font-mono text-lg leading-8 text-accent-faint">valid_proof: true</p>
            <p className="mt-2 font-mono text-lg leading-8 text-white/25">credential: hidden</p>
            <p className="font-mono text-lg leading-8 text-white/25">identity: hidden</p>
            <p className="mt-8 max-w-sm text-sm leading-6 text-white/60">
              The public result is deliberately narrow. Private witness inputs stay in the proof flow.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-b border-white/10 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-screen-2xl">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-muted">Two paths</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Who are you in this demo?
            </h2>
            <p className="mt-4 text-base leading-7 text-white/60">
              VaultPass has an operator side and a member side. Use the path that matches your role—or run both to
              complete a full demo.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <article className="border border-white/10 bg-white/[0.02] p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center border border-accent-soft/40 text-accent-muted" aria-hidden="true">
                  <UserRound size={22} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-muted">Members</p>
                  <h3 className="text-xl font-bold text-white">Prove and enter</h3>
                </div>
              </div>
              <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-6 text-white/65">
                <li>Receive a private credential from an operator (64 hex characters).</li>
                <li>Open the access gate and connect a Midnight wallet on Preview.</li>
                <li>Paste the credential and generate a private proof.</li>
                <li>Open the vault briefing unlocked for this browser session.</li>
              </ol>
              <Link
                href="/gate"
                className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 bg-accent px-5 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Go to access gate <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>

            <article className="border border-white/10 bg-white/[0.02] p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/70" aria-hidden="true">
                  <Wrench size={22} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Operators</p>
                  <h3 className="text-xl font-bold text-white">Deploy and enroll</h3>
                </div>
              </div>
              <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-6 text-white/65">
                <li>Connect the administrator wallet on Preview.</li>
                <li>Configure gate name and description, then deploy.</li>
                <li>Generate a credential, enroll its hash on-chain, share the raw secret privately.</li>
                <li>Send members the gate link—not the admin console.</li>
              </ol>
              <Link
                href="/admin"
                className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 border border-white/20 px-5 text-sm font-semibold text-white/80 transition-colors hover:border-accent-soft/50 hover:text-accent-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Open admin console <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-screen-2xl">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-muted">The access flow</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              A gate that explains itself.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map(({ number, icon: Icon, title, text }) => (
              <article
                key={number}
                className="border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-accent-soft/40"
              >
                <div className="flex items-start justify-between">
                  <Icon size={27} strokeWidth={1.5} className="text-accent-muted" aria-hidden="true" />
                  <span className="font-mono text-sm text-white/25">{number}</span>
                </div>
                <h3 className="mt-14 text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="demo-script" className="border-t border-white/10 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-screen-xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-muted">Judge / demo script</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white">
              Seven steps to a full run.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/60">
              Use this sequence for a live walkthrough. Wallet must be on the Preview network with the resources required
              to prove and submit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admin"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-accent-soft/50 px-5 text-sm font-semibold text-accent-faint transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Start as operator
              </Link>
              <Link
                href="/gate"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/15 px-5 text-sm font-semibold text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Start as member
              </Link>
            </div>
          </div>
          <ol className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            {demoScript.map((line, index) => (
              <li
                key={line}
                className={`flex gap-4 py-3 text-sm leading-6 text-white/70 ${index > 0 ? "border-t border-white/10" : ""}`}
              >
                <span className="font-mono text-xs text-accent-muted/80">{String(index + 1).padStart(2, "0")}</span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="privacy" className="border-t border-white/10 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-screen-xl gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-muted">Privacy model</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white">
              Selective disclosure, with plain language.
            </h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-white">The gate can learn</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                That a proof was submitted and whether the access decision succeeded.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">The gate does not need</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Your raw credential, your identity, or the rest of your wallet history.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">One-time protection</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Each gate can use a nullifier so a confirmed proof cannot be replayed on-chain.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Session unlock honesty</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                The vault page unlock is browser-session UX after a confirmed proof—not a second cryptographic gate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
