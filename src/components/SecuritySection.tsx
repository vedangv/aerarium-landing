import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, EyeOff, LockKeyhole, FileDown, Database } from "lucide-react";

/**
 * Security — a calm trust beat, restyled to match the redesign (was the dense
 * grid inside the old FeatureGrid). Centered header + a 2×2 of verifiable
 * controls. Emerald (app/trust side). Not pinned — a quiet supporting section.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    icon: EyeOff,
    title: "Read-only by design",
    body: "Brokerage sync (SnapTrade) keeps holdings current — Aerarium never places a trade.",
  },
  {
    icon: LockKeyhole,
    title: "Encrypted sensitive fields",
    body: "Financial data is protected with a recovery-aware encryption flow.",
  },
  {
    icon: FileDown,
    title: "Export & delete, always",
    body: "Your data stays exportable, and account deletion is treated as a first-class right.",
  },
  {
    icon: Database,
    title: "Private portfolio, public research",
    body: "Research uses public-market data and stays separate from your private portfolio records.",
  },
];

export default function SecuritySection() {
  return (
    <section
      id="security"
      className="relative overflow-hidden border-t border-white/5 bg-slate-950 py-24 sm:py-28"
    >
      <div className="ambient-warm pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Security
          </motion.div>

          <motion.h2
            className="mt-5 font-editorial text-[32px] leading-[1.05] tracking-tight text-white sm:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          >
            Security you can verify, not just trust.
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            Read-only visibility, explicit controls, and source-first research. Your data
            should stay controlled by you.
          </motion.p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                className="rounded-2xl border border-white/8 bg-slate-900/45 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08 }}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/16 bg-emerald-400/10 text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-white">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{it.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
