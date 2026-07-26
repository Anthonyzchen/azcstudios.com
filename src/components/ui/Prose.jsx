/** Body paragraph. The one place body copy sizing is decided. */
export const Paragraph = ({ children, className = "" }) => (
  <p className={`text-[0.95rem] leading-relaxed text-graphite ${className}`}>
    {children}
  </p>
);

/** Bulleted list matching Paragraph's rhythm. */
export const List = ({ items, className = "" }) => (
  <ul className={`space-y-2 ${className}`}>
    {items.map((item, i) => (
      <li
        key={i}
        className="relative pl-5 text-[0.95rem] leading-relaxed text-graphite before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-graphite/40"
      >
        {item}
      </li>
    ))}
  </ul>
);
