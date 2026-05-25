import React, { useState, useEffect } from "react";
import { 
  Smartphone, 
  PieChart, 
  Search, 
  Activity, 
  BookOpen, 
  Fingerprint, 
  Globe, 
  Sliders,
  ChevronUp,
  ChevronDown,
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
  const activeResearch = RESEARCH_SHOWCASES[activeResearchImage];
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setActiveResearchImage((prev) => (prev + 1) % RESEARCH_SHOWCASES.length);
    }, 5200);

    return () => clearInterval(interval);
  }, []);

  const getResearchDistance = (index: number) => {
    const total = RESEARCH_SHOWCASES.length;
    let distance = index - activeResearchImage;
    while (distance < -total / 2) distance += total;
    while (distance > total / 2) distance -= total;
    return distance;
  };

  return (
    <div className="space-y-0">
      
      {/* SECTION 1: AERARIUM PORTFOLIO */}
      <motion.section 
        id="portfolio" 
        style={{ scrollMarginTop: "100px" }} 
        className="scroll-stop-section py-20 relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-slate-950 via-slate-900/10 to-slate-950"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Heading */}
          <div className="max-w-3xl text-left mb-16 space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs uppercase font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Pillar One</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">
              Aerarium Portfolio
            </h2>
            <p className="text-base md:text-lg text-slate-350 leading-relaxed max-w-2xl font-light">
              Turn your investment policy into live guardrails.
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
          </div>          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. IPS Cockpit */}
            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all group" id="feat-ips-cockpit">
              <div className="flex items-center space-x-2 text-emerald-450">
                <Sliders className="w-5 h-5" />
                <span className="font-display text-sm font-semibold text-white">Stop Drifting From Your Plan</span>
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-300/75">IPS Cockpit</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build an Investment Policy Statement, track rules, review versions, and surface what needs attention.
              </p>
            </div>

            {/* 2. Policy Score */}
            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all group" id="feat-policy-score">
              <div className="flex items-center space-x-2 text-emerald-450">
                <PieChart className="w-5 h-5" />
                <span className="font-display text-sm font-semibold text-white">Know Portfolio Health at a Glance</span>
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-300/75">Policy Score</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Explain allocation drift, concentration risk, liquidity, goals, and review cadence in one score.
              </p>
            </div>

            {/* 3. Portfolio X-Ray */}
            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all group" id="feat-portfolio-xray">
              <div className="flex items-center space-x-2 text-emerald-450">
                <Activity className="w-5 h-5" />
                <span className="font-display text-sm font-semibold text-white">See Through Your ETFs</span>
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-300/75">Portfolio X-Ray</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Look through ETF holdings to reveal true stock, sector, asset-class, and currency exposure.
              </p>
            </div>

            {/* 4. Goals + Funding Plan */}
            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all group" id="feat-goals-funding">
              <div className="flex items-center space-x-2 text-emerald-450">
                <Globe className="w-5 h-5" />
                <span className="font-display text-sm font-semibold text-white">Assign Assets to Goals</span>
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-300/75">Goals + Funding Plan</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assign portfolio sleeves to goals without hiding global allocation tradeoffs.
              </p>
            </div>

            {/* 5. Thesis Check-ins */}
            <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all group" id="feat-thesis-checkins">
              <div className="flex items-center space-x-2 text-emerald-450">
                <BookOpen className="w-5 h-5" />
                <span className="font-display text-sm font-semibold text-white">Never Forget Why You Bought</span>
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-300/75">Thesis Check-ins</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Keep investing decisions tied to a written thesis instead of impulse trades.
              </p>
            </div>

            {/* 6. Private by Design */}
            <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all group" id="feat-private-by-design">
              <div className="flex items-center space-x-2 text-emerald-450">
                <Fingerprint className="w-5 h-5" />
                <span className="font-display text-sm font-semibold text-white">Keep Private Data Private</span>
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-300/75">Private by Design</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Encrypted financial fields, Keychain-backed recovery planning, and user-controlled data.
              </p>
            </div>

          </div>
        </div>
      </motion.section>

      {/* SECTION 2: AERARIUM RESEARCH */}
      <motion.section 
        id="research" 
        style={{ scrollMarginTop: "100px" }} 
        className="scroll-stop-section py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/5 to-slate-950"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Heading */}
          <div className="max-w-3xl text-left mb-16 space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase font-semibold">
              <Search className="w-3.5 h-3.5" />
              <span>Pillar Two</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">
              Aerarium Research
            </h2>
            <p className="text-base md:text-lg text-slate-350 leading-relaxed max-w-2xl font-light">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="hidden md:flex relative h-[520px] flex-col items-center justify-center rounded-[28px] border border-white/5 bg-slate-950/35 p-4">
                <div className="absolute left-4 right-4 top-1/2 h-28 -translate-y-1/2 rounded-2xl border-y border-cyan-400/18 bg-cyan-400/[0.04] pointer-events-none" />

                <button
                  onClick={() => setActiveResearchImage((activeResearchImage - 1 + RESEARCH_SHOWCASES.length) % RESEARCH_SHOWCASES.length)}
                  className="absolute top-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/8 bg-slate-950/80 p-2 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
                  aria-label="Previous research feature"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>

                <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d", perspective: "900px" }}>
                  {RESEARCH_SHOWCASES.map((feature, index) => {
                    const distance = getResearchDistance(index);
                    const isActive = index === activeResearchImage;

                    return (
                      <motion.button
                        key={feature.id}
                        type="button"
                        onClick={() => setActiveResearchImage(index)}
                        initial={false}
                        animate={{
                          y: distance * 74,
                          rotateX: -distance * 13,
                          z: -Math.abs(distance) * 34,
                          scale: isActive ? 1.02 : 1 - Math.abs(distance) * 0.055,
                          opacity: Math.max(0.26, 1 - Math.abs(distance) * 0.23),
                        }}
                        transition={{ type: "spring", stiffness: 145, damping: 20, mass: 0.85 }}
                        className={`absolute left-0 right-0 top-[calc(50%_-_48px)] rounded-2xl border p-4 text-left transition-colors ${
                          isActive
                            ? "border-cyan-400/35 bg-slate-900/95 text-white shadow-[0_20px_55px_rgba(6,182,212,0.12)]"
                            : "border-white/[0.05] bg-slate-950/40 text-slate-400 hover:border-cyan-400/16 hover:bg-slate-900/55"
                        }`}
                        style={{ zIndex: 50 - Math.abs(distance) }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300/80">
                              {feature.label}
                            </div>
                            <div className="mt-1 font-display text-base font-bold tracking-tight">
                              {feature.title}
                            </div>
                          </div>
                          <span className="font-mono text-xs text-slate-500">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 max-w-sm text-xs leading-relaxed text-slate-400"
                          >
                            {feature.description}
                          </motion.p>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setActiveResearchImage((activeResearchImage + 1) % RESEARCH_SHOWCASES.length)}
                  className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/8 bg-slate-950/80 p-2 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
                  aria-label="Next research feature"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="md:hidden space-y-4">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {RESEARCH_SHOWCASES.map((feature, index) => (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => setActiveResearchImage(index)}
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
                <div className="rounded-2xl border border-cyan-400/12 bg-slate-900/55 p-4">
                  <div className="font-display text-base font-bold text-white">{activeResearch.title}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{activeResearch.description}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
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

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {["SEC EDGAR", "FRED macro", "13F funds", "Company KPIs"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/5 bg-slate-900/35 px-3 py-2 text-center text-[11px] font-semibold text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: SECURITY + TRUST */}
      <motion.section
        id="security"
        style={{ scrollMarginTop: "100px" }}
        className="scroll-stop-section relative overflow-hidden border-t border-white/5 bg-slate-950 py-20"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-5">
              <div className="inline-flex items-center space-x-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Security</span>
              </div>
              <div className="space-y-3">
                <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                  Security you can verify, not just trust.
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-slate-350 md:text-lg">
                  Aerarium is built around read-only portfolio visibility, explicit controls, and source-first research. Your data should stay controlled by you.
                </p>
              </div>
              <div className="rounded-2xl border border-white/6 bg-slate-900/35 p-5">
                <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-300/75">
                  Founder note
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  I built Aerarium because I wanted a tool that helped enforce my own investing rules instead of nudging me to trade more. My background as a CFA charterholder shapes the product: disciplined policy, transparent exposure, and no trading-first incentives.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["CFA charterholder", "Solo founder", "Rules-first investing"].map((item) => (
                    <span key={item} className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1 text-[10px] font-bold text-emerald-200">
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
