import React from "react";
import { ArrowUpRight, CheckCircle2, FileText, ShieldCheck, Target } from "lucide-react";
import MobileSnapBeat from "./MobileSnapBeat";

const systemPoints = [
  {
    icon: Target,
    title: "Exposure",
    body: "Direct positions and fund look-through roll up before policy checks run.",
  },
  {
    icon: FileText,
    title: "Policy",
    body: "Your IPS, guardrails, goals, and thesis notes stay tied to the portfolio.",
  },
  {
    icon: ShieldCheck,
    title: "Discipline",
    body: "The score explains whether the portfolio still matches your rules.",
  },
];

export default function FounderExposureBridge() {
  return (
    <section
      id="founder-story"
      className="scroll-stop-section relative overflow-clip border-t border-white/5 bg-[#090d0b] py-20"
    >
      <MobileSnapBeat />
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.055] pointer-events-none" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/18 bg-amber-200/[0.07] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-amber-100">
            <ShieldCheck className="h-3.5 w-3.5" />
            Built from a real portfolio problem
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              The spreadsheet stopped answering the real question.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              I built Aerarium because my own investing system kept outgrowing spreadsheets. As a CFA charterholder, I knew the rules I wanted to follow. But when SPY, QQQ, and NVDA lived across retirement and taxable accounts, the spreadsheet stopped answering the question that mattered.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Aerarium started there: a private discipline layer for investors who want policy, exposure, goals, and thesis notes tracked in one place.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {["CFA charterholder", "Solo founder", "Rules-first investor"].map((item) => (
                <span key={item} className="rounded-full border border-white/6 bg-slate-900/55 px-3 py-1.5 text-xs font-semibold text-slate-300">
                  {item}
                </span>
              ))}
            </div>
            <div className="text-sm font-semibold text-emerald-300">
              - Vedang, CFA charterholder and solo founder
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[48px] bg-emerald-400/[0.055] blur-3xl" />
          <div className="relative overflow-hidden rounded-[34px] border border-emerald-400/16 bg-gradient-to-br from-slate-900/70 via-slate-950 to-emerald-950/18 p-6 shadow-[0_36px_110px_rgba(0,0,0,0.34)] ring-1 ring-white/8 md:p-8">
            <div className="absolute inset-0 bg-cyber-grid opacity-[0.08] pointer-events-none" />
            <div className="relative">
              <div className="max-w-xl">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                  Closed-loop discipline
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Most apps show what changed. Aerarium shows whether the change broke your rules.
                </h3>
              </div>

              <div className="mt-8 grid gap-4">
                {systemPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={point.title}
                      className="group rounded-2xl border border-white/6 bg-slate-950/55 p-5 transition hover:border-emerald-400/20 hover:bg-emerald-400/[0.055]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/16 bg-emerald-300/10 text-emerald-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-slate-500">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h4 className="font-display text-lg font-bold text-white">{point.title}</h4>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-slate-350">{point.body}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-400/18 bg-emerald-400/[0.07] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  <div>
                    <div className="font-display text-base font-bold text-white">
                      One system, not another dashboard to maintain.
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-350">
                      Research informs the decision. Portfolio checks whether the decision stays aligned with the policy.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#portfolio"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/22 bg-emerald-400/[0.08] px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300/45 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                See the product tour
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
