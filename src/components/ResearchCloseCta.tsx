import React, { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import { ArrowUpRight, Search } from "lucide-react";
import { useReveal } from "./useReveal";
import { trackOutboundClick } from "../lib/analytics";

/**
 * Closing CTA for the web product (Aerarium Research). Pinned, scroll-driven
 * reveal to match the rest. Leads with the price anchor from FEATURES.md (a
 * Bloomberg terminal is $24k/yr) and sends the visitor to research.aerarium.app.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const Pill = (
  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/16 bg-cyan-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
    <Search className="h-3.5 w-3.5" />
    Aerarium Research
  </div>
);

function CtaButton() {
  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href="https://research.aerarium.app/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick("research", "research_close")}
        className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-9 py-4 text-base font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        id="btn-research-close"
      >
        Open Research
        <ArrowUpRight className="h-4 w-4" />
      </a>
      <span className="text-sm text-slate-500">Free to explore · in your browser</span>
    </div>
  );
}

export default function ResearchCloseCta() {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  const head = useReveal(scrollYProgress, [0.06, 0.22]);
  const sub = useReveal(scrollYProgress, [0.28, 0.44]);
  const btn = useReveal(scrollYProgress, [0.5, 0.66]);

  const Headline = (
    <>
      Institutional depth,
      <br className="hidden sm:block" /> not institutional price.
    </>
  );
  const Sub =
    "A Bloomberg terminal runs $24,000 a year. Aerarium Research is built from the same SEC filings — and it’s free to explore while in beta.";

  if (prefersReduced) {
    const fade = (delay: number) => ({
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.4 },
      transition: { duration: 0.6, ease: EASE, delay },
    });
    return (
      <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_40%,rgba(34,211,238,0.08)_0%,transparent_72%)]" />
        <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
          <motion.div {...fade(0)}>{Pill}</motion.div>
          <motion.h2 className="mt-6 font-editorial text-[40px] leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl" {...fade(0.06)}>
            {Headline}
          </motion.h2>
          <motion.p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl" {...fade(0.12)}>
            {Sub}
          </motion.p>
          <motion.div className="mt-10" {...fade(0.18)}>
            <CtaButton />
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-slate-950">
      <div ref={trackRef} className="relative h-[250svh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden pt-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_40%,rgba(34,211,238,0.08)_0%,transparent_72%)]" />
          <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
            {Pill}
            <motion.h2
              className="mt-6 font-editorial text-[40px] leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ opacity: head.opacity, y: head.y }}
            >
              {Headline}
            </motion.h2>
            <motion.p
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl"
              style={{ opacity: sub.opacity, y: sub.y }}
            >
              {Sub}
            </motion.p>
            <motion.div className="mt-10" style={{ opacity: btn.opacity, y: btn.y }}>
              <CtaButton />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
