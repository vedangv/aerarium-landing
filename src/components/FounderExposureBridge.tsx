import React from "react";
import { motion } from "motion/react";
import { User } from "lucide-react";

/**
 * Founder story — restyled to the calm aesthetic (was a dense two-column card).
 * One centered, personal beat: why Aerarium exists. The discipline/"closed-loop"
 * material it used to carry is now covered by the five feature screens above.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const TAGS = ["CFA charterholder", "Solo founder", "Rules-first investing"];

export default function FounderExposureBridge() {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <section
      id="founder-story"
      className="relative overflow-hidden border-t border-white/5 bg-slate-950 py-24 sm:py-32"
    >
      <div className="ambient-warm pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
          {...fade(0)}
        >
          <User className="h-3.5 w-3.5" />
          Why I built it
        </motion.div>

        <motion.h2
          className="mt-5 font-editorial text-[32px] leading-[1.06] tracking-tight text-white sm:text-5xl"
          {...fade(0.06)}
        >
          The spreadsheet stopped answering the real question.
        </motion.h2>

        <motion.p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300" {...fade(0.12)}>
          I built Aerarium because my own investing system kept outgrowing spreadsheets. As
          a CFA charterholder, I knew the rules I wanted to follow — but when SPY, QQQ, and
          NVDA lived across retirement and taxable accounts, the spreadsheet stopped
          answering the question that mattered.
        </motion.p>

        <motion.p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300" {...fade(0.18)}>
          So Aerarium became that missing layer: policy, exposure, goals, and the thesis
          behind every position, tracked in one place. Not a trading app — a discipline one.
        </motion.p>

        <motion.div className="mt-8 flex flex-wrap justify-center gap-2" {...fade(0.24)}>
          {TAGS.map((t) => (
            <span
              key={t}
              className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-semibold text-emerald-200"
            >
              {t}
            </span>
          ))}
        </motion.div>

        <motion.a
          href="https://www.linkedin.com/in/vedangv/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
          {...fade(0.3)}
        >
          — Vedang, CFA charterholder &amp; solo founder
        </motion.a>
      </div>
    </section>
  );
}
