# Decision ledger — azcstudios.com

One entry per decision that still governs something, newest first. Superseded
entries move to `DECISIONS-ARCHIVE.md` when there is one.

This ledger covers **this repo only**. RecallGuard's app decisions live in the
`recall-guard` repo's `docs/DECISIONS.md`. File a decision where its code lives,
not by which product it serves.

---

## 2026-08-31 — The privacy policy states Anthropic's real 30-day retention

`fix/rg-privacy-retention` · `23e00aa` · `src/pages/RecallGuardPrivacy.jsx`

**Decision:** the recipients table says receipt images are deleted by Anthropic
within 30 days and never used for training, rather than "not retained." Section 8
gains the revocation route for the in-app consent toggle.

**Why:** the previous wording was false. Anthropic's documented default for API
inputs is deletion within 30 days; zero data retention is a separate opt-in
agreement RecallGuard does not hold. A published policy that overstates the
protection is a deceptive practice under FTC Act Section 5 and breaks the accuracy
requirement in App Store Guideline 5.1.1(i) — which made it a live exposure, unlike
the missing consent screen it was found alongside, since this page was already
serving to the public.

If a zero-retention agreement is ever signed, this sentence and the consent sheet
copy in `recall-guard` (`components/ReceiptConsentSheet.tsx`) change together, or
one of them becomes false again.

## 2026-08-30 — Shared recall links are served by our own Worker, not a link service

`feature/recall-share-links` · `src/worker.js`, `wrangler.jsonc`,
`public/og/recall-sev-*.png`

**Decision:** a recall is shareable as `azcstudios.com/recallguard/r/<fda_id>`.
The Worker reads one row over PostgREST and returns a self-contained HTML card
carrying the Open Graph tags, rather than delegating to Branch or an equivalent
deep-link host. The site stops being assets-only to make this possible.

**Why:** the link preview forces a server. iMessage, Slack, WhatsApp and X fetch
a shared URL and never run JavaScript, so the headline in the bubble can only
come from tags present in the response. A React route cannot produce them, and a
302 to the App Store would be served to the crawler too, which kills the preview
entirely.

Branch was seriously considered and is the right tool for a different situation —
an app with no web presence, or where install attribution is the product. Beli
uses it, which is how the option got looked at. Two things decided against it
here. Its Deepview page is limited to `og:title`, `og:description` and
`og:image`, with nowhere to put a link to the FDA record — and on a forwarded
message telling someone their food is dangerous, the path to the primary source
is what separates it from a scam text. And its SDK is attribution tracking,
which lands in the App Store privacy label of a product whose pitch is that it
watches food, not people.

Branch wins one row outright: deferred deep linking, where a recipient installs
from the link and lands on that exact recall. We give that up. If shares ever
become a real acquisition channel, that is the row worth revisiting.

Notably this is also the direction the category moved. Firebase Dynamic Links,
the largest free host of this pattern, shut down on 2025-08-25, and Google's own
migration guidance points at a self-hosted domain with Universal Links and App
Links.

**Also settled here:**

- **`noindex, follow` on recall pages, and they stay out of `sitemap.xml`.**
  Three thousand thin, near-duplicate, machine-generated records indexed under a
  five-page studio domain is the shape Google's scaled-content policy targets,
  and this domain also serves the legal URLs the App Store submission depends
  on. The risk is asymmetric, so start closed. `robots.txt` stays permissive: a
  disallow would stop link crawlers reading the tags, which is the only reason
  the page exists. Flipping to indexed later is one line.
- **The card is deliberately thin.** Severity, firm, product, hazard, the action
  line, the FDA link, one button. It does not publish the app's `risk` sentence.
  Once Universal Links ship, anyone with the app never sees this page at all —
  iOS opens RecallGuard before the request is made — so it serves crawlers and
  people without the app. Every URL is also a permanent public statement naming
  a company's product, partly in our normalizer's words, and less of that on our
  domain is better.
- **`cleanDescription` is mirrored from the app; `extractProductName` and
  `brandFromFirm` are not.** Those already exist twice with hand-sync comments,
  and a third drifting copy costs more than the plainer output. What the Worker
  does instead is three narrow rules over the stored title, applied to the
  normalized title as well as the fallback — the same render-time-guard
  reasoning `displayRecallTitle` gives for stripping trailing sizes, because the
  path that writes most rows runs no validator.
- **The `apple-app-site-association` file ships now, scoped to
  `/recallguard/r/*`.** Inert until the app carries the entitlement. Scoping
  matters: unscoped, every azcstudios.com link — including the legal pages a
  reviewer opens — would try to launch the app. **Its team prefix is the
  personal `W6A7W47YE4` and must be re-checked when the app moves to the AZC
  Studios LLC organization account.**
- **The button points at `/recallguard`, not the App Store**, because
  `.release-mode` in the app repo still reads `prelaunch`. One constant,
  `APP_URL`, to change at launch.

**The bug worth remembering:** `run_worker_first` in `wrangler.jsonc`. The asset
router runs ahead of the Worker and claims any request with `Sec-Fetch-Mode:
navigate`. Without that setting the route passed every `curl` test and served
the SPA's 404 page to anyone who actually tapped the link — correct for
crawlers, broken for humans.
