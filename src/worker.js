/**
 * Worker entry for azcstudios.com.
 *
 * This site was static assets only until shared recall links needed a server.
 * The reason is narrow and worth stating: iMessage, Slack, WhatsApp and X fetch
 * a shared URL and never run JavaScript, so the headline in a link preview can
 * only come from Open Graph tags present in the HTML response itself. A React
 * route cannot produce them. Everything else on this domain is still served
 * straight from the assets binding, unchanged.
 *
 * Three branches, in order:
 *   1. /recallguard/r/<fda_id>                     — the shared recall card
 *   2. /.well-known/apple-app-site-association     — iOS Universal Links
 *   3. everything else                             — env.ASSETS.fetch
 *
 * Branch 3 is the important one. It preserves `not_found_handling:
 * "single-page-application"` from wrangler.jsonc, which is what makes a hard
 * refresh on /recallguard/privacy work. Those legal URLs are what the App Store
 * submission points at, so a regression here is not cosmetic.
 */

const RECALL_PREFIX = "/recallguard/r/";
const AASA_PATH = "/.well-known/apple-app-site-association";

const SITE = "https://azcstudios.com";
const PRODUCT_URL = `${SITE}/recallguard`;

/**
 * Where the card's primary button goes.
 *
 * The App Store listing does not exist yet — `.release-mode` in the recall-guard
 * repo reads `prelaunch` — so this points at the product page, which carries the
 * waitlist form. Swap this one constant for the App Store URL at launch; nothing
 * else in this file needs to change.
 */
const APP_URL = PRODUCT_URL;

/**
 * Team prefix + bundle id, from ios/RecallGuard.xcodeproj/project.pbxproj.
 *
 * RE-CHECK THIS AT THE APPLE ORGANIZATION MIGRATION. W6A7W47YE4 is the personal
 * team. Moving the app to the AZC Studios LLC org account issues a new team
 * prefix, and a stale one here means Universal Links silently stop resolving —
 * iOS reports nothing, the link just opens Safari instead of the app.
 */
const APPLE_APP_ID = "W6A7W47YE4.com.anthonyzchen.recallguard";

/**
 * Severity ramp, mirrored from recall-guard/lib/pure/recalls.ts (SEVERITY_LABEL,
 * PENDING_SEVERITY_LABEL) and app/recall/[id].tsx (ACTION_INSTRUCTION). Keep the
 * wording identical to the app — a person who reads the shared card and then
 * installs should not be told two different things about the same recall.
 *
 * `pending` is the hedged label for rows the FDA has published but not graded.
 * On those, severity is our own read of the hazard text rather than an FDA
 * verdict, so the urgency stays and the certainty does not.
 *
 * The preview images follow components/SeverityStripe.tsx in the app, whose
 * rule is **hue carries danger, fill carries certainty**: a graded recall gets a
 * solid field, an ungraded one gets the same hue under a 45° hatch. Without the
 * separate `imagePending` art, an inferred "possible serious risk" would arrive
 * in the message thread pixel-identical to a confirmed Class I, with the whole
 * hedge resting on one word — the exact failure that stripe was built to fix.
 *
 * Tier 1 has no pending variant because severityFromHazardText floors at 2.
 */
const SEVERITY = {
  3: {
    label: "Serious risk",
    pending: "Possible serious risk",
    color: "#c8102e",
    image: "/og/recall-sev-3.png",
    imagePending: "/og/recall-sev-3-pending.png",
    action: "Stop using this product now. Do not eat it.",
  },
  2: {
    label: "Possible risk",
    pending: "Possible risk",
    color: "#a8630a",
    image: "/og/recall-sev-2.png",
    imagePending: "/og/recall-sev-2-pending.png",
    action: "Stop using this product.",
  },
  1: {
    label: "Minor issue",
    // severityFromHazardText floors at 2, so an ungraded row never lands here.
    pending: "Possible risk",
    color: "#57574f",
    image: "/og/recall-sev-1.png",
    imagePending: "/og/recall-sev-1.png",
    action:
      "Check the lot code on your package against the affected range in the FDA record. If it matches, stop using it.",
  },
};

const PENDING_CLASSIFICATION = "Pending";
const PENDING_ACTION =
  "Stop using this product while the FDA finishes reviewing this recall.";

