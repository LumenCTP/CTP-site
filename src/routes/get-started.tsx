import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { MobileNav } from "../components/MobileNav";

export const Route = createFileRoute("/get-started")({
  component: GetStarted,
});

type Plan = "monthly" | "annual";

function GetStarted() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>("monthly");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [referrer, setReferrer] = useState<string | null>(null);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Read the ?ref= partner referral code from the URL (if any) and, when valid,
  // show who is referring this signup. Invalid codes fail silently.
  // Guarded for SSR (window is undefined on the server).
  const refCode = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("ref")
    : null;

  useEffect(() => {
    if (!refCode) return;
    let cancelled = false;
    fetch(`/api/referrals/track?code=${encodeURIComponent(refCode)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && d?.partner?.name) setReferrer(d.partner.name);
      })
      .catch(() => {
        // Graceful failure — hide the banner if tracking is unavailable.
      });
    return () => {
      cancelled = true;
    };
  }, [refCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const firstName = firstNameRef.current?.value?.trim() || "";
    const lastName = lastNameRef.current?.value?.trim() || "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const companyName = companyNameRef.current?.value?.trim() || "";
    const email = emailRef.current?.value?.trim() || "";
    const password = passwordRef.current?.value || "";

    if (!firstName) {
      setError("Please enter your first name.");
      return;
    }
    if (!lastName) {
      setError("Please enter your last name.");
      return;
    }
    if (!companyName) {
      setError("Please enter your company name.");
      return;
    }
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          company_name: companyName,
          email,
          password,
          plan: selectedPlan,
          ...(refCode ? { referral_code: refCode } : {}),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Registration failed");
        setSubmitting(false);
        return;
      }

      // Save token so the user is auto-logged-in when they enter the setup wizard
      localStorage.setItem("cleartopay_token", json.token);
      localStorage.setItem("cleartopay_user", JSON.stringify(json.user));
    } catch {
      setError("Unable to reach registration server. Please try again.");
      setSubmitting(false);
      return;
    }

    // Registration creates a PENDING tenant. Redirect to the /checkout page on
    // the SAME host
    // (relative path) so the token stored in localStorage above survives the
    // navigation — the marketing site and the app share one origin
    // (e.g. cleartopay.ctonew.app/get-started → cleartopay.ctonew.app/app). A
    // hard-coded absolute URL would cross origins and drop the login token.
    // Checkout starts the 30-day free trial (card on file, no charge yet).
    window.location.href = `/checkout?plan=${selectedPlan}&registered=1`;
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
          {/* Mobile: brand centered at the top */}
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
          backgroundImage: "url('/images/framers.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
        }}>
          <div className="absolute inset-0 bg-slate-900/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90"></div>
        </div>
        <div className="grain-bg absolute inset-0"></div>
        <div className="dot-pattern absolute inset-0 opacity-[0.05]"></div>
        <div className="relative mx-auto max-w-3xl px-6 text-center animate-on-scroll">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Start Protecting Your Projects Today
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            Choose your plan and configure your account. Setup timing and audit
            readiness depend on the information and documents provided.
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
                Monthly or annual — both include everything you need.
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
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-extrabold text-slate-900">$149</span>
                    <span className="text-slate-400 font-medium">/month</span>
                  </div>
                  <p className="mt-1 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">First Month Free</p>
                  <p className="mt-2 text-sm text-slate-500">Billed automatically each month after your free trial. Cancel anytime.</p>
                  <ul className="mt-5 space-y-2.5 text-sm text-slate-600">
                    {["Clear-to-Pay reports every Monday", "Unlimited vendor tracking", "Audit packages on demand", "AI document processing", "Email support"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
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
                  {/* Best Value badge */}
                  <div className="popular-badge absolute -top-3 right-4 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white shadow-lg">
                    Best Value
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">Annual</span>
                    {selectedPlan === "annual" && (
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-extrabold text-slate-900">$1,200</span>
                    <span className="text-slate-400 font-medium">/year</span>
                  </div>
                  <p className="mt-1 inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">First Month Free</p>
                  <p className="mt-2 text-sm text-slate-500">That's $100/month, billed once a year after your free trial ends. Save $588 vs. monthly.</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    No payment today
                  </div>
                  <ul className="mt-5 space-y-2.5 text-sm text-slate-600">
                    {["Everything in Monthly", "Priority support", "Unlimited vendors"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </button>
              </div>
            </div>

            {/* ── Signup Form ── */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
                <h2 className="text-2xl font-bold text-slate-900">Your Information</h2>
                <p className="mt-2 text-sm text-slate-700">
                  We'll use this to set up your account and get you onboarded.
                </p>

                {referrer && (
                  <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                    <svg className="h-4 w-4 shrink-0 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    You're being referred by <strong>{referrer}</strong>. We'll notify them once your account is active.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="firstName" name="firstName" type="text" required
                        ref={firstNameRef}
                        placeholder="John"
                        className="input-premium mt-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="lastName" name="lastName" type="text" required
                        ref={lastNameRef}
                        placeholder="Smith"
                        className="input-premium mt-2"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-semibold text-slate-700">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="companyName" name="companyName" type="text" required
                      ref={companyNameRef}
                      placeholder="ABC Construction Co."
                      className="input-premium mt-2"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      ref={emailRef}
                      placeholder="john@abcconstruction.com"
                      className="input-premium mt-2"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="password" name="password" type="password" required
                      ref={passwordRef}
                      placeholder="At least 6 characters"
                      className="input-premium mt-2"
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="rounded-2xl bg-slate-50 p-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Order Summary</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        {selectedPlan === "annual" ? "Annual Plan" : "Month-to-Month"}
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {selectedPlan === "annual" ? "$1,200/year" : "$149/month"}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        {selectedPlan === "annual" ? "Billed once per year" : "Billed monthly"}
                      </span>
                      <span className="text-sm text-slate-500">
                        {selectedPlan === "annual" ? "after free trial" : "after free trial"}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium">Your first month</span>
                      <span className="text-sm font-bold text-blue-600">Free</span>
                    </div>
                    <div className="mt-4 border-t border-slate-200 pt-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">Due today</span>
                      <span className="text-2xl font-extrabold text-green-600">$0</span>
                    </div>
                  </div>

                  {/* Terms agreement */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-slate-600">
                      I agree to the{" "}
                      <a href="/terms" target="_blank" className="text-blue-600 underline hover:text-blue-700">Terms of Service</a>
                      {" "}and{" "}
                      <a href="/privacy" target="_blank" className="text-blue-600 underline hover:text-blue-700">Privacy Policy</a>.
                      {selectedPlan === "annual" ? " I understand I will be charged $1,200 once per year after my 30-day free trial." : " I understand I will be charged $149 each month after my 30-day free trial."}
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    id="stripe-checkout" type="submit"
                    disabled={submitting}
                    className="btn-glow w-full rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/30 focus:outline-none focus:ring-4 focus:ring-blue-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Creating your account..." : "Create My Account"}
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    You'll be redirected to start your 30-day free trial. Your card
                    is entered at checkout but you won't be charged until your trial
                    ends — no payment is required today.
                  </p>

                  <p className="text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <a
                      href="/app/login"
                      className="font-semibold text-blue-600 underline-offset-2 hover:underline"
                    >
                      Sign in →
                    </a>
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
              <span className="text-base font-bold tracking-tight text-slate-900">ClearToPay Construction</span>
            </a>
            <span className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} ClearToPay Construction. All rights reserved.
            </span>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="/" className="inline-block py-3 transition-colors hover:text-slate-600">Home</a>
              <a href="/#features" className="inline-block py-3 transition-colors hover:text-slate-600">Features</a>
              <a href="/#audit" className="inline-block py-3 transition-colors hover:text-slate-600">Audits</a>
              <a href="/#contact" className="inline-block py-3 transition-colors hover:text-slate-600">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
