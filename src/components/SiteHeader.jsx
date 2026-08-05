import { Link, NavLink } from "react-router-dom";
import { STUDIO_NAME } from "../lib/site";

const navLinkClass = ({ isActive }) =>
  `text-sm transition-colors duration-300 ease-ink ${
    isActive ? "text-ink" : "text-graphite hover:text-ink"
  }`;

export const SiteHeader = () => (
  <header className="rule-bottom sticky top-0 z-20 bg-paper/85 px-gutter backdrop-blur-sm">
    <div className="mx-auto flex max-w-content items-center justify-between gap-6 py-5">
      <Link
        to="/"
        className="font-Fraunces text-lg font-medium tracking-tight text-ink transition-opacity duration-300 ease-ink hover:opacity-70"
      >
        {STUDIO_NAME}
      </Link>

      <nav className="flex items-center gap-6">
        <NavLink to="/recallguard" className={navLinkClass}>
          RecallGuard
        </NavLink>
        <a
          href="/#contact"
          className="text-sm text-graphite transition-colors duration-300 ease-ink hover:text-ink"
        >
          Contact
        </a>
      </nav>
    </div>
  </header>
);
