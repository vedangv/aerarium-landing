import React from "react";
import { motion } from "motion/react";
import { ArrowDownRight, CheckCircle2, Eye, ShieldCheck } from "lucide-react";
import xrayHoldingsScreen from "../assets/ss1.png";

const exposureRows = [
  { label: "Believed NVDA", value: "8.0%", tone: "text-slate-400" },
  { label: "Actual NVDA", value: "18.7%", tone: "text-emerald-300" },
  { label: "Hidden through funds", value: "+10.7 pts", tone: "text-amber-200" },
];

function HeroPhoneFrame() {
  return (
    <div className="relative mx-auto w-full max-w-[315px] rounded-[52px] border-[5px] border-slate-900 bg-slate-950 p-2 shadow-[0_36px_120px_rgba(0,0,0,0.48)] ring-1 ring-emerald-300/24 xl:max-w-[360px]">
      <div className="absolute left-1/2 top-[17px] z-30 flex h-[34px] w-[122px] -translate-x-1/2 items-center justify-center rounded-full bg-black shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
        <span className="mr-5 h-2 w-2 rounded-full bg-slate-900" />
        <span className="h-1.5 w-12 rounded-full bg-slate-900" />
      </div>
      <div className="relative aspect-[1206/2622] overflow-hidden rounded-[41px] border border-white/5 bg-[#040805]">
        <img
          src={xrayHoldingsScreen}
          alt="Aerarium Portfolio X-Ray showing direct holdings and through-fund stock exposure"
          className="h-full w-full object-cover brightness-[1.35] contrast-[1.08] saturate-[1.05]"
          referrerPolicy="no-referrer"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.035] to-transparent" />
      </div>
    </div>
  );
}

export default function HeroSignalScene() {
  return (
    <motion.div
      className="relative min-h-[620px]"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
    >
      <div className="absolute inset-0 rounded-[48px] border border-emerald-400/12 bg-gradient-to-br from-slate-900/35 via-slate-950/30 to-emerald-950/18" />
      <div className="absolute inset-0 rounded-[48px] bg-cyber-grid opacity-10" />
      <div className="absolute -right-12 top-16 h-72 w-72 rounded-full bg-emerald-300/[0.08] blur-3xl" />

      <div className="relative z-10 grid min-h-[620px] items-center gap-6 px-4 py-8 sm:px-8 lg:grid-cols-[0.76fr_1.24fr]">
        <motion.div
          className="order-2 space-y-4 lg:order-1"
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.72, ease: "easeOut", delay: 0.25 }}
        >
          <div className="rounded-[28px] border border-emerald-400/18 bg-slate-950/72 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur">
            <div className="flex items-start justify-between gap-4 border-b border-white/7 pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                  X-Ray revelation
                </div>
                <div className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
                  Fund exposure changes the answer.
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">
                <Eye className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {exposureRows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 rounded-2xl border border-white/6 bg-slate-900/48 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-300">{row.label}</span>
                  <span className={`font-mono text-lg font-bold ${row.tone}`}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-amber-200/14 bg-amber-200/[0.06] p-4">
              <div className="flex items-start gap-3">
                <ArrowDownRight className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
                <p className="text-sm leading-relaxed text-slate-300">
                  The point is not another holdings list. It is one exposure number across accounts, direct shares, and fund look-through before policy rules evaluate the portfolio.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {["Read-only brokerage data", "No trades placed"].map((claim) => (
              <div key={claim} className="rounded-2xl border border-white/6 bg-slate-900/45 p-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <div className="mt-2 text-sm font-semibold leading-snug text-white">{claim}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="order-1 flex justify-center lg:order-2"
          initial={{ y: 28, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.78, ease: "easeOut", delay: 0.38 }}
        >
          <div className="relative">
            <div className="absolute -inset-8 rounded-[64px] bg-emerald-300/[0.12] blur-2xl" />
            <HeroPhoneFrame />
            <div className="absolute -bottom-5 left-1/2 w-[280px] -translate-x-1/2 rounded-2xl border border-emerald-300/18 bg-slate-950/86 p-4 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span>Policy sees the real number.</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                X-Ray feeds the Policy Score, guardrails, and allocation checks.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
