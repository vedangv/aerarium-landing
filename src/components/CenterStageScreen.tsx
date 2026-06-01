import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import type { LucideIcon } from "lucide-react";

/**
 * Calm "center-stage" feature screen (Luffu model) with a Section-2-style
 * pinned, scroll-driven reveal.
 *
 * On desktop the section PINS (sticky) with the eyebrow pill as the anchor; as
 * the visitor scrolls, each element comes in one at a time tied to scroll
 * position — headline → graphic → subheader → phone (the app/solution lands
 * LAST) — then the scene releases. Same mechanism as the questions scene.
 *
 * On mobile the stacked layout (with a phone) is taller than the viewport, so it
 * can't pin without clipping; there the same elements reveal with a one-shot
 * scroll-into-view stagger instead. Reduced-motion users get a plain static
 * section.
 *
 * Layout: header centered on top; the phone is the centerpiece, flanked by a
 * small graphic (left) and the subheader (right) on desktop; stacked on mobile.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

// Reveal windows as fractions of the pinned scroll progress (desktop). The
// schedule finishes by ~0.7 so there's a long, deliberate dwell (~0.3 of the
// track) after the phone resolves — the scene holds, so releasing to the next
// screen feels intentional rather than abrupt.
const W = {
  headline: [0.04, 0.16],
  graphic: [0.23, 0.35],
  subheader: [0.42, 0.54],
  phone: [0.58, 0.7],
} as const;

// Sequential delays for the mobile scroll-into-view stagger (seconds).
const MOBILE_DELAY = {
  eyebrow: 0,
  headline: 0.15,
  graphic: 0.3,
  subheader: 0.45,
  phone: 0.6,
} as const;

function useReveal(progress: MotionValue<number>, range: readonly [number, number], yFrom = 22) {
  const [start, end] = range;
  // Full-range keyframes so motion holds (doesn't extrapolate) before/after.
  const opacity = useTransform(progress, [0, start, end, 1], [0, 0, 1, 1]);
  const y = useTransform(progress, [0, start, end, 1], [yFrom, yFrom, 0, 0]);
  return { opacity, y };
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

type Props = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: ReactNode;
  subheader: ReactNode;
  /** Small supporting graphic shown left of the phone (desktop) / last (mobile). */
  leftSlot: ReactNode;
  phoneSrc: string;
  phoneAlt: string;
  phoneObjectPosition?: string;
};

export default function CenterStageScreen({
  id,
  icon: Icon,
  eyebrow,
  headline,
  subheader,
  leftSlot,
  phoneSrc,
  phoneAlt,
  phoneObjectPosition = "50% 50%",
}: Props) {
  const prefersReduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const pinned = isDesktop && !prefersReduced;

  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Hooks run unconditionally; values are only used on the pinned (desktop) path.
  const headlineR = useReveal(scrollYProgress, W.headline);
  const graphicR = useReveal(scrollYProgress, W.graphic);
  const subheaderR = useReveal(scrollYProgress, W.subheader);
  const phoneR = useReveal(scrollYProgress, W.phone, 28);

  const styleFor = (r: { opacity: MotionValue<number>; y: MotionValue<number> }) =>
    pinned ? { opacity: r.opacity, y: r.y } : undefined;
  // Off the pinned path (mobile / reduced motion): one-shot scroll-in stagger.
  const fade = (delay: number) =>
    pinned
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.7, ease: EASE, delay: prefersReduced ? delay * 0.3 : delay },
        };

  const content = (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
      {/* Header — eyebrow pill (the pinned anchor) + headline */}
      <div className="text-center">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
          {...fade(MOBILE_DELAY.eyebrow)}
        >
          <Icon className="h-3.5 w-3.5" />
          {eyebrow}
        </motion.div>

        <motion.h2
          className="mx-auto mt-5 max-w-4xl font-editorial text-[30px] leading-[1.05] tracking-tight text-white sm:text-5xl"
          style={styleFor(headlineR)}
          {...fade(MOBILE_DELAY.headline)}
        >
          {headline}
        </motion.h2>
      </div>

      {/* Trio — graphic (left) · phone (center) · subheader (right) on desktop;
          subheader · phone · graphic stacked on mobile. */}
      <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
        {/* Subheader — first on mobile, right on desktop */}
        <motion.div
          className="order-1 mx-auto max-w-md text-center text-base leading-relaxed text-slate-300 sm:text-lg lg:order-3 lg:ml-auto lg:mr-0 lg:max-w-[232px] lg:text-left"
          style={styleFor(subheaderR)}
          {...fade(MOBILE_DELAY.subheader)}
        >
          {subheader}
        </motion.div>

        {/* Phone — center stage, comes in LAST (the solution reveal) */}
        <motion.div
          className="order-2 mx-auto w-full max-w-[180px] sm:max-w-[238px]"
          style={styleFor(phoneR)}
          {...fade(MOBILE_DELAY.phone)}
        >
          <div className="relative">
            <div className="pointer-events-none absolute -inset-7 rounded-[64px] bg-emerald-400/[0.08] blur-3xl" />
            {/* Thin modern bezel (~6px) */}
            <div className="relative aspect-[345/720] overflow-hidden rounded-[42px] border border-slate-700/70 bg-slate-950 p-1.5 shadow-[0_36px_110px_rgba(0,0,0,0.42)]">
              <div className="h-full w-full overflow-hidden rounded-[36px] border border-white/5 bg-[#040805]">
                <img
                  src={phoneSrc}
                  alt={phoneAlt}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: phoneObjectPosition }}
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[42px] bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Small graphic — last on mobile, left on desktop */}
        <motion.div
          className="order-3 w-full lg:order-1 lg:justify-self-end"
          style={styleFor(graphicR)}
          {...fade(MOBILE_DELAY.graphic)}
        >
          {leftSlot}
        </motion.div>
      </div>
    </div>
  );

  // Mobile / reduced motion: plain static section, no pinning.
  if (!pinned) {
    return (
      <section id={id} className="relative overflow-hidden bg-slate-950 py-16 sm:py-20">
        <div className="ambient-warm pointer-events-none absolute inset-0 opacity-50" />
        <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />
        {content}
      </section>
    );
  }

  // Desktop: pinned, scroll-driven reveal.
  return (
    <section id={id} className="relative bg-slate-950">
      <div ref={trackRef} className="relative h-[250svh]">
        {/* pt clears the fixed navbar so the pinned eyebrow pill stays visible */}
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden pt-20">
          <div className="ambient-warm pointer-events-none absolute inset-0 opacity-50" />
          <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />
          {content}
        </div>
      </div>
    </section>
  );
}
