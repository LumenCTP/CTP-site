import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageShell } from "../../components/PageShell";

export const Route = createFileRoute("/partners/")({
  head: () => ({
    meta: [
      { title: "Partner Program | ClearToPay Construction" },
      {
        name: "description",
        content:
          "Earn recurring revenue by referring construction companies to ClearToPay. Insurance agents get automated compliance for their clients — and a monthly commission for every referral.",
      },
    ],
  }),
  component: Partners,
});

const PARTNER_REGISTER_URL =
  "https://cleartopay.ctonew.app/app/partner/register";

/* ── Small icon set (stroke = currentColor) ── */
const IconShare = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
  </svg>
);
const IconRocket = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const IconDollar = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1v22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const IconHandshake = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>
);
const IconChart = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <path d="m7 13 4-4 4 4 5-6" />
    <path d="M17 7h4v4" />
  </svg>
);
const IconBadge = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const IconCheck = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IconChevron = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

function PartnerButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={PARTNER_REGISTER_URL}
      className={`btn-glow inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 ${className}`}
    >
      {children}
      <span aria-hidden="true" className="text-base leading-none">
        &rarr;
      </span>
    </a>
  );
}

function Partners() {
  return (
    <PageShell>
      {/* ═══════════ Hero ═══════════ */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-blue-50/70 via-white to-white py-20 sm:py-28">
        <div className="dot-pattern absolute inset-0 opacity-60"></div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Partner Program
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl lg:text-6xl">
            Earn recurring revenue by helping your clients stay compliant
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl">
            Refer construction companies to ClearToPay. They get automated
            compliance management. You earn a commission on every referral —
            every month they stay, you get paid.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PartnerButton>Become a Partner</PartnerButton>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600"
            >
              See how it works
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            No minimums. No technical skills required. Free to join.
          </p>
        </div>
      </section>

      {/* ═══════════ How It Works ═══════════ */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-6 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl">
            Three steps to a new revenue stream
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            You make the introduction. We handle everything else — onboarding,
            support, and compliance management for your clients.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              icon: <IconShare />,
              title: "You refer",
              body: "Share your unique referral link with construction companies you already work with — GCs, subs, developers.",
            },
            {
              step: "02",
              icon: <IconRocket />,
              title: "We onboard",
              body: "We set them up with vendor compliance tracking, document collection, and weekly Clear-to-Pay reports.",
            },
            {
              step: "03",
              icon: <IconDollar />,
              title: "You earn",
              body: "Receive recurring commission for every active client you referred. Monthly payouts, transparent tracking.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="card-lift relative rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm"
            >
              <span className="absolute right-6 top-6 text-5xl font-extrabold tracking-tight text-slate-100">
                {s.step}
              </span>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold tracking-[-0.01em] text-slate-900">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ Why Partner With ClearToPay? ═══════════ */}
      <section className="border-y border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Why Partner With ClearToPay?
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl">
              Built for insurance professionals
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              You already protect your clients' businesses. Now turn that trust
              into a dependable, recurring income stream.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <IconDollar />,
                title: "Recurring revenue",
                body: "Commission paid monthly for the life of each referred account — not a one-time finder's fee.",
              },
              {
                icon: <IconHandshake />,
                title: "Natural fit",
                body: "Insurance agents already advise on COIs, GL, workers' comp. Now monetize those relationships.",
              },
              {
                icon: <IconRocket />,
                title: "Zero extra work",
                body: "We handle all onboarding, support, and compliance management. You just make the introduction.",
              },
              {
                icon: <IconChart />,
                title: "Transparent tracking",
                body: "Real-time dashboard shows your referrals, their status, and your earnings — no guessing.",
              },
              {
                icon: <IconBadge />,
                title: "Your brand, our platform",
                body: "Co-branded materials available. Your clients see you as the compliance expert.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="card-lift rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold tracking-[-0.01em] text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {f.body}
                </p>
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-2xl border border-blue-100 bg-blue-50/70 p-8">
              <h3 className="text-lg font-bold tracking-[-0.01em] text-slate-900">
                Ready to get started?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Join in minutes and start referring right away. No minimums, no
                commitments.
              </p>
              <a
                href={PARTNER_REGISTER_URL}
                className="btn-glow mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700"
              >
                Become a Partner
                <span aria-hidden="true" className="text-base leading-none">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ Who This Is For ═══════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Who This Is For
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl">
            If you place coverage for construction, this is for you
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Independent insurance agents",
              body: "Placing COIs, GL, and workers' comp for construction clients. Add a reliable recurring income line alongside your book of business.",
            },
            {
              title: "Agency owners",
              body: "Looking to add a recurring SaaS revenue stream that strengthens client retention without adding headcount.",
            },
            {
              title: "Benefits consultants",
              body: "Advising construction firms on risk management. Deepen the relationship by covering their vendor compliance too.",
            },
          ].map((w) => (
            <div
              key={w.title}
              className="card-lift rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                <IconCheck />
              </div>
              <h3 className="text-lg font-bold tracking-[-0.01em] text-slate-900">
                {w.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl">
              Common questions
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {[
              {
                q: "What's the commission?",
                a: "Competitive recurring commission on every referred account. Contact us for details.",
              },
              {
                q: "How do I track my referrals?",
                a: "You get a personal dashboard with real-time referral status and earnings.",
              },
              {
                q: "Do I need technical skills?",
                a: "No. You share a link. We do everything else.",
              },
              {
                q: "Is there a minimum commitment?",
                a: "No minimum. Refer one client or fifty.",
              },
              {
                q: "How do I get paid?",
                a: "Monthly payouts via the platform.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200/60 bg-white shadow-sm open:border-blue-200 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="text-base font-semibold tracking-[-0.01em] text-slate-900">
                    {faq.q}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform duration-200 group-open:rotate-180">
                    <IconChevron />
                  </span>
                </summary>
                <p className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Bottom CTA ═══════════ */}
      <section className="relative overflow-hidden border-t border-blue-100 bg-gradient-to-b from-blue-50/70 to-white">
        <div className="dot-pattern absolute inset-0 opacity-60"></div>
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl">
            Ready to turn your client relationships into recurring revenue?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-500">
            Join the ClearToPay Partner Program today. Free to join, no
            minimums, and your first referral can be sent the moment you sign
            up.
          </p>
          <div className="mt-9">
            <PartnerButton>Become a Partner</PartnerButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
