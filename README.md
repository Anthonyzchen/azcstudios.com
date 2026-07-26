# azcstudios.com

Company site for AZC Studios LLC. Studio home plus product pages and legal
documents for each shipped app.

Kept deliberately separate from `anthonyzchen.com` (the personal portfolio):
different domain, different repo, different Cloudflare Pages project. See
`project_azc_domain_strategy` for why the split exists.

## Commands

```bash
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
npm run lint
```

## Routes

| Path | Page |
|---|---|
| `/` | Studio home — positioning, products, contact |
| `/recallguard` | RecallGuard product landing |
| `/recallguard/privacy` | Privacy Policy (canonical) |
| `/recallguard/terms` | Terms of Service (canonical) |
| `/recallguard/support` | Support + FAQ (App Store requires this URL) |

`anthonyzchen.com/apps/recallguard*` 301s here. Those legal URLs used to be
canonical on the personal site; this repo owns them now.

## Design

Studio chrome is achromatic on purpose — `paper` / `ink` / `graphite` / `line`
and nothing else. Each product page brings its own accent (`rg` for
RecallGuard) so the shell never has to fight a product's brand, and a second
product doesn't require redesigning the company surface.

Type is Fraunces for display and Inter for body. Fraunces is the deliberate tie
to `anthonyzchen.com`; Inter is what the RecallGuard app itself uses.

`src/lib/motion.js` is copied verbatim from the personal site so both
properties share one easing curve and duration scale. Import `EASE` /
`DURATION` / `STAGGER` rather than writing ad-hoc values.

## Editing content

- Product entries: `src/data/products.json`
- Company constants (entity name, support address): `src/lib/site.js`
- Marketing copy for RecallGuard: inline in `src/pages/RecallGuard.jsx`, sourced
  from the vault's `Projects/RecallGuard/landing-page-copy.md`

## Deployment

Cloudflare Pages, auto-deploying on push to `main`. Framework preset Vite,
build `npm run build`, output `dist`, `NODE_VERSION=20`.

`public/_redirects` carries the SPA fallback — without it, a hard refresh on
any route but `/` 404s.

## Known gaps

- **No imagery.** Every landing-page visual is a labelled placeholder
  (`ImageSlot` in `RecallGuard.jsx`). Real App Store screenshots replace them.
- **Legal pages are unreviewed drafts**, carried over from the personal site
  with the entity, contact address, and date corrected. Both pages carry a
  visible draft notice. An attorney pass is still outstanding.
