import React, { ReactNode } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

/**
 * Web feature screen (Aerarium Research).
 *
 * The "other product" beat: a wide screenshot in a browser frame, with a calm
 * scroll-into-view reveal (eyebrow → headline → subheader → frame). Deliberately
 * NOT pinned — a lighter gallery rhythm than the pinned phone screens, and it
 * suits the wide web UI. Cyan accent distinguishes Research from the emerald
 * Portfolio app.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: ReactNode;
  subheader: ReactNode;
  src: string;
  alt: string;
  url: string;
};

const WebScreen: React.FC<Props> = ({ id, icon: Icon, eyebrow, headline, subheader, src, alt, url }) => {
  return (
    <section id={id} className="relative overflow-hidden bg-slate-950 py-20 sm:py-24">
      <div className="ambient-warm pointer-events-none absolute inset-0 opacity-35" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/16 bg-cyan-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Icon className="h-3.5 w-3.5" />
            {eyebrow}
          </motion.div>

          <motion.h2
            className="mt-5 font-editorial text-[32px] leading-[1.05] tracking-tight text-white sm:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          >
            {headline}
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            {subheader}
          </motion.p>
        </div>

        {/* Browser frame */}
        <motion.div
          className="mx-auto mt-12 max-w-5xl"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        >
          <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-[0_50px_140px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-1.5 border-b border-white/8 bg-slate-850/80 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
              <span className="ml-3 hidden truncate rounded-md bg-slate-950/60 px-3 py-1 font-mono text-[11px] text-slate-400 sm:block">
                {url}
              </span>
            </div>
            <img src={src} alt={alt} loading="lazy" className="block w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebScreen;
