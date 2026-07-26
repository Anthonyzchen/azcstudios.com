import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE, DURATION, STAGGER } from "./motion";

/**
 * Staggered entrance for a page's direct children — fade up with a blur clear.
 * Attach the returned ref to the container.
 *
 * Ported from the personal site so both properties enter with the same hand.
 * Honors prefers-reduced-motion by skipping the timeline entirely; the CSS
 * reset in index.css only covers CSS transitions, not GSAP.
 */
export const usePageEntrance = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const sections = containerRef.current.children;
      if (!sections.length) return;

      gsap.fromTo(
        sections,
        { opacity: 0, y: 24, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.base,
          stagger: STAGGER,
          ease: EASE,
        }
      );
    },
    { scope: containerRef }
  );

  return containerRef;
};
