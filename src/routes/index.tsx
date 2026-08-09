import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";

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
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const IconDoc = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);
const IconChart = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconBell = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
);
const IconFolder = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconHardHat = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 16.5h20"/><path d="M6 16.5v-3a6 6 0 0 1 12 0v3"/><path d="M12 8V6"/><path d="M8 11V9.5"/><path d="M16 11V9.5"/>
  </svg>
);
const IconShield = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconClipboard = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
);
const IconCheckCircle = () => (
  <svg className="h-5 w-5 shrink-0 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
  </svg>
);
const IconBanknote = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>
  </svg>
);
const IconAlertTriangle = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

function Home() {
  const businessName = Route.useLoaderData();

  return (
    <div className="min-h-dvh bg-white text-slate-900 font-sans">

      {/* ═══════════ Navigation ═══════════ */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/85 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/65">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-sm shadow-blue-600/25">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 24s11-4 11-12.5V2.5l-11-2.5-11 2.5v9.5c0 8.5 11 12.5 11 12.5z"/><path d="M7 15a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-.7a.5.5 0 0 0-.5-.5H7.5a.5.5 0 0 0-.5.5z"/><path d="M11.5 9V5.5a.5.5 0 0 1 .5-.5h0a.5.5 0 0 1 .5.5V9"/><path d="M7.5 12.5v-2a3 3 0 0 1 4-3.5"/><path d="M12.5 7a3 3 0 0 1 4 3.5v2"/>
              </svg>
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">ClearToPay Construction</span>
          </a>
          <div className="hidden gap-8 text-sm font-medium text-slate-700 md:flex">
            <a href="#problem" className="transition-colors hover:text-blue-600">The Problem</a>
            <a href="#features" className="transition-colors hover:text-blue-600">How We Fix It</a>
            <a href="#how-it-works" className="transition-colors hover:text-blue-600">How It Works</a>
            <a href="#audit" className="transition-colors hover:text-blue-600">Audits</a>
            <a href="#contact" className="transition-colors hover:text-blue-600">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://cleartopay.ctonew.app/app/login" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600">
              Sign In
            </a>
            <a href="https://cleartopay.ctonew.app/app/register" className="btn-glow rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30">
              Get Protected
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════ Hero ═══════════ */}
      <section className="hero-bg relative flex min-h-[92dvh] items-center overflow-hidden bg-slate-900">
        {/* Background image */}
        <div className="absolute inset-0" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center'
        }}>
          <div className="absolute inset-0 bg-slate-900/80 backdrop-brightness-50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/95"></div>
        </div>
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-[0.05]"></div>
        {/* Grain */}
        <div className="grain-bg absolute inset-0"></div>

        <div className="relative mx-auto w-full max-w-7xl px-6 py-28 sm:py-36">
          <div className="mx-auto max-w-5xl text-center">
            {/* Warning label — subtle and refined */}
            <span className="inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400 backdrop-blur-sm">
              <IconAlertTriangle />
              One missing COI can cost you everything
            </span>

            <h1 className="mt-10 text-6xl font-black tracking-[-0.025em] text-white sm:text-7xl lg:text-8xl leading-[0.95]">
              A single expired W-9 or lapsed COI can{" "}
              <span className="text-red-400">cost you thousands</span>
              {" "}in fines, stopped work, and failed audits
            </h1>

            <p className="mt-10 text-lg leading-relaxed text-slate-300 sm:text-xl max-w-3xl mx-auto">
              General contractors lose an average of{" "}
              <strong className="text-white font-semibold">$12,000 per audit failure</strong>.
              One subcontractor without workers' comp? That's on you. One expired
              certificate of insurance? Your project stops.{" "}
              <strong className="text-blue-300 font-semibold">{businessName}</strong>{" "}
              handles all of it — so you never have to think about compliance again.
            </p>

            {/* Stat badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <div className="stat-badge glass-card rounded-2xl px-6 py-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Avg Audit Failure Cost</span>
                <p className="mt-1 text-3xl font-extrabold text-white tracking-tight">$12,000</p>
              </div>
              <div className="stat-badge glass-card rounded-2xl px-6 py-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Expired Docs Found in Audit</span>
                <p className="mt-1 text-3xl font-extrabold text-red-400 tracking-tight">47 docs</p>
              </div>
              <div className="stat-badge glass-card rounded-2xl px-6 py-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Manual Checking Per Week</span>
                <p className="mt-1 text-3xl font-extrabold text-white tracking-tight">6 hours</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="https://cleartopay.ctonew.app/app/register" className="btn-glow w-full rounded-2xl bg-blue-600 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-600/40 sm:w-auto">
                Let Us Take This Off Your Hands
              </a>
              <a href="#problem" className="w-full rounded-2xl border border-white/20 bg-white/5 px-10 py-5 text-lg font-semibold text-slate-200 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 sm:w-auto">
                See What's at Stake
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ The Problem ═══════════ */}
      <section id="problem" className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">The Problem</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl sm:tracking-[-0.025em]">
              This is what keeps general contractors up at night
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              And it happens more often than anyone wants to admit.
            </p>
          </div>

          <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "The Expired COI That Stopped a $4M Project",
                desc: "A framing subcontractor's general liability policy lapsed on a Tuesday. Nobody noticed. On Wednesday, an OSHA inspector showed up. The GC was fined $18,500 and the project was shut down for 11 days.",
                cost: "$18,500 fine + 11 days lost",
              },
              {
                title: "The Missing W-9 That Triggered an IRS Audit",
                desc: "A plumbing sub never submitted a W-9. Two years of 1099s were filed wrong. The IRS came knocking. The GC spent $34,000 on accountants, penalties, and back taxes — for one missing form.",
                cost: "$34,000 in penalties and fees",
              },
              {
                title: "The Workers' Comp Certificate Nobody Checked",
                desc: "A drywall crew's workers' comp expired mid-project. A worker got injured. The claim went to the GC's policy instead — because the sub wasn't covered. Premiums doubled for the next three years.",
                cost: "3 years of doubled premiums",
              },
              {
                title: "The Audit That Found 47 Expired Documents",
                desc: "A mid-size commercial GC faced their annual insurance audit. The auditor found 47 expired certificates across 23 vendors. The result? Their umbrella policy was revoked, and bonding capacity was cut by 60%.",
                cost: "Revoked policy + 60% less bonding",
              },
              {
                title: "The Monday Morning Surprise",
                desc: "Every Monday, an office manager spends 6 hours manually checking vendor files, sending emails, and building a spreadsheet of who can be paid — only to miss three expiring certificates. Again.",
                cost: "6 hours/week. Every week. Forever.",
              },
              {
                title: "The Subcontractor Who Was Never Insured",
                desc: "A new electrical sub was added to the project in a rush. Nobody verified their COI. They were never insured. When a panel caught fire causing $200K in damage, the GC's own policy had to cover every cent.",
                cost: "$200,000 uncovered claim",
              },
            ].map((item) => (
              <div key={item.title} className="card-lift group flex flex-col rounded-2xl border border-slate-200/70 bg-white p-8">
                <h3 className="text-base font-bold leading-snug text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                <div className="cost-badge mt-6 inline-flex items-center gap-2 self-start rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-400">
                  <IconAlertTriangle />
                  {item.cost}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Image Banner 1 ═══════════ */}
      <section className="relative h-80 sm:h-96 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center 30%'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/45 to-slate-900/75"></div>
        <div className="grain-bg absolute inset-0"></div>
        <div className="relative flex h-full items-center justify-center px-6">
          <p className="max-w-3xl text-center text-2xl font-extrabold text-white drop-shadow-2xl sm:text-3xl lg:text-4xl tracking-[-0.02em] animate-on-scroll">
            Every project. Every subcontractor. Every document. We track it all.
          </p>
        </div>
      </section>

      {/* ═══════════ The Fix / Features ═══════════ */}
      <section id="features" className="relative py-28 sm:py-36 bg-white">
        <div className="dot-pattern absolute inset-0"></div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">The Fix</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl sm:tracking-[-0.025em]">
              We take compliance off your hands. Completely.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              No more spreadsheets. No more chasing vendors. No more Monday morning panic.
            </p>
          </div>

          <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <IconDoc />, title: "AI Reads Every Document", desc: "COIs, W-9s, workers' comp, general liability, commercial auto, umbrella, business licenses — drop them in and our AI extracts every field. Vendor name, carrier, policy number, effective date, expiration date. Automatically." },
              { icon: <IconSearch />, title: "Nothing Slips Through", desc: "Every document is checked. Every expiration date is tracked. Every vendor is evaluated against your specific requirements. If anything is missing, expired, or expiring this week — you'll know before it becomes a problem." },
              { icon: <IconChart />, title: "Monday Morning Report — Every Week", desc: "Every Monday by 6 AM, you get a Clear-to-Pay Report showing exactly which vendors are approved for payment for the entire week. PDF and Excel. Forward it to your project managers. Done." },
              { icon: <IconBell />, title: "We Chase Your Vendors, Not You", desc: "We remember who submitted each document. At 30, 15, 7, and 0 days before expiration, we send them automated reminders. They hear from us — not from you. You stay focused on building." },
              { icon: <IconFolder />, title: "Audit-Ready in 5 Minutes", desc: "When the auditor calls, you don't panic. Select the client, vendor, document type, and date range. Download a complete ZIP with every document, vendor summaries, and compliance reports. Five minutes. Done." },
              { icon: <IconHardHat />, title: "Built for Construction, by People Who Get It", desc: "We understand retainage, pay-when-paid, joint checks, OCIPs, CCIPs, and the difference between a 201 and an additional insured endorsement. This isn't generic compliance software — it's built for your industry." },
            ].map((f) => (
              <div key={f.title} className="card-lift group rounded-2xl border border-slate-200/60 bg-white p-9 shadow-sm">
                <div className="feature-icon mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/25">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold tracking-[-0.01em] text-slate-900">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ How It Works ═══════════ */}
      <section id="how-it-works" className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">How It Works</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl sm:tracking-[-0.025em]">
              Three steps. That's it.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              From setup to peace of mind in less time than you think.
            </p>
          </div>

          <div className="mt-24 grid gap-12 sm:grid-cols-3 sm:gap-8">
            {[
              {
                step: "01",
                title: "We Set You Up",
                desc: "Tell us what documents your vendors need. COI? W-9? Workers' comp? Business license? We configure your requirements. Then we import your vendor list — from a spreadsheet, CSV, or manual entry. Takes about an hour.",
                detail: "Your dedicated onboarding specialist handles everything.",
              },
              {
                step: "02",
                title: "Documents Come In",
                desc: "Your vendors, their insurance agents, or your team email documents to your dedicated inbox. Our AI reads every one — extracts the data, checks for completeness, flags anything suspicious.",
                detail: "You don't sort, file, or review anything.",
              },
              {
                step: "03",
                title: "You Get the Answer",
                desc: "Every Monday morning: a Clear-to-Pay Report in your inbox. Approved. Review. Hold. That's it. You know exactly who can be paid. And when audit season comes, you're ready in minutes.",
                detail: "Six hours of manual work — gone. Every week.",
              },
            ].map((item, idx) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                {/* Vertical connector line — between items on desktop */}
                {idx < 2 && (
                  <div className="absolute left-1/2 top-14 -z-10 hidden h-[2px] w-full bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20 sm:block" style={{ transform: 'translateX(50%)' }}></div>
                )}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-2xl font-black text-white shadow-xl shadow-blue-600/25 ring-4 ring-blue-100/80">
                  {item.step}
                </div>
                <h3 className="mt-9 text-2xl font-bold tracking-[-0.015em] text-slate-900">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 max-w-xs">{item.desc}</p>
                <p className="mt-4 inline-flex items-center rounded-full bg-blue-50 px-5 py-1.5 text-xs font-semibold text-blue-700 tracking-wide">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Image Banner 2 ═══════════ */}
      <section className="relative h-80 sm:h-96 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center 40%'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-slate-900/80"></div>
        <div className="grain-bg absolute inset-0"></div>
        <div className="relative flex h-full items-center justify-center px-6">
          <p className="max-w-3xl text-center text-2xl font-extrabold text-white drop-shadow-2xl sm:text-3xl lg:text-4xl tracking-[-0.02em] animate-on-scroll">
            When the auditor calls, be ready in 5 minutes — not 5 days.
          </p>
        </div>
      </section>

      {/* ═══════════ Audit Section ═══════════ */}
      <section id="audit" className="relative py-28 sm:py-36 bg-white">
        <div className="dot-pattern absolute inset-0"></div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">Audit Season</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl sm:tracking-[-0.025em]">
              When the auditor calls, don't scramble
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              Insurance audits. OSHA inspections. GC prequalification. Bank bonding reviews. They all want the same thing: your documents, organized, complete, and ready. Here's what we deliver in under five minutes.
            </p>
          </div>

          <div className="mt-24 grid gap-8 sm:grid-cols-2">
            <div className="card-lift flex flex-col rounded-2xl border border-slate-200/60 bg-white p-9 shadow-sm">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <IconFolder />
              </div>
              <h3 className="text-xl font-bold tracking-[-0.015em] text-slate-900">Complete Audit Package</h3>
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
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <IconSearch />
              </div>
              <h3 className="text-xl font-bold tracking-[-0.015em] text-slate-900">Search Anything, Instantly</h3>
              <ul className="checkmark-list mt-6 flex-1 space-y-4 text-sm text-slate-600">
                <li>Search by client, vendor, or document type</li>
                <li>Filter by date range — pull everything from Q4 2025</li>
                <li>Find by policy number or insurance carrier</li>
                <li>Results in seconds, not hours</li>
                <li>Every document version preserved — nothing is ever overwritten</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ Document Types ═══════════ */}
      <section className="py-28 sm:py-36">
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
              { doc: "Certificate of Insurance (COI)", icon: <IconShield />, detail: "The cornerstone. We check the holder, additional insured endorsements, and every date." },
              { doc: "W-9 Form", icon: <IconDoc />, detail: "No more IRS surprises. Every vendor's W-9, verified and filed." },
              { doc: "Workers' Compensation", icon: <IconHardHat />, detail: "If a sub's coverage lapses and someone gets hurt, it's on you. Never let it lapse." },
              { doc: "General Liability", icon: <IconShield />, detail: "The policy that protects you when their work causes damage. Tracked to the day." },
              { doc: "Commercial Auto", icon: <IconBanknote />, detail: "Every truck, van, and vehicle on your site — insured and verified." },
              { doc: "Umbrella / Excess Liability", icon: <IconShield />, detail: "When standard limits aren't enough. We track the excess layers too." },
              { doc: "Business License", icon: <IconClipboard />, detail: "Is your electrical sub actually licensed? We verify and track renewals." },
              { doc: "Custom Documents", icon: <IconFolder />, detail: "Bonding letters. Safety programs. EMR letters. Add anything your project demands." },
            ].map((item) => (
              <div key={item.doc} className="doc-card-lift group flex flex-col rounded-2xl border border-slate-200/50 bg-white p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all duration-300 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold leading-snug text-slate-900">{item.doc}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section id="contact" className="hero-bg relative flex min-h-[80dvh] items-center overflow-hidden bg-slate-900 py-32 sm:py-40">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=1600&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center'
        }}>
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
            Stop spending Monday mornings chasing vendor documents. Stop worrying about
            what the auditor will find. Stop paying for uninsured subs.{" "}
            <strong className="text-white font-semibold">One platform. Zero missed deadlines. Every vendor, every document, every week.</strong>
          </p>
          <div className="mt-14 flex flex-col items-center gap-6">
            <a
              href="/get-started"
              className="btn-glow inline-flex rounded-2xl bg-blue-600 px-14 py-5 text-xl font-bold text-white shadow-2xl shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-blue-600/40 hover:scale-[1.03]"
            >
              Get Started Today
            </a>
            <p className="text-sm text-slate-400/80">
              We'll have you set up and running before your next audit.
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
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-sm shadow-blue-600/25">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 24s11-4 11-12.5V2.5l-11-2.5-11 2.5v9.5c0 8.5 11 12.5 11 12.5z"/><path d="M7 15a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-.7a.5.5 0 0 0-.5-.5H7.5a.5.5 0 0 0-.5.5z"/><path d="M11.5 9V5.5a.5.5 0 0 1 .5-.5h0a.5.5 0 0 1 .5.5V9"/><path d="M7.5 12.5v-2a3 3 0 0 1 4-3.5"/><path d="M12.5 7a3 3 0 0 1 4 3.5v2"/>
                  </svg>
                </span>
                <span className="text-lg font-extrabold tracking-tight text-slate-900">ClearToPay Construction</span>
              </a>
              <p className="mt-5 text-sm leading-relaxed text-slate-500">
                AI-powered vendor compliance management for construction companies. Never miss an expired document again.
              </p>
            </div>
            {/* Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Product</h4>
              <ul className="mt-5 space-y-3">
                <li><a href="#problem" className="text-sm text-slate-600 transition-colors hover:text-blue-600">The Problem</a></li>
                <li><a href="#features" className="text-sm text-slate-600 transition-colors hover:text-blue-600">Features</a></li>
                <li><a href="#how-it-works" className="text-sm text-slate-600 transition-colors hover:text-blue-600">How It Works</a></li>
                <li><a href="#audit" className="text-sm text-slate-600 transition-colors hover:text-blue-600">Audits</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Company</h4>
              <ul className="mt-5 space-y-3">
                <li><a href="#contact" className="text-sm text-slate-600 transition-colors hover:text-blue-600">Contact</a></li>
                <li><a href="/get-started" className="text-sm text-slate-600 transition-colors hover:text-blue-600">Get Started</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Get Protected</h4>
              <p className="mt-5 text-sm leading-relaxed text-slate-500">
                Stop chasing compliance documents. Start building.
              </p>
              <a href="/get-started" className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg">
                Get Started
              </a>
            </div>
          </div>
          <div className="gradient-divider my-10"></div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <span className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
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
