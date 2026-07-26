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

Cloudflare **Workers** (static assets), auto-deploying on push to `main`.
Not Pages — Cloudflare's dashboard no longer offers a Pages option when
connecting a new Git repo, so this project takes the Workers path even though
`anthonyzchen.com` predates that change and remains a Pages project.

Workers Builds settings:

| Field | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

No `NODE_VERSION` variable — Workers Builds defaults to Node 22, which
satisfies Vite 5, Wrangler 4, and ESLint 9. Setting it to 20 (as the Pages
project does, because Pages defaults to a much older Node) would only pin the
build backward.

`wrangler.jsonc` holds the rest. `not_found_handling: "single-page-application"`
is what makes a hard refresh on `/recallguard/privacy` work — it's the Workers
equivalent of the `/* /index.html 200` line a Pages project keeps in
`public/_redirects`. That file was removed; do not add it back unless this
moves to Pages, since two competing fallback declarations is worse than one.

Custom domains attach at Worker → Settings → Domains & Routes → Add → Custom
Domain, which writes the DNS record automatically. **Apex and `www` are
separate** — a Worker bound to `azcstudios.com` does not receive
`www.azcstudios.com`, so both must be added (or `www` handled by a redirect
rule).

## Known gaps

- **No imagery.** Every landing-page visual is a labelled placeholder
  (`ImageSlot` in `RecallGuard.jsx`). Real App Store screenshots replace them.
- **Legal pages are unreviewed drafts**, carried over from the personal site
  with the entity, contact address, and date corrected. Both pages carry a
  visible draft notice. An attorney pass is still outstanding.
