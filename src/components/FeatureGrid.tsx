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

export default function FeatureGrid() {
  const [simulatedScore, setSimulatedScore] = useState<number>(88);
  const [driftValue, setDriftValue] = useState<number>(12);

  // Dynamic ticking search text simulator inside the research mockup
  const [searchQuery, setSearchQuery] = useState("");
  const searchCandidates = ["AAPL", "NVDA", "MSFT", "Securities", "Consumer Staples", "13F Whale Transfers", "Yield Curve"];
  
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
                {/* Back Image (Left) */}
                <motion.div 
                  className="absolute -top-6 -left-6 w-3/4 aspect-video rounded-lg overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10 transition-transform duration-500 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:-rotate-2 bg-slate-900"
                  initial={{ opacity: 0, x: 20, rotate: 2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -4 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  <img src="/src/assets/finsight-segments.png" alt="Revenue Segments" className="w-full h-full object-cover object-left-top opacity-80 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Back Image (Right) */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-[85%] aspect-video rounded-lg overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:rotate-2 bg-slate-900"
                  initial={{ opacity: 0, x: -20, rotate: -2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 4 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <img src="/src/assets/finsight-overlap.png" alt="Stock Overlap" className="w-full h-full object-cover object-left-top opacity-80 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Main Front Image */}
                <motion.div 
                  className="absolute inset-0 rounded-xl overflow-hidden border border-cyan-500/20 shadow-[0_20px_50px_rgba(6,182,212,0.15)] z-30 transition-transform duration-500 group-hover:scale-105 bg-slate-950"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-6 bg-slate-900 border-b border-white/5 flex items-center px-3 space-x-1.5 z-10">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <img src="/src/assets/finsight-macro-hero.png" alt="Macro Dashboard" className="w-full h-full object-cover object-left pt-6" />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* SECTION 3: DECISION MATRIX ("USE PORTFOLIO WHEN / USE RESEARCH WHEN / TOGETHER") */}
      <section className="py-24 relative overflow-hidden bg-slate-950 border-t border-b border-white/5">
        <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">ECOSYSTEM FIT</span>
            <h3 className="font-display font-medium text-2xl md:text-3xl text-white mt-1">Ecosystem Playbook</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-emerald-500/20 transition-all flex flex-col justify-between" id="fit-portfolio-card">
              <div className="space-y-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded">PORTFOLIO</span>
                  <h4 className="font-display text-lg font-bold text-white">Use Portfolio when</h4>
                </div>
                <p className="text-slate-350 text-sm leading-relaxed">
                  you want to govern your own money with policy rules, scorecards, X-Ray exposure, and check-ins.
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 mt-8 flex items-center text-xs text-slate-500 space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Private personal device layer</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/20 transition-all flex flex-col justify-between" id="fit-research-card">
              <div className="space-y-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded">RESEARCH</span>
                  <h4 className="font-display text-lg font-bold text-white">Use Research when</h4>
                </div>
                <p className="text-slate-350 text-sm leading-relaxed">
                  you want to understand companies, filings, ownership, funds, macro context, and market signals.
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 mt-8 flex items-center text-xs text-slate-500 space-x-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>Web-accessible public database</span>
              </div>
            </div>

          </div>

          {/* Together footer accent bar */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/5 via-slate-900/50 to-cyan-500/5 border border-white/5 text-center">
            <span className="text-xs font-mono font-bold text-white block uppercase mb-1 tracking-wider">Together</span>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed font-sans">
              research informs decisions; portfolio discipline keeps those decisions aligned with your policy.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: SECURITY / PRIVACY */}
      <motion.section 
        id="security" 
        style={{ scrollMarginTop: "100px" }} 
        className="py-24 relative overflow-hidden bg-slate-950"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 items-center justify-center text-emerald-400 mx-auto">
            <Lock className="w-5 h-5 animate-pulse" />
          </div>
          
          <h2 className="font-display font-medium text-3xl md:text-5xl text-white tracking-tight leading-none">
            Private data stays private.
          </h2>
          
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            Portfolio is designed around user-owned financial data, encrypted fields, and recovery flows. Research uses public-market data and stays separate from private portfolio records.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto text-left text-xs font-mono">
            <div className="p-4 bg-slate-900/30 border border-white/5 rounded-xl space-y-1">
              <span className="text-emerald-400 font-bold block">01 CLIENT-ONLY</span>
              <span className="text-slate-400">Zero database syncing. No server records your personal credentials.</span>
            </div>
            <div className="p-4 bg-slate-900/30 border border-white/5 rounded-xl space-y-1">
              <span className="text-emerald-400 font-bold block">02 ENCRYPTED</span>
              <span className="text-slate-400">Values are locked with secure device-level keychain hashes.</span>
            </div>
            <div className="p-4 bg-slate-900/30 border border-white/5 rounded-xl space-y-1">
              <span className="text-emerald-400 font-bold block">03 DECOUPLING</span>
              <span className="text-slate-400">Public research runs on external servers: completely isolated from assets.</span>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
