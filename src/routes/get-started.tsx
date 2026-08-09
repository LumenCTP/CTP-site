import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";

export const Route = createFileRoute("/get-started")({
  component: GetStarted,
});

type Plan = "monthly" | "annual";

function GetStarted() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>("monthly");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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

    // Registration creates a trial tenant. The app guard sends new users to setup.
    window.location.href = "https://cleartopay.ctonew.app/app";
  };

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 font-sans">

      {/* ═══════════ Navigation ═══════════ */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-slate-900/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M3.5 16a.8.8 0 0 0 .8.8h15.4a.8.8 0 0 0 .8-.8v-1a.8.8 0 0 0-.8-.8H4.3a.8.8 0 0 0-.8.8z"/><path d="M10.5 9.5V5.5a.8.8 0 0 1 .8-.8h1.4a.8.8 0 0 1 .8.8v4"/><path d="M5.5 13.5v-2.5a5 5 0 0 1 5-5"/><path d="M13.5 6a5 5 0 0 1 5 5v2.5"/>
              </svg>
            </span>
            <span className="text-xl font-extrabold tracking-tight text-white">ClearToPay Construction</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="https://cleartopay.ctonew.app/app/login" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
              Sign In
            </a>
            <a href="/" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
              &larr; Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════ Hero Banner ═══════════ */}
      <section className="hero-bg relative overflow-hidden bg-slate-900 py-20">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80')",
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
            Choose your plan, tell us about your company, and we'll have you set up
            before your next audit.
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
                    <span className="text-3xl font-extrabold text-slate-900">Free Trial</span>
                    <span className="text-slate-400 font-medium">30 days</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-700">Then choose the plan that fits your team.</p>
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
                  {/* Popular badge */}
                  <div className="popular-badge absolute -top-3 right-4 rounded-full bg-green-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                    Popular
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
                    <span className="text-3xl font-extrabold text-slate-900">Free Trial</span>
                    <span className="text-slate-400 font-medium">30 days</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-700">Then choose the plan that fits your team.</p>
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

                <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-2 gap-4">
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
                        Free 30-Day Trial
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        Start free
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">Payment required today</span>
                      <span className="text-sm font-bold text-green-600">None</span>
                    </div>
                    <div className="mt-4 border-t border-slate-200 pt-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">Due today</span>
                      <span className="text-2xl font-extrabold text-green-600">$0 — Free Trial</span>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    id="stripe-checkout" type="submit"
                    disabled={submitting}
                    className="btn-glow w-full rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/30 focus:outline-none focus:ring-4 focus:ring-blue-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Creating your account..." : "Create My Account"}
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    You'll be redirected to set up your account. No payment is required during your free trial.
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
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M3.5 16a.8.8 0 0 0 .8.8h15.4a.8.8 0 0 0 .8-.8v-1a.8.8 0 0 0-.8-.8H4.3a.8.8 0 0 0-.8.8z"/><path d="M10.5 9.5V5.5a.8.8 0 0 1 .8-.8h1.4a.8.8 0 0 1 .8.8v4"/><path d="M5.5 13.5v-2.5a5 5 0 0 1 5-5"/><path d="M13.5 6a5 5 0 0 1 5 5v2.5"/>
                </svg>
              </span>
              <span className="text-base font-bold tracking-tight text-slate-900">ClearToPay Construction</span>
            </a>
            <span className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} ClearToPay Construction. All rights reserved.
            </span>
            <div className="flex gap-8 text-sm text-slate-400">
              <a href="/" className="transition-colors hover:text-slate-600">Home</a>
              <a href="/#features" className="transition-colors hover:text-slate-600">Features</a>
              <a href="/#audit" className="transition-colors hover:text-slate-600">Audits</a>
              <a href="/#contact" className="transition-colors hover:text-slate-600">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
