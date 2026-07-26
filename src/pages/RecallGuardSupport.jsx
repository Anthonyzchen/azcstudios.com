import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageEntrance } from "../lib/usePageEntrance";
import {
  SectionHeading,
  Paragraph,
  FaqItem,
  CopyEmail,
} from "../components/ui";
import { SUPPORT_EMAIL, STUDIO_NAME } from "../lib/site";

const linkClass =
  "text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink";

const FAQS = [
  {
    question: "I'm not receiving any notifications.",
    answer:
      "Check three things in order. First, iOS Settings > Notifications > RecallGuard — make sure Allow Notifications is on. Second, in the app's Preferences, confirm you've set a state and at least one allergen, brand, or pantry item; with an empty profile there is nothing to match against. Third, remember that Class III recalls never push by design — they appear in the feed only. If all three check out, email us with your account address.",
  },
  {
    question: "A recall I heard about isn't in my feed.",
    answer:
      "The most common reason is that it isn't an FDA recall. Meat, poultry, and egg product recalls are regulated by USDA FSIS, which is a separate agency and not currently a data source for RecallGuard. The second most common reason is filtering — if the recall doesn't touch your state, allergens, or pantry, it won't surface. You can widen your filters in Preferences.",
  },
  {
    question: "The receipt scan got items wrong.",
    answer:
      "Receipt parsing shows you every line item for review before anything is saved, so you can correct or remove items at that step. If a particular receipt parses badly and you're willing to share it, email it to us — real receipts are how the parser gets better.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Subscriptions are billed by Apple, not by us, so cancellation happens in iOS Settings > your name > Subscriptions > RecallGuard > Cancel Subscription. Cancel at least 24 hours before the renewal date. You keep access through the end of the period you already paid for.",
  },
  {
    question: "How do I get a refund?",
    answer:
      "Refunds are handled entirely by Apple and we cannot issue them directly. Use reportaproblem.apple.com with the Apple ID that made the purchase. If Apple declines and you think the circumstances warrant another look, email us and we'll tell you honestly whether we think an appeal is worth filing.",
  },
  {
    question: "How do I delete my account and my data?",
    answer:
      "Use the in-app account deletion flow, or email us from the address on your account. Your profile, preferences, pantry, and stored receipts are permanently deleted within 30 days. Notification delivery logs age out within 90 days. Deletion is irreversible.",
  },
  {
    question: "How do I change my state, allergens, or pets?",
    answer:
      "All of it lives in Preferences and all of it is editable at any time. Nothing you set during onboarding is permanent, and every field can be left blank.",
  },
  {
    question: "Is RecallGuard affiliated with the FDA?",
    answer:
      "No. RecallGuard reads the FDA's public recall data and is not affiliated with, endorsed by, or speaking for the FDA. For the official source, see fda.gov/safety/recalls-market-withdrawals-safety-alerts.",
  },
];

const RecallGuardSupport = () => {
  const entranceRef = usePageEntrance();

  useEffect(() => {
    document.title = `Support — RecallGuard | ${STUDIO_NAME}`;
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
          Support
        </h1>
        <p className="text-sm text-graphite/70">RecallGuard</p>
      </div>

      {/* Contact */}
      <section className="mb-12">
        <Paragraph className="mb-6">
          RecallGuard is built by one developer, which means the person reading
          your email is the person who can fix the problem. Include your account
          email and, if it's a matching or notification issue, the recall or
          product involved.
        </Paragraph>
        <CopyEmail email={SUPPORT_EMAIL} variant="button" />
        <p className="mt-4 text-sm text-graphite/70">
          We aim to reply within two business days.
        </p>
      </section>

      {/* FAQs */}
      <section className="mb-12">
        <SectionHeading>Common questions</SectionHeading>
        <div className="rule-top mt-6">
          {FAQS.map((faq) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </section>

      {/* Urgent */}
      <section className="mb-12 rounded-2xl border border-line bg-paper-sunk p-6 sm:p-8">
        <h2 className="mb-3 font-Fraunces text-lg text-ink">
          If this is a medical emergency
        </h2>
        <Paragraph>
          Do not email us. Contact your doctor, poison control, or your local
          emergency services. RecallGuard is an information tool and is not a
          substitute for medical care.
        </Paragraph>
      </section>

      {/* Links */}
      <section className="rule-top flex flex-wrap gap-x-6 gap-y-2 pt-8 text-sm">
        <Link to="/recallguard/privacy" className={linkClass}>
          Privacy Policy
        </Link>
        <Link to="/recallguard/terms" className={linkClass}>
          Terms of Service
        </Link>
        <a
          href="https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          FDA recall page
        </a>
      </section>
    </div>
  );
};

export default RecallGuardSupport;
