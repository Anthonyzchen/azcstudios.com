import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// One registration site for the whole app. Three components used to call
// registerPlugin(ScrollTrigger) themselves, which is idempotent and so worked,
// but a top-level side-effectful call also pins the module into the bundle:
// Rollup cannot drop an unused component whose module body has effects, so
// ScrubVideo was shipping to production before any page imported it.
gsap.registerPlugin(CustomEase, ScrollTrigger);

/**
 * Shared motion system.
 *
 * Every animation on the site draws from these tokens so motion reads as
 * one hand, not many. Import EASE / DURATION / STAGGER instead of writing
 * ad-hoc easing strings and durations.
 */

/**
 * The one signature easing. "Ink settle" — a quick, decisive commit that
 * drifts to rest, the way a loaded brush settles into paper.
 */
CustomEase.create("inkSettle", "M0,0 C0.16,1,0.3,1,1,1");
export const EASE = "inkSettle";

/** The same curve for CSS transitions, so CSS and GSAP move identically. */
export const EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

/** One duration scale. Animations pick a step — never an ad-hoc number. */
export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
};

/** One stagger rhythm for grouped reveals. */
export const STAGGER = 0.08;
