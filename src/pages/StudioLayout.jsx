import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

/**
 * Scrolls to the top on route change, but leaves in-page hash links alone so
 * `/#contact` from a product page still lands on the contact block.
 */
const useScrollToTopOnNavigate = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
};

const StudioLayout = () => {
  useScrollToTopOnNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-paper font-Inter text-graphite antialiased">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default StudioLayout;
