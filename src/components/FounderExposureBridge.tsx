import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, FileSpreadsheet, ShieldCheck, TrendingUp } from "lucide-react";
import MobileSnapBeat from "./MobileSnapBeat";

const messyRows = [
  { account: "Taxable", holding: "NVDA", exposure: "Direct" },
  { account: "RRSP", holding: "SPY", exposure: "Hidden" },
  { account: "TFSA", holding: "QQQ", exposure: "Hidden" },
  { account: "Cash", holding: "USD", exposure: "Manual" },
];

const exposureRows = [
  { label: "Direct NVDA", amount: "$10,200", tone: "text-white" },
  { label: "Through SPY", amount: "$742", tone: "text-emerald-300" },
  { label: "Through QQQ", amount: "$2,025", tone: "text-emerald-300" },
];

const reliefSteps = [
  "Write the rule",
  "Connect holdings",
  "Look through funds",
  "Score the drift",
];

export default function FounderExposureBridge() {
  return (
    <motion.section
      id="founder-story"
      className="scroll-stop-section relative overflow-clip border-t border-white/5 bg-slate-950 py-20"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.28, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <MobileSnapBeat />
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-400/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Founder-built discipline layer
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              The spreadsheet breaks when exposure is hidden inside funds.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-slate-350 md:text-lg">
              I built Aerarium because my own investing system kept outgrowing spreadsheets. As a CFA charterholder, I knew the rules I wanted to follow. I tracked accounts manually, wrote down why I bought things, and watched allocation.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-slate-350 md:text-lg">
              But when SPY, QQQ, and NVDA lived across retirement and taxable accounts, the spreadsheet stopped answering the question that mattered: how much NVDA exposure do I actually have?
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["CFA charterholder", "Solo founder", "Built from a real portfolio problem"].map((item) => (
              <span key={item} className="rounded-full border border-white/6 bg-slate-900/55 px-3 py-1.5 text-[11px] font-semibold text-slate-300">
                {item}
              </span>
            ))}
          </div>

          <div className="text-sm font-semibold text-emerald-300">
            - Vedang, solo founder
          </div>
        </motion.div>

        <motion.div
          className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]"
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.28 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
        >
          <div className="rounded-[28px] border border-white/6 bg-slate-900/40 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
            <div className="flex items-center justify-between border-b border-white/6 pb-4">
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Before</div>
                <h3 className="mt-1 font-display text-lg font-bold text-white">Spreadsheet memory</h3>
              </div>
              <FileSpreadsheet className="h-5 w-5 text-amber-200" />
            </div>
            <div className="mt-4 space-y-3">
              {messyRows.map((row) => (
                <div key={`${row.account}-${row.holding}`} className="grid grid-cols-[0.9fr_0.8fr_0.8fr] items-center gap-3 rounded-xl border border-white/5 bg-slate-950/45 px-3 py-3 text-xs">
                  <span className="font-semibold text-slate-300">{row.account}</span>
                  <span className="font-mono font-bold text-white">{row.holding}</span>
                  <span className={`justify-self-end rounded-full px-2 py-1 font-mono text-[10px] ${row.exposure === "Direct" ? "bg-emerald-400/10 text-emerald-200" : "bg-amber-400/10 text-amber-200"}`}>
                    {row.exposure}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Account rows are visible. Fund overlap is still a mental calculation.
            </p>
          </div>

          <div className="rounded-[28px] border border-emerald-400/22 bg-gradient-to-br from-emerald-400/[0.09] via-slate-900/70 to-slate-950 p-5 shadow-[0_30px_90px_rgba(16,185,129,0.13)]">
            <div className="flex items-center justify-between border-b border-emerald-400/14 pb-4">
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300/80">After</div>
                <h3 className="mt-1 font-display text-lg font-bold text-white">Aerarium X-Ray</h3>
              </div>
              <TrendingUp className="h-5 w-5 text-emerald-300" />
            </div>

            <div className="mt-5 rounded-2xl border border-white/6 bg-slate-950/50 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Total NVDA exposure</div>
                  <div className="mt-2 font-display text-4xl font-bold tracking-tight text-white">$12,967</div>
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-200">
                  direct + funds
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {exposureRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      <span>{row.label}</span>
                    </div>
                    <span className={`font-mono text-sm font-bold ${row.tone}`}>{row.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-350">
              SPY + QQQ + direct NVDA become one exposure view, across accounts and currencies.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-2 rounded-[28px] border border-white/6 bg-slate-900/30 p-4 md:p-5"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
        >
          <div className="grid gap-3 md:grid-cols-4">
            {reliefSteps.map((step, index) => (
              <div key={step} className="relative rounded-2xl border border-white/5 bg-slate-950/35 p-4">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300/70">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-display text-base font-bold text-white">{step}</div>
                {index < reliefSteps.length - 1 && (
                  <div className="hidden md:block absolute right-[-16px] top-1/2 h-px w-8 bg-gradient-to-r from-emerald-300/45 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
