import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, LegalSection } from "../components/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | ClearToPay Construction" },
      {
        name: "description",
        content:
          "The terms and conditions for using ClearToPay Construction's AI-powered vendor compliance management platform.",
      },
    ],
  }),
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Terms of Service"
        title="Simple, fair terms for using ClearToPay"
        lastUpdated="August 10, 2026"
      />

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-[15px] leading-relaxed text-slate-600">
          These Terms of Service ("Terms") govern your use of the ClearToPay
          Construction platform and services (the "Service"). By creating an
          account or using the Service, you agree to these Terms. If you are
          using the Service on behalf of a company, you represent that you are
          authorized to bind that company to these Terms.
        </p>

        <LegalSection title="The Service">
          <p>
            ClearToPay Construction provides an AI-powered compliance management
            platform that helps construction companies collect, track, and
            manage vendor compliance documents — including certificates of
            insurance (COIs), W-9 forms, workers' compensation certificates, and
            business licenses. The Service includes document collection and
            storage, AI-assisted data extraction, compliance status tracking,
            automated weekly Clear-to-Pay Reports, monthly compliance reports,
            renewal reminders, and audit-ready document packages.
          </p>
        </LegalSection>

        <LegalSection title="Accounts and Eligibility">
          <p>
            You must be at least 18 years old and able to enter into a binding
            contract to use the Service. You are responsible for maintaining the
            confidentiality of your account credentials and for all activity
            that occurs under your account. You agree to notify us promptly of
            any unauthorized use of your account.
          </p>
        </LegalSection>

        <LegalSection title="Your Obligations">
          <p>You agree that, in using the Service, you will:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Provide accurate, current, and complete information about your
              company and account, and keep it up to date.
            </li>
            <li>
              <strong className="font-semibold text-slate-800">
                Have authority to share vendor data.
              </strong>{" "}
              You represent that you are authorized to upload and share
              information about your vendors and subcontractors — including
              their names, contact details, and compliance documents — and that
              doing so does not violate any agreement or law.
            </li>
            <li>
              Use the Service only for lawful purposes and in compliance with
              these Terms.
            </li>
            <li>
              Review the compliance reports we generate and verify their
              accuracy for your own payment and risk decisions. ClearToPay
              assists with compliance tracking; it is not a substitute for your
              own judgment or professional advice.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Payment Terms">
          <p>
            The Service is offered on a month-to-month or annual subscription
            basis. Your subscription is billed monthly or annually and starts on the day you pay.
            you will be billed at the plan rate you selected — either monthly or
            annually — until you cancel. Prices are displayed on our pricing
            page and may be updated from time to time; any price change will be
            communicated to you before it takes effect.
          </p>
          <p>
            Payments are processed securely through Stripe. By providing payment
            information, you authorize us (through Stripe) to charge the
            applicable fees to the payment method on file. There are no
            per-vendor fees or hidden charges.
          </p>
        </LegalSection>

        <LegalSection title="Cancellation">
          <p>
            You may cancel your subscription at any time. Cancellation takes
            effect at the end of your current billing period, and you will not
            be charged for any period after your cancellation date. You will
            retain access to the Service until the end of the paid period. If
            you cancel, you will not be charged for the next billing period.
          </p>
          <p>
            We may suspend or terminate access to the Service if you violate
            these Terms, fail to pay, or if continued service would violate
            applicable law. We will make reasonable efforts to notify you in
            advance.
          </p>
        </LegalSection>

        <LegalSection title="Intellectual Property">
          <p>
            The Service, including its software, design, content, and branding,
            is owned by ClearToPay Construction and is protected by intellectual
            property laws. You may not copy, modify, distribute, or reverse
            engineer any part of the Service. You retain ownership of the data
            and documents you upload to the Service.
          </p>
        </LegalSection>

        <LegalSection title="Disclaimer of Warranties">
          <p>
            The Service is provided "as is" and "as available" without
            warranties of any kind, whether express or implied, including
            implied warranties of merchantability, fitness for a particular
            purpose, and non-infringement. While we work hard to keep the
            Service reliable and your data accurate, we do not guarantee that
            the Service will be uninterrupted, error-free, or that compliance
            reports will be free of omissions.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of Liability">
          <p>
            To the maximum extent permitted by law, ClearToPay Construction and
            its officers, employees, and agents will not be liable for any
            indirect, incidental, special, consequential, or punitive damages —
            including lost profits, lost data, or business interruption —
            arising out of or related to your use of the Service. Our total
            liability for any claim arising out of these Terms or the Service
            will not exceed the amount you paid us in the twelve (12) months
            preceding the claim. Because compliance decisions ultimately rest
            with you, you are responsible for your own payment and business
            decisions based on the reports the Service provides.
          </p>
        </LegalSection>

        <LegalSection title="Changes to These Terms">
          <p>
            We may update these Terms from time to time. When we make material
            changes, we will update the "Last updated" date on this page and,
            where appropriate, notify you by email. Continued use of the Service
            after changes take effect constitutes acceptance of the revised
            Terms.
          </p>
        </LegalSection>

        <LegalSection title="Contact Us">
          <p>
            Questions about these Terms? Contact us at{" "}
            <a
              href="mailto:support@cleartopayconstruction.com"
              className="font-semibold text-blue-600 hover:underline"
            >
              support@cleartopayconstruction.com
            </a>
            .
          </p>
        </LegalSection>

        <div className="gradient-divider my-12"></div>
        <p className="text-xs text-slate-400">
          These Terms of Service were last updated on August 10, 2026.
        </p>
      </main>
    </PageShell>
  );
}
