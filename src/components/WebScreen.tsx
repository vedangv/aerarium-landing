import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { useReveal } from "./useReveal";

/**
 * Web feature screen (Aerarium Research) — pinned, scroll-driven reveal.
 *
 * Same mechanism as the app screens: the section PINS, the eyebrow pill stays
 * anchored, then headline → subheader → browser frame fade in as you scroll.
 * Cyan accent distinguishes Research from the emerald Portfolio app. The frame
 * is height-clamped (object-cover, top) so the whole beat fits one screen and
 * can pin. Reduced-motion users get a plain static section.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: ReactNode;
  subheader: ReactNode;
  src: string;
  alt: string;
  url: string;
};

const WebScreen: React.FC<Props> = ({ id, icon: Icon, eyebrow, headline, subheader, src, alt, url }) => {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  const head = useReveal(scrollYProgress, [0.06, 0.22]);
  const sub = useReveal(scrollYProgress, [0.28, 0.44]);
  const frame = useReveal(scrollYProgress, [0.5, 0.72], 28);

  const pill = (
    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/16 bg-cyan-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
      <Icon className="h-3.5 w-3.5" />
      {eyebrow}
    </div>
  );

  const browserFrame = (
    <div className="mx-auto w-full max-w-5xl">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-[0_50px_140px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-1.5 border-b border-white/8 bg-slate-850/80 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
          <span className="ml-3 hidden truncate rounded-md bg-slate-950/60 px-3 py-1 font-mono text-[11px] text-slate-400 sm:block">
            {url}
          </span>
        </div>
        {/* Mobile/tablet: full dashboard at natural aspect (short frame). Desktop:
            height-clamped + object-cover so the wide frame fits the pinned screen. */}
        <div className="aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:h-[clamp(220px,44svh,520px)]">
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
        </div>
      </div>
    </div>
  );

  /* Reduced motion: static section */
  if (prefersReduced) {
    const fade = (delay: number) => ({
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.4 },
      transition: { duration: 0.6, ease: EASE, delay },
    });
    return (
      <section id={id} className="relative overflow-hidden bg-slate-950 py-20 sm:py-24">
        <div className="ambient-warm pointer-events-none absolute inset-0 opacity-35" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div {...fade(0)}>{pill}</motion.div>
            <motion.h2 className="mt-5 font-editorial text-[32px] leading-[1.05] tracking-tight text-white sm:text-5xl" {...fade(0.06)}>
              {headline}
            </motion.h2>
            <motion.p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg" {...fade(0.12)}>
              {subheader}
            </motion.p>
          </div>
          <motion.div className="mt-10" {...fade(0.18)}>
            {browserFrame}
          </motion.div>
        </div>
      </section>
    );
  }

  /* Pinned, scroll-driven reveal */
  return (
    <section id={id} className="relative bg-slate-950">
      <div ref={trackRef} className="relative h-[250svh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden pt-20">
          <div className="ambient-warm pointer-events-none absolute inset-0 opacity-35" />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              {pill}
              <motion.h2
                className="mt-5 font-editorial text-[32px] leading-[1.05] tracking-tight text-white sm:text-5xl"
                style={{ opacity: head.opacity, y: head.y }}
              >
                {headline}
              </motion.h2>
              <motion.p
                className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
                style={{ opacity: sub.opacity, y: sub.y }}
              >
                {subheader}
              </motion.p>
            </div>
            <motion.div className="mt-10" style={{ opacity: frame.opacity, y: frame.y }}>
              {browserFrame}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebScreen;
