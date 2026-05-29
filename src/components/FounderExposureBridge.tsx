import React from "react";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import MobileSnapBeat from "./MobileSnapBeat";
import founderExposureHero from "../../assets/founder-exposure-hero.png";

const proofPoints = [
  "True exposure across accounts",
  "Fund look-through for hidden holdings",
  "Rules and policy score in one cockpit",
];

export default function FounderExposureBridge() {
  return (
    <section
      id="founder-story"
      className="scroll-stop-section relative overflow-clip border-t border-white/5 bg-slate-950 py-20"
    >
      <MobileSnapBeat />
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div
          className="space-y-6"
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

          <div className="rounded-2xl border border-emerald-400/18 bg-emerald-400/[0.07] p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <div>
                <div className="font-display text-base font-bold text-white">
                  How much NVDA exposure do I actually have?
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-350">
                  That question became the product spine: policy, holdings, ETF exposure, goals, and score in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
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
          </div>
        </div>

        <div
          className="relative"
        >
          <div className="absolute -inset-8 rounded-[48px] bg-emerald-400/[0.08] blur-3xl" />
          <div className="relative overflow-hidden rounded-[34px] border border-emerald-400/20 bg-slate-950 shadow-[0_36px_110px_rgba(0,0,0,0.38)] ring-1 ring-white/10">
            <img
              src={founderExposureHero}
              alt="Aerarium exposure dashboard showing hidden fund exposure and total NVDA exposure across accounts"
              className="h-full w-full object-cover object-left-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/8 via-transparent to-slate-950/10" />
          </div>

          <div className="relative mt-4 grid gap-3 md:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point} className="rounded-2xl border border-white/6 bg-slate-900/55 p-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <div className="mt-2 text-sm font-semibold leading-snug text-white">{point}</div>
              </div>
            ))}
          </div>

          <a
            href="#portfolio"
            className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/22 bg-emerald-400/[0.08] px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300/45 hover:text-white"
          >
            See the product tour
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
