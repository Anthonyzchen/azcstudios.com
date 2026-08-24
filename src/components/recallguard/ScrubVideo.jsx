import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * A screen recording whose playhead is driven by scroll position, inside a
 * phone frame.
 *
 * This is the mechanic behind the Scout page's scan demo, and the reason it
 * works is control rather than novelty: the reader sets the pace, so they
 * cannot scroll past the one moment the section exists to show. An autoplaying
 * loop would have run three times before they finished the first line of copy,
 * and a click-to-play almost nobody clicks.
 *
 * `src` is served from public/ as a plain URL rather than imported. An import
 * of a missing asset fails the Vite build; a missing public file just leaves
 * the poster showing, which is the softer failure while footage is still being
 * recorded.
 *
 * Falls back to ordinary playback controls when the reader has asked for
 * reduced motion: scrubbing IS the motion here, so there is nothing to degrade
 * to except letting them drive it themselves.
 */
export const ScrubVideo = ({ src, poster, label, className = "" }) => {
  const scopeRef = useRef(null);
  const videoRef = useRef(null);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useGSAP(
    (context, contextSafe) => {
      const video = videoRef.current;
      if (!video || reduced) return;

      const onError = () =>
        console.error("[ScrubVideo] video failed to load:", {
          src,
          error: video.error,
        });
      video.addEventListener("error", onError);

      // Duration is NaN until metadata lands, and a scrub against NaN silently
      // parks the playhead at frame zero for the whole section.
      //
      // contextSafe is REQUIRED here, not stylistic. GSAP captures new
      // animations into the enclosing context only while that context is
      // executing synchronously, so on the loadedmetadata path this trigger
      // would register with nothing and useGSAP's revert would never see it.
      // With `pin` that is not merely a leak: pinning reparents the element
      // into a pin-spacer div React does not know about, and the orphaned
      // trigger survives unmount to throw removeChild on the next route change.
      const attach = contextSafe(() => {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration === 0) {
          console.error("[ScrubVideo] unusable video duration:", {
            src,
            duration,
          });
          return;
        }

        ScrollTrigger.create({
          trigger: scopeRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.6}`,
          pin: true,
          // "transform", not the default "fixed". usePageEntrance animates
          // filter on every section and leaves blur(0px) inline, and a
          // non-none filter makes that element the containing block for
          // position: fixed — so a fixed pin would attach to the Section
          // rather than the viewport and scroll away with it. It would also
          // have split by user setting, since usePageEntrance skips itself
          // under reduced motion and writes no filter at all.
          pinType: "transform",
          scrub: 0.4,
          onUpdate: (self) => {
            // Clamp off the last frame: seeking exactly to `duration` makes
            // some browsers fire `ended` and snap back to black.
            video.currentTime = Math.min(
              self.progress * duration,
              duration - 0.05,
            );
          },
        });

        // No ScrollTrigger.refresh() here. It is global rather than scoped, so
        // it re-measures every trigger on the page — and loadedmetadata
        // typically lands inside the entrance timeline, meaning every other
        // trigger would re-measure against elements mid-transform. create()
        // computes its own start and end anyway.
      });

      if (video.readyState >= 1) attach();
      else video.addEventListener("loadedmetadata", attach, { once: true });

      return () => {
        video.removeEventListener("loadedmetadata", attach);
        video.removeEventListener("error", onError);
      };
    },
    { scope: scopeRef, dependencies: [reduced] },
  );

  return (
    <div ref={scopeRef} className={className}>
      <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[2.5rem] bg-[#0b0f1a] p-[10px] shadow-[0_28px_60px_-30px_rgba(26,25,23,0.55)]">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={label}
          muted
          playsInline
          preload="auto"
          // No autoplay and no loop: the scroll owns the playhead. Controls
          // appear only under reduced motion, where the reader owns it instead.
          controls={reduced}
          className="block w-full rounded-[2rem]"
        />
      </div>
    </div>
  );
};
