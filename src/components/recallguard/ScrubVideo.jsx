import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    () => {
      const video = videoRef.current;
      if (!video || reduced) return;

      // Duration is NaN until metadata lands, and a scrub against NaN silently
      // parks the playhead at frame zero for the whole section.
      const attach = () => {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration === 0) return;

        ScrollTrigger.create({
          trigger: scopeRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.6}`,
          pin: true,
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

        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) attach();
      else video.addEventListener("loadedmetadata", attach, { once: true });

      return () => video.removeEventListener("loadedmetadata", attach);
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