const COLUMNS = [
  "fda_id",
  "normalized_title",
  "product_description",
  "brand",
  "recalling_firm",
  "product_type",
  "hazard",
  "reason",
  "distribution_pattern",
  "severity",
  "classification",
  "superseded_by",
  "report_date",
  "status",
].join(",");

/**
 * Allowlist for the path segment before it reaches PostgREST.
 *
 * Two real ids live in this column and both fit: FDA recall numbers
 * ("F-1234-2026") and the announcement slugs the RSS ingest writes
 * ("rss-tri-union-seafoods-identifies-..."), the longest of which runs past 100
 * characters. Anything outside this set is a 404 before a query is issued, which
 * also keeps commas and parens — both of which mean something inside a PostgREST
 * filter value — out of the request.
 */
const FDA_ID_PATTERN = /^[A-Za-z0-9._-]{1,180}$/;

const TIMEOUT_MS = 8000;

// =============================================================================
// Pure helpers
// =============================================================================

/**
 * Mirrors cleanDescription in recall-guard/lib/pure/recall-title.ts. Copied
 * rather than imported — separate repo, separate runtime.
 *
 * Deliberately the ONLY thing mirrored from that module. extractProductName and
 * brandFromFirm are not, and must not be: they already exist twice (app and edge
 * function) with a hand-sync comment on each, and a third drifting copy costs
 * more than the plainer output this file settles for.
 */
