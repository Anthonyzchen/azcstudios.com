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
    <div ref={entranceRef} className="mx-auto max-w-prose px-gutter py-16">
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
          RecallGuard &mdash; Last updated July 29, 2026
        </p>
      </div>

      {/* Draft warning */}
      <div
        role="note"
        className="mb-10 rounded-2xl border border-line bg-paper-sunk p-5"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
          Draft &mdash; not legally reviewed
        </p>
        <Paragraph>
          This is an MVP draft. Before public launch, an attorney will review
          these Terms. The liability-limitation and medical-advice disclaimers
          are especially important for a food-safety app and should be
          validated.
        </Paragraph>
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
            You are responsible for keeping your login credentials secure and
            for all activity under your account.
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
          <Term>Subscription price</Term>: $48.00 USD per year (subject to
          change, with notice). Includes the full app &mdash; personalized
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
          <Term>Billing</Term>: Premium subscriptions are sold through the Apple
          App Store or Google Play Store. Payment, renewal, and cancellation are
          handled by those platforms according to their terms. You can manage or
          cancel your subscription at any time in the App Store or Play Store
          settings.
        </Paragraph>
        <Paragraph className="mb-3">
          <Term>Refunds</Term>: Refund requests are handled by the Apple App
          Store or Google Play according to their policies. We are not able to
          issue refunds directly.
        </Paragraph>
        <Paragraph className="mb-3">
          <Term>Renewals</Term>: Subscriptions automatically renew at the end of
          each term unless cancelled at least 24 hours before the renewal date.
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
          Anthropic). Their terms and privacy policies govern those services.
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
        {/* The $50.00 here is deliberately NOT tracking the subscription price
            down to $48.00. This is a floor on what a user can recover, not a
            representation of what we charge — "the greater of" means lowering it
            would only ever shrink their remedy, for no benefit to us. Leave it
            unless a lawyer says otherwise. */}
        <Paragraph className="mb-3">
          Our total aggregate liability for any claim related to the App shall
          not exceed the greater of (a) $50.00 USD or (b) the amount you paid us
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
          You may terminate your account at any time by emailing{" "}
          <SupportEmail /> or by the in-app account deletion flow.
        </Paragraph>
        <Paragraph>
          We may terminate or suspend your account at any time, with or without
          notice, for any reason, including violation of these Terms or harmful
          activity. On termination, your right to use the App ends. Sections of
          these Terms that by their nature should survive termination
          (including Sections 9&ndash;11, 13, 15) will survive.
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

      {/* 16. Contact */}
      <section className="rule-top pt-8">
        <SectionHeading>16. Contact</SectionHeading>
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
