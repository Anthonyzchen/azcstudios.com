/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Fraunces: ["Fraunces", "Georgia", "serif"],
        Inter: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid scale — clamp(min, preferred, max). Shared with the personal
        // site so the two read as one hand at different volumes.
        // Full-bleed hero headline (single column).
        display: [
          "clamp(2.5rem, 6.5vw, 5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        // Same voice a step down — for headlines that sit in a half-width
        // column, where `display` would wrap to four or five lines.
        "display-sm": [
          "clamp(2.125rem, 3.6vw, 3.25rem)",
          { lineHeight: "1.08", letterSpacing: "-0.025em" },
        ],
        eyebrow: [
          "clamp(0.7rem, 0.9vw, 0.8rem)",
          { lineHeight: "1", letterSpacing: "0.32em" },
        ],
        lede: ["clamp(1.0625rem, 1.4vw, 1.3rem)", { lineHeight: "1.6" }],
      },
      spacing: {
        gutter: "clamp(1.5rem, 5vw, 6rem)",
      },
      maxWidth: {
        // 33rem, down from 42rem on 2026-08-24. At the 0.95rem body size these
        // pages actually use, 42rem measured 89 characters a line — well past
        // the 65-75 where the eye reliably finds the next line without
        // re-reading. 33rem lands near 70.
        //
        // MEASURE ONLY. This token caps a line of running text; it is not a
        // page width. That distinction was learned on 2026-08-26: the legal
        // pages used `max-w-prose` as their whole SHELL, so narrowing the
        // measure for the RecallGuard grid silently shrank four unrelated
        // pages from 42rem to 33rem — headings, cards and bullets included,
        // none of which are running text. They use `content` now. If a new
        // page needs an outer width, reach for `content`, never this.
        //
        // Live consumers: the .section-grid column and its breakout descendant
        // rule in index.css, and the Home lede.
        //
        // If you widen it again, widen the type with it. The two are a pair:
        // measure is a character count, not a pixel count, so a wider column is
        // only legible if the characters got wider too.
        prose: "33rem",
        // 68rem. Was briefly narrowed to 56rem to close the gap right of a
        // 33rem prose column; reverted 2026-08-24 — it shrank the gap without
        // closing it, and cost ~0.9 viewports of extra height because narrower
        // blocks wrap more. The gap is a content problem, not a band problem:
        // sections that read as full have two-column content, sections that
        // read as empty are a single prose column.
        content: "68rem",
      },
      transitionTimingFunction: {
        ink: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      colors: {
        // Studio chrome is achromatic on purpose — the company surface carries
        // no accent of its own, so each product page can bring its own without
        // fighting the shell. RecallGuard supplies `rg`.
        paper: "#FAF8F4",
        "paper-sunk": "#F2EEE7",
        ink: "#1A1917",
        graphite: "#565049",
        line: "#1A191714",

        // Product accents — scoped to that product's pages only.
        rg: {
          DEFAULT: "#204efa",
          deep: "#1a3fd0",
          wash: "#EEF2FF",
        },

        // RecallGuard's severity ramp, mirrored from the app so the marketing
        // page and the product agree on what each class looks like. Source of
        // truth is recall-guard/tailwind.config.js `colors.sev`; keep in sync.
        //
        // sev-2 is a deep amber rather than an orange on purpose: in the app it
        // sits in a 6px stripe where orange was not reliably distinguishable
        // from Class I red.
        sev: {
          3: "#c8102e", // Class I — serious risk
          2: "#a8630a", // Class II — possible risk
          1: "#57574f", // Class III — minor issue
        },
      },
    },
  },
  plugins: [],
};
