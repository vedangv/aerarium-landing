import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";
import type { LucideIcon } from "lucide-react";

/**
 * Calm "center-stage" feature screen (Luffu model).
 *
 * One header + one subheader, with the phone as the centerpiece. On desktop the
 * phone is flanked by a small graphic (left) and the subheader (right), so the
 * whole beat fits one screen. On mobile it stacks: header → subheader → phone →
 * graphic.
 *
 * Reveal: a single section-level useInView gates a deliberate, drawn-out
 * cascade — eyebrow → headline → graphic → subheader → phone (the app/solution
 * lands LAST). Gating on the SECTION (not each element) means the cascade fires
 * when the visitor actually arrives at the screen, instead of pre-firing while
 * they're still scrolling out of the section above it.
 *
 * Reused by the X-Ray "answer" and Policy Score screens; per-screen content is
 * passed in so one change updates every screen.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

// Deliberate, drawn-out stagger (seconds). The app resolves in last.
const D = {
  eyebrow: 0.0,
  headline: 0.3,
  graphic: 0.75,
  subheader: 1.2,
  phone: 1.7,
} as const;

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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4, margin: "0px 0px -8% 0px" });

  // Each element rests hidden until the section is in view, then animates after
  // its delay — so the whole cascade plays as one deliberate sequence.
  const reveal = (delay: number, y = 22, duration = 0.9) => ({
    initial: { opacity: 0, y },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration, ease: EASE, delay },
  });

  return (
    <section id={id} className="relative overflow-hidden bg-slate-950 py-14 sm:py-16">
      <div className="ambient-warm pointer-events-none absolute inset-0 opacity-50" />
      <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header — eyebrow + headline, centered on top */}
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
            {...reveal(D.eyebrow, 14, 0.7)}
          >
            <Icon className="h-3.5 w-3.5" />
            {eyebrow}
          </motion.div>

          <motion.h2
            className="mx-auto mt-5 max-w-4xl font-editorial text-[30px] leading-[1.05] tracking-tight text-white sm:text-5xl"
            {...reveal(D.headline)}
          >
            {headline}
          </motion.h2>
        </div>

        {/* Trio — graphic (left) · phone (center) · subheader (right) on desktop;
            subheader · phone · graphic stacked on mobile. */}
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
          {/* Subheader — first on mobile, right on desktop (4th in the reveal) */}
          <motion.div
            className="order-1 mx-auto max-w-md text-center text-base leading-relaxed text-slate-300 sm:text-lg lg:order-3 lg:mx-0 lg:max-w-xs lg:text-left"
            {...reveal(D.subheader)}
          >
            {subheader}
          </motion.div>

          {/* Phone — center stage, appears LAST (the solution reveal) */}
          <motion.div
            className="order-2 mx-auto w-full max-w-[214px] sm:max-w-[238px]"
            {...reveal(D.phone, 26, 1.0)}
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

          {/* Small graphic — last on mobile, left on desktop (3rd in the reveal) */}
          <motion.div
            className="order-3 w-full lg:order-1 lg:justify-self-end"
            {...reveal(D.graphic)}
          >
            {leftSlot}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
