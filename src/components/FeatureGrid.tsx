import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Sparkles, 
  Smartphone, 
  PieChart, 
  Search, 
  Activity, 
  BookOpen, 
  Fingerprint, 
  Layers, 
  TrendingUp, 
  ArrowUpRight, 
  Globe, 
  FileText,
  BadgeAlert,
  Sliders,
  DollarSign,
  Briefcase,
  ShieldAlert,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { motion } from "motion/react";
import finsightSegmentsSrc from "../assets/finsight-segments.png";
import finsightOverlapSrc from "../assets/finsight-overlap.png";
import finsightMacroHeroSrc from "../assets/finsight-macro-hero.png";

export default function FeatureGrid() {
  const [simulatedScore, setSimulatedScore] = useState<number>(88);
  const [driftValue, setDriftValue] = useState<number>(12);

  // Dynamic ticking search text simulator inside the research mockup
  const [searchQuery, setSearchQuery] = useState("");
  const searchCandidates = ["AAPL", "NVDA", "MSFT", "Securities", "Consumer Staples", "13F Whale Transfers", "Yield Curve"];
  
  // Track which research image is popped to front
  const [activeResearchImage, setActiveResearchImage] = useState<number>(2);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setSearchQuery(searchCandidates[index]);
      index = (index + 1) % searchCandidates.length;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-0">
      
      {/* SECTION 1: AERARIUM PORTFOLIO */}
      <motion.section 
        id="portfolio" 
        style={{ scrollMarginTop: "100px" }} 
        className="py-24 relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-slate-950 via-slate-900/10 to-slate-950"
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
              A private iOS cockpit for turning your investment policy into live guardrails.
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
                <span className="font-display text-sm font-semibold text-white">IPS Cockpit</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build an Investment Policy Statement, track rules, review versions, and surface what needs attention.
              </p>
            </div>

            {/* 2. Policy Score */}
            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all group" id="feat-policy-score">
              <div className="flex items-center space-x-2 text-emerald-450">
                <PieChart className="w-5 h-5" />
                <span className="font-display text-sm font-semibold text-white">Policy Score</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Explain allocation drift, concentration risk, liquidity, goals, and review cadence in one score.
              </p>
            </div>

            {/* 3. Portfolio X-Ray */}
            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all group" id="feat-portfolio-xray">
              <div className="flex items-center space-x-2 text-emerald-450">
                <Activity className="w-5 h-5" />
                <span className="font-display text-sm font-semibold text-white">Portfolio X-Ray</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Look through ETF holdings to reveal true stock, sector, asset-class, and currency exposure.
              </p>
            </div>

            {/* 4. Goals + Funding Plan */}
            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all group" id="feat-goals-funding">
              <div className="flex items-center space-x-2 text-emerald-450">
                <Globe className="w-5 h-5" />
                <span className="font-display text-sm font-semibold text-white">Goals + Funding Plan</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assign portfolio sleeves to goals without hiding global allocation tradeoffs.
              </p>
            </div>

            {/* 5. Thesis Check-ins */}
            <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all group" id="feat-thesis-checkins">
              <div className="flex items-center space-x-2 text-emerald-450">
                <BookOpen className="w-5 h-5" />
                <span className="font-display text-sm font-semibold text-white">Thesis Check-ins</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Keep investing decisions tied to a written thesis instead of impulse trades.
              </p>
            </div>

            {/* 6. Private by Design */}
            <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all group" id="feat-private-by-design">
              <div className="flex items-center space-x-2 text-emerald-450">
                <Fingerprint className="w-5 h-5" />
                <span className="font-display text-sm font-semibold text-white">Private by Design</span>
              </div>
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
        className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/5 to-slate-950"
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
                href="https://finsight-beryl.vercel.app/"
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

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Features Description Cards */}
            <div className="lg:col-span-7 lg:order-last space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Company Fundamentals */}
                <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-cyan-500/25 transition-all group" id="feat-company-fundamentals">
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-display text-sm font-semibold text-white">Company Fundamentals</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Revenue, cash flow, margins, valuation, debt, dividends, buybacks, and segment charts.
                  </p>
                </div>

                {/* 2. Operational KPIs */}
                <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-cyan-500/25 transition-all group" id="feat-operational-kpis">
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <Activity className="w-5 h-5" />
                    <span className="font-display text-sm font-semibold text-white">Operational KPIs</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Filing-derived metrics like subscribers, vehicles, customers, energy, regional splits, and growth series.
                  </p>
                </div>

                {/* 3. Funds + Ownership */}
                <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-cyan-500/25 transition-all group" id="feat-funds-ownership">
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <Briefcase className="w-5 h-5" />
                    <span className="font-display text-sm font-semibold text-white">Funds + Ownership</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    13F-style top buys, top sells, top holdings, sector allocation, and institutional ownership views.
                  </p>
                </div>

                {/* 4. Macro Signals */}
                <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-cyan-500/25 transition-all group" id="feat-macro-signals">
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <Globe className="w-5 h-5" />
                    <span className="font-display text-sm font-semibold text-white">Macro Signals</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Yield curve, Fed funds futures, mortgage rates, commodities, and economic calendar.
                  </p>
                </div>

                {/* 5. Market Screens */}
                <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-cyan-500/25 transition-all group" id="feat-market-screens">
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <Layers className="w-5 h-5" />
                    <span className="font-display text-sm font-semibold text-white">Market Screens</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sector heatmap, top movers, index changes, earnings calendar, analyst estimates, and short interest.
                  </p>
                </div>

                {/* 6. Watchlists */}
                <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3 hover:border-cyan-500/25 transition-all group" id="feat-watchlists">
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <FileText className="w-5 h-5" />
                    <span className="font-display text-sm font-semibold text-white">Watchlists</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Track names and lightweight portfolios while researching public-market ideas.
                  </p>
                </div>

              </div>
            </div>

            {/* Interactive Analytical Dashboard Side */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4 relative">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold z-10 md:mb-6">
                Research Workspace
              </span>
              
              <div className="relative w-full max-w-[380px] aspect-[4/3] group mt-8">
                {/* Image 0: Segments (Left Back) */}
                <motion.div 
                  className={`absolute -top-6 -left-6 w-3/4 aspect-video rounded-lg overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer bg-slate-900 ${activeResearchImage === 0 ? 'z-40 scale-110 shadow-[0_20px_50px_rgba(6,182,212,0.2)]' : 'z-10 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:-rotate-2'}`}
                  initial={{ opacity: 0, x: 20, rotate: 2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -4 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  onClick={() => setActiveResearchImage(0)}
                >
                  <img src={finsightSegmentsSrc} alt="Revenue Segments" className={`w-full h-full object-cover object-left-top transition-opacity ${activeResearchImage === 0 ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`} />
                </motion.div>

                {/* Image 1: Overlap (Right Back) */}
                <motion.div 
                  className={`absolute -bottom-6 -right-6 w-[85%] aspect-video rounded-lg overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer bg-slate-900 ${activeResearchImage === 1 ? 'z-40 scale-110 shadow-[0_20px_50px_rgba(6,182,212,0.2)]' : 'z-20 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:rotate-2'}`}
                  initial={{ opacity: 0, x: -20, rotate: -2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 4 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  onClick={() => setActiveResearchImage(1)}
                >
                  <img src={finsightOverlapSrc} alt="Stock Overlap" className={`w-full h-full object-cover object-left-top transition-opacity ${activeResearchImage === 1 ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`} />
                </motion.div>

                {/* Image 2: Macro (Main Front) */}
                <motion.div 
                  className={`absolute inset-0 rounded-xl overflow-hidden border border-cyan-500/20 shadow-[0_20px_50px_rgba(6,182,212,0.15)] transition-all duration-500 cursor-pointer bg-slate-950 ${activeResearchImage === 2 ? 'z-40 scale-105 shadow-[0_20px_50px_rgba(6,182,212,0.3)]' : 'z-30'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  onClick={() => setActiveResearchImage(2)}
                >
                  <div className="absolute top-0 left-0 right-0 h-6 bg-slate-900 border-b border-white/5 flex items-center px-3 space-x-1.5 z-10">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <img src={finsightMacroHeroSrc} alt="Macro Dashboard" className="w-full h-full object-cover object-left pt-6" />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

    </div>
  );
}
