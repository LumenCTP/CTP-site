import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHeader,
  LegalSection,
} from "../../components/PageShell";

export const Route = createFileRoute("/partners/terms")({
  head: () => ({
    meta: [
      { title: "Partner Program Terms | ClearToPay Construction" },
      {
        name: "description",
        content:
          "Terms and conditions for the ClearToPay Construction Partner Program — Partner Referral Compensation, referral tracking, and eligibility.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.cleartopayconstruction.com/partners/terms" }],
  }),
  component: PartnerTerms,
});

function PartnerTerms() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Partner Program"
        title="ClearToPay Partner Program Terms"
        lastUpdated="August 10, 2026"
      />

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-[15px] leading-relaxed text-slate-600">
          These Partner Program Terms ("Partner Terms") govern your
          participation in the ClearToPay Construction Partner Program (the
          "Program"). By applying to or participating in the Program, you agree
          to these Partner Terms in addition to our{" "}
          <a
            href="/terms"
            className="font-semibold text-blue-600 hover:underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="font-semibold text-blue-600 hover:underline"
          >
            Privacy Policy
          </a>
          .
        </p>

        <LegalSection title="The Program">
          <p>
            The Program rewards partners who refer construction companies to
            ClearToPay Construction. When a referred company signs up for a paid
            ClearToPay subscription, the partner earns Partner Referral Compensation as described
            below. The Program is free to join, and partners may cancel their
            participation at any time.
          </p>
        </LegalSection>

        <LegalSection title="Eligibility">
          <p>To participate in the Program, you must:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Submit a completed partner application and be approved by
              ClearToPay.
            </li>
            <li>
              Provide accurate contact and payment information for Partner Referral Compensation
              payouts.
            </li>
            <li>
              Comply with all applicable laws, including advertising and
              marketing regulations.
            </li>
          </ul>
          <p>
            The Program is open to individuals and businesses. Employees and
            contractors of ClearToPay Construction are not eligible to earn
            Partner Referral Compensation.
          </p>
        </LegalSection>

        <LegalSection title="Referral Tracking">
          <p>
            Each approved partner receives a unique referral code and/or
            referral link. Partner Referral Compensation is tracked only when a new customer
            signs up through the partner's unique code or link, and only for
            customers who are new to ClearToPay (or who have been inactive for
            at least twelve (12) months). Self-referrals — signing up for the
            Service yourself through your own link — do not qualify for
            Partner Referral Compensation.
          </p>
          <p>
            You are responsible for sharing your unique referral link
            accurately. ClearToPay is not responsible for untracked referrals
            caused by the use of incorrect or unregistered links.
          </p>
        </LegalSection>

        <LegalSection title="Partner Referral Compensation">
          <p>
            Partners earn Partner Referral Compensation equal to twenty-five percent
            (25%) of eligible ClearToPay subscription revenue actually collected from
            the referred customer. Compensation is paid for as long as the referred
            customer remains an active, eligible paying customer, with no limit on the
            number of months compensation is paid. Compensation does not apply to
            one-time fees, taxes, refunded amounts, or revenue not actually collected.
            ClearToPay may adjust the compensation rate for future referrals with
            notice, but adjustments will not affect compensation already earned.
          </p>
        </LegalSection>

        <LegalSection title="Payment of Compensation">
          <p>
            Partner Referral Compensation accrues when the referred customer's payment
            is received and cleared by ClearToPay. Accrued compensation is paid on a
            monthly basis, with no minimum balance required for payment. Payments are
            made via the payout method the partner designates in their account. You are
            responsible for providing accurate payout information; delayed or failed
            payments caused by incorrect information are your responsibility.
          </p>
          <p>
            If a referred customer cancels, receives a refund, or fails to pay, the
            associated compensation may be withheld or reversed. Compensation is
            subject to applicable law and jurisdiction eligibility, and payment will be
            withheld where prohibited by applicable law.
          </p>
        </LegalSection>

        <LegalSection title="Termination">
          <p>
            Either party may terminate participation in the Program at any time
            with written notice. Partner Referral Compensation earned before the termination date
            will still be paid under these Partner Terms. ClearToPay may
            terminate a partner's participation immediately if the partner
            engages in deceptive marketing, misrepresents ClearToPay or the
            Service, violates applicable law, or otherwise breaches these
            Partner Terms.
          </p>
          <p>
            Upon termination, you must stop using your referral link and any
            Program materials, and you forfeit any Partner Referral Compensation associated with
            referrals made after the termination date.
          </p>
        </LegalSection>

        <LegalSection title="Independent Contractor Relationship">
          <p>
            Nothing in these Partner Terms creates an employment, agency, joint
            venture, or partnership relationship between you and ClearToPay
            Construction. You participate in the Program as an independent
            contractor. You are solely responsible for any taxes owed on
            Partner Referral Compensation received, and you are not entitled to employee benefits,
            workers' compensation, or similar protections. You may not act on
            behalf of ClearToPay or bind ClearToPay to any agreement, and you
            may not represent yourself as an employee or official representative
            of ClearToPay.
          </p>
        </LegalSection>

        <LegalSection title="Contact Us">
          <p>
            Questions about the Partner Program? Contact us at{" "}
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
          These Partner Program Terms were last updated on August 10, 2026.
        </p>
      </main>
    </PageShell>
  );
}
