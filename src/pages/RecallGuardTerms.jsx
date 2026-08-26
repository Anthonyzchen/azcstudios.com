import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageEntrance } from "../lib/usePageEntrance";
import { SectionHeading, Paragraph } from "../components/ui";
import { LEGAL_ENTITY, SUPPORT_EMAIL, STUDIO_NAME } from "../lib/site";

const linkClass =
  "text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink";

const SupportEmail = () => (
  <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
    {SUPPORT_EMAIL}
  </a>
);

const Bullets = ({ children, className = "" }) => (
  <ul
    className={`list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-graphite ${className}`}
  >
    {children}
  </ul>
);

const Term = ({ children }) => (
  <span className="font-medium text-ink">{children}</span>
);

const RecallGuardTerms = () => {
  const entranceRef = usePageEntrance();

  useEffect(() => {
    document.title = `Terms of Service — RecallGuard | ${STUDIO_NAME}`;
  }, []);

  return (
    <div ref={entranceRef} className="mx-auto max-w-content px-gutter py-16">
      {/* Header */}
      <div className="mb-10">
        <Link
          to="/recallguard"
          className="mb-6 inline-block text-sm text-graphite/70 transition-colors duration-300 ease-ink hover:text-ink"
        >
          &larr; Back to RecallGuard
        </Link>
        <h1 className="mb-3 font-Fraunces text-4xl font-normal text-ink">
          Terms of Service
        </h1>
        <p className="text-sm text-graphite/70">
          RecallGuard &mdash; Last updated August 26, 2026
        </p>
      </div>

      {/* 1. Acceptance */}
      <section className="mb-10">
        <SectionHeading>1. Acceptance</SectionHeading>
        <Paragraph className="mb-3">
          By creating an account or using the RecallGuard mobile application
          (the &quot;App&quot;), you agree to these Terms of Service (the
          &quot;Terms&quot;) and the{" "}
          <Link to="/recallguard/privacy" className={linkClass}>
            Privacy Policy
          </Link>
          . If you do not agree, do not use the App.
        </Paragraph>
        <Paragraph>
          RecallGuard is operated by {LEGAL_ENTITY} (&quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;). Contact: <SupportEmail />.
        </Paragraph>
      </section>

      {/* 2. Informational use only */}
      <section className="mb-10">
        <SectionHeading>
          2. Informational use only &mdash; NOT medical advice
        </SectionHeading>
        <Paragraph className="mb-3">
          <Term>
            This is the most important thing to understand about RecallGuard.
          </Term>
        </Paragraph>
        <Paragraph className="mb-4">
          RecallGuard aggregates FDA food recall data and surfaces it alongside
          your stated preferences. We provide information; we do not provide
          medical, health, or safety advice.
        </Paragraph>
        <Bullets>
          <li>
            Recall notifications are <Term>informational</Term>, not directive.
            We never tell you to stop consuming a product &mdash; we surface
            information so you can check whether it affects you and decide for
            yourself.
          </li>
          <li>
            The FDA classifications we display (&quot;Class I / II / III&quot;)
            come directly from the FDA and are explained in plain English within
            the App. Our explanations are not substitutes for medical advice.
          </li>
          <li>
            If you believe you have consumed a recalled product and are
            experiencing symptoms, contact your doctor, poison control, or local
            emergency services. Do not rely on RecallGuard for medical
            decisions.
          </li>
          <li>
            FDA recall data is subject to delays, errors, and updates. We make
            reasonable efforts to keep data fresh but cannot guarantee
            timeliness or completeness.
          </li>
        </Bullets>
      </section>

      {/* 3. Eligibility and account */}
      <section className="mb-10">
        <SectionHeading>3. Eligibility and account</SectionHeading>
        <Bullets>
          <li>
            You must be at least 13 years old to create an account. Users under
            18 should have a parent&apos;s or guardian&apos;s permission.
          </li>
          <li>
            You sign in with Apple or Google. Keeping that account secure is
            your responsibility, and you are responsible for activity under
            your RecallGuard account.
          </li>
          <li>One account per person. Do not share accounts.</li>
          <li>
            If you believe your account has been accessed without authorization,
            contact us immediately at <SupportEmail />.
          </li>
        </Bullets>
      </section>

      {/* 4. Subscription and trial */}
      <section className="mb-10">
        <SectionHeading>4. Subscription and trial</SectionHeading>
        <Paragraph className="mb-3">
          The App is a paid service. Access to the personalized recall feed,
          pantry tracking, and push notifications requires an active
          subscription or trial.
        </Paragraph>
        <Paragraph className="mb-3">
          <Term>Subscription price</Term>: $4.00 per month, billed annually at
          $48.00 USD per year (subject to change, with notice). Includes the full app &mdash; personalized
          recall feed by state, food category, and brand; persistent pantry via
          barcode scanning, receipt photo capture, or manual entry; push
          notifications when a recall affects products you&apos;ve added; and
          severity-filtered alerts.
        </Paragraph>
        <Paragraph className="mb-3">
          <Term>Free trial</Term>: New subscribers receive a 14-day free trial
          with full app access. If you do not cancel at least 24 hours before
          the trial ends, your subscription automatically renews at the stated
          annual rate.
        </Paragraph>
        <Paragraph className="mb-3">
          <Term>Billing</Term>: Subscriptions are sold through the Apple App
          Store. Payment is charged to your Apple ID at confirmation of
          purchase. Renewal and cancellation are handled by Apple according to
          its terms, and you can manage or cancel at any time in your Apple ID
          subscription settings.
        </Paragraph>
        <Paragraph className="mb-3">
          <Term>Refunds</Term>: Refund requests are handled by Apple according
          to its policies. We are not able to issue refunds directly.
        </Paragraph>
        <Paragraph className="mb-3">
          <Term>Renewals</Term>: Subscriptions automatically renew at the end of
          each term unless cancelled at least 24 hours before the renewal date.
          Your Apple ID is charged for the renewal within 24 hours of the end of
          the current term, at the price then in effect.
        </Paragraph>
        <Paragraph>
          <Term>Price changes</Term>: We may change subscription prices for
          future terms. We will notify you at least 30 days before a price
          change takes effect. Your current term is honored at the original
          price.
        </Paragraph>
      </section>

      {/* 5. Your content */}
      <section className="mb-10">
        <SectionHeading>5. Your content</SectionHeading>
        <Paragraph className="mb-3">
          You may add pantry items, import receipts, or provide other
          information in the App (&quot;Your Content&quot;). You retain
          ownership of Your Content. You grant us a limited, non-exclusive
          license to use Your Content solely to operate the App for you (e.g.,
          matching recalls to your pantry).
        </Paragraph>
        <Paragraph>
          We do not claim ownership, publish Your Content, or use it for any
          other purpose.
        </Paragraph>
      </section>

      {/* 6. Acceptable use */}
      <section className="mb-10">
        <SectionHeading>6. Acceptable use</SectionHeading>
        <Paragraph className="mb-4">You agree not to:</Paragraph>
        <Bullets className="mb-4">
          <li>
            Use the App in any way that violates applicable laws or regulations.
          </li>
          <li>
            Attempt to interfere with, compromise, or disrupt the App or its
            infrastructure.
          </li>
          <li>
            Reverse engineer, decompile, or attempt to extract the source code
            of the App beyond what is permitted by law.
          </li>
          <li>
            Use automated systems (bots, scrapers) to access the App except via
            our public APIs, if any.
          </li>
          <li>
            Upload malicious code, spam, or content that infringes others&apos;
            intellectual property or privacy rights.
          </li>
          <li>Misrepresent your identity or impersonate another person.</li>
        </Bullets>
        <Paragraph>
          We may suspend or terminate your account if you violate these Terms.
          We may also report unlawful activity to appropriate authorities.
        </Paragraph>
      </section>

      {/* 7. Intellectual property */}
      <section className="mb-10">
        <SectionHeading>7. Intellectual property</SectionHeading>
        <Paragraph className="mb-3">
          The RecallGuard name, logo, app design, and codebase are owned by us.
          FDA recall data is in the public domain and sourced from{" "}
          <a
            href="https://open.fda.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            openFDA
          </a>
          . We are not affiliated with or endorsed by the FDA.
        </Paragraph>
        <Paragraph>
          You may not use our name, logo, or branding without prior written
          permission.
        </Paragraph>
      </section>

      {/* 8. Third-party services */}
      <section className="mb-10">
        <SectionHeading>8. Third-party services</SectionHeading>
        <Paragraph>
          The App relies on third-party services (Supabase, Expo, Apple, Google,
          RevenueCat, Resend, Anthropic, Go-UPC, PostHog, and Sentry &mdash; see
          the{" "}
          <Link to="/recallguard/privacy" className={linkClass}>
            Privacy Policy
          </Link>{" "}
          for what each one receives). Their terms and privacy policies govern
          those services.
          Outages or failures by those providers may affect the App; we are not
          liable for issues outside our reasonable control.
        </Paragraph>
      </section>

      {/* 9. Disclaimers */}
      <section className="mb-10">
        <SectionHeading>9. Disclaimers</SectionHeading>
        <Paragraph className="mb-3">
          <Term>
            The App is provided &quot;as is&quot; and &quot;as available&quot;
            without warranties of any kind
          </Term>
          , express or implied, including but not limited to warranties of
          merchantability, fitness for a particular purpose, accuracy of FDA
          data, timeliness of recall notifications, or non-infringement.
        </Paragraph>
        <Paragraph className="mb-4">We do not guarantee that:</Paragraph>
        <Bullets className="mb-4">
          <li>Notifications will be delivered instantaneously or at all.</li>
          <li>Every relevant FDA recall will be surfaced to you.</li>
          <li>
            Matching algorithms will identify every product in your pantry that
            is affected.
          </li>
          <li>The App will be available without interruption.</li>
        </Bullets>
        <Paragraph>
          <Term>This is not a substitute for your own due diligence.</Term> If
          you have reason to believe a product you own has been recalled, check
          the FDA&apos;s official recall page at{" "}
          <a
            href="https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            fda.gov/safety/recalls-market-withdrawals-safety-alerts
          </a>
          .
        </Paragraph>
      </section>

      {/* 10. Limitation of liability */}
      <section className="mb-10">
        <SectionHeading>10. Limitation of liability</SectionHeading>
        <Paragraph className="mb-3">
          <Term>To the fullest extent permitted by law</Term>, in no event shall{" "}
          {LEGAL_ENTITY}, the operator of RecallGuard, be liable for any
          indirect, incidental, special, consequential, or punitive damages
          arising from or related to your use of the App, including but not
          limited to:
        </Paragraph>
        <Bullets className="mb-4">
          <li>
            Illness, injury, or harm resulting from consumption of a recalled
            product that was not surfaced by the App or was surfaced late.
          </li>
          <li>Loss of data, loss of profits, or loss of goodwill.</li>
          <li>Errors or inaccuracies in FDA recall data.</li>
        </Bullets>
        {/* $48.00 tracks the annual subscription price on purpose (Anthony,
            2026-08-12), so the cap is exactly one year of fees: for an annual
            subscriber both branches of "the greater of" evaluate to $48, and the
            floor only does work for someone who paid less (partial period,
            refund). Keep "greater of" — it is the consumer-favourable direction,
            and inverting it to "lesser of" is a materially different clause.
            If the price moves, this moves with it. Never had an attorney pass;
            whether a fixed floor is the right shape at all is still open. The
            draft banner that used to flag that came off 2026-08-26 because it
            was covering factual drift, not this. */}
        <Paragraph className="mb-3">
          Our total aggregate liability for any claim related to the App shall
          not exceed the greater of (a) $48.00 USD or (b) the amount you paid us
          in subscription fees in the 12 months preceding the claim.
        </Paragraph>
        <Paragraph>
          Some jurisdictions do not allow the exclusion or limitation of certain
          damages. In those jurisdictions, our liability is limited to the
          fullest extent permitted.
        </Paragraph>
      </section>

      {/* 11. Indemnification */}
      <section className="mb-10">
        <SectionHeading>11. Indemnification</SectionHeading>
        <Paragraph>
          You agree to indemnify and hold us harmless from any claims, damages,
          or expenses (including reasonable attorneys&apos; fees) arising from
          your violation of these Terms, your Content, or your misuse of the
          App.
        </Paragraph>
      </section>

      {/* 12. Termination */}
      <section className="mb-10">
        <SectionHeading>12. Termination</SectionHeading>
        <Paragraph className="mb-3">
          You may terminate your account at any time in the app via{" "}
          <Term>Settings &rarr; Delete my account</Term>, or by emailing{" "}
          <SupportEmail />. Deleting your account does not cancel your
          subscription; cancel that in your Apple ID subscription settings.
        </Paragraph>
        <Paragraph>
          We may terminate or suspend your account at any time, with or without
          notice, for any reason, including violation of these Terms or harmful
          activity. On termination, your right to use the App ends. Sections of
          these Terms that by their nature should survive termination
          (including Sections 9&ndash;11, 13, 15, and 16) will survive.
        </Paragraph>
      </section>

      {/* 13. Governing law */}
      <section className="mb-10">
        <SectionHeading>
          13. Governing law and dispute resolution
        </SectionHeading>
        <Paragraph className="mb-3">
          These Terms are governed by the laws of the{" "}
          <Term>State of New York</Term>, USA, without regard to
          conflict-of-law principles.
        </Paragraph>
        <Paragraph className="mb-3">
          Any dispute arising from these Terms or the App shall be resolved
          exclusively in the state or federal courts located in Suffolk County,
          New York. You consent to personal jurisdiction in those courts.
        </Paragraph>
        <Paragraph>
          If you are a California consumer, you may have additional rights under
          California law that are not waivable.
        </Paragraph>
      </section>

      {/* 14. Changes to these Terms */}
      <section className="mb-10">
        <SectionHeading>14. Changes to these Terms</SectionHeading>
        <Paragraph>
          We may update these Terms from time to time. If the change is
          material, we will notify you in-app or by email at least 14 days
          before the change takes effect. Continued use after the effective date
          constitutes acceptance.
        </Paragraph>
      </section>

      {/* 15. Miscellaneous */}
      <section className="mb-10">
        <SectionHeading>15. Miscellaneous</SectionHeading>
        <Bullets>
          <li>
            If any provision of these Terms is found unenforceable, the
            remaining provisions remain in effect.
          </li>
          <li>
            These Terms, together with the Privacy Policy, are the entire
            agreement between you and us regarding the App.
          </li>
          <li>
            Our failure to enforce any provision does not waive our right to
            enforce it later.
          </li>
          <li>
            You may not assign these Terms. We may assign them in connection
            with a sale or merger.
          </li>
        </Bullets>
      </section>

      {/* 16. Apple App Store terms — Apple's required minimum EULA terms
           (Guideline 3.1.2 / Schedule A). These are not optional boilerplate:
           shipping a custom EULA instead of pointing at Apple's standard one
           obliges us to carry them. Do not trim. If the app ever adds
           HealthKit, the Product Claims clause needs HealthKit named in it. */}
      <section className="mb-10">
        <SectionHeading>16. Apple App Store terms</SectionHeading>
        <Paragraph className="mb-4">
          RecallGuard is distributed through the Apple App Store, and Apple
          requires the following terms to apply to your license. Where they
          conflict with anything above, these control.
        </Paragraph>
        <Bullets>
          <li>
            <Term>This agreement is with us, not Apple.</Term> These Terms are
            between you and {LEGAL_ENTITY} alone. Apple is not a party. We, not
            Apple, are solely responsible for the App and its content.
          </li>
          <li>
            <Term>Scope of licence</Term>: we grant you a non-transferable
            licence to use the App on any Apple-branded product you own or
            control, as permitted by the Usage Rules in the Apple Media Services
            Terms and Conditions.
          </li>
          <li>
            <Term>Maintenance and support</Term>: we are solely responsible for
            it. Apple has no obligation to provide any maintenance or support
            for the App.
          </li>
          <li>
            <Term>Warranty</Term>: we are solely responsible for any product
            warranties, whether express or implied by law, to the extent they
            are not effectively disclaimed in Section 9. If the App fails to
            conform to an applicable warranty, you may notify Apple and Apple
            will refund the purchase price of the App to you. To the maximum
            extent permitted by law, Apple has no other warranty obligation
            whatsoever, and any other claims, losses, liabilities, damages,
            costs, or expenses attributable to a failure to conform to a
            warranty are our responsibility.
          </li>
          <li>
            <Term>Product claims</Term>: we, not Apple, are responsible for
            addressing any claim by you or a third party relating to the App or
            your possession and use of it, including product liability claims,
            any claim that the App fails to conform to a legal or regulatory
            requirement, and claims arising under consumer protection, privacy,
            or similar legislation.
          </li>
          <li>
            <Term>Intellectual property</Term>: if a third party claims that the
            App or your possession and use of it infringes their intellectual
            property rights, we, not Apple, are solely responsible for the
            investigation, defence, settlement, and discharge of that claim.
          </li>
          <li>
            <Term>Legal compliance</Term>: you represent that you are not
            located in a country subject to a U.S. Government embargo or
            designated by the U.S. Government as a &quot;terrorist
            supporting&quot; country, and that you are not listed on any U.S.
            Government list of prohibited or restricted parties.
          </li>
          <li>
            <Term>Third-party terms</Term>: you agree to comply with applicable
            third-party terms when using the App.
          </li>
          <li>
            <Term>Apple as third-party beneficiary</Term>: Apple and its
            subsidiaries are third-party beneficiaries of these Terms. On your
            acceptance, Apple has the right, and is deemed to have accepted the
            right, to enforce these Terms against you as a third-party
            beneficiary.
          </li>
          <li>
            <Term>Questions, complaints, and claims</Term> about the App go to{" "}
            {LEGAL_ENTITY} at <SupportEmail />.
          </li>
        </Bullets>
      </section>

      {/* 17. Contact */}
      <section className="rule-top pt-8">
        <SectionHeading>17. Contact</SectionHeading>
        <Paragraph>
          Questions about these Terms: <SupportEmail />
        </Paragraph>
        <div className="mt-8">
          <Link to="/recallguard/privacy" className={`text-sm ${linkClass}`}>
            Privacy Policy &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RecallGuardTerms;