const cleanDescription = (text) =>
  String(text ?? "")
    .replace(/^[\s"\t]+/, "")
    .replace(/\s+/g, " ")
    .trim();

/** Truncate on a word boundary so a cut headline does not end mid-word. */
const truncate = (text, max) => {
  const clean = cleanDescription(text);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;.]+$/, "")}…`;
};

const esc = (text) =>
  String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Out-of-domain severities over-warn rather than render nothing. */
const severityFor = (severity) => SEVERITY[severity] ?? SEVERITY[3];

const isPending = (classification) => classification === PENDING_CLASSIFICATION;

const severityLabel = (row) => {
  const tier = severityFor(row.severity);
  return isPending(row.classification) ? tier.pending : tier.label;
};

const actionFor = (row) =>
  isPending(row.classification) ? PENDING_ACTION : severityFor(row.severity).action;

/**
 * Hazards that survive on a surface, where the container and the shelf matter
 * as much as the food.
 *
 * Mirrored from isPathogenHazard in recall-guard/app/recall/[id].tsx, which is
 * itself kept narrower than NAMED_HAZARD_REGEX in the edge functions on purpose:
 * it asks "can this live on a countertop", not "is this acute", so foreign
 * material, sulfites and lead stay out. Keep the three in step.
 *
 * Worth the copy where the title heuristics were not: this gates real FDA
 * cleaning guidance, and pathogen recalls are the ones people actually forward.
 */
const isPathogenHazard = (text) =>
  /listeria|salmonell|e\.?\s?coli|escherichia|o157|stec|shigell|cyclospora|campylobacter|vibrio|clostridium|botulinum|botulism|cronobacter|hepatitis|norovirus|bacillus/i.test(
    text
  );

/**
 * Where it was sold, in the FDA's own words.
 *
 * The app parses this column into a headline, a sorted state list and the
 * reader's own states in bold, through the 308-line lib/pure/distribution.ts.
 * None of that is mirrored here. The raw column is already legible prose ("MI,
 * NY", "US States AL, FL, GA, KY..."), and the app itself keeps the verbatim
 * string alongside its parsed version precisely because the derived line "drops
 * the part that often settles it" — which store, which website.
 *
 * Never truncated. This is the field that answers "does this affect me", and a
 * cut state list is worse than a long one.
 */
const soldInLine = (row) => cleanDescription(row.distribution_pattern);

/** Solid art for a graded recall, hatched art for one the FDA has not rated. */
const severityImage = (row) => {
  const tier = severityFor(row.severity);
  return isPending(row.classification) ? tier.imagePending : tier.image;
};

/**
 * Trim a raw FDA product_description down to something that reads as a name.
 *
 * Deliberately three rules, not the app's extraction heuristic. Those rules
 * cover what the raw descriptions actually put after the product name — a lot
 * number list, a date parenthetical, a size or pack count — and stop there:
 *
 *   "Genova Yellowfin Tuna in Olive Oil 5.0 oz 4 Pack (1/21/2028); S84N…"
 *     → "Genova Yellowfin Tuna in Olive Oil"
 *   "Preserved Mustard in Soybean Oil; original packaging is…"
 *     → "Preserved Mustard in Soybean Oil"
 *
 * Anything messier keeps its word-boundary truncation and reads a little long,
 * which is the accepted cost of not maintaining a fourth copy of
 * extractProductName.
 */
const trimDescription = (description) => {
  let name = cleanDescription(description);
  name = name.split(";")[0];
  name = name.replace(/\s*\([^)]*\)\s*$/, "");
  name = name.replace(
    /[\s,–-]+\d[\d./]*\s*-?\s*(oz|ounce|ounces|lb|lbs|pound|pounds|g|gram|grams|kg|ml|l|liter|ct|count|pack|pk|piece|pieces)\b.*$/i,
    ""
  );
  return name.replace(/[\s,;.-]+$/, "").trim();
};

/**
 * The product name — the single most important string here, since it is the
 * line the message bubble shows.
 *
 * normalized_title is null on ~1.4% of rows (44 of 3,172 on 2026-08-30), and
 * those skew toward the newest announcement rows, which are the ones most likely
 * to be shared. So the fallback is exercised, not theoretical.
 *
 * The cleanup runs over the normalized title too, not just the fallback. That
 * mirrors displayRecallTitle in recall-guard/lib/pure/recall-title.ts, which
 * strips trailing sizes from normalized titles on the same reasoning: the path
 * that writes most rows (poll-fda-recalls, normalizing inline) runs no
 * validator, so render is the only place the check happens. H-0420-2026 is the
 * live example — its stored title is "Preserved Mustard in Soybean Oil;
 * original packaging is", cut mid-sentence by the normalizer.
 *
 * The trailing `||` covers a title that is entirely size or packaging text,
 * where trimming would otherwise leave nothing to show.
 */
const productTitle = (row, firm) => {
  const source = cleanDescription(row.normalized_title) || row.product_description;
  const trimmed = trimDescription(source) || cleanDescription(source);
  return truncate(stripLeadingFirm(trimmed, firm), 70);
};

/**
 * Drop the firm name off the front of a title when the card is already printing
 * it on the line above.
 *
 * Same job as stripLeadingBrand in recall-guard/lib/pure/recall-title.ts, and
 * the same reason: the adjacency is what makes the repetition read as a mistake.
 * Live on 2 of the 12 most recent recalls on 2026-08-30 — "Momchipz Momchipz
 * Veggie Chips", "Prince Prince Sesame and Spanish Style Breads".
 *
 * Matches leading whole words only, and keeps the original whenever stripping
 * would leave too little to name the product ("Fromm" recalling "Fromm").
 */
const stripLeadingFirm = (title, firm) => {
  if (!firm) return title;
  const normalize = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const firmWords = normalize(firm).split(" ").filter(Boolean);
  const titleWords = title.split(/\s+/);

  let matched = 0;
  while (
    matched < firmWords.length &&
    matched < titleWords.length &&
    normalize(titleWords[matched]) === firmWords[matched]
  ) {
    matched += 1;
  }
  if (matched === 0) return title;

  const rest = titleWords.slice(matched).join(" ").replace(/^[\s,;.:-]+/, "");
  return rest.length >= 3 ? rest : title;
};

/**
 * Ingest source labels that sit in recalling_firm where a company name should
 * be. 435 of 3,172 rows on 2026-08-30 carry "USDA FSIS (053-2015)" and the like:
 * the agency plus the recall number, not whoever made the food. Printing that
 * above the product name would read as the brand, so the line is dropped
 * instead — the FDA reference is already in the footer.
 */
const SOURCE_LABEL_PATTERN = /^(usda\s+fsis|fsis|usda)\b/i;

/**
 * Who recalled it.
 *
 * `brand` is null on ~61% of rows (1,950 of 3,172), where the app derives a
 * brand from recalling_firm. This shows the cleaned firm name instead: "Boar's
 * Head Provisions Co." rather than "Boar's Head". Clunkier, and it cannot drift.
 */
const firmLine = (row) => {
  const brand = cleanDescription(row.brand);
  if (brand) return brand;
  const firm = cleanDescription(row.recalling_firm);
  return SOURCE_LABEL_PATTERN.test(firm) ? "" : firm;
};

/**
 * The category line under the product name, dropped when it just restates it.
 *
 * On a lot of rows product_type is a lowercased echo of the title: the
 * jalapeno recall carries the title "Fresh Jalapeno Peppers" and the type
 * "fresh jalapeno peppers", which rendered as the same words twice, once in
 * display type and once in small grey. It earns its line only when it adds a
 * category the headline does not already contain.
 */
const productTypeLine = (row, title) => {
  const type = cleanDescription(row.product_type);
  if (!type) return "";
  const norm = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const t = norm(type);
  const inTitle = norm(title);
  return !t || inTitle === t || inTitle.includes(t) ? "" : type;
};

/** The stated hazard, falling back to the raw FDA reason. Null on ~11% of rows. */
const hazardLine = (row) =>
  cleanDescription(row.hazard) || cleanDescription(row.reason);

/**
 * Where "View the FDA record" goes.
 *
 * Announcement rows carry the FDA press-release slug with an `rss-` prefix, so
 * stripping it reconstructs the exact page (verified 2026-08-30). Everything
 * else holds a real FDA recall number, which only resolves through their search.
 * A precise link matters more here than anywhere in the app: on a forwarded
 * warning from a domain the reader may not know, the path to the primary source
 * is what separates this from a scam text.
 */
const fdaUrl = (fdaId) => {
  if (fdaId.startsWith("rss-")) {
    return `https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/${fdaId.slice(4)}`;
  }
  return `https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts?search_api_fulltext=${encodeURIComponent(fdaId)}`;
};

const formatDate = (value) => {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

// =============================================================================
// Data
// =============================================================================

/**
 * One row by fda_id, over PostgREST.
 *
 * Same shape as src/lib/waitlist.js: a raw fetch rather than
 * @supabase/supabase-js, because one query does not justify the dependency. The
 * anon key is meant to ship publicly; `recalls` carries a `public read` policy
 * for anon, so this key can read the recall corpus and nothing else.
 *
 * Returns the row, or null when the id is genuinely absent. THROWS on transport
 * or server failure, and the caller must keep those apart — rendering "we do not
 * have this recall" for a Supabase outage would turn an error into an all-clear
 * on a page whose entire job is to warn someone.
 */
const fetchRecall = async (env, filter) => {
  const url = new URL(`${env.SUPABASE_URL}/rest/v1/recalls`);
  url.searchParams.set("select", COLUMNS);
  url.searchParams.set("limit", "1");
  for (const [key, value] of Object.entries(filter)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    const error = new Error(`PostgREST responded ${response.status}`);
    error.upstreamStatus = response.status;
    throw error;
  }

  const rows = await response.json();
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
};

// =============================================================================
// Rendering
// =============================================================================

const shell = ({ title, description, image, canonical, accent, body }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<!-- These pages are for sharing, not for search. Thousands of thin,
     near-duplicate records indexed under a five-page studio domain is the shape
     Google's scaled-content policy targets, and this domain also serves the
     legal URLs the App Store submission depends on. robots.txt stays permissive
     on purpose: a disallow would stop link crawlers reading the tags below,
     which is the only reason this page exists. -->
<meta name="robots" content="noindex, follow">
<meta property="og:type" content="article">
<meta property="og:site_name" content="RecallGuard">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(SITE + image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(SITE + image)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600&family=Inter:wght@400;500;600&display=swap">
<style>
  :root {
    --paper: #FAF8F4;
    --paper-sunk: #F2EEE7;
    --ink: #1A1917;
    --graphite: #565049;
    --line: rgba(26, 25, 23, 0.08);
    --rg: #204efa;
    --accent: ${accent};
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: Inter, system-ui, -apple-system, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; }
  .masthead {
    max-width: 40rem;
    margin: 0 auto;
    padding: 1.5rem 1.25rem 0;
  }
  /* The card is set in the app's display face, not the studio site's Fraunces.
     It is a RecallGuard artifact that most readers meet before they have any
     idea what AZC Studios is, so it should look like the product it is
     advertising. The app made the same move away from a serif for its own
     reasons: the note in recall-guard/tailwind.config.js retired Lora as "an
     editorial serif that only ever appeared as titles and never structured
     anything beneath them", replaced by Inter Tight, which "carries the same
     hierarchy without the costume". */
  .masthead a {
    font-family: "Inter Tight", Inter, system-ui, sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    text-decoration: none;
  }
  main {
    max-width: 40rem;
    margin: 0 auto;
    padding: 1.25rem 1.25rem 4rem;
  }
  .card {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 10px;
    overflow: hidden;
  }
  .band {
    background: var(--accent);
    color: #fff;
    padding: 1.5rem 1.5rem 1.75rem;
  }
  .band .sev {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
  }
  .band .firm {
    margin-top: 0.85rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.92);
  }
  .band h1 {
    margin: 0.15rem 0 0;
    font-family: "Inter Tight", Inter, system-ui, sans-serif;
    font-size: clamp(1.6rem, 5vw, 2.1rem);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.02em;
    text-wrap: balance;
  }
  .band .type {
    margin-top: 0.6rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.82);
  }
  .rows { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
  .row .label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--graphite);
  }
  .row p { margin: 0.4rem 0 0; }
  .row p + p { margin-top: 0.55rem; color: var(--graphite); }
  /* Full-bleed with a bottom rule, matching the same notice in the app, which
     app/recall/[id].tsx renders as border-b + border-rule + bg-surface-muted
     with px-6 py-4. It sat inset and rounded here, which read as an aside rather
     than as part of the banner it qualifies — and this notice is the one that
     stops a reader mistaking our inferred severity for an FDA verdict, so it
     should carry the same weight as the band above it. */
  .pending {
    margin: 0;
    padding: 1rem 1.5rem;
    background: var(--paper-sunk);
    border-bottom: 1px solid var(--line);
    font-size: 0.9rem;
    color: var(--graphite);
  }
  .actions {
    padding: 0 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .btn {
    display: block;
    padding: 0.8rem 1rem;
    border-radius: 999px;
    text-align: center;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 600;
  }
  .btn.solid { background: var(--ink); color: var(--paper); }
  .btn.ghost { border: 1px solid var(--line); color: var(--ink); background: #fff; }
  .btn:focus-visible { outline: 2px solid var(--rg); outline-offset: 2px; }
  .meta {
    margin-top: 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--line);
    font-size: 0.85rem;
    color: var(--graphite);
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .meta .id { word-break: break-all; }
  .colophon {
    margin-top: 1.75rem;
    font-size: 0.85rem;
    color: var(--graphite);
  }
  .colophon a { color: var(--rg); text-decoration: none; font-weight: 500; }
  .colophon a:hover { text-decoration: underline; }
</style>
</head>
<body>
<div class="masthead"><a href="${esc(PRODUCT_URL)}">RecallGuard</a></div>
<main>
${body}
<p class="colophon">RecallGuard is an app that checks FDA food and pet-food recalls against what is actually in your kitchen. <a href="${esc(PRODUCT_URL)}">See how it works</a>.</p>
</main>
</body>
</html>
`;

