import { useStaticLayout } from "./useStaticLayout";
import { useSceneScroll } from "./useSceneScroll";
import React, { ReactNode } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { useReveal } from "./useReveal";

/** Desktop product scenes keep their pinned presentation; smaller screens
 * and reduced motion use a readable, fully visible stack. */

type Props = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: ReactNode;
  subheader: ReactNode;
  /** Supporting graphic shown beside the phone on desktop and below it on mobile. */
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
  const staticLayout = useStaticLayout();

  const { trackRef, progress: p } = useSceneScroll(staticLayout);

  // Desktop reveal windows (everything stays once in; phone last).
  const dHeadline = useReveal(p, [0.04, 0.16]);
  const dGraphic = useReveal(p, [0.23, 0.35]);
  const dSub = useReveal(p, [0.42, 0.54]);
  const dPhone = useReveal(p, [0.58, 0.7], 28);

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

  /* ── Small screens and reduced motion: plain static section ──────────────────────────────── */
  if (staticLayout) {
    return (
      <section id={id} className="relative overflow-hidden bg-slate-950 py-12 sm:py-16">
        <div className="ambient-warm pointer-events-none absolute inset-0 opacity-50" />
        <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />
        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-6 text-center">
          <motion.div>{pill}</motion.div>
          <motion.h2
            className="mt-5 font-editorial text-[30px] leading-[1.05] tracking-tight text-white sm:text-5xl"
          >
            {headline}
          </motion.h2>
          <motion.p className="mt-3 max-w-sm text-base leading-relaxed text-slate-300">
            {subheader}
          </motion.p>
          <motion.div className="mt-8 w-full max-w-[200px]">
            {phoneFrame}
          </motion.div>
          <details className="mt-6 w-full rounded-xl border border-white/10 bg-slate-900/45 p-4 text-sm text-slate-300">
            <summary className="cursor-pointer rounded-sm text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">See an illustrative example</summary>
            <div className="mt-5">{leftSlot}</div>
          </details>
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

        </div>
      </div>
    </section>
  );
}
