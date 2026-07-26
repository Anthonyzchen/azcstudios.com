import { Link } from "react-router-dom";
import { CopyEmail } from "./ui";
import { LEGAL_ENTITY, SUPPORT_EMAIL } from "../lib/site";

export const SiteFooter = () => (
  <footer className="rule-top mt-auto px-gutter py-10">
    <div className="mx-auto flex max-w-content flex-col gap-6 text-sm text-graphite/80 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-2">
        <p>
          &copy; {new Date().getFullYear()} {LEGAL_ENTITY}
        </p>
        <CopyEmail email={SUPPORT_EMAIL} />
      </div>

      <nav className="flex flex-wrap gap-x-6 gap-y-2">
        <Link
          to="/recallguard"
          className="transition-colors duration-300 ease-ink hover:text-ink"
        >
          RecallGuard
        </Link>
        <Link
          to="/recallguard/privacy"
          className="transition-colors duration-300 ease-ink hover:text-ink"
        >
          Privacy
        </Link>
        <Link
          to="/recallguard/terms"
          className="transition-colors duration-300 ease-ink hover:text-ink"
        >
          Terms
        </Link>
        <Link
          to="/recallguard/support"
          className="transition-colors duration-300 ease-ink hover:text-ink"
        >
          Support
        </Link>
        <a
          href="https://anthonyzchen.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-300 ease-ink hover:text-ink"
        >
          Anthony Chen
        </a>
      </nav>
    </div>
  </footer>
);
