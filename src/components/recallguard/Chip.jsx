/**
 * An annotation chip that points at something visible in a product screenshot.
 *
 * Borrowed from the pattern Scout uses around its hero phone: instead of a
 * paragraph claiming the app shows severity, sourcing, and personalisation, a
 * few small cards float beside the screen carrying the actual values. The chip
 * only ever restates something the reader can already see, which is what keeps
 * it from being a claim.
 *
 * `title` is the label, `detail` the value beneath it. Both stay short — these
 * sit over a screenshot at 12px and a third line would cover the thing they
 * annotate.
 */
export const Chip = ({ title, detail, className = "" }) => (
  <div
    className={`flex items-start gap-3 rounded-xl border border-line bg-white/95 px-3.5 py-2.5 shadow-[0_1px_2px_rgba(26,25,23,0.04),0_10px_28px_-14px_rgba(26,25,23,0.28)] backdrop-blur-sm ${className}`}
  >
    {/* Decorative: the chip's meaning is entirely in its text, and a bullet
        announced to a screen reader would just be noise between the two. */}
    <span
      aria-hidden="true"
      className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-rg"
    />
    <span className="min-w-0">
      <span className="block font-Inter text-[0.78rem] font-semibold leading-tight text-ink">
        {title}
      </span>
      <span className="mt-0.5 block font-Inter text-[0.72rem] leading-snug text-graphite">
        {detail}
      </span>
    </span>
  </div>
);
