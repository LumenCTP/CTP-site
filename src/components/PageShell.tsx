import type { ReactNode } from "react";

/* ── Shared sub-page shell: nav + footer matching the marketing site ── */

const productLinks = [
  { label: "We Do the Work", href: "/#we-do-the-work" },
  { label: "Monday Report", href: "/#monday-report" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Audits", href: "/#audit" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Partners With Us", href: "/partners" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Partner Terms", href: "/partners/terms" },
  { label: "Contact", href: "/contact" },
];

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-600/25">
        <svg
          className="h-8 w-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <g transform="translate(12,11) scale(0.45) translate(-12,-11)">
            <path d="M3.5 16a.8.8 0 0 0 .8.8h15.4a.8.8 0 0 0 .8-.8v-1a.8.8 0 0 0-.8-.8H4.3a.8.8 0 0 0-.8.8z" />
            <path d="M10.5 9.5V5.5a.8.8 0 0 1 .8-.8h1.4a.8.8 0 0 1 .8.8v4" />
            <path d="M5.5 13.5v-2.5a5 5 0 0 1 5-5" />
            <path d="M13.5 6a5 5 0 0 1 5 5v2.5" />
          </g>
        </svg>
      </span>
      <span className="text-xl font-extrabold tracking-tight text-slate-900">
        ClearToPay Construction
      </span>
    </a>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-slate-900 font-sans">
      {/* ═══════════ Navigation ═══════════ */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/85 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/65">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Logo />
          <div className="flex items-center gap-3">
            <a
              href="https://cleartopay-dev.ctonew.app/app/login"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
            >
              Sign In
            </a>
            <a
              href="/get-started"
              className="btn-glow rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </nav>

      {children}

      {/* ═══════════ Footer ═══════════ */}
      <footer className="border-t border-slate-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Logo />
              <p className="mt-5 text-sm leading-relaxed text-slate-500">
                AI-powered vendor compliance management for construction
                companies. Never miss an expired document again.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Product
              </h4>
              <ul className="mt-5 space-y-3">
                {productLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Legal
              </h4>
              <ul className="mt-5 space-y-3">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Start Free Trial
              </h4>
              <p className="mt-5 text-sm leading-relaxed text-slate-500">
                Stop chasing compliance documents. Start building.
              </p>
              <a
                href="/get-started"
                className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                Start Free Trial
              </a>
            </div>
          </div>
          <div className="gradient-divider my-10"></div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <span className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} ClearToPay Construction. All
              rights reserved.
            </span>
            <span className="text-xs text-slate-400">
              Built for construction. Backed by AI.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Shared page header for legal/info pages ── */
export function PageHeader({
  eyebrow,
  title,
  lastUpdated,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-blue-50/60 via-white to-white py-16 sm:py-20">
      <div className="dot-pattern absolute inset-0 opacity-60"></div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-sm font-medium text-slate-500">
          Last updated: {lastUpdated}
        </p>
      </div>
    </section>
  );
}

/* ── Consistent content section for legal pages ── */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-xl font-bold tracking-[-0.01em] text-slate-900 sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}
