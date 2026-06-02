import React, { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import { User } from "lucide-react";
import { useReveal } from "./useReveal";
import { trackOutboundClick } from "../lib/analytics";

/**
 * Founder story — pinned, scroll-driven. One calm, personal beat: why Aerarium
 * exists. Pill anchors; headline → two paragraphs → tags → signature fade in.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const TAGS = ["CFA charterholder", "Solo founder", "Rules-first investing"];

const Pill = (
  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
    <User className="h-3.5 w-3.5" />
    Why I built it
  </div>
);

const HEADLINE = "The spreadsheet stopped answering the real question.";
const P1 =
  "I built Aerarium because my own investing system kept outgrowing spreadsheets. As a CFA charterholder, I knew the rules I wanted to follow — but when SPY, QQQ, and NVDA lived across retirement and taxable accounts, the spreadsheet stopped answering the question that mattered.";
const P2 =
  "So Aerarium became that missing layer: policy, exposure, goals, and the thesis behind every position, tracked in one place. Not a trading app — a discipline one.";

const Tags = (
  <div className="flex flex-wrap justify-center gap-2">
    {TAGS.map((t) => (
      <span
        key={t}
        className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-semibold text-emerald-200"
      >
        {t}
      </span>
    ))}
  </div>
);

const Signature = (
  <a
    href="https://www.linkedin.com/in/vedangv/"
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackOutboundClick("linkedin", "founder_signature")}
    className="inline-flex text-sm font-semibold text-emerald-300 transition hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
  >
    — Vedang, CFA charterholder &amp; solo founder
  </a>
);

export default function FounderExposureBridge() {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  const h = useReveal(scrollYProgress, [0.06, 0.2]);
  const p1 = useReveal(scrollYProgress, [0.24, 0.36]);
  const p2 = useReveal(scrollYProgress, [0.4, 0.52]);
  const tags = useReveal(scrollYProgress, [0.56, 0.66]);
  const sig = useReveal(scrollYProgress, [0.7, 0.8]);

  if (prefersReduced) {
    const fade = (delay: number) => ({
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.5 },
      transition: { duration: 0.7, ease: EASE, delay },
    });
    return (
      <section id="founder-story" className="relative overflow-hidden border-t border-white/5 bg-slate-950 py-24 sm:py-32">
        <div className="ambient-warm pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <motion.div {...fade(0)}>{Pill}</motion.div>
          <motion.h2 className="mt-5 font-editorial text-[32px] leading-[1.06] tracking-tight text-white sm:text-5xl" {...fade(0.06)}>{HEADLINE}</motion.h2>
          <motion.p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300" {...fade(0.12)}>{P1}</motion.p>
          <motion.p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300" {...fade(0.18)}>{P2}</motion.p>
          <motion.div className="mt-8" {...fade(0.24)}>{Tags}</motion.div>
          <motion.div className="mt-6" {...fade(0.3)}>{Signature}</motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="founder-story" className="relative bg-slate-950">
      <div ref={trackRef} className="relative h-[250svh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden border-t border-white/5 pt-20">
          <div className="ambient-warm pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
            {Pill}
            <motion.h2 className="mt-5 font-editorial text-[32px] leading-[1.06] tracking-tight text-white sm:text-5xl" style={{ opacity: h.opacity, y: h.y }}>
              {HEADLINE}
            </motion.h2>
            <motion.p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300" style={{ opacity: p1.opacity, y: p1.y }}>
              {P1}
            </motion.p>
            <motion.p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300" style={{ opacity: p2.opacity, y: p2.y }}>
              {P2}
            </motion.p>
            <motion.div className="mt-8" style={{ opacity: tags.opacity, y: tags.y }}>
              {Tags}
            </motion.div>
            <motion.div className="mt-6" style={{ opacity: sig.opacity, y: sig.y }}>
              {Signature}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