const renderRecall = (row) => {
  const tier = severityFor(row.severity);
  const label = severityLabel(row);
  const firm = firmLine(row);
  const title = productTitle(row, firm);
  const productType = productTypeLine(row, title);
  const hazard = hazardLine(row);
  const soldIn = soldInLine(row);
  const action = actionFor(row);
  // Read across the hazard and the raw FDA reason, since the normalized hazard
  // sometimes says "bacterial contamination" where only `reason` names the bug.
  const pathogen = isPathogenHazard(`${hazard} ${row.reason ?? ""}`);
  const canonical = `${SITE}${RECALL_PREFIX}${row.fda_id}`;
  const reported = formatDate(row.report_date);

  // The share headline. This is the line the message bubble shows, so it leads
  // with the fact rather than the brand.
  const headline = truncate(firm ? `${firm} ${title}` : title, 88);
  const ogTitle = `Recalled: ${headline}`;
  const ogDescription = truncate(
    [label, hazard].filter(Boolean).join(" · ") + `. ${action}`,
    200
  );

  const body = `<article class="card">
  <div class="band">
    <div class="sev">${esc(label ?? row.classification)}</div>
    ${firm ? `<div class="firm">${esc(firm)}</div>` : ""}
    <h1>${esc(title)}</h1>
    ${productType ? `<div class="type">${esc(productType)}</div>` : ""}
  </div>
  ${
    isPending(row.classification)
      ? `<p class="pending">The FDA has published this recall but has not assigned it a class yet. The risk level above is our read of the stated hazard, not the FDA&rsquo;s rating.</p>`
      : ""
  }
  <div class="rows">
    ${hazard ? `<div class="row"><div class="label">The problem</div><p>${esc(hazard)}</p></div>` : ""}
    ${soldIn ? `<div class="row"><div class="label">Where it was sold</div><p>${esc(soldIn)}</p></div>` : ""}
    <div class="row">
      <div class="label">What to do</div>
      <p>${esc(action)}</p>
      <p>Throw it away in a sealed bag so pets and wildlife cannot get to it. If it is unopened and you want your money back, most stores refund recalled items without a receipt.</p>
      ${pathogen ? `<p>Wash anything it touched, including containers, shelves, counters and your hands, with hot soapy water.</p>` : ""}
    </div>
  </div>
  <div class="actions">
    <a class="btn ghost" href="${esc(fdaUrl(row.fda_id))}" rel="noopener">View the FDA record</a>
    <a class="btn solid" href="${esc(APP_URL)}">Get RecallGuard</a>
  </div>
  <div class="rows" style="padding-top:0">
    <div class="meta">
      ${reported ? `<span>Reported ${esc(reported)}</span>` : ""}
      ${row.status ? `<span>Status: ${esc(row.status)}</span>` : ""}
      ${
        // Only real FDA and FSIS recall numbers get printed. An `rss-` id is
        // our own ingest slug for an announcement, and labelling it "FDA
        // reference" would put a citation on the page that the FDA does not
        // recognise. Those rows lose nothing: the button above already links
        // the exact announcement the slug was built from.
        row.fda_id.startsWith("rss-")
          ? ""
          : `<span class="id">FDA reference: ${esc(row.fda_id)}</span>`
      }
    </div>
  </div>
</article>`;

  return shell({
    title: ogTitle,
    description: ogDescription,
    image: severityImage(row),
    canonical,
    accent: tier.color,
    body,
  });
};

