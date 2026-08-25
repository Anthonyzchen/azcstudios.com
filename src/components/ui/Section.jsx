/**
 * A page section with an optional eyebrow label.
 *
 * The section is a two-column grid: a reading column at the measure, starting
 * at the content edge, and slack to its right. Children land in the reading
 * column by default; anything with `breakout` spans the full band from the same
 * left edge. One rail, two widths. See index.css.
 */
export const Section = ({
  eyebrow,
  title,
  children,
  className = "",
  // Spans the eyebrow and title across the band instead of the reading column.
  // Not an alignment switch — one rail handles that — purely a width one, for
  // sections whose content is a full-band table or list and whose header would
  // otherwise sit in a narrow column above something much wider.
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
