import React, { useEffect, useRef, useState } from "react";
import {
  Smartphone,
  Search,
  ChevronRight,
  ShieldCheck,
  LockKeyhole,
  FileDown,
  EyeOff,
  Database
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import researchFundsHeatmapSrc from "../../assets/screenshots/aerarium-research-funds-overlap-heatmap.png";
import researchMacroDashboardSrc from "../../assets/screenshots/aerarium-research-macro-dashboard.png";
import researchFedCurveSrc from "../../assets/screenshots/aerarium-research-macro-fed-yield-curve.png";
import researchAaplSegmentsSrc from "../../assets/screenshots/aerarium-research-aapl-segments.png";
import researchAaplMetricsSrc from "../../assets/screenshots/aerarium-research-aapl-financial-charts.png";
import researchNvdaOwnershipSrc from "../../assets/screenshots/aerarium-research-nvda-ownership-insiders.png";
import researchHomeSrc from "../../assets/screenshots/aerarium-research-home-market-browser.png";
import MobileSnapBeat from "./MobileSnapBeat";
import PortfolioCockpitTour from "./PortfolioCockpitTour";

const RESEARCH_SHOWCASES = [
  {
    id: "funds-heatmap",
    title: "13F Overlap Heatmap",
    label: "Funds",
    description: "See which institutional managers cluster around the same names and how much each position weighs.",
    image: researchFundsHeatmapSrc,
  },
  {
    id: "macro-dashboard",
    title: "Macro Dashboard",
    label: "Macro",
    description: "Rates, inflation, labor, credit, commodities, and high-impact releases in one source-first view.",
    image: researchMacroDashboardSrc,
  },
  {
    id: "fed-curve",
    title: "Fed Funds Curve",
    label: "Rates",
    description: "Market-implied policy path, meeting markers, target bands, and repricing context.",
    image: researchFedCurveSrc,
  },
  {
    id: "segments",
    title: "Revenue Segments",
    label: "Company",
    description: "Segment and geography breakouts from filings, built for inspecting the business behind the ticker.",
    image: researchAaplSegmentsSrc,
  },
  {
    id: "metric-charts",
    title: "Financial Chart Grid",
    label: "Financials",
    description: "Revenue, cash flow, net income, debt, buybacks, and margin series with consistent visual grammar.",
    image: researchAaplMetricsSrc,
  },
  {
    id: "ownership",
    title: "Ownership + Insiders",
    label: "Ownership",
    description: "Institutional holders, QoQ changes, net insider sentiment, and price-linked activity.",
    image: researchNvdaOwnershipSrc,
  },
  {
    id: "market-browser",
    title: "Market Nerve Center",
    label: "Home",
    description: "Sector browser, market movers, analyst activity, and fund activity in one research starting point.",
    image: researchHomeSrc,
  },
];

export default function FeatureGrid() {
  const [activeResearchImage, setActiveResearchImage] = useState<number>(0);
  const desktopResearchRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileResearchRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeResearch = RESEARCH_SHOWCASES[activeResearchImage];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const strongest = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const nextIndex = strongest?.target.getAttribute("data-research-index");
        if (nextIndex != null) {
          setActiveResearchImage(Number(nextIndex));
        }
      },
      {
        root: null,
        rootMargin: "-32% 0px -42% 0px",
        threshold: [0.18, 0.36, 0.54, 0.72],
      },
    );

    const nodes = [...desktopResearchRefs.current, ...mobileResearchRefs.current];
    nodes.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToResearch = (index: number) => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const target = isDesktop ? desktopResearchRefs.current[index] : mobileResearchRefs.current[index];
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="space-y-0">
      
      {/* SECTION 1: AERARIUM PORTFOLIO */}
      <section
        id="portfolio" 
        style={{ scrollMarginTop: "100px" }} 
        className="scroll-stop-section py-24 relative border-t border-white/5 bg-gradient-to-b from-slate-950 via-[#080d0b] to-slate-950"
      >
        <MobileSnapBeat />
        <div className="absolute inset-0 bg-cyber-grid opacity-[0.045] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Heading */}
          <div className="max-w-4xl text-left mb-16 space-y-5">
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Aerarium Portfolio</span>
            </div>
            <h2 className="font-editorial text-5xl leading-[0.95] tracking-tight text-white md:text-7xl">
              Your policy should move with your portfolio.
            </h2>
            <p className="text-lg md:text-xl text-slate-350 leading-relaxed max-w-2xl">
              Most apps tell you what changed. Aerarium tells you whether the change broke your policy.
            </p>
            <div className="pt-2">
              <a 
                href="https://testflight.apple.com/join/Xna39VKU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors group"
                id="link-portfolio-testflight"
              >
                <span>Join iOS Beta →</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all font-mono">TestFlight</span>
              </a>
            </div>
          </div>

          <PortfolioCockpitTour />

          <motion.div
            className="mt-10 grid gap-4 md:grid-cols-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {[
              ["Exposure first", "Funds, accounts, currencies, sectors, and direct holdings roll up before policy rules run."],
              ["Score with reasons", "Allocation drift, concentration, liquidity, goals, and review cadence explain the health signal."],
              ["Built for restraint", "Thesis check-ins and IPS versions help preserve the reason behind each decision."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-3xl border border-white/6 bg-slate-950/50 p-6">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
                <h3 className="mt-4 font-display text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-400">{body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: AERARIUM RESEARCH */}
      <section
        id="research" 
        style={{ scrollMarginTop: "100px" }} 
        className="scroll-stop-section py-28 relative bg-gradient-to-b from-slate-950 via-[#0a0d12] to-slate-950"
      >
        <MobileSnapBeat />
        <div className="absolute inset-0 bg-cyber-grid opacity-[0.04] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Heading */}
          <div className="max-w-4xl text-left mb-16 space-y-5">
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-semibold">
              <Search className="w-3.5 h-3.5" />
              <span>Aerarium Research</span>
            </div>
            <h2 className="font-editorial text-5xl leading-[0.95] tracking-tight text-white md:text-7xl">
              Source-first market context before the next decision.
            </h2>
            <p className="text-lg md:text-xl text-slate-350 leading-relaxed max-w-2xl">
              A research workspace for companies, funds, macro signals, and ownership flows.
            </p>
            <div className="pt-2">
              <a 
                href="https://research.aerarium.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors group"
                id="link-research-finsight"
              >
                <span>Open Research →</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all font-mono">Live Workspace</span>
              </a>
            </div>
          </div>

          {/* Research product tour */}
          <MobileSnapBeat />

          <div className="hidden lg:block">
            <div className="sticky top-20 z-10 grid max-h-[calc(100svh-6rem)] grid-cols-12 items-center gap-10">
              <div className="col-span-5 space-y-7">
                <div className="grid grid-cols-2 gap-2">
                  {RESEARCH_SHOWCASES.map((feature, index) => (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => scrollToResearch(index)}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${
                        index === activeResearchImage
                          ? "border-cyan-400/35 bg-cyan-400/10 text-white shadow-[0_18px_55px_rgba(6,182,212,0.1)]"
                          : "border-white/[0.06] bg-slate-950/42 text-slate-500 hover:border-cyan-400/18 hover:text-slate-300"
                      }`}
                    >
                      <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-300/75">
                        {feature.label}
                      </div>
                      <div className="mt-1 font-display text-sm font-bold">{feature.title}</div>
                    </button>
                  ))}
                </div>

                <div className="rounded-3xl border border-cyan-400/22 bg-slate-950/55 p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeResearch.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300/75">
                        {activeResearch.label}
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
                        {activeResearch.title}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-350">
                        {activeResearch.description}
                      </p>
                      <div className="mt-5 h-1 rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-cyan-300/75 transition-all duration-500"
                          style={{ width: `${((activeResearchImage + 1) / RESEARCH_SHOWCASES.length) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="col-span-7">
                <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/30 bg-slate-900/80 shadow-[0_28px_90px_rgba(34,211,238,0.16)] ring-1 ring-white/10">
                  <div className="flex items-center justify-between border-b border-white/6 bg-slate-900/75 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                      Aerarium Research
                    </div>
                  </div>

                  <div className="relative aspect-[16/9] bg-slate-950">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeResearch.id}
                        src={activeResearch.image}
                        alt={activeResearch.title}
                        className="absolute inset-0 h-full w-full object-cover object-top brightness-110 contrast-110 saturate-110"
                        initial={{ opacity: 0, scale: 1.01 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.995 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </AnimatePresence>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                            {activeResearch.label}
                          </div>
                          <h3 className="mt-1 font-display text-xl font-bold text-white">{activeResearch.title}</h3>
                        </div>
                        <a
                          href="https://research.aerarium.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-200 transition hover:text-white"
                        >
                          Open Research
                          <ChevronRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  {["SEC EDGAR", "FRED macro", "13F funds", "Company KPIs"].map((item) => (
                    <div key={item} className="rounded-xl border border-white/5 bg-slate-900/35 px-3 py-2 text-center text-[11px] font-semibold text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pointer-events-none" aria-hidden="true">
              {RESEARCH_SHOWCASES.map((feature, index) => (
                <div
                  key={feature.id}
                  ref={(node) => {
                    desktopResearchRefs.current[index] = node;
                  }}
                  data-research-index={index}
                  className="h-[58svh]"
                />
              ))}
              <div className="h-[46svh]" />
            </div>
          </div>

          <div className="space-y-6 lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {RESEARCH_SHOWCASES.map((feature, index) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => scrollToResearch(index)}
                  className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition ${
                    index === activeResearchImage
                      ? "border-cyan-400/35 bg-cyan-400/10 text-cyan-200"
                      : "border-white/6 bg-slate-900/55 text-slate-400"
                  }`}
                >
                  {feature.label}
                </button>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[24px] border border-cyan-300/30 bg-slate-900/80 shadow-[0_28px_90px_rgba(34,211,238,0.16)] ring-1 ring-white/10">
              <div className="relative aspect-[16/9] bg-slate-950">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeResearch.id}
                    src={activeResearch.image}
                    alt={activeResearch.title}
                    className="absolute inset-0 h-full w-full object-cover object-top brightness-110 contrast-110 saturate-110"
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </AnimatePresence>
              </div>
            </div>

            {RESEARCH_SHOWCASES.map((feature, index) => {
              const isActive = index === activeResearchImage;
              return (
                <motion.div
                  key={feature.id}
                  ref={(node) => {
                    mobileResearchRefs.current[index] = node;
                  }}
                  data-research-index={index}
                  className={`min-h-[150px] rounded-3xl border p-5 transition-colors duration-300 ${
                    isActive
                      ? "border-cyan-400/35 bg-slate-900/92 text-white shadow-[0_20px_55px_rgba(6,182,212,0.12)]"
                      : "border-white/[0.06] bg-slate-950/42 text-slate-400"
                  }`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300/80">
                        {feature.label}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-350">
                    {feature.description}
                  </p>
                  <div className={`mt-5 h-1 rounded-full transition-colors ${isActive ? "bg-cyan-300/70" : "bg-white/8"}`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: SECURITY + TRUST */}
      <motion.section
        id="security"
        style={{ scrollMarginTop: "100px" }}
        className="scroll-stop-section relative overflow-clip border-t border-white/5 bg-[#0b0d0b] py-24"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <MobileSnapBeat />
        <div className="absolute inset-0 bg-cyber-grid opacity-[0.025] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-5">
              <div className="inline-flex items-center space-x-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-sm font-semibold text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Security</span>
              </div>
              <div className="space-y-3">
                <h2 className="font-editorial text-5xl leading-[0.95] tracking-tight text-white md:text-7xl">
                  Security you can verify, not just trust.
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-slate-350 md:text-lg">
                  Aerarium is built around read-only portfolio visibility, explicit controls, and source-first research. Your data should stay controlled by you.
                </p>
              </div>
              <div className="rounded-[28px] border border-white/6 bg-slate-900/35 p-6">
                <div className="text-sm font-semibold text-emerald-300/75">
                  Founder note
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-300">
                  I built Aerarium because I wanted a tool that helped enforce my own investing rules instead of nudging me to trade more. My background as a CFA charterholder shapes the product: disciplined policy, transparent exposure, and no trading-first incentives.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["CFA charterholder", "Solo founder", "Rules-first investing"].map((item) => (
                    <span key={item} className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-semibold text-emerald-200">
                      {item}
                    </span>
                  ))}
                </div>
                <a
                  href="https://www.linkedin.com/in/vedangv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-xs font-semibold text-emerald-300 transition hover:text-emerald-200"
                >
                  - Vedang, solo founder
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Read-only brokerage sync",
                  body: "SnapTrade connections keep holdings current. Aerarium never places trades.",
                  icon: EyeOff,
                },
                {
                  title: "Encrypted sensitive fields",
                  body: "Financial fields are protected with a recovery-aware encryption flow.",
                  icon: LockKeyhole,
                },
                {
                  title: "Export and delete controls",
                  body: "Data export stays available, and account deletion is treated as a first-class account right.",
                  icon: FileDown,
                },
                {
                  title: "Private portfolio, public research",
                  body: "Research uses public-market data and stays separate from private portfolio records.",
                  icon: Database,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-white/6 bg-slate-900/40 p-5">
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/16 bg-emerald-400/10 text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
