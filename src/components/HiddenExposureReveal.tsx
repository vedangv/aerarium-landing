import React from "react";
import { motion } from "motion/react";
import { Layers } from "lucide-react";
import xrayScreenSrc from "../../assets/product-tour/portfolio.jpg";

/**
 * Section 3 — "The Answer."
 *
 * The calm payoff to the questions section. It answers the first worry ("How
 * concentrated am I, really?") with the signature hidden-exposure reveal: you'd
 * guess you own ~8% of one megacap, but once you look THROUGH your funds it's
 * far more. One idea, lots of air, warm light — then a soft bridge into the
 * product (Portfolio X-Ray).
 *
 * Compliance: the 8% / 18.7% figures are an ILLUSTRATIVE example (labeled as
 * such), not a personalized claim or advice. No trading, no recommendation.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HiddenExposureReveal() {
  return (
    <section id="answer" className="relative overflow-hidden bg-slate-950 py-28 sm:py-36">
      {/* Warm light so the reveal feels lit, continuous with the hero/questions. */}
      <div className="ambient-warm pointer-events-none absolute inset-0 opacity-60" />
      <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Layers className="h-3.5 w-3.5" />
          The hidden exposure
        </motion.div>

        <motion.h2
          className="mt-7 font-editorial text-[40px] leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          You own more
          <br className="hidden sm:block" /> than you think.
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
        >
          Index funds quietly stack the same megacaps. One stock can hide across every
          fund you hold — until something looks through them.
        </motion.p>

        {/* The X-Ray phone (the feature) beside the reveal (the number it
            surfaces). Side by side on desktop, stacked on mobile. */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          {/* The X-Ray on a real phone */}
          <motion.div
            className="mx-auto w-full max-w-[240px] sm:max-w-[268px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[60px] bg-emerald-400/[0.07] blur-3xl" />
              <div className="relative aspect-[345/720] overflow-hidden rounded-[44px] border-4 border-slate-900 bg-slate-950 p-2.5 shadow-[0_36px_110px_rgba(0,0,0,0.42)]">
                <div className="h-full w-full overflow-hidden rounded-[34px] border border-white/5 bg-[#040805]">
                  <img
                    src={xrayScreenSrc}
                    alt="Aerarium Portfolio X-Ray — true exposure across every fund and account"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "50% 72%" }}
                    loading="lazy"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[44px] bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* The reveal: what you'd guess vs what a look-through actually finds. */}
          <motion.div
            className="rounded-[28px] border border-white/8 bg-slate-900/45 p-6 text-left shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-9"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
          {/* What you'd guess */}
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-slate-400">What you’d guess you own</span>
              <span className="font-display text-lg font-semibold text-slate-300">
                NVDA 8%
              </span>
            </div>
            <div aria-hidden className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-slate-500/70"
                initial={{ width: 0 }}
                whileInView={{ width: "42.8%" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              />
            </div>
          </div>

          {/* What an X-Ray actually finds */}
          <div className="mt-7">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-emerald-300/90">
                What a look-through actually finds
              </span>
              <span className="font-display text-2xl font-bold text-white sm:text-3xl">
                NVDA <span className="text-emerald-300">18.7%</span>
              </span>
            </div>
            <div aria-hidden className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
              />
            </div>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-slate-500">
            Illustrative example — one name compounding across S&amp;P 500, Nasdaq-100,
            and tech funds. Your real number depends on what you actually hold.
          </p>
          </motion.div>
        </div>

        <motion.p
          className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-slate-400"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          That hidden overlap is concentration you didn’t choose. Aerarium’s Portfolio
          X-Ray surfaces it across every fund and account — the first thing you see.
        </motion.p>
      </div>
    </section>
  );
}
