import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { MobileNav } from "../components/MobileNav";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — ClearToPay Construction" },
      {
        name: "description",
        content:
          "Choose your plan — $149/month month-to-month or $1,200/year billed annually. Start your 30-day free trial with a card on file.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.cleartopayconstruction.com/checkout" }],
  }),
  component: Checkout,
});

type Plan = "monthly" | "annual";

const PLAN_META: Record<Plan, { label: string; price: string; per: string; button: string; note: string; firstCharge: string }> = {
  monthly: {
    label: "Month-to-Month",
    price: "$149",
    per: "/month",
    button: "Start free trial — $149/month",
    note: "Billed monthly after your 30-day free trial. Cancel anytime.",
    firstCharge: "After 30-day trial ($149)",
  },
  annual: {
    label: "Annual Plan",
    price: "$1,200",
    per: "/year",
    button: "Start free trial — $1,200/year",
    note: "Billed once per year after your 30-day free trial. That's $100/month — save $588 vs. monthly.",
    firstCharge: "After 30-day trial ($1,200)",
  },
};

function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(() => {
    if (typeof window === "undefined") return "monthly";
    const p = new URLSearchParams(window.location.search).get("plan");
    return p === "annual" ? "annual" : "monthly";
  });
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") return "";
    // Prefill with the signed-in user's email (same-origin localStorage shared
    // with the app) so ownership verification on return is reliable.
    try {
      const raw = localStorage.getItem("cleartopay_user");
      if (raw) {
        const u = JSON.parse(raw);
        if (typeof u?.email === "string") return u.email;
      }
    } catch {
      // ignore
    }
    return "";
  });
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  // SSR-safe: window is undefined during server render, so read query params
  // (e.g. ?cancelled=1 after a Stripe cancel, ?registered=1 after signup)
  // inside an effect.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const qs = new URLSearchParams(window.location.search);
    if (qs.get("cancelled") === "1") setCancelled(true);
    if (qs.get("registered") === "1") setRegistered(true);
  }, []);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCancelled(false);
    setRegistered(false);
    setLoading(true);
    const emailValue = (emailRef.current?.value ?? "").trim();
    // Attach the signed-in session (if any) so the API can tie the checkout
    // session to the user's tenant (client_reference_id) for ownership
    // verification in /api/checkout/confirm.
    let token: string | null = null;
    try {
      token = localStorage.getItem("cleartopay_token");
    } catch {
      token = null;
    }
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ plan: selectedPlan, ...(emailValue ? { email: emailValue } : {}) }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.url) {
        setError(json.error || "Checkout could not be started. Please try again.");
        setLoading(false);
        return;
      }
      // Stash the session id so the app's confirm step works after the Stripe
      // redirect even if the ?session_id= query param gets stripped.
      try {
        localStorage.setItem("cleartopay_checkout_session", json.session_id);
      } catch {
        // localStorage unavailable — the URL ?session_id= param still works.
      }
      // Redirect to Stripe's hosted checkout page (card, Apple Pay, Google Pay,
      // Amazon Pay, Cash App Pay, Link — whichever Stripe shows for this
      // customer's device and location).
      window.location.href = json.url;
    } catch {
      setError("Unable to reach the checkout server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 font-sans">
      {/* ═══════════ Navigation ═══════════ */}
      <nav className="relative sticky top-0 z-50 border-b border-slate-200/60 bg-slate-900/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-600/25">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <g transform="translate(12,11) scale(0.45) translate(-12,-11)">
                  <path d="M3.5 16a.8.8 0 0 0 .8.8h15.4a.8.8 0 0 0 .8-.8v-1a.8.8 0 0 0-.8-.8H4.3a.8.8 0 0 0-.8.8z"/>
                  <path d="M10.5 9.5V5.5a.8.8 0 0 1 .8-.8h1.4a.8.8 0 0 1 .8.8v4"/>
                  <path d="M5.5 13.5v-2.5a5 5 0 0 1 5-5"/>
                  <path d="M13.5 6a5 5 0 0 1 5 5v2.5"/>
                </g>
              </svg>
            </span>
            <span className="hidden text-xl font-extrabold tracking-tight text-white sm:inline">ClearToPay Construction</span>
          </a>
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-2xl font-extrabold tracking-tight text-white sm:hidden">ClearToPay Construction</span>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="/app/login" className="hidden items-center py-3 text-sm font-medium text-slate-400 transition-colors hover:text-white lg:inline-flex">
              Sign In
            </a>
            <a href="/" className="hidden items-center py-3 text-sm font-medium text-slate-400 transition-colors hover:text-white md:inline-flex">
              &larr; Back to Home
            </a>
            <MobileNav
              dark
              links={[
                { label: "Back to Home", href: "/" },
                { label: "Get Started", href: "/get-started" },
                { label: "Sign In", href: "/app/login" },
              ]}
            >
              <a
                href="/get-started"
                className="btn-glow mt-2 flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700"
              >
                Get Started
              </a>
            </MobileNav>
          </div>
        </div>
      </nav>

      {/* ═══════════ Hero Banner ═══════════ */}
      <section className="hero-bg relative overflow-hidden bg-slate-900 py-20">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/images/roofing-crew.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
        }}>
          <div className="absolute inset-0 bg-slate-900/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90"></div>
        </div>
        <div className="grain-bg absolute inset-0"></div>
        <div className="dot-pattern absolute inset-0 opacity-[0.05]"></div>
        <div className="relative mx-auto max-w-3xl px-6 text-center animate-on-scroll">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Secure Checkout
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            Start your 30-day free trial — pick your plan and enter your card at
            checkout. Your card is kept on file but you won't be charged until
            your trial ends.
          </p>
        </div>
      </section>

      {/* ═══════════ Main Content ═══════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* ── Plan Selection ── */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900">Choose Your Plan</h2>
              <p className="mt-2 text-sm text-slate-700">
                Both plans include everything — weekly Clear-to-Pay reports, unlimited
                vendors, audit packages, AI document processing, and email support.
              </p>

              <div className="mt-8 space-y-5">
                {/* Monthly Plan */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan("monthly")}
                  className={`w-full rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                    selectedPlan === "monthly"
                      ? "border-blue-500 bg-blue-50/80 shadow-lg shadow-blue-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">Monthly</span>
                    {selectedPlan === "monthly" && (
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm">Selected</span>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-extrabold text-slate-900">$149</span>
                    <span className="text-slate-400 font-medium">/month</span>
                  </div>
                  <p className="mt-1 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">First Month Free</p>
                  <p className="mt-2 text-sm text-slate-500">Billed automatically each month after your free trial. Cancel anytime.</p>
                </button>

                {/* Annual Plan */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan("annual")}
                  className={`w-full rounded-2xl border-2 p-6 text-left transition-all duration-300 relative ${
                    selectedPlan === "annual"
                      ? "border-blue-500 bg-blue-50/80 shadow-lg shadow-blue-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div className="popular-badge absolute -top-3 right-4 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white shadow-lg">
                    Best Value
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">Annual</span>
                    {selectedPlan === "annual" && (
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm">Selected</span>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-extrabold text-slate-900">$1,200</span>
                    <span className="text-slate-400 font-medium">/year</span>
                  </div>
                  <p className="mt-1 inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">First Month Free</p>
                  <p className="mt-2 text-sm text-slate-500">That's $100/month, billed once a year after your free trial. Save $588 vs. monthly.</p>
                </button>
              </div>
            </div>

            {/* ── Payment ── */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
                <h2 className="text-2xl font-bold text-slate-900">Payment</h2>
                <p className="mt-2 text-sm text-slate-700">
                  Checkout is handled securely by <strong>Stripe</strong>. On the
                  Stripe checkout page you can pay with any of the following:
                </p>

                {/* Payment methods */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                    <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
                      <path d="M2.5 10h19" />
                      <path d="M6 15h4" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Credit / Debit Card</p>
                      <p className="text-xs text-slate-500">Visa, Mastercard, Amex, Discover</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                    <svg className="h-6 w-6 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 12.54c-.03-2.86 2.34-4.23 2.44-4.3-1.33-1.94-3.4-2.2-4.13-2.23-1.76-.18-3.44 1.04-4.33 1.04-.9 0-2.27-1.01-3.74-.99-1.92.03-3.7 1.12-4.68 2.84-2 3.47-.51 8.6 1.43 11.41.95 1.38 2.08 2.92 3.57 2.87 1.43-.06 1.97-.93 3.7-.93 1.72 0 2.21.93 3.72.9 1.54-.03 2.51-1.4 3.45-2.79 1.09-1.59 1.54-3.13 1.56-3.21-.03-.02-2.99-1.15-3.02-4.57zM14.17 3.9c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.34 1.72-.73.85-1.37 2.21-1.2 3.52 1.27.1 2.57-.65 3.36-1.62z"/>
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Apple Pay</p>
                      <p className="text-xs text-slate-500">Available in Safari on iPhone, iPad &amp; Mac</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                    <svg className="h-6 w-6 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1.2-12.3c-.3-.18-.7-.3-1.2-.3V5.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V7.4c-1.4.23-2.4 1.18-2.4 2.56 0 2.24 3.06 2.14 3.06 3.44 0 .5-.44.8-1.06.8-.77 0-1.4-.37-1.96-.99-.17-.2-.46-.22-.66-.05-.19.17-.21.46-.04.66.8.9 1.76 1.4 2.66 1.53v1.31c0 .28.22.5.5.5s.5-.22.5-.5V15.35c1.4-.24 2.4-1.2 2.4-2.57 0-2.35-3.06-2.24-3.06-3.45 0-.49.43-.79 1.05-.79.65 0 1.19.27 1.7.82.17.18.46.19.65.03.18-.17.19-.46.03-.65-.62-.66-1.4-1.13-2.17-1.32v-1.3c0-.28-.22-.5-.5-.5s-.5.22-.5.5V6.7c-.02 0 .02 0 0 0z"/>
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Google Pay</p>
                      <p className="text-xs text-slate-500">Available in Chrome on Android &amp; desktop</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                    <svg className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                      <text x="12" y="16.5" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor">a</text>
                      <path d="M6.5 18.2c3.4 1.1 7.6 1 11-.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Amazon Pay</p>
                      <p className="text-xs text-slate-500">Pay with your Amazon account</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                    <svg className="h-6 w-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="4.5" width="18" height="15" rx="4" />
                      <text x="12" y="16" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">$</text>
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Cash App Pay</p>
                      <p className="text-xs text-slate-500">Pay from your Cash App balance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                    <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Link</p>
                      <p className="text-xs text-slate-500">Fast checkout with Stripe Link</p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Stripe shows the payment methods available for your device and location.
                </p>

                {registered && (
                  <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    Account created — choose your plan to start your 30-day free
                    trial. Your card is entered at checkout but you won't be
                    charged until your trial ends.
                  </div>
                )}

                {cancelled && (
                  <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Checkout cancelled. No payment was taken — you can try again whenever
                    you're ready.
                  </div>
                )}

                <form onSubmit={handlePay} className="mt-8 space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="checkoutEmail" className="block text-sm font-semibold text-slate-700">
                      Email for your receipt <span className="font-normal text-slate-400">(optional)</span>
                    </label>
                    <input
                      id="checkoutEmail" name="email" type="email"
                      ref={emailRef}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="input-premium mt-2"
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Order summary */}
                  <div className="rounded-2xl bg-slate-50 p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{PLAN_META[selectedPlan].label}</span>
                      <span className="text-sm font-bold text-slate-900">{PLAN_META[selectedPlan].price}{PLAN_META[selectedPlan].per}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-slate-600">First month</span>
                      <span className="text-sm font-bold text-blue-600">Free</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-slate-600">First charge</span>
                      <span className="text-sm text-slate-500">{PLAN_META[selectedPlan].firstCharge}</span>
                    </div>
                    <p className="mt-4 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500">
                      {PLAN_META[selectedPlan].note} A card is required at checkout —
                      it stays on file and is only charged when your trial ends. Cancel
                      anytime before the trial ends and you'll never be charged.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow w-full rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/30 focus:outline-none focus:ring-4 focus:ring-blue-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Opening secure checkout..." : PLAN_META[selectedPlan].button}
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    Payments are processed by Stripe. We never see or store your card details.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ Footer ═══════════ */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-600/25">
                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <g transform="translate(12,11) scale(0.45) translate(-12,-11)">
                    <path d="M3.5 16a.8.8 0 0 0 .8.8h15.4a.8.8 0 0 0 .8-.8v-1a.8.8 0 0 0-.8-.8H4.3a.8.8 0 0 0-.8.8z"/>
                    <path d="M10.5 9.5V5.5a.8.8 0 0 1 .8-.8h1.4a.8.8 0 0 1 .8.8v4"/>
                    <path d="M5.5 13.5v-2.5a5 5 0 0 1 5-5"/>
                    <path d="M13.5 6a5 5 0 0 1 5 5v2.5"/>
                  </g>
                </svg>
              </span>
              <span className="text-lg font-extrabold tracking-tight text-blue-600">ClearToPay Construction</span>
            </a>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-sm text-slate-500 transition-colors hover:text-blue-600">Privacy Policy</a>
              <a href="/terms" className="text-sm text-slate-500 transition-colors hover:text-blue-600">Terms of Service</a>
              <a href="mailto:support@cleartopay.com" className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700">
                Questions? support@cleartopay.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
