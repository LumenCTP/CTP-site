import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, LegalSection } from "../components/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | ClearToPay Construction" },
      {
        name: "description",
        content:
          "How ClearToPay Construction collects, uses, and protects your data — company information, vendor lists, and compliance documents.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.cleartopayconstruction.com/privacy" }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Privacy Policy"
        title="Your data is handled with care"
        lastUpdated="August 10, 2026"
      />

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-[15px] leading-relaxed text-slate-600">
          ClearToPay Construction ("ClearToPay," "we," "us," or "our") provides
          AI-powered compliance management for construction companies. This
          Privacy Policy explains what information we collect when you use our
          platform, how we use it, and the choices you have. By using our
          services, you agree to the practices described here.
        </p>

        <LegalSection title="Information We Collect">
          <p>
            We collect information needed to provide our compliance management
            services:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-slate-800">
                Company information
              </strong>{" "}
              — your company name, business contact details, and billing
              information.
            </li>
            <li>
              <strong className="font-semibold text-slate-800">
                Account and contact information
              </strong>{" "}
              — the name, email address, and phone number of your primary
              contact and any report recipients you designate.
            </li>
            <li>
              <strong className="font-semibold text-slate-800">
                Vendor lists
              </strong>{" "}
              — the names, contact details, and insurance agent information for
              the vendors and subcontractors you upload.
            </li>
            <li>
              <strong className="font-semibold text-slate-800">
                Compliance documents
              </strong>{" "}
              — certificates of insurance (COIs), W-9 forms, workers'
              compensation certificates, business licenses, and any other
              documents you or your vendors submit, plus the data extracted from
              them (policy numbers, coverage limits, expiration dates, etc.).
            </li>
            <li>
              <strong className="font-semibold text-slate-800">
                Usage information
              </strong>{" "}
              — technical data such as login activity, pages viewed, and similar
              information that helps us operate and improve the service.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="How We Use Your Information">
          <p>
            We use the information we collect solely to provide and improve our
            compliance management services, including:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Tracking, organizing, and storing vendor compliance documents.
            </li>
            <li>
              Extracting and validating key data (such as coverage dates and
              limits) using AI.
            </li>
            <li>
              Generating Weekly Clear-to-Pay Reports, monthly compliance
              reports, and audit packages.
            </li>
            <li>
              Sending automated renewal reminders and compliance follow-ups on
              your behalf.
            </li>
            <li>Providing customer support and responding to your requests.</li>
            <li>Billing, account administration, and service security.</li>
          </ul>
          <p>
            We do not use your compliance data for any purpose other than
            providing the service you signed up for.
          </p>
        </LegalSection>

        <LegalSection title="We Do Not Sell Your Data">
          <p>
            We never sell, rent, or trade your personal information, your vendor
            lists, or your compliance documents to anyone. Your data belongs to
            you and is used only to deliver the services you've engaged us for.
          </p>
        </LegalSection>

        <LegalSection title="Data Storage and Security">
          <p>We take the security of your information seriously:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-slate-800">
                Encrypted in transit
              </strong>{" "}
              — all traffic to and from our platform is protected with HTTPS/TLS
              encryption.
            </li>
            <li>
              <strong className="font-semibold text-slate-800">
                Encrypted at rest
              </strong>{" "}
              — your data is stored in secure, encrypted databases.
            </li>
            <li>
              <strong className="font-semibold text-slate-800">
                Access controls
              </strong>{" "}
              — access to customer data is restricted to authorized personnel
              and only as needed to operate the service.
            </li>
            <li>
              <strong className="font-semibold text-slate-800">
                Tenant isolation
              </strong>{" "}
              — each customer's data is isolated from every other customer's
              data, so your records are never visible to another company using
              the platform.
            </li>
            <li>
              <strong className="font-semibold text-slate-800">
                Version history
              </strong>{" "}
              — documents are never overwritten; full version history is
              preserved for audit purposes.
            </li>
          </ul>
          <p>
            While no method of transmission or storage is completely secure, we
            apply industry-standard safeguards to protect your information.
          </p>
        </LegalSection>

        <LegalSection title="Third-Party Services">
          <p>
            We use a small number of trusted third-party services to operate the
            platform:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-slate-800">Stripe</strong> —
              processes subscription payments. We do not store your full card
              details; they are handled by Stripe under their own privacy and
              security practices.
            </li>
            <li>
              <strong className="font-semibold text-slate-800">
                Service providers
              </strong>{" "}
              — we use vetted service providers to support payment processing,
              document processing, communications, storage, and security. They
              may process data only as needed to provide contracted services and
              subject to applicable agreements and safeguards.
            </li>
          </ul>
          <p>
            These services process data only to the extent necessary to provide
            their functions and are subject to their own privacy policies, which
            we encourage you to review.
          </p>
        </LegalSection>

        <LegalSection title="Data Retention">
          <p>
            We retain your data for as long as your account is active, plus a
            reasonable period afterward to satisfy legal, accounting, and audit
            obligations. You may request deletion of your data at any time,
            subject to legal requirements that certain records be retained.
          </p>
        </LegalSection>

        <LegalSection title="Your Choices and Rights">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-slate-800">
                Access and correction
              </strong>{" "}
              — you can review and update your account and vendor information
              through the platform at any time.
            </li>
            <li>
              <strong className="font-semibold text-slate-800">Deletion</strong>{" "}
              — you may request that we delete your account and the data
              associated with it.
            </li>
            <li>
              <strong className="font-semibold text-slate-800">
                Opt-out of communications
              </strong>{" "}
              — you can adjust report recipients and marketing communications at
              any time.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Contact Us">
          <p>
            If you have questions about this Privacy Policy or how your data is
            handled, please contact us at{" "}
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
          This Privacy Policy was last updated on August 10, 2026. We may update
          it from time to time; when we do, the revised version will be posted
          on this page with a new "Last updated" date.
        </p>
      </main>
    </PageShell>
  );
}
