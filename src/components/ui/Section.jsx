/**
 * A page section with an optional eyebrow label.
 *
 * The section is a three-column grid: a centre column at the reading measure,
 * and a gutter either side. Children land in the centre by default; anything
 * with `breakout` spans the full band instead. See index.css.
 */
export const Section = ({
  eyebrow,
  title,
  children,
  className = "",
  // Anchors the eyebrow and title to the exhibit edge rather than the reading
  // column. For sections that are mostly one big figure, where a header
  // indented into the column reads as detached from the thing it introduces.
  wideHeader = false,
  id,
}) => (
  // No `width` prop any more. It used to switch the whole section between a
  // 42rem and a 68rem shell, which is what made the page snap narrow for one
  // section and back again. Width is now decided per BLOCK, by whether that
  // block carries `breakout` — see the .section-grid rules in index.css.
  <section id={id} className={`px-gutter py-14 sm:py-20 ${className}`}>
    <div className="section-grid">
      {eyebrow && (
        <p
          className={`mb-4 font-Inter text-eyebrow uppercase text-graphite/60 ${
            wideHeader ? "breakout" : ""
          }`}
        >
          {eyebrow}
        </p>
      )}
      {/* text-balance so a title never drops two words onto a line by itself.
          "Everything else is either noise or silence" was wrapping 4 + 2;
          balance evens the lines instead of filling the first one greedily. */}
      {title && (
        <h2
          className={`mb-8 text-balance font-Fraunces text-3xl font-normal leading-tight text-ink sm:text-4xl ${
            wideHeader ? "breakout" : ""
          }`}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
);

/** Section heading for use inside long-form documents (legal pages). */
export const SectionHeading = ({ children }) => (
  <h2 className="mb-4 mt-12 font-Fraunces text-xl font-normal text-ink sm:text-2xl">
    {children}
  </h2>
);
