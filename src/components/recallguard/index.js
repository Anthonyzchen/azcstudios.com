export { Chip } from "./Chip";
export { HeroPhone } from "./HeroPhone";
export { LockScreenPhone } from "./LockScreenPhone";

// ScrubVideo is deliberately NOT exported here yet. Nothing renders it until
// the receipt-scanning clip lands in public/, and a barrel export was enough to
// ship ~2kB of unused component to production — verified by grepping dist for
// its listener names. Add the line back in the same commit that uses it.
//
// It relies on gsap.registerPlugin(ScrollTrigger) having run, which happens in
// src/lib/motion.js. Every page loads that via usePageEntrance, so by the time
// any component can render, the plugin is registered.
