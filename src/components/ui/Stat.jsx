/**
 * A before/after figure pair: "45.0M → 109.7M".
 *
 * All four props are required. An earlier version made `from` and `period`
 * optional so the component could also render a lone figure, but nothing ever
 * called it that way and the two standalone figures on the RecallGuard page
 * can't use it anyway (one lives inside a `<dl>` and needs `dt`/`dd`), so the
 * unreachable branches came out.
 *
 * The arrow is decorative and carries an sr-only "up to" beside it. Without
 * that, a screen reader reads two bare numbers with nothing between them, which
 * is the one reading that inverts the meaning.
 *
 * `period` is not optional decoration. The stats on the RecallGuard page compare
 * different year ranges (volume is 2024 to 2025, severity is 2023 to 2024), and
 * a row of bare arrows would imply they share one.
 */
export const Stat = ({ from, to, label, period }) => (
  // Full-height column with the period pushed to the bottom by `mt-auto`, so
  // the caption line stays aligned across a row even when one stat's label
  // wraps to two lines and its neighbour's doesn't. Aligning by hand (matching
  // label lengths, or a fixed min-height) breaks at the next breakpoint.
  <div className="flex h-full flex-col">
    <p className="mb-3 flex flex-wrap items-baseline gap-x-2 font-Fraunces text-ink">
      {/* graphite/80, not the /50 this started at: the `from` value is data the
          reader is meant to compare against, and /50 lands around 2.4:1 on
          paper, well under the 4.5:1 AA needs. Same reasoning on the period
          line below. */}
      <span className="text-xl text-graphite/80">{from}</span>
      <span aria-hidden="true" className="text-lg text-graphite/60">
        &rarr;
      </span>
      <span className="sr-only">up to</span>
      <span className="text-3xl sm:text-4xl">{to}</span>
    </p>
    <p className="text-[0.95rem] leading-snug text-graphite">{label}</p>
    <p className="mt-auto pt-2 font-Inter text-xs uppercase tracking-[0.16em] text-graphite/80">
      {period}
    </p>
  </div>
);
