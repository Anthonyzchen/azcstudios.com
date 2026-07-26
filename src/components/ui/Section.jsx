/**
 * A page section with an optional eyebrow label.
 *
 * `width` picks the measure: "prose" for reading copy (legal, long-form),
 * "content" for layout-bearing sections (feature grids, product rows).
 */
export const Section = ({
  eyebrow,
  title,
  children,
  width = "content",
  className = "",
  id,
}) => {
  const measure = width === "prose" ? "max-w-prose" : "max-w-content";

  return (
    <section id={id} className={`px-gutter py-16 sm:py-24 ${className}`}>
      <div className={`mx-auto ${measure}`}>
        {eyebrow && (
          <p className="mb-4 font-Inter text-eyebrow uppercase text-graphite/60">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="mb-8 font-Fraunces text-3xl font-normal leading-tight text-ink sm:text-4xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

/** Section heading for use inside long-form documents (legal pages). */
export const SectionHeading = ({ children }) => (
  <h2 className="mb-4 mt-12 font-Fraunces text-xl font-normal text-ink sm:text-2xl">
    {children}
  </h2>
);
