import React, { ReactNode } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

/**
 * Calm "center-stage" feature screen (Luffu model).
 *
 * One header + one subheader, with the phone as the centerpiece. On desktop the
 * phone is flanked by a small graphic (left) and the subheader (right), so the
 * whole beat fits one screen. On mobile it stacks: header → subheader → phone →
 * graphic.
 *
 * Reused by the X-Ray "answer" and Policy Score screens; the per-screen content
 * (headline, subheader, the small left graphic, the phone screenshot) is passed
 * in so the layout stays identical and one change updates every screen.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

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
  return (
    <section id={id} className="relative overflow-hidden bg-slate-950 py-14 sm:py-16">
      <div className="ambient-warm pointer-events-none absolute inset-0 opacity-50" />
      <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header — eyebrow + headline, centered on top */}
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Icon className="h-3.5 w-3.5" />
            {eyebrow}
          </motion.div>

          <motion.h2
            className="mx-auto mt-5 max-w-4xl font-editorial text-[30px] leading-[1.05] tracking-tight text-white sm:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          >
            {headline}
          </motion.h2>
        </div>

        {/* Trio — graphic (left) · phone (center) · subheader (right) on desktop;
            subheader · phone · graphic stacked on mobile. */}
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
          {/* Subheader — first on mobile, right on desktop (3rd in the reveal) */}
          <motion.div
            className="order-1 mx-auto max-w-md text-center text-base leading-relaxed text-slate-300 sm:text-lg lg:order-3 lg:mx-0 lg:max-w-xs lg:text-left"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.44 }}
          >
            {subheader}
          </motion.div>

          {/* Phone — center stage, appears LAST (the solution reveal) */}
          <motion.div
            className="order-2 mx-auto w-full max-w-[214px] sm:max-w-[238px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
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

          {/* Small graphic — last on mobile, left on desktop (2nd in the reveal) */}
          <motion.div
            className="order-3 w-full lg:order-1 lg:justify-self-end"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
          >
            {leftSlot}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
