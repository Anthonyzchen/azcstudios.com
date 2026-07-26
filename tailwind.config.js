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
        prose: "42rem",
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
      },
    },
  },
  plugins: [],
};
