import React from "react";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import MobileSnapBeat from "./MobileSnapBeat";
import portfolioOverviewScreen from "../../assets/product-tour/portfolio.jpg";
import xrayHoldingsScreen from "../assets/ss1.png";

const proofPoints = [
  "True exposure across accounts",
  "Fund look-through for hidden holdings",
  "Rules and policy score in one cockpit",
];

function PhoneFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[44px] border-[5px] border-slate-900 bg-slate-950 p-2 shadow-[0_32px_100px_rgba(0,0,0,0.42)] ring-1 ring-emerald-300/10 ${className}`}
    >
      <div className="absolute left-1/2 top-[17px] z-20 flex h-[34px] w-[122px] -translate-x-1/2 items-center justify-center rounded-full bg-black shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
        <span className="mr-5 h-2 w-2 rounded-full bg-slate-900" />
        <span className="h-1.5 w-12 rounded-full bg-slate-900" />
      </div>
      <div className="overflow-hidden rounded-[36px] border border-white/5 bg-[#040805]">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="pointer-events-none absolute inset-2 rounded-[36px] bg-gradient-to-tr from-transparent via-white/[0.045] to-transparent" />
    </div>
  );
}

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
          <div className="relative overflow-hidden rounded-[38px] border border-emerald-400/20 bg-gradient-to-br from-slate-900/70 via-slate-950 to-emerald-950/25 px-5 py-8 shadow-[0_36px_110px_rgba(0,0,0,0.38)] ring-1 ring-white/10 md:px-8">
            <div className="absolute inset-0 bg-cyber-grid opacity-12 pointer-events-none" />
            <div className="absolute right-8 top-10 h-52 w-52 rounded-full bg-emerald-300/[0.09] blur-3xl" />
            <div className="relative mx-auto flex min-h-[560px] max-w-[720px] items-center justify-center">
              <PhoneFrame
                src={portfolioOverviewScreen}
                alt="Aerarium portfolio overview showing total portfolio value and exposure card"
                className="absolute left-0 top-16 hidden h-[500px] w-[230px] rotate-[-7deg] opacity-55 blur-[0.2px] md:block"
              />
              <PhoneFrame
                src={xrayHoldingsScreen}
                alt="Aerarium Portfolio X-Ray showing NVDA total exposure from direct holdings and ETF look-through"
                className="relative z-10 h-[590px] w-[270px] md:h-[620px] md:w-[285px]"
              />
              <div className="absolute bottom-5 right-3 z-20 hidden max-w-[260px] rounded-2xl border border-emerald-300/18 bg-slate-950/82 p-4 shadow-2xl backdrop-blur-xl md:block">
                <div className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                  X-Ray proof
                </div>
                <div className="mt-2 font-display text-lg font-bold text-white">
                  NVDA becomes one exposure number.
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-350">
                  Direct shares and ETF look-through roll up across accounts before policy rules evaluate the portfolio.
                </p>
              </div>
            </div>
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
