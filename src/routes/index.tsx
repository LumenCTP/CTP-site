import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";
import { MobileNav } from "../components/MobileNav";

const getBusinessName = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const cfg = JSON.parse(await readFile("site.json", "utf8")) as {
      businessName?: string;
    };
    return cfg.businessName?.trim() ?? "ClearToPay Construction";
  } catch {
    return "ClearToPay Construction";
  }
});

export const Route = createFileRoute("/")({
  loader: () => getBusinessName(),
  component: Home,
});

/* ── SVG icon components ── */
const IconSearch = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const IconDoc = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const IconChart = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const IconBell = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
const IconFolder = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);
const IconHardHat = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 16.5h20" />
    <path d="M6 16.5v-3a6 6 0 0 1 12 0v3" />
    <path d="M12 8V6" />
    <path d="M8 11V9.5" />
    <path d="M16 11V9.5" />
  </svg>
);
const IconShield = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
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
);
const IconClipboard = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);
const IconCheckCircle = () => (
  <svg
    className="h-5 w-5 shrink-0 text-blue-600"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);
const IconBanknote = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);
const IconAlertTriangle = () => (
  <svg
    className="h-4 w-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/* ── Shared pricing features (both plans) ── */
const pricingFeatures = [
  "Unlimited vendors",
  "All document types (COI, W-9, Workers' Comp, General Liability, etc.)",
  "AI-powered document extraction",
  "Weekly Clear-to-Pay reports",
  "Monthly compliance reports",
  "Audit-ready packages",
  "Email + chat support",
];

/* ── Inline conversion CTA (clean, centered — not a full section) ── */
function InlineCTA({
  note = "First month free · Set up in about an hour · Cancel anytime",
}: {
  note?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 text-center animate-on-scroll">
      <a
        href="/get-started"
        className="btn-glow inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-600/40"
      >
        Start Free Trial
        <span aria-hidden="true" className="text-lg leading-none">
          &rarr;
        </span>
      </a>
      <p className="mt-4 text-sm text-slate-500">{note}</p>
    </div>
  );
}

function Home() {
  const businessName = Route.useLoaderData();

  /* ── Scroll-spy: highlight the active section's nav link (vanilla IntersectionObserver) ── */
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("nav a[data-spy]")
    );
    const sections = links
      .map((link) => document.getElementById(link.dataset.spy ?? ""))
      .filter((el): el is HTMLElement => el !== null);

    if (links.length === 0 || sections.length === 0) return;

    const setActive = (activeId: string | null) => {
      for (const link of links) {
        const isActive = link.dataset.spy === activeId;
        link.classList.toggle("spy-active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    };

    // Spy band: a horizontal strip 40%–45% down the viewport. The section whose
    // top is nearest the band's top edge while intersecting it is "active".
    const observer = new IntersectionObserver(
      (entries) => {
        let bestId: string | null = null;
        let bestDist = Infinity;
        const refLine = window.innerHeight * 0.4;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const dist = Math.abs(entry.boundingClientRect.top - refLine);
          if (dist < bestDist) {
            bestDist = dist;
            bestId = (entry.target as HTMLElement).id;
          }
        }
        if (bestId) setActive(bestId);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-dvh bg-white text-slate-900 font-sans">
      {/* ═══════════ Navigation ═══════════ */}
      <nav className="relative sticky top-0 z-50 border-b border-slate-200/50 bg-white/85 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/65">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <a href="/" className="flex shrink-0 items-center gap-2.5">
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
            <span className="hidden text-xl font-extrabold tracking-tight text-blue-600 sm:inline">
              ClearToPay Construction
            </span>
          </a>
          {/* Mobile: brand centered at the top (replaces the header free-trial CTA on phones) */}
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-2xl font-extrabold tracking-tight text-blue-600 sm:hidden">
            ClearToPay Construction
          </span>
          <div className="hidden gap-6 text-sm font-medium text-slate-700 lg:flex">
            <a
              href="#we-do-the-work"
              data-spy="we-do-the-work"
              className="flex items-center py-3 transition-all duration-300 hover:text-blue-600"
            >
              We Do the Work
            </a>
            <a
              href="#monday-report"
              data-spy="monday-report"
              className="flex items-center py-3 transition-all duration-300 hover:text-blue-600"
            >
              Monday Report
            </a>
            <a
              href="#how-it-works"
              data-spy="how-it-works"
              className="flex items-center py-3 transition-all duration-300 hover:text-blue-600"
            >
              How It Works
            </a>
            <a
              href="#audit"
              data-spy="audit"
              className="flex items-center py-3 transition-all duration-300 hover:text-blue-600"
            >
              Audits
            </a>
            <a
              href="#pricing"
              data-spy="pricing"
              className="flex items-center py-3 transition-all duration-300 hover:text-blue-600"
            >
              Pricing
            </a>
            <a
              href="#contact"
              data-spy="contact"
              className="flex items-center py-3 transition-all duration-300 hover:text-blue-600"
            >
              Contact
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/app/login"
              className="hidden items-center py-3 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 lg:inline-flex"
            >
              Sign In
            </a>
            <a
              href="/get-started"
              className="btn-glow hidden sm:inline-flex items-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Start Free Trial
            </a>
            <MobileNav
              links={[
                { label: "We Do the Work", href: "#we-do-the-work" },
                { label: "Monday Report", href: "#monday-report" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Audits", href: "#audit" },
                { label: "Pricing", href: "#pricing" },
                { label: "Contact", href: "#contact" },
                { label: "Partners With Us", href: "/partners" },
                {
                  label: "Sign In",
                  href: "/app/login",
                },
              ]}
            >
              <a
                href="/get-started"
                className="btn-glow mt-2 flex min-h-12 items-center justify-center rounded-xl bg-white px-4 py-3 text-base font-semibold text-blue-600 shadow-md shadow-blue-900/25 transition-all hover:bg-blue-50"
              >
                Start Free Trial
              </a>
            </MobileNav>
          </div>
        </div>
      </nav>

      {/* ═══════════ Hero ═══════════ */}
      <section className="hero-bg relative flex min-h-[65dvh] items-center overflow-hidden bg-slate-900">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-slate-900/80 backdrop-brightness-50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/95"></div>
        </div>
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-[0.05]"></div>
        {/* Grain */}
        <div className="grain-bg absolute inset-0"></div>

        <div className="relative mx-auto w-full max-w-7xl px-6 py-14 sm:py-18">
          <div className="mx-auto max-w-5xl text-center">
            {/* Warning label — subtle and refined */}
            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/15 bg-red-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-red-300/80 backdrop-blur-sm">
              <IconAlertTriangle />
              One missing COI can cost you everything
            </span>

            <h1 className="mt-10 text-5xl font-black tracking-[-0.025em] text-white sm:text-6xl lg:text-7xl leading-[1.02]">
              We manage your subcontractor compliance so you know who is{" "}
              <span className="text-blue-400">Clear to Pay</span>.
            </h1>

            <p className="mt-8 text-lg leading-relaxed text-slate-300 sm:text-xl max-w-3xl mx-auto">
              We collect COIs, track expirations, follow up with vendors, send
              weekly payment-status reports, and organize your records for
              audit.
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/get-started"
                className="btn-glow w-full rounded-2xl bg-blue-600 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-600/40 sm:w-auto"
              >
                Start Free Trial
              </a>
              <a
                href="#how-it-works"
                className="w-full rounded-2xl border border-white/25 bg-white/5 px-10 py-5 text-lg font-semibold text-slate-200 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40 sm:w-auto"
              >
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ We Do The Work ═══════════ */}
      <section
        id="we-do-the-work"
        className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white py-14 sm:py-18"
      >
        <div className="dot-pattern absolute inset-0"></div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center animate-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              We Do The Work
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl sm:tracking-[-0.025em]">
              We chase the paperwork. You build the business.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              This is{" "}
              <strong className="font-semibold text-slate-700">not</strong>{" "}
              another piece of software you have to operate. We do the actual
              work — your vendors hear from us, not from you.
            </p>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <IconBell />,
                title: "We Contact Your Vendors Directly",
                desc: "We reach out to every vendor and their insurance agent to request the documents you need — so you never have to play phone tag.",
              },
              {
                icon: <IconDoc />,
                title: "We Request Missing Documents",
                desc: "Missing COI? W-9? Insurance certificate? We ask for it on your behalf, professionally and persistently, until it arrives.",
              },
              {
                icon: <IconClipboard />,
                title: "We Follow Up on Renewals Early",
                desc: "Before a policy expires, we're already on it. Renewals are requested and chased ahead of time, so coverage never lapses.",
              },
              {
                icon: <IconChart />,
                title: "We Track Every Expiration Date",
                desc: "Every COI, W-9, license, and policy date — tracked to the day. Nothing expires silently on your watch.",
              },
              {
                icon: <IconFolder />,
                title: "We Keep Files Audit-Ready",
                desc: "Organized, versioned, and searchable records, maintained continuously. When the auditor asks, your files are already in order.",
              },
              {
                icon: <IconHardHat />,
                title: "You Just Run Your Business",
                desc: "No chasing, no spreadsheets, no Monday-morning panic. You build. We handle compliance.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="card-lift group rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm"
              >
                <div className="feature-icon mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors duration-300 group-hover:bg-blue-700 group-hover:shadow-lg group-hover:shadow-blue-700/25 sm:h-14 sm:w-14 sm:rounded-2xl sm:bg-blue-50 sm:text-blue-600 sm:group-hover:bg-blue-600 sm:group-hover:text-white sm:group-hover:shadow-blue-600/25">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold tracking-[-0.01em] text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline CTA — after We Do the Work */}
      <InlineCTA />

      {/* ═══════════ Monday Report Mock ═══════════ */}
      <section
        id="monday-report"
        className="relative overflow-hidden bg-slate-50 py-14 sm:py-18"
      >
        <div className="dot-pattern absolute inset-0"></div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center animate-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              The Monday Report
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl sm:tracking-[-0.025em]">
              Every Monday morning, you know exactly who's clear to pay.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              One glance. Every vendor, every week. No spreadsheets, no digging
              through files.
            </p>
          </div>

          {/* Dashboard card */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 animate-on-scroll">
            {/* Card header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-8 py-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white sm:h-10 sm:w-10">
                  <IconShield />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Clear-to-Pay Report
                  </p>
                  <p className="text-xs text-slate-500">
                    Delivered every Monday &middot; 7:00 AM ET
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>6
                  Approved
                </span>
                <span className="inline-flex items-center gap-1.5 text-amber-600">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>4
                  Review
                </span>
                <span className="inline-flex items-center gap-1.5 text-red-500">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>3
                  Hold
                </span>
              </div>
            </div>

            {/* Three status columns */}
            <div className="grid md:grid-cols-3">
              {/* Clear to Pay */}
              <div className="border-b border-slate-100 p-8 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-sm font-black text-green-600">
                    ✓
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-green-700">
                    Clear to Pay
                  </h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {[
                    { name: "Apex Framing Co." },
                    { name: "Summit Electric" },
                    { name: "Cascade Plumbing" },
                    { name: "Ironclad Steel" },
                    { name: "BlueLine HVAC" },
                    { name: "Heritage Roofing" },
                  ].map((v) => (
                    <li
                      key={v.name}
                      className="flex items-center justify-between rounded-xl bg-green-50/80 px-4 py-3"
                    >
                      <span className="text-sm font-semibold text-slate-800">
                        {v.name}
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        ✓
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Review */}
              <div className="border-b border-slate-100 p-8 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-600">
                    ⚠
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Review
                  </h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {[
                    {
                      name: "Cornerstone Concrete",
                      note: "COI expires this Friday",
                    },
                    {
                      name: "Metro Glass &amp; Glazing",
                      note: "W-9 not yet received",
                    },
                    {
                      name: "Frontier Excavating",
                      note: "Workers' comp renewal pending",
                    },
                    {
                      name: "Lakeside Millwork",
                      note: "Umbrella limit below requirement",
                    },
                  ].map((v) => (
                    <li
                      key={v.name}
                      className="flex items-center justify-between rounded-xl bg-amber-50/80 px-4 py-3"
                    >
                      <div>
                        <span className="block text-sm font-semibold text-slate-800">
                          {v.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-amber-700">
                          {v.note}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-amber-600">
                        ⚠
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hold */}
              <div className="p-8">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-sm font-black text-red-500">
                    ✕
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-red-600">
                    Hold
                  </h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {[
                    {
                      name: "Harbor Drywall",
                      note: "No workers' comp on file",
                    },
                    { name: "NorthGate Paving", note: "COI expired June 2" },
                    {
                      name: "Redline Security",
                      note: "Business license lapsed",
                    },
                  ].map((v) => (
                    <li
                      key={v.name}
                      className="flex items-center justify-between rounded-xl bg-red-50/80 px-4 py-3"
                    >
                      <div>
                        <span className="block text-sm font-semibold text-slate-800">
                          {v.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-red-600">
                          {v.note}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-red-500">✕</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500 animate-on-scroll">
            Delivered to your inbox every Monday morning — PDF and Excel.
            Forward it to your project managers and you're done.
          </p>
        </div>
      </section>

      {/* Inline CTA — after Monday Report mock */}
      <InlineCTA note="See your vendors grouped exactly like this, every single Monday." />

      {/* ═══════════ Image Banner 1 ═══════════ */}
      <section className="relative h-80 sm:h-96 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/45 to-slate-900/75"></div>
        <div className="grain-bg absolute inset-0"></div>
        <div className="relative flex h-full items-center justify-center px-6">
          <p className="max-w-3xl text-center text-2xl font-extrabold text-white drop-shadow-2xl sm:text-3xl lg:text-4xl tracking-[-0.02em] animate-on-scroll">
            Every project. Every subcontractor. Every document. We track it all.
          </p>
        </div>
      </section>

      {/* ═══════════ How It Works ═══════════ */}
      <section id="how-it-works" className="py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              How It Works
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl sm:tracking-[-0.025em]">
              From vendor list to peace of mind — in five steps.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              You hand us the list. We handle everything after that.
            </p>
          </div>

          <div className="mt-20 flex flex-wrap items-start justify-center gap-y-16 sm:gap-x-6">
            {[
              {
                step: "01",
                title: "Send us your vendor list",
                desc: "Spreadsheet, CSV, or manual entry. We import every vendor and their requirements. Takes about an hour.",
                detail: "You've already got the list — just send it over.",
              },
              {
                step: "02",
                title: "We collect and monitor documents",
                desc: "We reach out to every vendor and insurance agent to gather COIs, W-9s, workers' comp, and everything else required.",
                detail: "Vendors hear from us — not from you.",
              },
              {
                step: "03",
                title: "We follow up on problems",
                desc: "Missing COI? Expiring next week? We handle it before it becomes your problem — with reminders and follow-ups.",
                detail: "Problems get solved, quietly, on our end.",
              },
              {
                step: "04",
                title: "You receive Monday's Clear-to-Pay report",
                desc: "Approved, Review, Hold. Every vendor, every week — delivered to your inbox with the reasons spelled out.",
                detail: "Forward it to your team. Done.",
              },
              {
                step: "05",
                title: "We maintain your audit history",
                desc: "Every document versioned, organized, and ready. When an audit comes up, your records are already in order.",
                detail: "Audit-ready from day one.",
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="relative flex w-full max-w-xs flex-col items-center text-center sm:w-[30%]"
              >
                {/* Vertical connector line — between items on desktop */}
                {(idx === 0 || idx === 1 || idx === 3) && (
                  <div
                    className="absolute left-1/2 top-14 -z-10 hidden h-[2px] w-full bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20 sm:block"
                    style={{ transform: "translateX(50%)" }}
                  ></div>
                )}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-2xl font-black text-white shadow-xl shadow-blue-600/25 ring-4 ring-blue-100/80">
                  {item.step}
                </div>
                <h3 className="mt-9 text-2xl font-bold tracking-[-0.015em] text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
                <p className="mt-4 inline-flex items-center rounded-full bg-blue-50 px-5 py-1.5 text-xs font-semibold text-blue-700 tracking-wide">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline CTA — after How It Works */}
      <InlineCTA note="Set up starts with one email. We'll import your vendors for you." />

      {/* ═══════════ Image Banner 2 ═══════════ */}
      <section className="relative h-80 sm:h-96 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-slate-900/80"></div>
        <div className="grain-bg absolute inset-0"></div>
        <div className="relative flex h-full items-center justify-center px-6">
          <p className="max-w-3xl text-center text-2xl font-extrabold text-white drop-shadow-2xl sm:text-3xl lg:text-4xl tracking-[-0.02em] animate-on-scroll">
            When the auditor calls, be ready in 5 minutes — not 5 days.
          </p>
        </div>
      </section>

      {/* ═══════════ Audit Section ═══════════ */}
      <section id="audit" className="relative py-14 sm:py-18 bg-white">
        <div className="dot-pattern absolute inset-0"></div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Audit Season
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl sm:tracking-[-0.025em]">
              Audit tomorrow? Your files are already ready.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              Insurance audits. OSHA inspections. GC prequalification. Bank
              bonding reviews. They all want the same thing: your documents,
              organized, complete, and ready. We keep them that way — so when
              they call, you're already done.
            </p>
          </div>

          {/* Key point — a real audit request, handled in minutes */}
          <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-blue-100 bg-blue-50/70 p-7 sm:p-9 animate-on-scroll">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/25 sm:h-14 sm:w-14">
                <IconSearch />
              </span>
              <div className="text-center sm:text-left">
                <p className="text-lg font-bold tracking-[-0.01em] text-slate-900">
                  A real audit request, handled in minutes
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Your auditor requests a date range — say,{" "}
                  <strong className="font-semibold text-slate-800">
                    Jan 15, 2025 through Jan 15, 2026
                  </strong>{" "}
                  — and receives every applicable COI, organized by vendor into
                  one audit-ready package. No digging through filing cabinets.
                  No frantic emails. No scrambling the night before.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <div className="card-lift flex flex-col rounded-2xl border border-slate-200/60 bg-white p-9 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white sm:h-14 sm:w-14 sm:bg-blue-50 sm:text-blue-600">
                <IconFolder />
              </div>
              <h3 className="text-xl font-bold tracking-[-0.015em] text-slate-900">
                Complete Audit Package
              </h3>
              <ul className="checkmark-list mt-6 flex-1 space-y-4 text-sm text-slate-600">
                <li>Every matching document, organized by vendor</li>
                <li>Vendor compliance summaries with status and dates</li>
                <li>Missing document report — what's still needed</li>
                <li>Expired document report with expiration dates</li>
                <li>Full audit trail of every document change</li>
                <li>Delivered as a single ZIP file, ready to share</li>
              </ul>
            </div>
            <div className="card-lift flex flex-col rounded-2xl border border-slate-200/60 bg-white p-9 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white sm:h-14 sm:w-14 sm:bg-blue-50 sm:text-blue-600">
                <IconSearch />
              </div>
              <h3 className="text-xl font-bold tracking-[-0.015em] text-slate-900">
                Search Anything, Instantly
              </h3>
              <ul className="checkmark-list mt-6 flex-1 space-y-4 text-sm text-slate-600">
                <li>Search by client, vendor, or document type</li>
                <li>Filter by date range — pull everything from Q4 2025</li>
                <li>Find by policy number or insurance carrier</li>
                <li>Results in seconds, not hours</li>
                <li>
                  Every document version preserved — nothing is ever overwritten
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Inline CTA — after Audit */}
      <InlineCTA note="When the auditor calls, you'll already be done. Start your free trial." />

      {/* ═══════════ Document Types ═══════════ */}
      <section className="py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <h2 className="text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl sm:tracking-[-0.025em]">
              Every document type your project requires
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              Standard or custom — if your vendors need it, we track it.
            </p>
          </div>

          <div className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                doc: "Certificate of Insurance (COI)",
                icon: <IconShield />,
                detail:
                  "The cornerstone. We check the holder, additional insured endorsements, and every date.",
              },
              {
                doc: "W-9 Form",
                icon: <IconDoc />,
                detail:
                  "No more IRS surprises. Every vendor's W-9, verified and filed.",
              },
              {
                doc: "Workers' Compensation",
                icon: <IconHardHat />,
                detail:
                  "If a sub's coverage lapses and someone gets hurt, it's on you. Never let it lapse.",
              },
              {
                doc: "General Liability",
                icon: <IconShield />,
                detail:
                  "The policy that protects you when their work causes damage. Tracked to the day.",
              },
              {
                doc: "Commercial Auto",
                icon: <IconBanknote />,
                detail:
                  "Every truck, van, and vehicle on your site — insured and verified.",
              },
              {
                doc: "Umbrella / Excess Liability",
                icon: <IconShield />,
                detail:
                  "When standard limits aren't enough. We track the excess layers too.",
              },
              {
                doc: "Business License",
                icon: <IconClipboard />,
                detail:
                  "Is your electrical sub actually licensed? We verify and track renewals.",
              },
              {
                doc: "Custom Documents",
                icon: <IconFolder />,
                detail:
                  "Bonding letters. Safety programs. EMR letters. Add anything your project demands.",
              },
            ].map((item) => (
              <div
                key={item.doc}
                className="doc-card-lift group flex flex-col rounded-2xl border border-slate-200/50 bg-white p-6"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition-all duration-300 group-hover:bg-blue-700 group-hover:shadow-sm sm:bg-slate-50 sm:text-slate-500 sm:group-hover:bg-blue-50 sm:group-hover:text-blue-600 sm:group-hover:shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold leading-snug text-slate-900">
                  {item.doc}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Pricing ═══════════ */}
      <section id="pricing" className="relative py-14 sm:py-18 bg-white">
        <div className="dot-pattern absolute inset-0"></div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Pricing
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl sm:tracking-[-0.025em]">
              Simple pricing. Serious protection.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              Everything you need to keep every vendor compliant — no per-vendor
              fees, no hidden costs.
            </p>
          </div>

          <div className="mx-auto mt-24 grid max-w-5xl items-stretch gap-8 lg:grid-cols-2">
            {/* Month-to-Month */}
            <div className="card-lift flex flex-col rounded-2xl border border-slate-200/60 bg-white p-10 shadow-sm">
              <h3 className="text-lg font-bold tracking-[-0.01em] text-slate-900">
                Month-to-Month
              </h3>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-[-0.02em] text-slate-900">
                  $149
                </span>
                <span className="text-sm font-medium text-slate-500">
                  /month
                </span>
              </div>
              <div className="mt-6 space-y-1.5">
                <p className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
                  First Month Free
                </p>
                <p className="text-sm text-slate-500">Billed automatically each month after your free trial. Cancel anytime.</p>
              </div>
              <ul className="mt-8 flex-1 space-y-3.5 text-sm text-slate-600">
                {pricingFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <IconCheckCircle />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/get-started"
                className="mt-10 inline-flex justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600"
              >
                Start Your Free Month
              </a>
            </div>

            {/* Annual Plan */}
            <div className="card-lift relative flex flex-col rounded-2xl border-2 border-blue-600 bg-white p-10 pt-12 shadow-xl shadow-blue-600/15 lg:scale-[1.03]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/30">
                Best Value
              </div>
              <h3 className="text-lg font-bold tracking-[-0.01em] text-slate-900">
                Annual Plan
              </h3>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-[-0.02em] text-slate-900">
                  $1,200
                </span>
                <span className="text-sm font-medium text-slate-500">
                  /year
                </span>
              </div>
              <div className="mt-6 space-y-1.5">
                <p className="inline-flex rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white">
                  First Month Free
                </p>
                <p className="text-sm font-bold text-blue-600">
                  That's $100/month, billed once a year after your free trial. Save $588 vs. monthly.
                </p>
              </div>
              <ul className="mt-8 flex-1 space-y-3.5 text-sm text-slate-600">
                {pricingFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <IconCheckCircle />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/get-started"
                className="btn-glow mt-10 inline-flex justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700"
              >
                Start Your Free Month
              </a>
            </div>
          </div>

          <p className="mt-12 text-center text-sm text-slate-500 animate-on-scroll">
            No contracts. No per-vendor fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section
        id="contact"
        className="hero-bg relative flex min-h-[50dvh] items-center overflow-hidden bg-slate-900 py-14 sm:py-18"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-slate-900/88"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent"></div>
        </div>
        <div className="grain-bg absolute inset-0"></div>
        <div className="dot-pattern absolute inset-0 opacity-[0.04]"></div>

        <div className="relative mx-auto max-w-4xl px-6 text-center animate-on-scroll">
          <h2 className="text-5xl font-black tracking-[-0.025em] text-white sm:text-6xl lg:text-7xl leading-[1.05]">
            Let us take compliance off your hands
          </h2>
          <p className="mt-10 text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto sm:text-xl">
            Stop spending Monday mornings chasing vendor documents. Stop
            worrying about what the auditor will find. Stop paying for uninsured
            subs.{" "}
            <strong className="text-white font-semibold">
              One platform. Zero missed deadlines. Every vendor, every document,
              every week.
            </strong>
          </p>
          <div className="mt-14 flex flex-col items-center gap-6">
            <a
              href="/get-started"
              className="btn-glow inline-flex rounded-2xl bg-blue-600 px-14 py-5 text-xl font-bold text-white shadow-2xl shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-blue-600/40 hover:scale-[1.03]"
            >
              Start Your Free Month
            </a>
            <p className="text-sm text-slate-400/80">
              First month free. Set up in under an hour. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ Footer ═══════════ */}
      <footer className="border-t border-slate-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
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
              <p className="mt-5 text-sm leading-relaxed text-slate-500">
                AI-powered vendor compliance management for construction
                companies. Never miss an expired document again.
              </p>
            </div>
            {/* Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Product
              </h4>
              <ul className="mt-5 space-y-1">
                <li>
                  <a
                    href="#we-do-the-work"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    We Do the Work
                  </a>
                </li>
                <li>
                  <a
                    href="#monday-report"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Monday Report
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#audit"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Audits
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/partners"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Partners With Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Company
              </h4>
              <ul className="mt-5 space-y-1">
                <li>
                  <a
                    href="/contact"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/partners"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Partners With Us
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/partners/terms"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Partner Terms
                  </a>
                </li>
                <li>
                  <a
                    href="/get-started"
                    className="inline-block py-3 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Get Started
                  </a>
                </li>
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
                className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                Start Free Trial
              </a>
            </div>
          </div>
          <div className="gradient-divider my-10"></div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <span className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} {businessName}. All rights
              reserved.
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
