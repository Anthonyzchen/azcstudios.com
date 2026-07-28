import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageEntrance } from "../lib/usePageEntrance";
import { Paragraph } from "../components/ui";
import { STUDIO_NAME } from "../lib/site";

const linkClass =
  "text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink";

/**
 * Shown for any unmatched route.
 *
 * Previously these silently redirected to `/`, which told a visitor holding a
 * mistyped or dead link that the link had worked. Saying so is more useful,
 * and it keeps the URL in the bar so a typo is visible.
 *
 * Note the server still answers 200 here — Workers static assets serve
 * index.html for unmatched paths, and there's no way to return a real 404
 * status without an entrypoint script. This is a soft 404.
 */
const NotFound = () => {
  const entranceRef = usePageEntrance();

  useEffect(() => {
    document.title = `Page not found | ${STUDIO_NAME}`;
  }, []);

  return (
    <div ref={entranceRef} className="mx-auto max-w-prose px-gutter py-24">
      <p className="mb-6 font-Inter text-eyebrow uppercase text-graphite/60">
        404
      </p>
      <h1 className="mb-6 font-Fraunces text-display-sm font-normal text-ink">
        That page doesn&apos;t exist.
      </h1>
      <Paragraph className="mb-10">
        The link may be mistyped, or it may point at something that has moved.
        RecallGuard&apos;s pages used to live on anthonyzchen.com and now live
        here, so an old bookmark is a likely culprit.
      </Paragraph>

      <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link to="/" className={linkClass}>
          Studio home
        </Link>
        <Link to="/recallguard" className={linkClass}>
          RecallGuard
        </Link>
        <Link to="/recallguard/support" className={linkClass}>
          Support
        </Link>
      </nav>
    </div>
  );
};

export default NotFound;