/**
 * Two failure states, kept apart on purpose.
 *
 * "We do not have this recall" is a claim about the corpus. "We could not load
 * it" is a claim about us. Collapsing the second into the first would render an
 * outage as an all-clear, which is the one thing a recall page must never do.
 */
const renderNotice = ({ heading, body, fdaId }) => {
  const card = `<article class="card">
  <div class="band">
    <div class="sev">RecallGuard</div>
    <h1>${esc(heading)}</h1>
  </div>
  <div class="rows">
    <div class="row"><p>${esc(body)}</p></div>
  </div>
  <div class="actions">
    ${fdaId ? `<a class="btn ghost" href="${esc(fdaUrl(fdaId))}" rel="noopener">Look it up on FDA.gov</a>` : ""}
    <a class="btn solid" href="${esc(PRODUCT_URL)}">Go to RecallGuard</a>
  </div>
</article>`;

  return shell({
    title: `${heading} — RecallGuard`,
    description: body,
    image: SEVERITY[1].image,
    canonical: PRODUCT_URL,
    accent: SEVERITY[1].color,
    body: card,
  });
};

/**
 * `diagnostic` names which failure branch produced the page, as an
 * `x-recall-status` header.
 *
 * Both 503 branches — no credentials, and an upstream that answered badly —
 * render the same page on purpose: a visitor does not need our plumbing
 * explained. But that also made the two indistinguishable from outside, which
 * cost a debugging cycle on the first deploy when the runtime variables had not
 * landed. The header is invisible to readers and decisive with one `curl -I`,
 * which matters because this project has Workers Observability switched off.
 *
 * It carries a branch name and an HTTP status, never a URL, key or row.
 */
