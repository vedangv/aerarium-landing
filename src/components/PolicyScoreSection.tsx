import React from "react";
import { motion } from "motion/react";
import { Gauge } from "lucide-react";
import scoreScreenSrc from "../../assets/product-tour/ips-score.jpg";

/**
 * Feature screen 2 — Policy Score.
 *
 * Answers "Am I still following my own plan?" with the app's signature metric:
 * a single 0–100 score for discipline (the part you control), not returns (the
 * part you don't). Two-column so the tall phone sits BESIDE the copy and the
 * whole beat fits one screen on desktop; on mobile it stacks (copy first, phone
 * last). Differs from section 3's centered-header composition for variety.
 *
 * Compliance: describes a discipline metric, not advice or performance claims.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

// The six weighted dimensions of the Policy Score (see FEATURES.md).
const DIMENSIONS = [
  "Allocation drift",
  "Concentration",
  "Cash runway",
  "Goal alignment",
  "Speculative limits",
  "Review cadence",
];

export default function PolicyScoreSection() {
  return (
    <section id="policy-score" className="relative overflow-hidden bg-slate-950 py-14 sm:py-20">
      <div className="ambient-warm pointer-events-none absolute inset-0 opacity-50" />
      <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          {/* One calm phone showing the score — left on desktop, last on mobile */}
          <motion.div
            className="order-2 mx-auto w-full max-w-[188px] sm:max-w-[210px] lg:order-1"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <div className="relative">
              <div className="pointer-events-none absolute -inset-7 rounded-[64px] bg-emerald-400/[0.08] blur-3xl" />
              <div className="relative aspect-[345/720] overflow-hidden rounded-[44px] border-4 border-slate-900 bg-slate-950 p-2.5 shadow-[0_36px_110px_rgba(0,0,0,0.42)]">
                <div className="h-full w-full overflow-hidden rounded-[34px] border border-white/5 bg-[#040805]">
                  <img
                    src={scoreScreenSrc}
                    alt="Aerarium Policy Score — a 0–100 score for how closely the portfolio follows its plan"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "50% 22%" }}
                    loading="lazy"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[44px] bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Copy + the six dimensions — right on desktop, first on mobile */}
          <div className="order-1 text-center lg:order-2 lg:text-left">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Gauge className="h-3.5 w-3.5" />
              Policy Score
            </motion.div>

            <motion.h2
              className="mt-5 font-editorial text-[32px] leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              Always know if you’re on plan.
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            >
              Returns rise and fall outside your control. Aerarium scores the part you can —
              your discipline. One number, 0 to 100, for how closely your portfolio still
              follows the plan you set.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Six things it weighs
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                {DIMENSIONS.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-white/8 bg-slate-900/55 px-4 py-2 text-sm font-medium text-slate-300"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
