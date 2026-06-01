import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

/**
 * CTA bridge — caps the Portfolio-app feature screens before the page pivots to
 * the web product (Research). Signals there's more than the five screens shown,
 * and offers the free TestFlight beta.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CtaBridge() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 sm:py-36">
      <div className="ambient-warm pointer-events-none absolute inset-0 opacity-50" />
      <div className="warm-hairline pointer-events-none absolute inset-x-0 top-0 h-px" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          className="font-editorial text-[40px] leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          …and so much more.
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
        >
          Come experience the app — free while it’s in beta on TestFlight.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <a
            href="https://testflight.apple.com/join/Xna39VKU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-9 py-4 text-base font-semibold text-slate-950 transition-all duration-300 hover:bg-emerald-450 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            id="btn-bridge-testflight"
          >
            Get Early Access
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="text-sm text-slate-500">Free on iOS · via TestFlight</span>
        </motion.div>
      </div>
    </section>
  );
}
