import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageShell } from "../components/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | ClearToPay Construction" },
      {
        name: "description",
        content:
          "Get in touch with ClearToPay Construction — support, sales, and vendor document submissions.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.cleartopayconstruction.com/contact" }],
  }),
  component: Contact,
});

const SUPPORT_EMAIL = "support@cleartopayconstruction.com";

const IconMail = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);
const IconShield = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconChat = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

function ContactCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="card-lift rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>
      <h2 className="text-lg font-bold tracking-[-0.01em] text-slate-900">
        {title}
      </h2>
      <div className="mt-3 text-sm leading-relaxed text-slate-600">
        {children}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <PageShell>
      {/* ═══════════ Header ═══════════ */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-blue-50/60 via-white to-white py-16 sm:py-20">
        <div className="dot-pattern absolute inset-0 opacity-60"></div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Contact
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-5xl">
            We'd love to hear from you
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            Questions about compliance, your reports, or getting started? Reach
            out — a real person on our team will get back to you.
          </p>
        </div>
      </section>

      {/* ═══════════ Contact Channels ═══════════ */}
      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ContactCard icon={<IconMail />} title="Support &amp; Questions">
            <p>
              For help with your account, reports, or anything else, email us at{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-semibold text-blue-600 hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
              . We typically respond within one business day.
            </p>
          </ContactCard>

          <ContactCard
            icon={<IconShield />}
            title="Submit Compliance Documents"
          >
            <p>
              Submit compliance documents using the dedicated address shown in
              your ClearToPay account or provided by your contractor.
            </p>
          </ContactCard>

          <ContactCard icon={<IconChat />} title="Sales &amp; Getting Started">
            <p>
              Ready to take compliance off your hands?{" "}
              <a
                href="/get-started"
                className="font-semibold text-blue-600 hover:underline"
              >
                Get Protected
              </a>{" "}
              — your first month is free, set up takes about an hour, and you
              can cancel anytime.
            </p>
          </ContactCard>
        </div>

        {/* ═══════════ CTA ═══════════ */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-blue-100 bg-blue-50/70 p-8 text-center sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-[-0.015em] text-slate-900">
            Prefer to see it in action?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            Send us your vendor list and we'll show you exactly what your Monday
            Clear-to-Pay Report would look like — before you sign up for
            anything.
          </p>
          <a
            href="/get-started"
            className="btn-glow mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700"
          >
            Get Protected
            <span aria-hidden="true" className="text-base leading-none">
              &rarr;
            </span>
          </a>
        </div>
      </main>
    </PageShell>
  );
}
