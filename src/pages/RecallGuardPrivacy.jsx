import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageEntrance } from "../lib/usePageEntrance";
import { SectionHeading, Paragraph } from "../components/ui";
import { LEGAL_ENTITY, SUPPORT_EMAIL, STUDIO_NAME } from "../lib/site";

const SupportEmail = () => (
  <a
    href={`mailto:${SUPPORT_EMAIL}`}
    className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink"
  >
    {SUPPORT_EMAIL}
  </a>
);

const SubHeading = ({ children }) => (
  <h3 className="mb-3 mt-8 text-sm font-semibold text-ink">{children}</h3>
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

const RecallGuardPrivacy = () => {
  const entranceRef = usePageEntrance();

  useEffect(() => {
    document.title = `Privacy Policy — RecallGuard | ${STUDIO_NAME}`;
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
          Privacy Policy
        </h1>
        <p className="text-sm text-graphite/70">
          RecallGuard &mdash; Last updated July 26, 2026
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
          This is an MVP draft intended to satisfy the App Store submission
          requirement for a privacy policy URL. Before public launch, the App
          will be reviewed by an attorney &mdash; especially the CCPA/CPRA,
          subscription, and liability sections.
        </Paragraph>
      </div>

      {/* 1. Introduction */}
      <section className="mb-10">
        <SectionHeading>1. Introduction</SectionHeading>
        <Paragraph className="mb-3">
          RecallGuard (the &quot;App&quot;) is operated by {LEGAL_ENTITY}
          (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). This Privacy
          Policy explains what information we collect when you use the App, how
          we use it, who we share it with, and the choices you have.
        </Paragraph>
        <Paragraph className="mb-3">
          By creating an account or using RecallGuard, you agree to the
          practices described here.
        </Paragraph>
        <Paragraph>
          Contact: <SupportEmail />
        </Paragraph>
      </section>

      {/* 2. Information we collect */}
      <section className="mb-10">
        <SectionHeading>2. Information we collect</SectionHeading>
        <Paragraph>
          We collect only what&apos;s needed to filter FDA food recalls for you.
        </Paragraph>

        <SubHeading>Information you provide directly</SubHeading>
        <Bullets>
          <li>
            <Term>Email address</Term> &mdash; used for your account login and
            optional weekly email digests.
          </li>
          <li>
            <Term>Password</Term> &mdash; stored in hashed form by our identity
            provider (Supabase Auth). We never see or store your plaintext
            password.
          </li>
          <li>
            <Term>Preferences</Term> &mdash; the US state you live in, food
            categories you care about, and brands you buy. You choose what to
            enter; any field may be left blank.
          </li>
          <li>
            <Term>(Premium only) Pantry contents</Term> &mdash; products you
            manually add or import via receipt. Used only to match incoming FDA
            recalls against your specific items.
          </li>
          <li>
            <Term>(Premium only) Receipt content</Term> &mdash; if you enable
            email-receipt forwarding or photo receipt upload, the line-item text
            of those receipts. Used only to populate your pantry. Receipt images
            are processed once and not retained after line-item extraction.
          </li>
        </Bullets>

        <SubHeading>Information collected automatically</SubHeading>
        <Bullets>
          <li>
            <Term>Push notification token</Term> &mdash; a device-specific
            identifier issued by Apple or Google when you enable notifications.
            Required to deliver recall alerts.
          </li>
          <li>
            <Term>Approximate location</Term> &mdash; only if you tap &quot;Use
            my location&quot; in Preferences. We convert latitude/longitude into
            a US state and immediately discard the precise coordinates. We do
            not track your location in the background.
          </li>
        </Bullets>

        <SubHeading>Information we do NOT collect</SubHeading>
        <Bullets>
          <li>
            We do not collect app usage telemetry, crash reports, or analytics.
            If we ever add any of these to improve the App, we will update this
            Privacy Policy before doing so.
          </li>
          <li>
            We do not collect contacts, microphone, or photos (other than
            receipt photos you explicitly upload).
          </li>
          <li>We do not collect your precise location in the background.</li>
          <li>We do not collect data from other apps.</li>
        </Bullets>
      </section>

      {/* 3. How we use your information */}
      <section className="mb-10">
        <SectionHeading>3. How we use your information</SectionHeading>
        <Bullets className="mb-4">
          <li>
            To match FDA food recalls to your preferences and send you relevant
            push notifications.
          </li>
          <li>
            To store your preferences so the app is personalized across devices.
          </li>
          <li>
            To operate premium features (pantry matching, receipt import) if you
            subscribe.
          </li>
          <li>To respond to support requests you send us.</li>
          <li>
            To comply with legal obligations and protect our rights where
            necessary.
          </li>
        </Bullets>
        <Paragraph>
          We do NOT use your data for advertising, profiling for third parties,
          or any purpose beyond operating RecallGuard.
        </Paragraph>
      </section>

      {/* 4. How we share your information */}
      <section className="mb-10">
        <SectionHeading>4. How we share your information</SectionHeading>
        <Paragraph className="mb-4">
          We do not sell your personal information to anyone.
        </Paragraph>
        <Paragraph className="mb-6">
          We share limited information with service providers strictly to
          operate the App:
        </Paragraph>

        <div className="mb-6 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-paper-sunk text-ink">
              <tr>
                <th className="px-4 py-3 font-medium">Provider</th>
                <th className="px-4 py-3 font-medium">Purpose</th>
                <th className="px-4 py-3 font-medium">Data shared</th>
              </tr>
            </thead>
            <tbody className="text-graphite">
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  Supabase (US)
                </td>
                <td className="px-4 py-3">
                  Authentication, database, storage, edge functions
                </td>
                <td className="px-4 py-3">
                  Email, hashed password, preferences, pantry
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  Apple Push Notification service
                </td>
                <td className="px-4 py-3">Push notification delivery</td>
                <td className="px-4 py-3">
                  Device push token, notification title/body
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  Apple / Google
                </td>
                <td className="px-4 py-3">
                  App Store billing for subscriptions
                </td>
                <td className="px-4 py-3">
                  Handled entirely by the platforms; we receive only anonymized
                  subscription status
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  Anthropic (US, premium only)
                </td>
                <td className="px-4 py-3">
                  Claude Haiku Vision for receipt line-item extraction
                </td>
                <td className="px-4 py-3">
                  Receipt image content, processed once without retention by
                  Anthropic per their API terms
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Paragraph className="mb-4">
          We require each provider to use your data only for the services we
          purchase and not for their own purposes.
        </Paragraph>

        <Paragraph className="mb-3">We may also share information:</Paragraph>
        <Bullets>
          <li>If required by law, subpoena, or valid legal request.</li>
          <li>To protect the safety of users or the public in an emergency.</li>
          <li>
            In connection with a merger, acquisition, or sale of our business
            &mdash; in which case the acquirer must honor this Privacy Policy.
          </li>
        </Bullets>
      </section>

      {/* 5. Data storage and security */}
      <section className="mb-10">
        <SectionHeading>5. Data storage and security</SectionHeading>
        <Paragraph className="mb-3">
          Your data is stored on Supabase infrastructure in the United States
          (AWS US-East). Data is encrypted in transit (TLS 1.2+) and at rest.
          Database-level access is controlled by row-level security policies that
          restrict each user to their own records.
        </Paragraph>
        <Paragraph className="mb-3">
          Authentication tokens on your device are stored in AsyncStorage (iOS
          Keychain-backed on iOS, encrypted shared preferences on Android).
        </Paragraph>
        <Paragraph>
          No system is perfectly secure. If we ever experience a data breach that
          affects your personal information, we will notify you and any
          regulatory authority required by applicable law.
        </Paragraph>
      </section>

      {/* 6. Data retention */}
      <section className="mb-10">
        <SectionHeading>6. Data retention</SectionHeading>
        <Paragraph className="mb-4">
          We retain your account information as long as your account is active.
          If you delete your account:
        </Paragraph>
        <Bullets className="mb-4">
          <li>
            Your profile, preferences, pantry, and stored receipts are
            permanently deleted within 30 days.
          </li>
          <li>
            Notification delivery logs are retained for up to 90 days for audit
            and debugging, then deleted.
          </li>
        </Bullets>
        <Paragraph>
          To delete your account, email <SupportEmail /> from the address on
          file. We will complete deletion within 30 days and confirm by email.
        </Paragraph>
      </section>

      {/* 7. Your rights */}
      <section className="mb-10">
        <SectionHeading>7. Your rights</SectionHeading>

        <SubHeading>California residents (CCPA / CPRA)</SubHeading>
        <Bullets className="mb-4">
          <li>
            You have the right to know what personal information we collect,
            use, and share.
          </li>
          <li>
            You have the right to request deletion of your personal information.
          </li>
          <li>You have the right to correct inaccurate personal information.</li>
          <li>
            You have the right to limit use of sensitive personal information. We
            do not use sensitive personal information for any purpose beyond
            operating the App.
          </li>
          <li>
            <Term>
              We do not sell or &quot;share&quot; your personal information for
              cross-context behavioral advertising, and we never have.
            </Term>
          </li>
          <li>
            You will not be discriminated against for exercising these rights.
          </li>
        </Bullets>
        <Paragraph>
          To exercise any of these rights, email <SupportEmail /> from the
          address on file.
        </Paragraph>

        <SubHeading>European users (GDPR)</SubHeading>
        <Bullets>
          <li>
            The same access, deletion, correction, and portability rights apply
            under GDPR.
          </li>
          <li>
            Our lawful basis for processing is contract performance (operating
            the service you signed up for) and consent (for push notifications
            and location).
          </li>
          <li>
            You may lodge a complaint with your local data protection authority.
          </li>
        </Bullets>
      </section>

      {/* 8. Children's privacy */}
      <section className="mb-10">
        <SectionHeading>8. Children&apos;s privacy</SectionHeading>
        <Paragraph>
          RecallGuard is not directed to children under 13. We do not knowingly
          collect personal information from children under 13. If you believe a
          child under 13 has provided us personal information, email{" "}
          <SupportEmail /> and we will delete it.
        </Paragraph>
      </section>

      {/* 9. Changes to this policy */}
      <section className="mb-10">
        <SectionHeading>9. Changes to this policy</SectionHeading>
        <Paragraph>
          We may update this Privacy Policy from time to time. We will post the
          updated version at this URL and update the &quot;Last updated&quot;
          date. If the change is material, we will notify you in-app or by email
          at the address on file.
        </Paragraph>
      </section>

      {/* 10. Contact */}
      <section className="rule-top pt-8">
        <SectionHeading>10. Contact</SectionHeading>
        <Paragraph>
          For any questions about this Privacy Policy or your personal
          information: <SupportEmail />
        </Paragraph>
        <div className="mt-8">
          <Link
            to="/recallguard/terms"
            className="text-sm text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink"
          >
            Terms of Service &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RecallGuardPrivacy;
