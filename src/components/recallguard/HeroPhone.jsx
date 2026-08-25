import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE, DURATION, STAGGER } from "../../lib/motion";
import { Chip } from "./Chip";
import feedScreenshot from "../../assets/images/recallguard-feed.webp";

/**
 * The hero screenshot and the annotation chips floating over it.
 *
 * Three behaviours, and each one owns its own element in the nesting. That is
 * not tidiness, it is the only way they coexist: all three want `transform`,
 * and whichever writes last wins on a shared element.
 *
 *   [data-chip]        GSAP scroll parallax   → x
 *   [data-chip-enter]  GSAP load entrance     → x, opacity, scale
 *   <Chip>             hover-aside            → x, opacity (Tailwind)
 *
 * The hover is driven by React state rather than Tailwind's `peer-hover`. It
 * used to be `peer`, which compiles to `.peer:hover ~ &` — a sibling
 * combinator, so it silently stopped matching the moment the chips gained a
 * positioning wrapper and became grandchildren of the image. State has no
 * opinion about DOM adjacency, and it keeps the "hovering a chip must not move
 * that chip" behaviour that `group-hover` would have cost.
 *
 * At xl the box is wider than the screenshot it holds: the phone sits at 280px
 * in the middle and the chips live in the gutters either side, clipping the
 * phone's frame rather than covering the cards they point at. The arithmetic is
 * worth knowing before touching either number. The hero column is (68rem
 * content - 4rem gap) split by the grid; the asymmetric split in RecallGuard.jsx
 * leaves this side 592px, giving 156px gutters against a 176px chip, so each
 * overlaps by 20px of rounded frame. An even 50/50 split left 116px of gutter,
 * which put 60px of chip over the card text.
 */
export const HeroPhone = ({ chips }) => {
  const scopeRef = useRef(null);
  const [phoneHovered, setPhoneHovered] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Both conditions have to hold: the chips only float from sm up, and all of
      // this is motion for its own sake, so it is the first thing to go when
      // someone has asked for less of it. Outside this block the chips sit at
      // their CSS defaults, which is visible and in position — the entrance
      // below must never be the only thing that makes them appear.
      mm.add(
        "(min-width: 1280px) and (prefers-reduced-motion: no-preference)",
        () => {
          // Entrance: one chip at a time, each emerging from behind the phone.
          //
          // Skipped outright when the document is hidden, which is a real load
          // path: a cmd-clicked link or a restored session opens the page in a
          // background tab. `from` sets opacity to 0 on the spot and relies on
          // rAF to bring it back, and rAF does not run in a hidden tab — so the
          // chips would sit invisible until the reader switched to it, then
          // play an entrance for a hero that had been sitting there for minutes.
          // Better to have simply arrived.
          if (document.visibilityState === "visible") {
            gsap.from("[data-chip-enter]", {
              opacity: 0,
              scale: 0.96,
              // Inward, so each chip slides out from under the screenshot rather
              // than arriving from open space.
              x: (i, target) => Number(target.dataset.enterFrom),
              duration: DURATION.base,
              // Twice the page's own stagger. At STAGGER the four read as one
              // group appearing; the ask was one by one, and that needs enough
              // gap to count them.
              stagger: STAGGER * 2,
              ease: EASE,
              // Lets the section's own fade-up get underway first, so the chips
              // land onto a phone that is already there.
              delay: 0.35,
            });
          }

          // Parallax: horizontal, outward, one-directional. Scrolling pulls
          // each chip off the screenshot, so the phone is progressively
          // uncovered as you read down.
          gsap.utils
            .toArray("[data-chip]", scopeRef.current)
            .forEach((node) => {
              gsap.to(node, {
                // `|| 0` rather than a bare Number(): a chip added without a
                // drift value would otherwise yield NaN, and GSAP writes a
                // broken transform for it without complaining.
                x: () => {
                  const drift = Number(node.dataset.drift) || 0;
                  if (drift <= 0) return drift;
                  const box = scopeRef.current.getBoundingClientRect();
                  // 8px so the chip's shadow stops short of the edge too.
                  const room = window.innerWidth - box.right - 8;
                  return Math.min(drift, Math.max(room, 0));
                },
                ease: "none",
                scrollTrigger: {
                  invalidateOnRefresh: true,
                  trigger: scopeRef.current,
                  // "top top", not "top bottom". The hero is the first thing on
                  // the page, so its top has already passed the viewport bottom
                  // before the reader can scroll at all — that start threw away
                  // the first half of the range and the chips began life 45%
                  // through their travel.
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.6,
                },
              });
            });
        },
      );

      // Belt and braces. useGSAP's own revert already kills this matchMedia,
      // because `new MatchMedia()` pushes itself onto the active context and
      // Context.kill reverts non-Tween entries before running cleanups. Kept
      // because it costs nothing and makes the lifecycle legible; it is a
      // no-op, not a requirement, so don't copy it forward as if it were one.
      return () => mm.revert();
    },
    { scope: scopeRef },
  );

  return (
    <div
      ref={scopeRef}
      className="relative mx-auto w-full max-w-[300px] sm:max-w-[33rem] xl:max-w-[37rem]"
    >
      <img
        src={feedScreenshot}
        alt="RecallGuard's recall feed, showing FDA and USDA recalls with severity labels"
        width="660"
        height="1127"
        loading="eager"
        onMouseEnter={() => setPhoneHovered(true)}
        onMouseLeave={() => setPhoneHovered(false)}
        className="mx-auto w-full max-w-[300px] rounded-[1.75rem] border border-line shadow-sm sm:max-w-[220px] xl:max-w-[280px]"
      />

      {chips.map((chip) => (
        <div
          key={chip.title}
          data-chip
          data-drift={chip.drift}
          className={`hidden sm:absolute sm:block sm:w-[9.5rem] xl:w-[11rem] ${chip.position}`}
        >
          <div
            data-chip-enter
            data-enter-from={chip.side === "left" ? 26 : -26}
          >
            <Chip
              title={chip.title}
              detail={chip.detail}
              className={`transition duration-500 ease-ink ${
                phoneHovered
                  ? `opacity-20 ${
                      chip.side === "left" ? "-translate-x-5" : "translate-x-5"
                    }`
                  : ""
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
