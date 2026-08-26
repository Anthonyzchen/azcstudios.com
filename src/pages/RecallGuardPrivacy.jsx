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
          Privacy Policy
        </h1>
        <p className="text-sm text-graphite/70">
          RecallGuard &mdash; Last updated August 26, 2026
        </p>
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
          RecallGuard is a paid app with no advertising, so the only reason to
          collect anything is to match FDA and USDA recalls to you and to keep
          the app working.
        </Paragraph>

        <SubHeading>Information you provide directly</SubHeading>
        <Bullets>
          <li>
            <Term>Email address</Term> &mdash; you sign in with Apple or Google,
            and we receive the address that account supplies. It is your login
            and the destination for the weekly digest if you turn it on. If you
            use Sign in with Apple with{" "}
            <Term>Hide My Email</Term>, we only ever see the relay address Apple
            issues, never your real one.
          </li>
          <li>
            <Term>Name</Term> &mdash; optional, and only if Apple or Google
            supplies it at sign-in. Used to identify you to someone you link
            households with. You can leave it blank.
          </li>
          <li>
            <Term>Preferences</Term> &mdash; the US state you live in, food
            categories you care about, and brands you buy. You choose what to
            enter; any field may be left blank.
          </li>
          <li>
            <Term>Allergen and pet profile</Term> &mdash; the allergens you want
            flagged, and whether your household has pets. Allergy information is{" "}
            <Term>health information</Term>, and we treat it as the most
            sensitive thing in your account: it is used only to decide which
            recalls reach you, it is never shared with another user or a third
            party, and it is never used for marketing. See{" "}
            <a href="#choices" className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink">
              Section 8
            </a>{" "}
            for how to remove it.
          </li>
          <li>
            <Term>Pantry contents</Term> &mdash; products you add by barcode
            scan, receipt, or by hand. Used only to match incoming recalls
            against your specific items.
          </li>
          <li>
            <Term>Receipt content</Term> &mdash; if you photograph a receipt, the
            line-item text extracted from it, plus the retailer name when it can
            be identified. <Term>The photo itself is never stored.</Term> It is
            sent once for text extraction and discarded when the response comes
            back; only the extracted lines are saved.
          </li>
        </Bullets>

        <SubHeading>Information collected automatically</SubHeading>
        <Bullets>
          <li>
            <Term>Push notification token</Term> &mdash; a device-specific
            identifier issued by Apple when you enable notifications. Required
            to deliver recall alerts.
          </li>
          <li>
            <Term>Approximate location</Term> &mdash; only if you tap &quot;Use
            my location&quot; in Preferences. We convert latitude/longitude into
            a US state and immediately discard the precise coordinates. We do
            not track your location in the background.
          </li>
          <li>
            <Term>Usage data</Term> &mdash; which screens you open and which
            features you use, recorded through PostHog and linked to your
            account ID. We use it to find where the app is confusing or broken.
            It contains no pantry contents, no allergen data, and no receipt
            text. <Term>You can turn this off</Term> in Settings &rarr; Privacy
            &rarr; Share usage data.
          </li>
          <li>
            <Term>Screen recordings during first-time setup only</Term> &mdash;
            while you are going through initial setup, PostHog records the
            screens you move through so we can see where people get stuck.{" "}
            <Term>
              Recording stops when you reach the home screen and never runs
              again.
            </Term>{" "}
            Text you type, images, and camera views are masked before anything
            leaves your device, so allergen entries, pantry contents, and
            receipts are not readable in the recording. The same Settings
            toggle switches this off, and switching it off mid-setup stops the
            recording in progress.
          </li>
          <li>
            <Term>Crash and performance diagnostics</Term> &mdash; when the app
            crashes or a screen is slow, Sentry records the error and the device
            model, OS version, and app version. Your email address and IP
            address are stripped before the report is sent. The same Settings
            toggle turns this off.
          </li>
        </Bullets>

        <SubHeading>Information we do not collect</SubHeading>
        <Bullets>
          <li>
            We do not collect a password. Sign-in is handled entirely by Apple
            or Google, so there is no RecallGuard password to store or leak.
          </li>
          <li>
            We do not collect contacts, microphone, or photos. The camera is
            used for barcode scanning and receipt capture only, and those frames
            are processed on the spot rather than saved.
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
            To understand which parts of the app people use and where they get
            stuck, and to diagnose crashes &mdash; unless you have turned off
            usage-data sharing.
          </li>
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
              <tr>
                <td className="px-4 py-3 font-medium text-ink">
                  Supabase (US)
                </td>
                <td className="px-4 py-3">
                  Authentication, database, storage, edge functions
                </td>
                <td className="px-4 py-3">
                  Email, name, preferences, allergen profile, pantry
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  Apple
                </td>
                <td className="px-4 py-3">
                  Sign-in, push notification delivery, App Store billing
                </td>
                <td className="px-4 py-3">
                  Identity token at sign-in; device push token and notification text; purchase records
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  Google
                </td>
                <td className="px-4 py-3">
                  Sign-in
                </td>
                <td className="px-4 py-3">
                  Identity token at sign-in
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  RevenueCat (US)
                </td>
                <td className="px-4 py-3">
                  Subscription state across devices
                </td>
                <td className="px-4 py-3">
                  Your account ID, and the purchase records Apple reports
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  Resend (US)
                </td>
                <td className="px-4 py-3">
                  Sending the weekly digest and account email
                </td>
                <td className="px-4 py-3">
                  Email address, and the recall summaries addressed to you
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  Anthropic (US)
                </td>
                <td className="px-4 py-3">
                  Claude Haiku Vision for receipt line-item extraction
                </td>
                <td className="px-4 py-3">
                  The receipt image, sent once and not retained by Anthropic per their API terms. Not linked to your account
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  Go-UPC (US)
                </td>
                <td className="px-4 py-3">
                  Looking up a product from a scanned barcode
                </td>
                <td className="px-4 py-3">
                  The barcode number only. Not linked to your account
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  PostHog (US)
                </td>
                <td className="px-4 py-3">
                  Product analytics
                </td>
                <td className="px-4 py-3">
                  Screen and feature events, linked to your account ID. Off if you disable usage-data sharing
                </td>
              </tr>
              <tr className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">
                  Sentry (US)
                </td>
                <td className="px-4 py-3">
                  Crash and performance diagnostics
                </td>
                <td className="px-4 py-3">
                  Error reports, device and app version, your account ID. Email and IP stripped. Off with the same toggle
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Paragraph className="mb-4">
          We require each provider to use your data only for the services we
          purchase and not for their own purposes. Every one of them stores data
          in the United States.
        </Paragraph>

        <SubHeading>Information you choose to share with other users</SubHeading>
        <Paragraph className="mb-3">
          Two features share information between accounts. Both are off unless
          you start them, and both can be ended at any time.
        </Paragraph>
        <Bullets className="mb-4">
          <li>
            <Term>Household links</Term> &mdash; if you invite someone to link
            households and they accept, each of you can see the other&apos;s name
            and email address, and a recall matching either pantry notifies both
            of you. <Term>Your allergen profile is never shared</Term>, and
            neither is the contents of your pantry as a list. Unlinking in
            Settings ends this immediately for both sides.
          </li>
          <li>
            <Term>Referrals</Term> &mdash; if you enter someone&apos;s referral
            code, we record that your account came from theirs. They can see
            that a referral was made; they cannot see who you are, your email,
            or anything else about your account.
          </li>
        </Bullets>

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
          Authentication tokens on your device are held in iOS Keychain-backed
          storage. Your usage-data preference is stored on the device as well,
          not on your profile, so objecting to analytics is not itself recorded
          against your account.
        </Paragraph>
        <Paragraph>
          No system is perfectly secure. If we ever experience a data breach that
          affects your personal information, we will notify you and any
          regulatory authority required by applicable law.
        </Paragraph>
      </section>

      {/* 6. Data retention */}
      <section className="mb-10">
        <SectionHeading>6. Data retention and deletion</SectionHeading>
        <Paragraph className="mb-4">
          We keep your account information for as long as your account exists.
        </Paragraph>
        <Paragraph className="mb-4">
          To delete it, open <Term>Settings &rarr; Delete my account</Term> in
          the app. Deletion runs immediately: your profile, preferences,
          allergen profile, pantry, receipt line items, household links, and
          referral records are removed in a single cascade, and the account
          cannot be recovered afterwards. You can also email <SupportEmail />{" "}
          from the address on file and we will do it for you within 30 days.
        </Paragraph>
        <Paragraph className="mb-3">Two things outlive the account:</Paragraph>
        <Bullets className="mb-4">
          <li>
            Notification delivery logs are kept for up to 90 days for audit and
            debugging, then deleted.
          </li>
          <li>
            Usage and crash events already sent to PostHog and Sentry are
            retained on their standard schedules. Ask us at <SupportEmail /> and
            we will have them purged.
          </li>
        </Bullets>
        <Paragraph>
          Cancelling your subscription does not delete your account, and
          deleting your account does not cancel your subscription &mdash; that
          is managed in your Apple ID subscription settings.
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
            You have the right to limit use of sensitive personal information.
            The only sensitive personal information we hold is your allergen
            profile, and we use it for a single purpose &mdash; deciding which
            recalls to show you. We do not use it to infer anything about you,
            we do not disclose it, and there is nothing further to limit.
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
            Our lawful basis depends on the data. Running the service you paid
            for is <Term>contract performance</Term>. Push notifications,
            location, and your allergen profile rest on{" "}
            <Term>your explicit consent</Term> &mdash; allergy data is
            special-category data under Article 9, and we process it only
            because you entered it for the purpose of being warned. Usage and
            crash analytics rest on <Term>legitimate interest</Term> in keeping
            the app working, which you can object to at any time by turning off
            usage-data sharing in Settings.
          </li>
          <li>
            Withdrawing consent is self-service: clear your allergen profile in
            Preferences, revoke location or notification permission in iOS
            Settings, or delete your account outright.
          </li>
          <li>
            You may lodge a complaint with your local data protection authority.
          </li>
        </Bullets>
      </section>

      {/* 8. Your privacy choices — target of the App Store "Privacy Choices"
           URL (azcstudios.com/recallguard/privacy#choices). Apple expects a
           reader following that link to land on the analytics opt-out, the
           deletion path, and the export route. Keep the id and all three. */}
      <section className="mb-10" id="choices">
        <SectionHeading>8. Your privacy choices</SectionHeading>
        <Paragraph className="mb-4">
          Everything here is self-service in the app, except export, which is a
          one-line email.
        </Paragraph>
        <SubHeading>Turn off usage data and crash reports</SubHeading>
        <Paragraph className="mb-4">
          <Term>Settings &rarr; Privacy &rarr; Share usage data.</Term> Turning
          it off stops all three things on that device immediately: product
          analytics, crash and performance diagnostics, and the first-time
          setup screen recording. The app works exactly the same either way, and nothing
          about your subscription or your alerts changes.
        </Paragraph>
        <SubHeading>Delete your account</SubHeading>
        <Paragraph className="mb-4">
          <Term>Settings &rarr; Delete my account.</Term> Immediate and
          irreversible. See Section 6 for exactly what is removed.
        </Paragraph>
        <SubHeading>Export your data</SubHeading>
        <Paragraph className="mb-4">
          Email <SupportEmail /> from the address on file and we will send you a
          machine-readable copy of everything associated with your account
          within 30 days, at no charge.
        </Paragraph>
        <SubHeading>Notifications and location</SubHeading>
        <Paragraph>
          Push notifications and their severity threshold are in{" "}
          <Term>Settings &rarr; Notifications</Term>. Location permission is in
          iOS Settings, and revoking it leaves your state selection in place so
          alerts keep working.
        </Paragraph>
      </section>

      {/* 9. Children's privacy */}
      <section className="mb-10">
        <SectionHeading>9. Children&apos;s privacy</SectionHeading>
        <Paragraph>
          RecallGuard is not directed to children under 13. We do not knowingly
          collect personal information from children under 13. If you believe a
          child under 13 has provided us personal information, email{" "}
          <SupportEmail /> and we will delete it.
        </Paragraph>
      </section>

      {/* 10. Changes to this policy */}
      <section className="mb-10">
        <SectionHeading>10. Changes to this policy</SectionHeading>
        <Paragraph>
          We may update this Privacy Policy from time to time. We will post the
          updated version at this URL and update the &quot;Last updated&quot;
          date. If the change is material, we will notify you in-app or by email
          at the address on file.
        </Paragraph>
      </section>

      {/* 11. Contact */}
      <section className="rule-top pt-8">
        <SectionHeading>11. Contact</SectionHeading>
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
