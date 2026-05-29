import React from "react";
import { motion } from "motion/react";
import { Eye } from "lucide-react";
import xrayHoldingsScreen from "../assets/ss1.png";

const exposureRows = [
  { label: "Believed", detail: "NVDA", value: "8.0%", tone: "text-slate-350" },
  { label: "Actual", detail: "NVDA", value: "18.7%", tone: "text-emerald-200" },
  { label: "Hidden", detail: "through funds", value: "+10.7 pts", tone: "text-amber-100" },
];

function HeroPhoneFrame() {
  return (
    <div className="relative mx-auto w-full max-w-[285px] rounded-[46px] border-[5px] border-slate-900 bg-slate-950 p-2 shadow-[0_44px_130px_rgba(0,0,0,0.55)] ring-1 ring-emerald-300/22 sm:max-w-[330px] sm:rounded-[56px] xl:max-w-[390px]">
      <div className="relative aspect-[1206/2622] overflow-hidden rounded-[44px] border border-white/5 bg-[#040805]">
        <img
          src={xrayHoldingsScreen}
          alt="Aerarium Portfolio X-Ray showing direct holdings and through-fund stock exposure"
          className="h-full w-full object-cover brightness-[1.32] contrast-[1.08] saturate-[1.06]"
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
      className="relative"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
    >
      <div className="ambient-warm absolute -inset-12 rounded-[64px] blur-3xl" />
      <div className="relative overflow-hidden rounded-[36px] border border-emerald-400/16 bg-gradient-to-br from-slate-900/46 via-slate-950/72 to-emerald-950/18 px-3 py-6 shadow-[0_44px_140px_rgba(0,0,0,0.34)] ring-1 ring-white/[0.035] sm:rounded-[44px] sm:px-7 lg:px-8">
        <div className="absolute right-[-6%] top-[6%] h-80 w-80 rounded-full bg-emerald-300/[0.10] blur-[90px]" />
        <div className="absolute bottom-[-10%] left-[8%] h-64 w-64 rounded-full bg-amber-200/[0.06] blur-[90px]" />

        <div className="relative z-10 grid items-center gap-7 lg:grid-cols-[0.42fr_0.58fr]">
          <motion.div
            className="order-2 rounded-[28px] border border-emerald-300/18 bg-slate-950/62 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.26)] backdrop-blur lg:order-1"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.72, ease: "easeOut", delay: 0.25 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/18 bg-emerald-300/[0.08] px-3 py-1.5 text-xs font-semibold text-emerald-200">
              <Eye className="h-3.5 w-3.5" />
              <span>X-Ray result</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              One exposure number, before policy rules run.
            </h2>
            <div className="mt-5 divide-y divide-white/6 overflow-hidden rounded-2xl border border-white/6 bg-slate-900/36">
              {exposureRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-white">{row.label}</div>
                    <div className="text-xs text-slate-500">{row.detail}</div>
                  </div>
                  <div className={`font-mono text-lg font-bold ${row.tone}`}>{row.value}</div>
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
            <HeroPhoneFrame />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
