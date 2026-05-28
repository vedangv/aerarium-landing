import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, FileSpreadsheet, ShieldCheck } from "lucide-react";

const burdenCards = [
  { label: "Account", value: "RRSP", meta: "SPY / QQQ" },
  { label: "Account", value: "Taxable", meta: "NVDA / cash" },
  { label: "Rule", value: "10% cap", meta: "manual check" },
];

const signalRows = [
  { label: "Policy score", value: "94", color: "text-emerald-300" },
  { label: "ETF look-through", value: "Live", color: "text-white" },
  { label: "Rule drift", value: "Clear", color: "text-emerald-300" },
];

export default function HeroSignalScene() {
  return (
    <motion.div
      className="relative hidden lg:block min-h-[620px]"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-[48px] border border-white/5 bg-gradient-to-br from-slate-900/35 via-slate-950/30 to-emerald-950/20" />
      <div className="absolute inset-0 bg-cyber-grid opacity-20 rounded-[48px]" />

      <motion.div
        className="absolute left-10 top-16 w-[300px] rounded-[28px] border border-amber-200/15 bg-slate-950/70 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.3)]"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.25 }}
      >
        <div className="flex items-center justify-between border-b border-white/6 pb-4">
          <div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Before Aerarium</div>
            <div className="mt-1 font-display text-lg font-bold text-white">Manual tracking</div>
          </div>
          <FileSpreadsheet className="h-5 w-5 text-amber-200" />
        </div>
        <div className="mt-4 space-y-2.5">
          {burdenCards.map((card) => (
            <div key={`${card.value}-${card.meta}`} className="rounded-2xl border border-white/5 bg-slate-900/55 p-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">{card.label}</div>
              <div className="mt-1 flex items-end justify-between gap-3">
                <span className="font-display text-base font-bold text-white">{card.value}</span>
                <span className="text-xs text-slate-400">{card.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute right-10 top-28 w-[330px] rounded-[32px] border border-emerald-400/22 bg-gradient-to-br from-emerald-400/[0.1] via-slate-900/85 to-slate-950 p-5 shadow-[0_36px_100px_rgba(16,185,129,0.16)]"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.45 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-300/80">After Aerarium</div>
            <div className="mt-1 font-display text-xl font-bold text-white">Live discipline signal</div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-5 rounded-3xl border border-white/6 bg-slate-950/50 p-4">
          <div className="font-display text-6xl font-bold tracking-tight text-emerald-300">94</div>
          <div className="mt-1 text-sm font-semibold text-slate-200">Policy score</div>
          <div className="mt-5 space-y-2.5">
            {signalRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-400">{row.label}</span>
                <span className={`font-mono text-xs font-bold ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-1/2 w-[420px] -translate-x-1/2 rounded-[30px] border border-white/6 bg-slate-950/80 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.65 }}
      >
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300/80">Closed loop</div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {["Policy", "Holdings", "Exposure", "Score"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/5 bg-slate-900/50 p-3 text-center">
              <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-300" />
              <div className="mt-2 text-[11px] font-bold text-slate-200">{item}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute left-[47%] top-[44%] h-px w-28 -translate-x-1/2 bg-gradient-to-r from-amber-200/0 via-amber-200/35 to-emerald-300/0" />
      <div className="absolute left-[52%] top-[58%] h-px w-32 -translate-x-1/2 bg-gradient-to-r from-emerald-300/0 via-emerald-300/35 to-emerald-300/0" />
    </motion.div>
  );
}
