import { useTransform, type MotionValue } from "motion/react";

/**
 * Scroll-driven reveal used by the pinned scenes: held hidden, then fades + lifts
 * in over [start, end] (fractions of scroll progress), then held in place. Full-
 * range keyframes so motion/react doesn't extrapolate past the window.
 */
export function useReveal(
  progress: MotionValue<number>,
  range: readonly [number, number],
  yFrom = 20,
) {
  const [start, end] = range;
  const opacity = useTransform(progress, [0, start, end, 1], [0, 0, 1, 1]);
  const y = useTransform(progress, [0, start, end, 1], [yFrom, yFrom, 0, 0]);
  return { opacity, y };
}
