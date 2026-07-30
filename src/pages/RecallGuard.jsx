import { useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import kitchenPhoto from "../assets/images/recallguard-kitchen.jpg";
import { usePageEntrance } from "../lib/usePageEntrance";
import { Section, Paragraph, List, FaqItem } from "../components/ui";
import { STUDIO_NAME } from "../lib/site";

const product = products.find((p) => p.slug === "recallguard");

/**
 * Placeholder for imagery that doesn't exist yet. Every landing-page visual in
 * the marketing asset plan is still TODO and there are no real app captures to
 * use, so these render as labelled empty frames rather than stand-in art.
 * Replace with <img> once real assets land.
 */
const ImageSlot = ({ label, aspect = "aspect-[16/10]", className = "" }) => (
  <div
    className={`${aspect} ${className} flex w-full items-center justify-center rounded-2xl border border-dashed border-line bg-paper-sunk`}
  >
    <p className="px-6 text-center text-xs uppercase tracking-[0.2em] text-graphite/40">
      {label}
    </p>
  </div>
);

const FEATURES = [
  {
    title: "Your allergens, alerted first",
    body: "Pick the allergens your household reacts to: milk, peanut, tree nut, sesame, any of the FDA's nine. Every recall gets filtered against that list, and when one names an allergen you track, the push notification leads with the allergen, not the brand.",
  },
  {
    title: "Your pantry, matched automatically",
    body: "Add what you've bought by typing it, scanning the barcode, or photographing the receipt. When a recall hits one of those products, the alert says your item is recalled, not that you should go check.",
  },
  {
    title: "Pet food, as the FDA publishes it",
    body: "Pet food recalls get far less coverage than human food recalls and rarely reach the news. RecallGuard reads the FDA's animal-food feed and flags the recalls that touch a species in your household.",
  },
  {
    title: "Your whole household, not just you",
    body: "Link up to four households so an alert reaches whoever actually opens the fridge. One person adds the groceries; everyone who eats them gets told.",
  },
];

const SEVERITY_TIERS = [
  {
    tier: "Class I",
    meaning: "Serious risk",
    behavior:
      "Loud push, high priority. Can bypass Do Not Disturb if you allow time-sensitive notifications.",
  },
  {
    tier: "Class II",
    meaning: "Possible risk",
    behavior: "Standard push, delivered without a sound.",
  },
  {
    tier: "Class III",
    meaning: "Minor issue",
    behavior: "No push at all. It shows up in your feed and stays there.",
  },
];

const FAQS = [
  {
    question: "Where does the recall data come from?",
    answer:
      "Two public government sources: the FDA, which covers most human food and animal food, and USDA FSIS, which covers meat, poultry, and egg products. RecallGuard reads both feeds on a schedule, extracts the product identifiers, and matches them against your profile and pantry. It does not republish, alter, or editorialize either agency's findings.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "No. There is a 14-day free trial, and after that it's a paid subscription. A free tier would mean funding the app some other way, and the other ways all involve your data or your attention. The FDA also publishes a free recall email list at fda.gov if that suits you better.",
  },
  {
    question: "How does receipt scanning work?",
    answer:
      "You photograph a grocery receipt and the app reads the line items, then shows them to you for review before anything lands in your pantry. You confirm or correct the parse. Nothing is added silently.",
  },
  {
    question: "Do I have to add a pantry to get value?",
    answer:
      "No. Allergen and state filtering work on their own from the moment you set your profile. The pantry is what upgrades an alert from 'this recall involves an allergen you track' to 'this specific product you bought is recalled.'",
  },
  {
    question: "Which platforms are supported?",
    answer:
      "iPhone at launch. There is no committed Android date.",
  },
];

const RecallGuard = () => {
  const entranceRef = usePageEntrance();

  useEffect(() => {
    document.title = `RecallGuard | ${STUDIO_NAME}`;
  }, []);

  return (
    <div ref={entranceRef}>
      {/* Hero */}
      <section className="px-gutter pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full bg-rg"
                aria-hidden="true"
              />
              <p className="font-Inter text-eyebrow uppercase text-graphite/60">
                RecallGuard
              </p>
            </div>

            <h1 className="mb-6 font-Fraunces text-display-sm font-normal text-ink">
              Undeclared peanut. Never again caught off guard.
            </h1>

            <p className="mb-8 max-w-prose text-lede text-graphite">
              RecallGuard watches FDA and USDA food recalls and tells you the
              same day one names an allergen you track, a species in your
              household, or a product in your pantry.
            </p>

            {product.appStoreUrl ? (
              <a
                href={product.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-rg px-6 py-3 text-sm font-medium text-white transition-colors duration-300 ease-ink hover:bg-rg-deep"
              >
                Download on the App Store
              </a>
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex cursor-default items-center gap-2 rounded-full border border-line bg-paper-sunk px-6 py-3 text-sm font-medium text-graphite/70">
                  Coming to the App Store
                </span>
                <Link
                  to="/recallguard/support"
                  className="text-sm text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink"
                >
                  Questions?
                </Link>
              </div>
            )}

            {/* $50/yr is the confirmed launch price (Anthony, 2026-07-29),
                superseding the earlier $49.99. Keep this, the Terms, and the
                App Store Connect IAP price identical — they are the same
                promise made in three places. */}
            <p className="mt-4 text-sm text-graphite/70">
              $50 per year after a 14-day free trial. Cancel anytime in iOS
              Settings.
            </p>
          </div>

          {/* Editorial photo, not a product shot. Per assets/editorial/CREDITS.md
              these run as atmosphere behind type — never as the thing claiming
              to be a recalled product. Pexels license, free commercial, no
              attribution required. No faces, no legible brands. */}
          <img
            src={kitchenPhoto}
            alt="A carton of eggs on a floured wooden counter beside a whisk"
            width="778"
            height="1100"
            loading="eager"
            className="mx-auto aspect-[4/5] w-full max-w-sm rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* Why it exists */}
      <Section eyebrow="Why" title="Most recall apps tell everyone everything">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5">
            <Paragraph>
              Which is the same as telling you nothing. Fifty notifications a
              week about recalls that don't touch your household, and the one
              that actually matters for your peanut-allergic kid sits three
              screens down.
            </Paragraph>
            <Paragraph>
              RecallGuard inverts it. You say what matters (your allergens, your pets, what you actually buy) and the app filters the FDA's
              stream down to the recalls that could plausibly reach your
              kitchen. Everything else stays in the feed, unread, where it
              belongs.
            </Paragraph>
          </div>
          <ImageSlot label="Feed screenshot pending" />
        </div>
      </Section>

      {/* Features */}
      <Section eyebrow="Features" title="What it does">
        {/* Two columns, not three — four features in a 3-col grid orphans the
            last one. 2x2 balances and leaves the copy readable. */}
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <div
                className="mb-5 h-px w-10 bg-rg"
                aria-hidden="true"
              />
              <h3 className="mb-3 font-Fraunces text-lg text-ink">
                {feature.title}
              </h3>
              <Paragraph>{feature.body}</Paragraph>
            </div>
          ))}
        </div>

        {/* Coverage note. Both agencies are live sources: FDA (human + animal
            food) and USDA FSIS (meat, poultry, egg) — see poll-fda-recalls and
            poll-fsis-recalls. Poll cadence is stated honestly here because
            claims.md bans real-time phrasing. */}
        <div className="mt-12 rounded-2xl border border-line bg-paper-sunk p-6 sm:p-8">
          <h3 className="mb-3 font-Fraunces text-lg text-ink">
            What's covered
          </h3>
          <Paragraph className="mb-4">
            Two agencies, because food safety is split between them. The FDA
            covers most human food plus animal food. USDA FSIS covers meat,
            poultry, and egg products. RecallGuard reads both, so a beef recall
            and a cookie recall reach you the same way.
          </Paragraph>
          <Paragraph>
            Alerts land the same day the agency posts the recall, not the
            instant it happens. We poll the feeds on a schedule rather than
            claiming a real-time pipe we don't have.
          </Paragraph>
        </div>
      </Section>

      {/* Alert behavior */}
      <Section eyebrow="Alerts" title="How notifications behave">
        <Paragraph className="mb-8 max-w-prose">
          The FDA classifies every recall by how much harm it could cause.
          RecallGuard delivers each class differently, so a labeling technicality
          never wakes you up and a genuine hazard never gets buried.
        </Paragraph>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="rule-bottom">
                <th className="pb-3 pr-6 text-xs uppercase tracking-[0.2em] text-graphite/60">
                  Class
                </th>
                <th className="pb-3 pr-6 text-xs uppercase tracking-[0.2em] text-graphite/60">
                  FDA meaning
                </th>
                <th className="pb-3 text-xs uppercase tracking-[0.2em] text-graphite/60">
                  What RecallGuard does
                </th>
              </tr>
            </thead>
            <tbody>
              {SEVERITY_TIERS.map((row) => (
                <tr key={row.tier} className="rule-bottom align-top">
                  <td className="py-4 pr-6 font-Fraunces text-base text-ink">
                    {row.tier}
                  </td>
                  <td className="py-4 pr-6 text-[0.95rem] text-graphite">
                    {row.meaning}
                  </td>
                  <td className="py-4 text-[0.95rem] leading-relaxed text-graphite">
                    {row.behavior}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Pricing" title="One subscription, no free tier">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <div className="rounded-2xl border border-line bg-white/60 p-8">
            <p className="mb-2 font-Fraunces text-4xl text-ink">$50</p>
            <p className="mb-6 text-sm text-graphite/70">
              per year, after a 14-day free trial
            </p>
            <List
              items={[
                "Personalized recall feed for your state and allergens",
                "Automatic pantry matching by product code",
                "Receipt photo scanning",
                "Priority push for your tracked allergens",
                "Severity-tiered delivery",
                "Optional weekly digest email, off by default",
                "No ads, no trackers, no data sold",
              ]}
            />
          </div>

          <div className="space-y-5">
            <Paragraph>
              The subscription pays for FDA and USDA ingestion, the matching
              engine, receipt parsing, and Apple's cut. There is no free tier
              because the honest versions of "free" all involve selling
              something that isn't ours to sell.
            </Paragraph>
            <Paragraph>
              If that math doesn't work for you, the FDA publishes a free recall
              email list at fda.gov. It's unfiltered and it's slower, but it's
              real and it's free, and we'd rather tell you that than take your
              money under false pretenses.
            </Paragraph>
            <Paragraph>
              Billing is handled by Apple. Cancel anytime from iOS Settings.
            </Paragraph>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Questions" title="Frequently asked" width="prose">
        <div className="rule-top">
          {FAQS.map((faq) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link
            to="/recallguard/support"
            className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink"
          >
            Support
          </Link>
          <Link
            to="/recallguard/privacy"
            className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink"
          >
            Privacy Policy
          </Link>
          <Link
            to="/recallguard/terms"
            className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink"
          >
            Terms of Service
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default RecallGuard;
