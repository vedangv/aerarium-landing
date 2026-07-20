import React, { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowDown, Smartphone } from "lucide-react";
import { useReveal } from "./useReveal";
import { trackOutboundClick } from "../lib/analytics";

/**
 * CTA bridge — caps the Portfolio-app feature screens, offers the free
 * App Store download, and tees up the web product ("…only half of it"). Pinned,
 * scroll-driven reveal to match the feature screens: the pill stays anchored,
 * then headline → subheader → button → lead-in fade in.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const Pill = (
  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
    <Smartphone className="h-3.5 w-3.5" />
    Aerarium Portfolio
  </div>
);

function CtaButton() {
  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href="https://apps.apple.com/app/aerarium/id6760155168"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick("appstore", "portfolio_bridge")}
        className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-9 py-4 text-base font-semibold text-slate-950 transition-all duration-300 hover:bg-emerald-450 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
        id="btn-bridge-appstore"
      >
        Download on the App Store
        <ArrowUpRight className="h-4 w-4" />
      </a>
      <span className="text-sm text-slate-500">Free on iOS · App Store</span>
    </div>
  );
}

export default function CtaBridge() {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  const head = useReveal(scrollYProgress, [0.06, 0.22]);
  const sub = useReveal(scrollYProgress, [0.28, 0.42]);
  const btn = useReveal(scrollYProgress, [0.46, 0.6]);
  const lead = useReveal(scrollYProgress, [0.66, 0.8]);

  if (prefersReduced) {
    const fade = (delay: number) => ({
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.4 },
      transition: { duration: 0.6, ease: EASE, delay },
    });
    return (
      <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-28">
        <div className="ambient-warm pointer-events-none absolute inset-0 opacity-50" />
        <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
          <motion.div {...fade(0)}>{Pill}</motion.div>
          <motion.h2 className="mt-6 font-editorial text-[40px] leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl" {...fade(0.06)}>
            …and so much more.
          </motion.h2>
          <motion.p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl" {...fade(0.12)}>
            Come experience the full app — free on the App Store.
          </motion.p>
          <motion.div className="mt-10" {...fade(0.18)}>
            <CtaButton />
          </motion.div>
          <motion.p className="mt-12 text-sm font-medium text-cyan-300" {...fade(0.24)}>
            And your portfolio is only half of Aerarium.
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-slate-950">
      <div ref={trackRef} className="relative h-[250svh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden pt-20">
          <div className="ambient-warm pointer-events-none absolute inset-0 opacity-50" />
          <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
            {Pill}
            <motion.h2
              className="mt-6 font-editorial text-[40px] leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ opacity: head.opacity, y: head.y }}
            >
              …and so much more.
            </motion.h2>
            <motion.p
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl"
              style={{ opacity: sub.opacity, y: sub.y }}
            >
              Come experience the full app — free on the App Store.
            </motion.p>
            <motion.div className="mt-10" style={{ opacity: btn.opacity, y: btn.y }}>
              <CtaButton />
            </motion.div>
            <motion.div
              className="mt-12 flex flex-col items-center gap-2"
              style={{ opacity: lead.opacity, y: lead.y }}
            >
              <p className="text-sm font-medium text-cyan-300">And your portfolio is only half of Aerarium.</p>
              <ArrowDown className="h-4 w-4 animate-bounce text-cyan-400" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
