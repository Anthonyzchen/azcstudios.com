import { useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import allergenPhoto from "../assets/images/recallguard-allergens.jpg";
import { usePageEntrance } from "../lib/usePageEntrance";
import {
  Section,
  Paragraph,
  List,
  Stat,
  FaqItem,
  WaitlistForm,
} from "../components/ui";
import { Chip, HeroPhone, LockScreenPhone } from "../components/recallguard";
import { STUDIO_NAME } from "../lib/site";

const product = products.find((p) => p.slug === "recallguard");

// One line each. The detail these used to carry lives in the FAQ, where a
// reader who wants it goes looking — a feature grid is for scanning.
const FEATURES = [
  {
    title: "Your allergens, alerted first",
    body: "The alert leads with the allergen you track, not the brand.",
  },
  {
    title: "Your pantry, matched automatically",
    body: "Scan a barcode or a receipt. We tell you your item is recalled.",
  },
  {
    title: "Pet food, as the FDA publishes it",
    body: "The animal-food feed almost nobody else watches.",
  },
  {
    title: "Your whole household, not just you",
    body: "Link up to four people, so the alert reaches whoever opens the fridge.",
  },
];

// Annotations on the hero screenshot. Every one restates something already
// legible in recallguard-feed.webp — the protection card, the Yours/All
// control, the plain-English severity label with its CLASS PENDING chip, the
// PET badge — so none of them is a claim the picture doesn't already make.
// That constraint is the point: an annotation the reader can check is worth
// more than four they have to take on faith.
//
// Rewritten 2026-08-24 alongside the screenshot. The old capture predated the
// severity-ramp redesign and showed a different app: four labelled tabs, an
// "All"-feed header, a USDA FSIS card. Three of the four old chips pointed at
// things no longer in frame. If you swap the screenshot again, re-read this
// list against the new image first — a chip pointing at nothing is worse than
// no chip.
//
// Do NOT add a chip about allergen matching here. This capture is the "Yours"
// feed filtered by state, not by allergen, so an allergen chip would contradict
// the image it points at. Allergens are covered in the features grid and the
// FAQ, where nothing is being annotated.
//
// FDA-and-USDA coverage lost its chip in the rewrite: there is no FSIS card in
// this capture. Deliberate (Anthony, 2026-08-24) — the claim is still true and
// still belongs on the page, just not as an annotation over a picture that
// doesn't show it.
//
// `position` places the chip at xl, NOT lg. Below 1280px the page content is
// still fluid, so the screenshot column keeps shrinking while the chips do not:
// at exactly 1024px the gutter collapses to ~73px against a 176px chip and each
// one buries 103px of the phone, which is worse than the layout this replaced.
// From 1280px up the content width is capped at 68rem, the column settles at a
// fixed 592px, and the overlap is a stable 20px. Below xl they render as a plain
// row under the phone instead.
//
// `side` drives which way the chip slides when the phone is hovered: outward,
// away from the screenshot it is sitting on.
//
// `drift` is horizontal travel across the hero's scroll range, and it points
// the same way: negative for left-side chips, positive for right. It runs
// one-directionally from the laid-out position, so scroll 0 keeps the designed
// 20px overlap and scrolling uncovers the phone.
//
// Magnitudes are set by what each chip can travel into, not by taste:
//   1 (left, 6%)        -70  nothing beside it, it clears the headline entirely
//   2 (right, 27%)      +80  page gutter, ~190px of room at 1471px
//   3 (left, 50%)       -35  sits beside the lede, and the grid gap is only 64px
//   4 (right, 72%)      +95  page gutter again, the freest of the four
// Left is tighter than right because the copy column is there. Varying them is
// also what sells the depth: matched values read as one rigid sheet sliding.
//
// The `top` percentages track features in the image and are not free: 6% sits
// beside the protection card, 27% the Yours/All control, 50% the severity
// label, 72% the PET badge. Re-measure against any new capture.
const HERO_CHIPS = [
  {
    title: "Checked, not just listed",
    detail: "Your pantry against every active recall",
    side: "left",
    position: "xl:left-0 xl:top-[6%]",
    drift: -70,
  },
  {
    title: "Two feeds",
    detail: "Yours is filtered to your state. All is everything.",
    side: "right",
    position: "xl:right-0 xl:top-[27%]",
    drift: 80,
  },
  {
    title: "Severity in plain English",
    detail: "And it says so when the FDA hasn't rated it yet",
    side: "left",
    position: "xl:left-0 xl:top-[50%]",
    drift: -35,
  },
  {
    title: "Pet food too",
    detail: "The animal-food feed, flagged with a paw",
    side: "right",
    position: "xl:right-0 xl:top-[72%]",
    drift: 95,
  },
];

// The three beats beside the lock screen. Ordered as the moment actually
// happens rather than as a feature list: what fires it, what it says, what you
// do about it.
//
// The middle beat quotes the app's own push template. Keep it that way — the
// section's whole argument is that this is the real thing that lands, and a
// prettier invented sentence would quietly turn a demonstration back into a
// promise.
const ALERT_BEATS = [
  {
    title: "The agency publishes",
    body: "We poll the FDA and USDA feeds on a schedule and match each new notice against your profile and your pantry.",
  },
  {
    title: "The alert leads with the reason",
    body: "Severity first, then the hazard or the allergen, then who recalled it. Enough to act on without unlocking your phone.",
  },
  {
    title: "You check one shelf",
    body: "Tap through for lot codes, dates, and what to do with it. Mark it handled and it stops following you.",
  },
];

// Every figure here is logged in recall-guard/marketing/facts.md with its
// source and last-verified date. Do not add a number to this page that isn't in
// that ledger, and don't round one that is.
//
// RESTRUCTURED 2026-08-24. The section used to run three before/after trend
// stats and argue "recalls got bigger". That was retired for two reasons, both
// recorded in the ledger:
//
//   1. It rested on a metric that inverts. Recall volume measures enforcement
//      activity, not food safety. FDA units FELL 18.7% in H1 2026 (84.6M ->
//      68.8M) in the same period the agency lost roughly one in five of its
//      food-and-drug safety workforce. Refreshing the stat would have flipped
//      its direction; leaving it stale was the only way to keep it.
//   2. It argued a problem the app cannot fix. Nothing in RecallGuard makes
//      recalls smaller or rarer. The notification gap is the closable one.
//
// The severity stat (~240 -> 500+ hospitalized or killed) came out for a third
// reason: it CANNOT be refreshed. PIRG's Food for Thought 2026 carries no 2025
// successor — checked 2026-08-24 — and its nearest equivalent, outbreak-
// associated illnesses, FELL from 1,804 to 1,003. Don't go looking again.
//
// Every figure below is current and moves the RIGHT way: each one gets worse if
// the situation gets worse. That is the test any replacement has to pass.
//
// HARD RULE, unchanged: state the staffing collapse and the recall figures as
// CONCURRENT, never causal. No source establishes the link and the section does
// not need it. Also never say the FDA's budget was cut — the proposed cut was
// rejected and H.R. 5371 funds the agency at $6.957B.
const CAPACITY_FIGURES = [
  {
    // The only tile with a denominator, because it is the only figure that HAS
    // one. 432 alone is a number; 432 against the 1,500 the agency itself says
    // it needs is the shortfall, and the shortfall is the point. It used to be
    // explained in a paragraph below the grid, where it read as commentary
    // rather than as the fact it is.
    //
    // 1,500 is the FDA's own internal estimate, so the meta line attributes it.
    // Never present it as an outside body's opinion of what the agency needs.
    figure: "432",
    of: "1,500",
    label: "FDA investigators for 36,600 food facilities",
    meta: "Against the 1,500 the agency's own estimate calls for",
  },
  {
    figure: "3,859",
    label: "employees left the FDA in 2025, and 473 more in 2026",
    meta: "Roughly one in five of the food and drug safety workforce",
  },
  {
    figure: "29%",
    label: "fewer foreign food inspections than the year before",
    meta: "Lowest level since 2011, outside the pandemic",
  },
  {
    // The one change-over-time figure among four magnitudes. It keeps the
    // comparison in its meta line rather than as a from/to arrow, so all four
    // tiles share a treatment. Refreshed 2026-08-24 from the Q1-Q3 2024->2025
    // window (7.9M -> 60M) to the newest one, and it is the only volume figure
    // that is both current and still rising.
    //
    // The ~1.5M baseline is DERIVED, not quoted, so it keeps its tilde. Two
    // independent routes land on it: Food Processing gives H1 2026 as 37.18M at
    // a 2,432% increase (implies 1.53M), and Sedgwick puts 58.52M of the 59.99M
    // Q1-Q3 2025 total inside Q3 alone (implies 1.47M). Do not drop the tilde.
    figure: "37.2M",
    label: "pounds of meat and poultry recalled by the USDA",
    meta: "First half of 2026, up from ~1.5M. A ten-year high",
  },
];

// The toll is quoted from the CDC's final case count, not from the interim
// numbers that circulated while the outbreak was open (an earlier report had
// six deaths and 18 states).
const OUTBREAK_TOLL = [
  { figure: "19", label: "states" },
  { figure: "27", label: "hospitalized" },
  { figure: "7", label: "dead" },
  { figure: "One", label: "pregnancy lost" },
];

// The notification chain, drawn rather than described. The argument in this
// section is that a recall is a relay which simply stops before it reaches the
// person holding the food, and a reader shouldn't have to assemble that from
// three paragraphs when one picture states it.
//
// Split into two groups on purpose: the break between them IS the point. Solid
// borders for the legally required handoffs, dashed for the ones no rule
// compels. Note the "absent" state is signalled by border STYLE, never by
// fading the text — a ghosted label would fail contrast, and these labels are
// the half of the diagram that matters most.
//
// Labels stay short and uniform. The FDA "not every recall gets published"
// caveat used to live inside the third node, which made that box twice the
// height of its neighbours and broke the read of three equal steps. It sits
// under the row now, where it qualifies the step without deforming the chain.
//
// CORRECTED 2026-08-24 (Anthony caught it). "The store that sold it" used to
// sit in the ABSENT group, on PIRG's wording that nobody has to contact the
// stores. That is wrong, and the regulation is unambiguous: 21 CFR 117.139
// requires a covered facility to keep a written recall plan whose procedures
// "directly notify the direct consignees of the food being recalled", and
// consignees are instructed to extend the recall to their own customers. The
// chain to the shelf is mandatory, which is precisely why product does come off
// shelves. Confirming that PIRG said a thing is not the same as confirming the
// thing, and this row was verified the first way.
//
// The corrected diagram is STRONGER, not weaker: a legally compelled chain that
// runs all the way to the shelf and then stops one step short of the person who
// already carried the food home. Do not re-widen this into "nobody has to tell
// anyone" — the narrow version is the true one and it puts the product exactly
// at the break.
const CHAIN_REQUIRED = [
  { label: "The company finds the problem" },
  { label: "It tells the FDA or USDA" },
  { label: "The stores it sold to are told" },
];

// One node, on purpose. It was two, and a lone dashed box at the end of a
// three-box required chain states the gap harder than a pair did.
const CHAIN_ABSENT = [{ label: "The person who bought it" }];

// Mirrors the app rather than paraphrasing it. `severity` keys the same ramp
// the product uses (recall-guard tailwind.config.js `colors.sev`), and the
// labels in `meaning` are the exact strings SEVERITY_LABEL and
// PENDING_SEVERITY_LABEL produce in supabase/functions/_shared/notify.ts. If a
// label changes there, it changes here.
//
// `pending` drives the swatch fill, and the rule it encodes is the app's:
// HUE CARRIES DANGER, FILL CARRIES CERTAINTY. A graded recall gets a solid
// stripe; one the FDA has published but not yet classified gets a 45-degree
// hatch in the same hue. That distinction is the honest part of shipping
// ungraded recalls at all — without it, a row we inferred as serious would be
// pixel-identical to a confirmed Class I and the whole hedge would ride on the
// word "Possible" in the label.
//
// Pending is not a fourth FDA class. It is the state a recall sits in between
// the agency publishing it and the agency grading it, which is exactly the
// window the app exists to cover, so it belongs in this table.
// SVG and gradients cannot take a Tailwind class, so the ramp is mirrored here
// as hex. Same values as `colors.sev` in tailwind.config.js — change both.
const SEVERITY_HEX = {
  3: "#c8102e",
  2: "#a8630a",
  1: "#57574f",
};

const SEVERITY_TIERS = [
  {
    tier: "Class I",
    severity: 3,
    meaning: "Serious risk",
    behavior:
      "Loud push, high priority. Can bypass Do Not Disturb if you allow time-sensitive notifications.",
  },
  {
    tier: "Class II",
    severity: 2,
    meaning: "Possible risk",
    behavior: "Standard push, delivered without a sound.",
  },
  {
    tier: "Class III",
    severity: 1,
    meaning: "Minor issue",
    behavior: "No push at all. It shows up in your feed and stays there.",
  },
  {
    tier: "Pending",
    severity: 3,
    pending: true,
    meaning: "Published, not graded yet",
    behavior:
      "Pushed on our reading of the hazard, not the FDA's grade. Labelled \u201cPossible serious risk\u201d and marked class pending, so you can tell our inference from their call.",
  },
];

const FAQS = [
  {
    question: "Where does the recall data come from?",
    answer:
      "Two public government sources: the FDA, which covers most human food and animal food, and USDA FSIS, which covers meat, poultry, and egg products. RecallGuard reads both feeds on a schedule, extracts the product identifiers, and matches them against your profile and pantry. It does not republish, alter, or editorialize either agency's findings.",
  },
  {
    // Answers the objection without itemising costs. An earlier version broke
    // down where the money goes (ingestion, matching, Apple's cut), which reads
    // as a plea rather than a price: it argues we need the money instead of
    // what the buyer gets for it. State the work, not the margins.
    //
    // A second FAQ here used to name the FDA's free email list outright.
    // Removed 2026-08-12 (Anthony): no obligation to hand a prospect the exit
    // mid-decision. Anyone determined to find a free option will find one, and
    // they can compare it to this on their own. Do not reinstate without asking.
    //
    // The question was "Is there a free tier?" until 2026-08-12. That headline
    // asks the reader's cheapest question for them and frames free as the
    // default we're withholding. Asking what the money buys gets the same
    // information across — the no-free-tier answer is still the first sentence,
    // which is what keeps a surprised installer from leaving a bait-and-switch
    // review — without leading with the absence.
    question: "What does the subscription cover?",
    answer:
      "There is a 14-day free trial, then it's $4.00 a month billed annually, with no free tier after that. You're paying for the work: three government feeds pulled on a schedule, cleaned into a consistent shape, and checked against what's actually in your pantry. The alternative is doing that yourself, every week, forever.",
  },
  {
    // Carries the allergen and household detail cut from the feature grid.
    // Deliberately stops short of the pantry question below it.
    question: "What does it match against?",
    answer:
      "Your allergen list (any of the FDA's nine: milk, peanut, tree nut, sesame and the rest), your state, the species in your household, and anything you've added to your pantry. Pet food is included, which matters because animal-food recalls get far less coverage than human food and rarely reach the news.",
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
    answer: "iPhone at launch. There is no committed Android date.",
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
        {/* Asymmetric on purpose: the copy column is capped so the screenshot
            column keeps enough gutter for the annotation chips to sit beside
            the phone instead of on top of it. See the arithmetic in the comment
            above that box before changing either number. */}
        <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] xl:grid-cols-[minmax(0,27rem)_1fr] xl:gap-16">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full bg-rg"
                aria-hidden="true"
              />
              <p className="font-Inter text-eyebrow uppercase text-graphite/60">
                RecallGuard
              </p>
            </div>

            {/* "Undeclared peanut" was FDA's own recall wording, but it reads
                as jargon and the fragment never parses as a sentence. This
                leads with the situation instead, and covers listeria, foreign
                material, and pet food rather than allergens alone. Canonical
                copy lives in the vault at
                Projects/RecallGuard/landing-page-copy.md. */}
            {/* text-balance rather than a hard <br>: at this measure the
                headline otherwise orphans its last word onto a third line, and
                a manual break would land in the wrong place once the fluid type
                scale shrinks on narrow screens. (Was "kitchen." until
                2026-08-24 — see the terminology note below.) */}
            {/* "pantry", not "kitchen", throughout this page as of 2026-08-24.
                The page used both: pantry for the feature, kitchen for the
                physical place. Anthony's call to collapse them onto the product
                noun, so the words a reader sees match the Pantry tab in the
                screenshots and in the app. The remaining "kitchen" mentions in
                this file are all inside comments recording earlier decisions
                and are left as written — rewriting the record of why a line
                reads the way it does destroys the reasoning, which is the part
                a future editor actually needs. */}
            <h1 className="mb-8 text-balance font-Fraunces text-display-sm font-normal text-ink">
              The recall happens after the food is in your pantry.
            </h1>

            {/* "household" on purpose. The old version enumerated allergens,
                pets, and pantry, which are three different match types (an
                attribute of a recall, a product category, a specific item you
                own) and read as a list of target segments. They are all food
                in your home, and the features grid below already spells out
                the specifics, so the hero states the general promise. */}
            {/* text-pretty, not text-balance: this is body copy, and balance
                would even out the line lengths where all we want is to stop
                "household." from orphaning onto a line by itself. */}
            <p className="mb-8 text-pretty text-lede text-graphite">
              RecallGuard watches FDA and USDA food recalls and tells you the
              same day one affects your household.
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
              /* Pre-launch there is no App Store link to send anyone to, so
                 the form is the page's only real action. The conditional
                 stays: the day appStoreUrl lands in products.json, the
                 download button takes over and the form disappears. */
              <div className="max-w-md">
                <WaitlistForm id="hero" />
              </div>
            )}

            {/* $48/yr is the confirmed launch price (Anthony, 2026-08-12),
                superseding $50 and, before that, $49.99. Keep this, the Terms,
                and the App Store Connect IAP price identical — they are the
                same promise made in three places.

                $4.00/mo is that same $48 divided by 12, which is why the annual
                is $48 and not $50: the monthly is the number people read first,
                so it is the one that has to be clean. It is only sayable while
                "billed annually" and the annual total sit beside it in the same
                sentence at the same size — see the pricing rule in
                recall-guard/marketing/claims.md. A monthly figure with the term
                demoted to fine print is the FTC Negative Option problem, not a
                punchier headline. If the price ever moves, re-derive this by
                hand; the app derives its own from StoreKit and will not need
                editing. Write "$4.00", never "$4" — the trailing zeros are the
                round-number quality signal doing its job. */}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-graphite/70">
              <p>
                $4.00/mo, billed annually ($48/year), after a 14-day free trial.
                Cancel anytime in iOS Settings.
              </p>
              <Link
                to="/recallguard/support"
                className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink"
              >
                Questions?
              </Link>
            </div>
          </div>

          {/* The product, in the first screen. This used to be the editorial
              kitchen photo (now moved down to Why) on the rule that these
              photos are atmosphere and never product shots. That rule still
              holds for the photography; it just shouldn't cost the hero the
              only image that shows what someone is signing up for.

              This stays a real screenshot of the shipping app, never a
              reconstruction. The chips around it are the annotation layer; the
              thing being annotated has to be genuine or the annotations are
              worth nothing. */}
          <HeroPhone chips={HERO_CHIPS} />

          {/* Same four annotations below the phone once there is no room to
              float them. A grid rather than the absolute layout above: at this
              width they are a caption, and a caption reads in order.

              lg:col-start-2 is required, not cosmetic. This is the third direct
              child of a two-column grid, so it would otherwise flow to row two
              column one — under the COPY rather than under the phone — across
              the whole 1024-1279px band, which is exactly the band where it is
              the visible version of the annotations. */}
          <ul className="mx-auto grid w-full max-w-[420px] grid-cols-1 gap-2 sm:max-w-none sm:grid-cols-2 lg:col-start-2 xl:hidden">
            {HERO_CHIPS.map((chip) => (
              <li key={chip.title}>
                <Chip title={chip.title} detail={chip.detail} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The moment the product exists for, and until now the one thing the
          page never showed. Everything above and below this argues that a
          recall never reaches you; this is the single screen where it does.

          It sits before the argument sections on purpose. The page used to run
          four consecutive problem sections — roughly 600 words — before the
          reader saw the app do anything, which is a long time to spend agreeing
          with someone who hasn't shown you their work yet.

          The eyebrow names the moment rather than the feature ("Alerts",
          "Notifications"). A reader can place themselves in "when it
          publishes"; nobody has ever pictured themselves inside "Alerts". */}
      <Section
        eyebrow="When it publishes"
        title="You hear about it the same day."
      >
        {/* Fixed phone column rather than a 50/50 split, matching the Pricing
            section below. An even split left the 300px screen floating in the
            middle of a 590px column with a canyon between it and the copy. */}
        <div className="breakout grid items-center gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <LockScreenPhone />

          <div>
            <Paragraph className="mb-8">
              This is an example of a notification the app actually sends. The
              recall is the deli-meat listeria case below, on the day its
              notice published.
            </Paragraph>

            <ol className="flex flex-col gap-8">
              {ALERT_BEATS.map((beat, i) => (
                <li key={beat.title} className="flex gap-5">
                  {/* Numbered because this genuinely is a sequence in time.
                      The chain diagram further down earns its ordering the
                      same way; the features grid does not, which is why that
                      one stays unnumbered. */}
                  <span
                    aria-hidden="true"
                    className="mt-1 font-Inter text-xs tabular-nums text-rg"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-2 font-Fraunces text-lg text-ink">
                      {beat.title}
                    </h3>
                    <Paragraph>{beat.body}</Paragraph>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* The problem, in numbers. This has to be a direct child of the entrance
          ref — usePageEntrance staggers the container's immediate children
          only, so a section nested one level deeper would pop in with no
          animation while its neighbours fade up. The case study now lives
          INSIDE this section rather than beside it, so it no longer gets its
          own stagger step, which is the intended reading: one argument, not
          two. */}
      <Section
        eyebrow="Why it matters"
        title="The system that catches this is getting smaller."
        wideHeader
      >
        {/* A breakout DIV, not a breakout Paragraph. The div spans the band and
            left-aligns to the tile grid below; the descendant measure rule caps
            the text inside it. Putting `breakout` on the Paragraph itself would
            widen the text to 1088px, which is ~140 characters a line. */}
        <div className="breakout mb-10">
          <Paragraph>
            The number of recalls barely moved: 296 in 2024, 320 in 2025. What
            changed is how many people are watching, and how large a single
            recall has become.
          </Paragraph>
        </div>

        {/* A 2x2, not a 3-across row with a lone before/after stranded under
            it. Four figures making one argument should read as one block; the
            old layout made the USDA volume look like a separate exhibit that
            happened to follow, and left the row's third column short.

            All four tiles get identical treatment even though the USDA figure
            is a change-over-time and the other three are single magnitudes.
            The comparison survives in that tile's meta line ("up from ~1.5M"),
            which costs an arrow and buys a grid that reads as one system.

            flex-col-reverse keeps the dt before the dd in the DOM while
            painting the figure above its label, so a screen reader still gets
            "FDA investigators, 432" in that order. Same pairing as the outbreak
            toll further down.

            No colour on any figure. The severity ramp is reserved for
            classification state; these are capacity and volume, and tinting
            them would spend the page's one hue on the wrong thing. */}
        <dl className="breakout grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {CAPACITY_FIGURES.map((item) => (
            <div
              key={item.label}
              className="rule-top flex flex-col-reverse pt-5"
            >
              <dt className="mt-2 max-w-[24rem] text-[0.95rem] leading-snug text-graphite">
                {item.label}
                {item.meta ? (
                  <span className="mt-1 block font-Inter text-xs uppercase tracking-[0.16em] text-graphite/80">
                    {item.meta}
                  </span>
                ) : null}
              </dt>
              <dd className="font-Fraunces text-4xl leading-none text-ink sm:text-5xl">
                {item.figure}
                {item.of ? (
                  <span className="text-2xl text-graphite sm:text-3xl">
                    {/* The slash is decorative; assistive tech gets the word,
                        so the figure reads "432 of 1,500" rather than
                        "432 slash 1,500" or, worse, "432 1,500". */}
                    <span aria-hidden="true"> / </span>
                    <span className="sr-only"> of </span>
                    {item.of}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        {/* Two columns, mirroring the 2x2 above, and it is a measure problem
            rather than a taste one.

            These are body copy, so each has to stay near 70 characters a line —
            at the full 1088px container they run about 106, which is the thing
            the width pass existed to remove. But a lone 528px paragraph sitting
            under a 1088px grid reads as stranded rather than deliberate.

            Side by side, the block spans the full container like the tiles do,
            while each column lands at ~520px and keeps the measure. The split
            is also editorially right: the left column is the commentary on the
            three FDA tiles, the right on the USDA one.

            Do NOT "fix" this by removing the caps and letting the text span the
            container. That is the bug, not the fix. */}
        <div className="breakout mt-12 grid gap-x-12 gap-y-6 sm:grid-cols-2">
          <Paragraph>
            The agency has not met the domestic inspection targets Congress set
            for it since 2018, and it names understaffing as its greatest
            barrier to getting there.
          </Paragraph>

          <Paragraph>
            That USDA figure is nine recalls against twenty-four the year
            before. Fewer actions, each one vastly larger, and the odds that a
            single recall touches something in your pantry rise with its size.
          </Paragraph>
        </div>

        {/* Same card treatment as "What's covered" further down the page, so the
            two read as the same kind of aside rather than two inventions. */}
        <div className="breakout mt-12 rounded-2xl border border-line bg-paper-sunk p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-10">
            {/* aria-hidden because the sentence beside it already says "60
                percent" — without this a screen reader reads the figure twice.
                The number here is typographic emphasis, not the only carrier of
                the fact. */}
            <p
              aria-hidden="true"
              className="font-Fraunces text-4xl text-ink sm:text-5xl"
            >
              60%
            </p>
            <div className="space-y-4">
              <Paragraph>
                Of the FDA's foodborne illness investigations in 2025, 60
                percent closed without a product ever being named.
              </Paragraph>
              <Paragraph>
                No named product means no recall, which means there is nothing
                for you to check your pantry against. The recalls that do get
                named are the ones you can still act on, and most people never
                hear about those either.
              </Paragraph>
            </div>
          </div>
        </div>

        {/* graphite/80 rather than the /60 used for eyebrows. These lines are
            what substantiate every figure above them, so they have to clear AA
            contrast — fine print is still print.

            DELIBERATELY UNCAPPED, and the only text on the page that is. The
            measure rule governs prose you READ line after line; a citation
            string is SCANNED, semicolon to semicolon, the way a photo credit
            is. At the 26rem fine cap this wrapped to four lines of tiny type
            and read as a paragraph; across the container it is two lines and
            reads as a credit strip under the block it belongs to.
            
            The test for anything else claiming this exemption: would a reader
            ever start at the left edge and read it through? If yes, it takes
            the cap. The two graphite (not graphite/80) fine-print lines in the
            chain section are prose and keep theirs. */}
        <p className="breakout mt-8 text-xs leading-relaxed text-graphite/80">
          Sources: US GAO, GAO-25-107571; OPM figures via FoodNavigator;
          ProPublica on FDA foreign inspections; Food Processing on Sedgwick
          Recall Index data, first half 2026; US PIRG Education Fund, Food for
          Thought 2026.
        </p>

        {/* The case study, now inside the section above rather than carrying its
          own header. It was already `pt-0` to read as the second half of that
          section; folding it in finishes the job, because the two were never
          two arguments. The stats say recalls got bigger and worse, and this is
          the one that shows what "worse" looked like. One header, one argument,
          and the reader reaches the product a screen sooner.

          THIS BLOCK ARGUES ONE THING AND MUST KEEP ARGUING IT: illnesses kept
          coming in AFTER the recall was public. That is the gap RecallGuard
          closes. An earlier draft led on "ten months between the first illness
          and the first recall," which is true but is the FDA's investigation
          lag, not ours to fix — it promised the reader something the product
          does not do. Do not restore that framing.

          ACCURACY GUARDRAILS, all three load-bearing:
          1. Do NOT say the product sat on shelves for months, or that the 11
             later victims ate the recalled item in defiance of the notice. The
             sources support the case curve, not either of those.
          2. The scope widened over time — Nate's Fine Foods expanded the
             pre-cooked pasta recall on 2025-09-30 and CDC widened the alert to
             more prepared foods — so some later cases involve products the June
             notice did not yet name. The claim on this page is only that the
             count kept climbing while a public notice existed.
          3. November 16, 2025 is CDC's last SAMPLE COLLECTION date, five months
             past the recall and well beyond listeria's ~70-day incubation, so
             the late cases are genuinely post-recall. Say "still getting sick,"
             never a specific onset date we don't have. */}
        <div className="breakout mt-16 rounded-2xl border border-line px-6 py-10 sm:px-10 sm:py-12">
          <p className="mb-5 font-Inter text-eyebrow uppercase text-graphite/60">
            After the notice
          </p>
          {/* h3, not h2. This card used to be its own Section with no title,
              so its heading sat level with every other section heading. Folding
              it into "Why it matters" — which does render an h2 — made it a
              subsection, and the markup has to say so. */}
          <h3 className="mb-6 text-balance font-Fraunces text-2xl font-normal leading-tight text-ink sm:text-3xl">
            The recall published in June 2025. People were still getting sick in
            November.
          </h3>
          <Paragraph className="mb-10">
            Listeria in pre-cooked pasta, sold as prepared chicken fettuccine
            alfredo at Walmart and Kroger. Seventeen people had been identified
            when the recall went out. The count did not stop there.
          </Paragraph>

          <div className="mb-10 max-w-sm">
            <Stat
              from="17"
              to="28"
              label="People infected, while a public recall notice existed the entire time"
              period="At the June 2025 recall, to the final count"
            />
          </div>

          {/* flex-col-reverse, not an sr-only term: the label is the <dt> and
              the figure is the <dd>, which is the pairing a screen reader wants
              ("dead, 7"), while the reversed column still paints the number
              above its label. Hiding a duplicate <dt> instead would announce
              every label twice. */}
          {/* A grid, not a wrapping flex row. As a flex row these four sat in
              416px of a 1006px container and left 590px of dead space to the
              right — the numbers read as a left-clustered fragment rather than
              as the toll of one event. Four equal columns make them a unit.

              Two columns below sm, because "One / pregnancy lost" needs room to
              wrap without stranding a word.

              No colour on the figures, deliberately. The severity ramp is
              reserved for classification state; these are outcomes, and a red
              "7 dead" would be the page raising its voice at the one place the
              facts do not need help. */}
          <dl className="rule-top grid grid-cols-2 gap-x-8 gap-y-7 pt-8 sm:grid-cols-4">
            {OUTBREAK_TOLL.map((item) => (
              <div key={item.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-[0.95rem] text-graphite">
                  {item.label}
                </dt>
                <dd className="font-Fraunces text-3xl text-ink">
                  {item.figure}
                </dd>
              </div>
            ))}
          </dl>

          {/* The thesis of the whole page, and the one sentence that has to
              survive any future edit. */}
          <Paragraph className="mt-10">
            The notice was public that entire time. It was posted to a
            government feed, picked up for a day, and never reached the people
            with the food already in their refrigerator. Published is not the
            same as told.
          </Paragraph>

          <p className="mt-6 text-xs leading-relaxed text-graphite/80">
            CDC, case counts as of June 18, 2025 and at the final update;
            outbreak declared over February 2026.
          </p>
        </div>
      </Section>

      {/* The bridge, and the load-bearing one. The case study leaves the reader
          asking "how is that even possible?" — this answers it, and turns the
          outbreak from one company's failure into a structural inevitability,
          which is the version that justifies paying someone to watch the feed.

          Deliberately plain type at prose width, no card. It sits between two
          bordered blocks (the 60% aside and the case study) and needs to read
          as the page's own voice making a turn, not as a third exhibit.

          Both claims are regulatory, so both were confirmed against two
          independent trade writeups of the PIRG report rather than one:
          Food Safety News 2026-04-16 ("No one has to contact grocery stores or
          restaurants. No one has to notify consumers") and Food Safety Magazine
          on the same report. The FDA line is the agency's own wording, from a
          statement to PIRG dated 2025-01-07. Do not paraphrase the quote into
          something stronger than "not all" — it is a limit, not an admission
          that most recalls go unpublished. */}
      <Section
        eyebrow="Why nobody called"
        title="The rules stop one step short of you"
        wideHeader
      >
        {/* Breakout so the intro anchors to the same left edge as the diagram
            below it rather than sitting indented in the reading column. The
            section reads as one exhibit with a header, not as a paragraph that
            happens to precede a picture. Capped so the measure survives the
            wider band. */}
        <div className="breakout mb-10">
          <Paragraph>
            A recall is a relay, and most of it is compulsory. The product
            really does come off the shelf. Here is every handoff the system is
            actually obliged to make, and the one it isn't.
          </Paragraph>
        </div>

        {/* Arrows are decorative and hidden from assistive tech; the ordered
            lists carry the sequence on their own, and the two group headings
            say which half is required. A screen reader gets "What the rules
            require: 1, 2, 3. What nothing requires: 1." */}
        {/* The cap moved here from the Section on 2026-08-24. This section
            used to be the page's only narrow one, which is what made the
            container snap 1088 -> 672 -> 1088 mid-scroll. The diagram is the
            thing that actually needs a bound — three equal boxes stretched
            across 1088px stop reading as a tight relay — so it carries the
            bound itself and the shell matches every other section.

            42rem, not the narrowed 33rem prose token: this is a diagram, not
            copy, and the boxes need more room than a line of text does. */}
        <figure className="breakout m-0 !max-w-[42rem]">
          <p
            id="chain-required"
            className="mb-4 font-Inter text-xs uppercase tracking-[0.16em] text-graphite/80"
          >
            What the rules require
          </p>
          {/* aria-labelledby, because the required/absent distinction is the
              whole diagram and it is carried visually by border style alone.
              Read linearly the headings do the job, but anyone navigating by
              list lands on two adjacent unnamed lists and loses the point. */}
          <ol
            aria-labelledby="chain-required"
            className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            {CHAIN_REQUIRED.map((step, i) => (
              <li
                key={step.label}
                className="flex items-stretch gap-3 sm:flex-1"
              >
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="rotate-90 self-center text-graphite/60 sm:rotate-0"
                  >
                    &rarr;
                  </span>
                )}
                <div className="flex flex-1 items-center rounded-xl border border-line bg-paper-sunk px-4 py-3 text-[0.9rem] leading-snug text-ink">
                  {step.label}
                </div>
              </li>
            ))}
          </ol>

          {/* Two separate limits, and they were one line before the 2026-08-24
              correction. The first is about the chain (it is mandatory, but not
              for every food or every producer). The second is about visibility
              (a notice reaching the public is conditional, not automatic). */}
          <p className="mt-4 text-xs leading-relaxed text-graphite">
            Required by 21 CFR 117.139, for the foods and facilities it covers.
            A public notice is a separate step, and only for the ones judged
            serious enough: the FDA says plainly that not all recalls get a
            press release or a page.
          </p>

          {/* The break. This is the whole diagram — everything above it is
              setup for the fact that the relay ends here. */}
          <div className="my-8 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-0 flex-1 border-t border-dashed border-graphite/40"
            />
            <p className="font-Inter text-xs uppercase tracking-[0.16em] text-ink">
              And there it stops
            </p>
            <span
              aria-hidden="true"
              className="h-0 flex-1 border-t border-dashed border-graphite/40"
            />
          </div>

          {/* This half centres while the required chain above stays left. The
              asymmetry is the argument: the compelled steps march across the
              band, then the one nobody owes you sits alone in the middle with
              space either side. */}
          <p
            id="chain-absent"
            className="mx-auto mb-4 text-center font-Inter text-xs uppercase tracking-[0.16em] text-graphite/80"
          >
            What nothing requires
          </p>
          {/* No arrow branch here, unlike the required list above: this group
              is a single node since the 2026-08-24 correction, so a connector
              could never render. Restore it if the group ever grows back. */}
          <ol
            aria-labelledby="chain-absent"
            className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            {CHAIN_ABSENT.map((step) => (
              <li
                key={step.label}
                className="flex items-stretch gap-3 sm:flex-1"
              >
                <div className="flex flex-1 items-center rounded-xl border border-dashed border-graphite/40 px-4 py-3 text-[0.9rem] leading-snug text-ink">
                  {step.label}
                </div>
              </li>
            ))}
          </ol>

          {/* Concede the retailer programs rather than ignore them. Anyone who
              shops at Costco has had one of these letters, and a reader who
              knows the exception discounts the whole diagram if it pretends the
              exception doesn't exist. Naming it and then naming its limits is
              what makes the paragraph below land. */}
          <p className="mx-auto mt-4 max-w-[34rem] text-center text-xs leading-relaxed text-graphite">
            A few chains do write to buyers off loyalty or membership records.
            It is voluntary, it only reaches you if you used the card at that
            chain, and PIRG graded 22 of the 26 largest US chains as failing on
            recall communication.
          </p>

          <figcaption className="mx-auto mt-8 max-w-[34rem] text-center text-[0.95rem] leading-relaxed text-graphite">
            So the food leaves the shelf and the notice sits in a federal feed,
            correct and public and unread. Neither of those reaches the box
            already in your cupboard. Someone has to go and get that notice, and
            check it against your pantry.
          </figcaption>
        </figure>

        <p className="breakout mt-8 text-xs leading-relaxed text-graphite/80">
          21 CFR 117.139 (recall plan requirements); FDA statement, January
          2025; US PIRG Education Fund, Food for Thought 2026 and Food Recall
          Failure (2020) for the supermarket grades.
        </p>
      </Section>

      {/* Why it exists. Eyebrow is "Why RecallGuard", not "Why" — the section
          above already answers why the problem is worth solving, and two
          adjacent sections both labelled "Why" read as an editing slip.

          The title was "Most recall apps tell everyone everything" until
          2026-08-17. That argued against competing apps only, which is the
          narrowest version of the problem and lets a reader think "I don't use
          a recall app, so this isn't about me." The channels people actually
          rely on are mailing lists, the news, and word of mouth, and each fails
          differently — the list buries you, the news skips almost everything.
          Naming all of them is what makes the section land for someone who has
          never installed a recall app in their life.

          CAREFUL — claims.md bans pointing readers at a free alternative (an
          FAQ naming the FDA's free recall email list was cut 2026-08-12).
          Anthony asked for the mailing-list mention on 2026-08-17 as a NOISE
          critique, which is the opposite intent. The line stays inside that
          permission only while it describes what the channel does to you: never
          call it free, never say which agency runs it, never say how to join.
          Describe the failure, not the door.

          The 320 figure is deliberately the same one the data section already
          cited and sourced, so this section borrows a proven number instead of
          introducing an unsourced "hundreds a year."

          The middle paragraph argues VOLUME, on purpose. It used to end on "none
          of it can answer the only question you have: is this in my kitchen,"
          which is the same beat "Why nobody called" lands 600px earlier, so the
          second telling fell flat and wasted the section's best line. These two
          sections describe different failures and have to keep doing so: that
          one is nobody is obliged to tell you, this one is that the channels
          which do tell you say too much to be heard. Do not reintroduce the
          "in my kitchen" phrasing here. */}
      <Section
        eyebrow="In your pantry"
        title="Everything else is either noise or silence"
        wideHeader
      >
        <div className="breakout grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5">
            <Paragraph>
              There are other ways to hear about a recall. A mailing list will
              send you all 320 of last year's, written for regulators and sorted
              by nothing. The news covers the handful with a body count, for
              about a day. Other apps push every recall to every user, which is
              the same firehose with a nicer icon.
            </Paragraph>
            {/* Cut from three paragraphs to two on 2026-08-23. The section
                still has to argue VOLUME and only volume — that the channels
                which do tell you say too much to be heard — because "nobody is
                obliged to tell you" is the separate failure "Why nobody called"
                lands a screen earlier. The line about the peanut-allergic kid
                came out here; that beat now lives in the features grid, which
                sits immediately below. */}
            <Paragraph>
              None of it is wrong. There is just far too much of it. Fifty
              alerts a week about food you never bought is not information, it
              is a habit of dismissal, and you build that habit on the 49 that
              never mattered. So you say what matters instead, and the app
              filters the FDA and USDA streams down to the recalls that could
              plausibly reach your pantry.
            </Paragraph>
          </div>
          {/* Editorial photo, not a product shot. These run as atmosphere
              behind type — never as the thing claiming to be a recalled
              product. License recorded in src/assets/images/CREDITS.md.
              No faces, no legible brands.

              Tree nuts, replacing the eggs-on-a-counter shot on 2026-08-17.
              Anthony asked for imagery pointing at WHY things get recalled, and
              undeclared allergens are the single largest cause of US food
              recalls, so the subject is the hazard category rather than a
              generic kitchen. It stops at the ingredient: photographing a
              finished packaged item would edge toward implying a real product
              was recalled, which is the line the no-legible-brands rule exists
              to hold.

              Chosen over two peanut shots partly because it is the only
              candidate that is natively portrait — the frame below is 4:5, and
              the landscape alternatives lost their composition to the crop. */}
          <img
            src={allergenPhoto}
            alt="Four wooden spoons holding almonds, cashews, pecans, and macadamia nuts on a pale marble surface"
            width="900"
            height="1350"
            loading="lazy"
            // Pulled up to sit level with the section header rather than with
            // the copy beside it, so the photo reads as part of the section
            // opening instead of as something that starts late. 144px is the
            // measured height of the eyebrow-plus-title block at lg; re-measure
            // if either the eyebrow or the title\'s wrap changes. Only at lg —
            // below that the grid stacks and the image follows the copy.
            className="mx-auto aspect-[4/5] w-full max-w-sm rounded-2xl object-cover lg:-mt-36"
          />
        </div>

        {/* The features grid used to sit under its own "Features / What it
            does" header. It doesn't need one: the paragraph above ends on "you
            say what matters instead," and these four are what you get to say.
            Splitting them apart made the page state the argument, stop, and
            then restate it as a feature list under a filing label. */}

        {/* Two columns, not three — four features in a 3-col grid orphans the
            last one. 2x2 balances and leaves the copy readable. */}
        <div className="breakout mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <div className="mb-4 h-px w-10 bg-rg" aria-hidden="true" />
              <h3 className="mb-3 font-Fraunces text-lg text-ink">
                {feature.title}
              </h3>
              <Paragraph>{feature.body}</Paragraph>
            </div>
          ))}
        </div>

        {/* The announcement-day story. A recall is public well before the FDA
            grades it, and the app has read the announcement feed since
            2026-08-21 rather than waiting for the classification, so this table
            has four rows where the FDA only has three classes. Saying that out
            loud is the point: it is the coverage no competitor has, and the
            hedge is what makes claiming it honest. */}
        <div className="breakout mb-10">
          <Paragraph>
            A recall is public before it is graded, and the grade can take
            weeks. RecallGuard reads the announcements the day they publish
            rather than waiting, which is why there is a fourth row below that
            the FDA does not have.
          </Paragraph>
        </div>

        <div className="breakout overflow-x-auto">
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
                    <span className="flex items-center gap-3">
                      {/* Hue is danger, fill is certainty — the app's own rule,
                          reproduced rather than approximated. Solid for a grade
                          the FDA gave, a 45-degree hatch for one we inferred.
                          The app draws its hatch in SVG because it is inside a
                          6px React Native stripe; a repeating-linear-gradient
                          gets the same read on the web with no markup.

                          aria-hidden because the tier name sits right beside it
                          and the pending row says "Published, not graded yet"
                          in the next column. The swatch is emphasis, never the
                          only carrier of the distinction. */}
                      <span
                        aria-hidden="true"
                        className="h-7 w-[6px] flex-none rounded-full"
                        style={
                          row.pending
                            ? {
                                backgroundImage: `repeating-linear-gradient(45deg, var(--sev) 0 3px, transparent 3px 8px)`,
                                ["--sev"]: SEVERITY_HEX[row.severity],
                              }
                            : { background: SEVERITY_HEX[row.severity] }
                        }
                      />
                      {row.tier}
                    </span>
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

      {/* Centered, and no longer a two-column grid. The card sat in a 22rem
          column beside a 1fr column holding a single sentence, so most of the
          section was empty space pretending to be a layout. Centring makes the
          price the focal object it should be, and matches the closing CTA
          below, which is the only other centred block on the page.

          text-center on the Section carries to the eyebrow and title, which is
          the intent. The feature list opts back out with text-left — centred
          bullets read as a poem, and these are specifications. */}
      <Section
        eyebrow="Pricing"
        title="One subscription, no free tier"
        className="text-center"
      wideHeader
      >
        <div className="breakout mx-auto w-full max-w-[24rem] rounded-2xl border border-line bg-white/60 p-8">
          {/* The billing-term line is deliberately full-strength `text-graphite`
              rather than the `graphite/70` used for supporting copy elsewhere on
              this page. Fading it is what turns a monthly-first price into the
              pattern this framing is careful not to be: the anchor may be the
              big number, but the term and the annual total have to read as
              first-class text, not as a disclaimer. Don't "tidy" this to /70. */}
          <p className="mb-1 font-Fraunces text-4xl text-ink">$4.00/mo</p>
          <p className="mb-8 text-sm text-graphite">
            Billed annually at $48/year, after a 14-day free trial
          </p>
          <List
            className="text-left"
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

        {/* This used to be a second column. Two argument paragraphs sat there
            once — why there's no free tier, and a pointer to the FDA's free
            email list. The first moved to the FAQ so it isn't making its case
            while the reader is looking at the price. The second was cut on
            2026-08-12. If anything comes back here, it is what the subscription
            buys, never what it costs us. */}
        <Paragraph className="mt-6">
          Billing is handled by Apple. Cancel anytime from iOS Settings.
        </Paragraph>
      </Section>

      {/* FAQ */}
      {/* Closing CTA, and it sits ABOVE the FAQ deliberately. The waitlist is
          the page's only action pre-launch, and burying it under six accordion
          rows meant a reader who was already convinced had to scroll past the
          ask to find it. The FAQ is reference material for the people who are
          not convinced yet, so it reads better as the thing after the ask than
          as the thing in front of it.

          pt-0 came off with the move: it existed to make this hang off the FAQ
          as a continuation, and against Pricing it would just collide. */}
      {!product.appStoreUrl && (
        <Section>
          <div className="breakout rounded-2xl border border-line bg-rg-wash px-6 py-12 text-center sm:px-12">
            <h2 className="mb-3 font-Fraunces text-2xl font-normal text-ink sm:text-3xl">
              Know before you eat it
            </h2>
            <p className="mx-auto mb-8 text-graphite">
              RecallGuard launches on iPhone soon. Leave your email and we'll
              tell you the day it's live.
            </p>
            <WaitlistForm id="footer" className="mx-auto max-w-md text-left" />
          </div>
        </Section>
      )}

      {/* Last section on the page now, which suits it: the legal and support
          links at the end were always footer-shaped, and they land where a
          reader expects to find them rather than mid-scroll. */}
      <Section eyebrow="Questions" title="Frequently asked" wideHeader>
        {/* Capped here rather than on the Section, same reason as the chain
            diagram above: the answers are body copy and want the measure, but
            the shell should not narrow just because its contents do. */}
        <div className="breakout rule-top">
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
