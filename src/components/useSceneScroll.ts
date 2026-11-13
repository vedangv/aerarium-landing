import { useEffect, useRef } from "react";
import { scroll, useMotionValue } from "motion/react";

/** Attach only while a pinned scene exists, including after viewport changes. */
export function useSceneScroll(staticLayout: boolean) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    if (staticLayout || !trackRef.current) return;
    return scroll(value => progress.set(value), {
      target: trackRef.current,
      offset: ["start start", "end end"],
    });
  }, [staticLayout, progress]);

  return { trackRef, progress };
}
