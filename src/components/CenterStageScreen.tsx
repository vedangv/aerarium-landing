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
 * pinned, scroll-driven reveal — on BOTH desktop and mobile.
 *
 * The section PINS (sticky) with the eyebrow pill as the anchor; as the visitor
 * scrolls, each element comes in tied to scroll position, then the scene dwells
 * before releasing.
 *
 * - Desktop: phone is the centerpiece, flanked by a small graphic (left) and
 *   the subheader (right); everything stays once revealed.
 * - Mobile: stacked, but a phone + graphic won't both fit — so the graphic
 *   reveals in a shared stage and then FADES OUT to give way to the phone
 *   (the app/solution). Header + subheader sit compact above it.
 *
 * Reduced-motion users get a plain static section.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

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
  /** Small supporting graphic shown left of the phone (desktop) / before it (mobile). */
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

  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Desktop reveal windows (everything stays once in; phone last).
  const dHeadline = useReveal(p, [0.04, 0.16]);
  const dGraphic = useReveal(p, [0.23, 0.35]);
  const dSub = useReveal(p, [0.42, 0.54]);
  const dPhone = useReveal(p, [0.58, 0.7], 28);

  // Mobile reveal: header → subheader → graphic (in, hold, OUT) → phone (in).
  const mHeadline = useReveal(p, [0.05, 0.18]);
  const mSub = useReveal(p, [0.24, 0.36]);
  const mGraphicOpacity = useTransform(p, [0, 0.42, 0.52, 0.64, 0.74, 1], [0, 0, 1, 1, 0, 0]);
  const mGraphicY = useTransform(p, [0, 0.42, 0.52, 1], [16, 16, 0, 0]);
  const mPhone = useReveal(p, [0.72, 0.86], 24);

  // Shared phone frame (thin modern bezel).
  const phoneFrame = (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-7 rounded-[64px] bg-emerald-400/[0.08] blur-3xl" />
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
  );

  const pill = (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
      <Icon className="h-3.5 w-3.5" />
      {eyebrow}
    </div>
  );

  /* ── Reduced motion: plain static section ──────────────────────────────── */
  if (prefersReduced) {
    const fade = (delay: number) => ({
      initial: { opacity: 0, y: 14 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.4 },
      transition: { duration: 0.6, ease: EASE, delay },
    });
    return (
      <section id={id} className="relative overflow-hidden bg-slate-950 py-16 sm:py-20">
        <div className="ambient-warm pointer-events-none absolute inset-0 opacity-50" />
        <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />
        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-6 text-center">
          <motion.div {...fade(0)}>{pill}</motion.div>
          <motion.h2
            className="mt-5 font-editorial text-[30px] leading-[1.05] tracking-tight text-white sm:text-5xl"
            {...fade(0.06)}
          >
            {headline}
          </motion.h2>
          <motion.p className="mt-3 max-w-sm text-base leading-relaxed text-slate-300" {...fade(0.12)}>
            {subheader}
          </motion.p>
          <motion.div className="mt-8 w-full max-w-[200px]" {...fade(0.18)}>
            {phoneFrame}
          </motion.div>
          <motion.div className="mt-8" {...fade(0.24)}>
            {leftSlot}
          </motion.div>
        </div>
      </section>
    );
  }

  /* ── Pinned, scroll-driven reveal ──────────────────────────────────────── */
  return (
    <section id={id} className="relative bg-slate-950">
      <div ref={trackRef} className="relative h-[250svh]">
        {/* pt clears the fixed navbar so the pinned eyebrow pill stays visible */}
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden pt-20">
          <div className="ambient-warm pointer-events-none absolute inset-0 opacity-50" />
          <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />

          {isDesktop ? (
            /* Desktop — header on top; graphic · phone · subheader flank */
            <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
              <div className="text-center">
                {pill}
                <motion.h2
                  className="mx-auto mt-5 max-w-4xl font-editorial text-[30px] leading-[1.05] tracking-tight text-white sm:text-5xl"
                  style={{ opacity: dHeadline.opacity, y: dHeadline.y }}
                >
                  {headline}
                </motion.h2>
              </div>

              <div className="mt-12 grid grid-cols-[1fr_auto_1fr] items-center gap-10">
                <motion.div
                  className="order-3 ml-auto mr-0 max-w-[232px] text-left text-lg leading-relaxed text-slate-300"
                  style={{ opacity: dSub.opacity, y: dSub.y }}
                >
                  {subheader}
                </motion.div>

                <motion.div
                  className="order-2 mx-auto w-full max-w-[238px]"
                  style={{ opacity: dPhone.opacity, y: dPhone.y }}
                >
                  {phoneFrame}
                </motion.div>

                <motion.div
                  className="order-1 w-full"
                  style={{ opacity: dGraphic.opacity, y: dGraphic.y }}
                >
                  {leftSlot}
                </motion.div>
              </div>
            </div>
          ) : (
            /* Mobile — pill pinned, header + subheader compact, then the graphic
               reveals and FADES OUT to give way to the phone (shared stage). */
            <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-6 text-center">
              {pill}
              <motion.h2
                className="mt-5 font-editorial text-[30px] leading-[1.06] tracking-tight text-white"
                style={{ opacity: mHeadline.opacity, y: mHeadline.y }}
              >
                {headline}
              </motion.h2>
              <motion.p
                className="mt-3 max-w-sm text-base leading-relaxed text-slate-300"
                style={{ opacity: mSub.opacity, y: mSub.y }}
              >
                {subheader}
              </motion.p>

              {/* Shared stage: graphic overlays the phone, fades out as phone fades in */}
              <div className="relative mt-7 flex w-full items-center justify-center">
                <motion.div
                  className="w-full max-w-[188px]"
                  style={{ opacity: mPhone.opacity, y: mPhone.y }}
                >
                  {phoneFrame}
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: mGraphicOpacity, y: mGraphicY }}
                >
                  {leftSlot}
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