const html = (markup, status, cacheSeconds, diagnostic) =>
  new Response(markup, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      // A normalized recall row is effectively immutable, and one shared link
      // can pull in every unfurl crawler at once. Without this, each of them is
      // a Supabase read.
      "cache-control": cacheSeconds
        ? `public, max-age=300, s-maxage=${cacheSeconds}`
        : "no-store",
      ...(diagnostic ? { "x-recall-status": diagnostic } : {}),
    },
  });

// =============================================================================
// Routes
// =============================================================================

const handleRecall = async (request, env, ctx) => {
  const url = new URL(request.url);
  const raw = url.pathname.slice(RECALL_PREFIX.length);

  let fdaId;
  try {
    fdaId = decodeURIComponent(raw);
  } catch {
    fdaId = raw;
  }

  if (!FDA_ID_PATTERN.test(fdaId)) {
    return html(
      renderNotice({
        heading: "That link does not look right",
        body: "We could not read a recall reference from this address. Check the link, or open RecallGuard to search the current recalls.",
      }),
      404,
      0,
      "bad-reference"
    );
  }

  const cache = caches.default;
  const cacheKey = new Request(`${SITE}${RECALL_PREFIX}${fdaId}`, { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  let row;
  try {
    row = await fetchRecall(env, { fda_id: `eq.${fdaId}` });

    // Announcement rows get superseded once the FDA publishes its own graded
    // record. A link shared before that happens should land on the graded one —
    // the same move app/recall/[id].tsx makes. Rare in practice (1 row on
    // 2026-08-30), and a failure to resolve falls through to the original
    // rather than failing the page.
    if (row?.superseded_by) {
      const graded = await fetchRecall(env, { id: `eq.${row.superseded_by}` }).catch(
        () => null
      );
      if (graded?.fda_id) {
        return Response.redirect(`${SITE}${RECALL_PREFIX}${graded.fda_id}`, 302);
      }
    }
  } catch (error) {
    console.error("[handleRecall] recall lookup failed:", { fdaId, error });
    return html(
      renderNotice({
        heading: "We could not load this recall",
        body: "Something went wrong on our end, so we are not going to guess. This does not mean the product is safe — check the FDA record directly.",
        fdaId,
      }),
      503,
      0,
      error?.upstreamStatus
        ? `upstream-${error.upstreamStatus}`
        : `upstream-unreachable-${error?.name ?? "error"}`
    );
  }

  if (!row) {
    return html(
      renderNotice({
        heading: "We do not have this recall",
        body: "No recall in our records matches this reference. It may have been withdrawn, or the link may be incomplete.",
        fdaId,
      }),
      404,
      0,
      "not-found"
    );
  }

  const response = html(renderRecall(row), 200, 3600);
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
};

/**
 * iOS reads this before opening a URL on this domain and, on a match, launches
 * the app instead of Safari.
 *
 * `components` is scoped to the recall path alone. Without that scoping, every
 * azcstudios.com link — the landing page, and the privacy, terms and support
 * pages an App Store reviewer opens — would try to open the app.
 *
 * Inert until the app ships an Associated Domains entitlement, which needs the
 * capability on the App ID, a regenerated provisioning profile and a native
 * build. Serving it early costs nothing and means the domain side is already
 * correct when that lands.
 */
const handleAasa = () =>
  new Response(
    JSON.stringify({
      applinks: {
        details: [
          {
            appIDs: [APPLE_APP_ID],
            components: [{ "/": `${RECALL_PREFIX}*`, comment: "Shared recall links" }],
          },
        ],
      },
    }),
    {
      headers: {
        // iOS requires this exact type. The assets binding would serve an
        // extensionless file as application/octet-stream and the association
        // would silently never validate.
        "content-type": "application/json",
        "cache-control": "public, max-age=3600",
      },
    }
  );

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === AASA_PATH) {
      return handleAasa();
    }

    if (url.pathname.startsWith(RECALL_PREFIX)) {
      if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
        console.error("[worker] recall route hit without Supabase credentials");
        return html(
          renderNotice({
            heading: "We could not load this recall",
            body: "Something went wrong on our end, so we are not going to guess. This does not mean the product is safe — check the FDA record directly.",
          }),
          503,
          0,
          "no-credentials"
        );
      }
      return handleRecall(request, env, ctx);
    }

    return env.ASSETS.fetch(request);
  },
};
