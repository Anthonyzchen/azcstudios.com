import { Link, useLocation } from "react-router-dom";
import { CopyEmail } from "./ui";
import { LEGAL_ENTITY, SUPPORT_EMAIL } from "../lib/site";

const linkClass = "transition-colors duration-300 ease-ink hover:text-ink";

/**
 * RecallGuard's legal pages are the product's, not the studio's, so they only
 * surface while the visitor is inside `/recallguard`. The App Store review
 * URLs stay one click away from every RecallGuard page, and the studio home
 * doesn't advertise one product's terms as if they were company-wide.
 */
const useIsRecallGuardRoute = () =>
  useLocation().pathname.startsWith("/recallguard");

export const SiteFooter = () => {
  const isRecallGuard = useIsRecallGuardRoute();

  return (
    <footer className="rule-top mt-auto px-gutter py-10">
      <div className="mx-auto flex max-w-content flex-col gap-6 text-sm text-graphite/80 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <p>
            &copy; {new Date().getFullYear()} {LEGAL_ENTITY}
          </p>
          <CopyEmail email={SUPPORT_EMAIL} />
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/recallguard" className={linkClass}>
            RecallGuard
          </Link>
          {isRecallGuard && (
            <>
              <Link to="/recallguard/privacy" className={linkClass}>
                Privacy
              </Link>
              <Link to="/recallguard/terms" className={linkClass}>
                Terms
              </Link>
              <Link to="/recallguard/support" className={linkClass}>
                Support
              </Link>
            </>
          )}
          <a
            href="https://anthonyzchen.com"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Anthony Chen
          </a>
        </nav>
      </div>
    </footer>
  );
};
