# Image credits & licenses

Mirrors the convention in `recall-guard/assets/editorial/CREDITS.md`. Every
image shipped on this site gets a row here before it goes in.

Sourcing rules (keep the studio trust-safe):

- License-clean only: Pexels / Unsplash / Kaboompics (free commercial, no
  attribution required).
- No identifiable faces — free stock carries no model release.
- No legible brand names or logos. On a product page about recalls, a readable
  brand implies that brand was recalled.
- Never photograph a finished packaged item as though it were the recalled
  product. Ingredients and atmosphere only.
- No AI-generated imagery. A food-safety brand cannot afford the trust penalty.
- Self-host the file. Never hotlink.

| File | Subject | Source | License | Added |
|---|---|---|---|---|
| recallguard-allergens.jpg | Four wooden spoons of almonds, cashews, pecans, macadamias on pale marble. 900x1350. Used on `/recallguard` beside the "Everything else is either noise or silence" copy. Tree nuts stand in for undeclared allergens, the largest single cause of US food recalls. | [Pexels photo 5507631](https://www.pexels.com/photo/close-up-shot-of-assorted-nuts-on-a-wooden-spoon-5507631/) | Pexels License (free commercial, no attribution) | 2026-08-17 |
| recallguard-feed.webp | RecallGuard's own recall feed screenshot. 1179x2013. Hero image on `/recallguard`. Captured 2026-08-24 from a physical iPhone 15 Pro at native 1179x2556, cropped below the status bar to the 0.586 aspect the hero layout expects. Replaced a 660x1127 capture that predated the severity-ramp redesign and showed a UI the app no longer has. **The four `HERO_CHIPS` in `pages/RecallGuard.jsx` are pinned to features in this image — re-measure them before swapping it again.** | Own product | n/a | 2026-08-24 |
| recallguard-icon.png | The RecallGuard app icon. Copied from `recall-guard/assets/images/icon.png`. Used at 38pt inside the lock-screen notification in `components/recallguard/LockScreenPhone.jsx`. Re-copy from the app if the icon is ever rebaked. | Own product | n/a | 2026-08-23 |

## Retired

| File | Why |
|---|---|
| recallguard-kitchen.jpg | Egg carton on a floured counter (Pexels 5907555). Replaced 2026-08-17: pleasant kitchen atmosphere, but it pointed at nothing. The brief was imagery that points at why an item gets recalled. |
