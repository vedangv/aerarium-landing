/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import IosCockpitMockup from "./components/IosCockpitMockup";
import CountdownTimer from "./components/CountdownTimer";
import WaitlistPortal from "./components/WaitlistPortal";
import FeatureGrid from "./components/FeatureGrid";
import SocialHub from "./components/SocialHub";
import { motion } from "motion/react";
import { Sparkles, ArrowDown, ChevronRight, Lock, ChevronUp, ChevronDown } from "lucide-react";

const FEATURES = [
  {
    id: "overview",
    title: "Overview Dashboard",
    description: "Net worth, spend, invest, holdings, and account health stay visible without turning into a spreadsheet.",
  },
  {
    id: "ips-cockpit",
    title: "IPS Cockpit",
    description: "Build an Investment Policy Statement, track rules, review versions, and surface what needs attention.",
  },
  {
    id: "policy-score",
    title: "Policy Score",
    description: "Explain allocation drift, concentration risk, liquidity, goals, and review cadence in one score.",
  },
  {
    id: "portfolio-xray",
    title: "Portfolio X-Ray",
    description: "Look through ETF holdings to reveal true stock, sector, asset-class, and currency exposure.",
  },
  {
    id: "goals-funding",
    title: "Goals + Funding Plan",
    description: "Assign portfolio sleeves to goals without hiding global allocation tradeoffs.",
  },
  {
    id: "thesis-checkins",
    title: "Thesis Check-ins",
    description: "Keep investing decisions tied to a written thesis instead of impulse trades.",
  },
  {
    id: "private-design",
    title: "Private by Design",
    description: "Encrypted financial fields, Keychain-backed recovery planning, and user-controlled data.",
  },
];

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoTourActive, setAutoTourActive] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUserInteraction = () => {
    setLastInteraction(Date.now());
  };

  useEffect(() => {
    // Respect prefers-reduced-motion queries in core timers
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setAutoTourActive(false);
      return;
    }

    if (!autoTourActive) return;

    const interval = setInterval(() => {
      // Pause auto-rotation for 15s after physical user interaction
      if (Date.now() - lastInteraction < 15000) {
        return;
      }
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [autoTourActive, lastInteraction]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getDistance = (index: number) => {
    const total = FEATURES.length;
    let d = index - activeIndex;
    while (d < -total / 2) d += total;
    while (d > total / 2) d -= total;
    return d;
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 1. Global Ambient Parallax Backdrops */}
      <div 
        className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-glow-slow-1"
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      />
      <div 
        className="absolute top-[40%] right-[3%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-glow-slow-2"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />
      <div 
        className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none animate-glow-slow-3"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />

      {/* Grid Scanline Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none z-0" />

      {/* 2. Navigation */}
      <Navbar />

      {/* 3. Hero Section (Visual Fintech Asset Redesign) */}
      <header id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 z-10">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 space-y-8 text-left flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-450/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold tracking-wider w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AERARIUM PORTFOLIO & RESEARCH</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[45px] xl:text-[52px] text-white tracking-tight leading-[1.12]">
                Portfolio discipline and market research, under one roof.
              </h1>
              <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl font-normal leading-relaxed">
                Aerarium Portfolio turns your investing rules into a private cockpit. Aerarium Research gives you source-first public-market data before you make the next decision.
              </p>
            </div>

            {/* Premium proof points list */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-2.5 gap-x-6 py-1 text-[11px] font-mono text-slate-400 leading-none">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-555 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                <span>Private user data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-555 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                <span>Primary-source market data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-555 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                <span>Rules-first investing</span>
              </div>
            </div>

            {/* Primary Action Button Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="https://testflight.apple.com/join/Xna39VKU"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-8 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-semibold rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer text-center"
                id="btn-hero-join-waitlist"
              >
                Join iOS Beta
              </a>
              <a
                href="https://finsight-beryl.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-8 rounded-xl bg-slate-900 hover:bg-slate-850 text-sm font-semibold text-white border border-white/5 hover:border-slate-500/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
                id="btn-hero-learn-more"
              >
                <span>Open Research</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </a>
            </div>

            {/* Extra description caption from Vercel */}
            <p className="text-xs text-slate-500 max-w-md font-sans italic pt-2">
              Net worth, spend, invest, holdings, and account health stay visible without turning into a spreadsheet.
            </p>
          </div>

          {/* Right Interactive Simulator Segment Container */}
          <div className="lg:col-span-7 w-full flex flex-col md:flex-row items-center gap-8 md:gap-4 relative">
            
            {/* Feature Pills Selector - Left of Simulator on Desktop, Stacks on Mobile */}
            <div className="w-full md:w-5/12 flex-1 md:flex-initial" id="hero-interactive-controls">
              
              {/* Desktop layout: Vertical rotating cylindrical spinner wheel */}
              <div 
                className="hidden md:flex flex-col items-center justify-center relative w-full h-[410px] select-none py-4"
                style={{ perspective: "1000px" }}
              >
                {/* Visual Viewfinder Highlight Guides */}
                <div className="absolute left-0 right-0 h-28 border-y border-emerald-500/10 bg-slate-900/30 backdrop-blur-[2px] pointer-events-none rounded-2xl z-0" />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-emerald-500/50 uppercase tracking-widest pointer-events-none z-10">
                  FOCUS
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1.5 text-[9px] font-mono text-emerald-500/50 uppercase pointer-events-none z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>ACTIVE</span>
                </div>

                {/* Vertical rotation button controls */}
                <button
                  onClick={() => {
                    handleUserInteraction();
                    setActiveIndex((activeIndex - 1 + FEATURES.length) % FEATURES.length);
                  }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 p-1.5 rounded-full border border-white/5 bg-slate-950/80 text-slate-500 hover:text-emerald-400 hover:border-emerald-500/25 transition-all cursor-pointer z-30"
                  aria-label="Previous feature"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>

                {/* Spinner Cylinder Area */}
                <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                  {FEATURES.map((feat, index) => {
                    const d = getDistance(index);
                    const isActive = index === activeIndex;
                    
                    // Height steps of 66px, curve rotated, depth translation
                    const translateY = d * 82; 
                    const rotateX = -d * 18; 
                    const translateZ = -Math.abs(d) * 45; 
                    const scale = isActive ? 1.05 : 1 - Math.abs(d) * 0.1;
                    const opacity = Math.max(0.12, 1 - Math.abs(d) * 0.35);
                    const zIndex = 20 - Math.abs(d);

                    return (
                      <motion.div
                        key={feat.id}
                        onClick={() => {
                          handleUserInteraction();
                          setActiveIndex(index);
                        }}
                        initial={false}
                        animate={{
                          y: translateY,
                          rotateX: rotateX,
                          z: translateZ,
                          scale: scale,
                          opacity: opacity,
                          zIndex: zIndex,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 140,
                          damping: 18,
                          mass: 0.8,
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          position: "absolute",
                          top: "calc(50% - 46px)",
                          left: 0,
                          right: 0,
                        }}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                          isActive
                            ? "bg-slate-900/95 border-emerald-500/25 shadow-lg shadow-emerald-500/10 text-white z-20"
                            : "bg-slate-950/10 border-white/[0.01] hover:bg-slate-900/5 text-slate-450 hover:text-slate-200 z-10"
                        }`}
                        id={`pill-desktop-${feat.id}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isActive ? "bg-emerald-450 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-slate-600"
                          }`} />
                          <span className="text-[12.5px] font-bold font-display tracking-tight transition-colors duration-300">
                            {feat.title}
                          </span>
                        </div>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.25 }}
                            className="mt-1.5 text-[11px] text-slate-400 leading-normal pl-4.5 font-sans"
                          >
                            {feat.description}
                          </motion.p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <button
                  onClick={() => {
                    handleUserInteraction();
                    setActiveIndex((activeIndex + 1) % FEATURES.length);
                  }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 p-1.5 rounded-full border border-white/5 bg-slate-950/80 text-slate-500 hover:text-emerald-400 hover:border-emerald-500/25 transition-all cursor-pointer z-30"
                  aria-label="Next feature"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mobile layout: Horizontal scroll horizontal strip + details panel */}
              <div className="flex md:hidden flex-col gap-4 w-full">
                <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1 w-full justify-start">
                  {FEATURES.map((feat, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={feat.id}
                        onClick={() => {
                          handleUserInteraction();
                          setActiveIndex(index);
                        }}
                        className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap border shrink-0 transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-emerald-500/10 border-emerald-500/35 text-emerald-300"
                            : "bg-slate-900/60 border-white/5 text-slate-400"
                        }`}
                        id={`pill-mobile-${feat.id}`}
                      >
                        {feat.title}
                      </button>
                    );
                  })}
                </div>
                
                <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl text-left">
                  <h3 className="font-display font-bold text-xs text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {FEATURES[activeIndex].title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    {FEATURES[activeIndex].description}
                  </p>
                </div>
              </div>

            </div>

            {/* iPhone Device frame rendering */}
            <div className="w-full md:w-7/12 flex justify-center flex-shrink-0">
              <IosCockpitMockup 
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                autoTourActive={autoTourActive}
                setAutoTourActive={setAutoTourActive}
                handleUserInteraction={handleUserInteraction}
              />
            </div>

          </div>
        </div>

        {/* Scroll downstream anchor tag */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 pointer-events-none animate-bounce">
          <span className="text-[9px] font-mono tracking-widest text-slate-500">SCROLL</span>
          <ArrowDown className="w-3.5 h-3.5 text-emerald-550" />
        </div>
      </header>

      {/* 4. Launch Countdown Block Tracker */}
      <section className="bg-slate-950/80 border-t border-b border-white/5 py-16 relative z-10 font-sans">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <CountdownTimer />
        </div>
      </section>

      {/* 5. Bento Capabilities Section */}
      <FeatureGrid />

      {/* 6. Reservation Portal Section */}
      <section id="waitlist" style={{ scrollMarginTop: "80px" }} className="py-24 relative z-10 px-6 max-w-4xl mx-auto font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <WaitlistPortal />
        </motion.div>
      </section>

      {/* 7. Community Share Optimization */}
      <SocialHub />

      {/* 8. Humble and Professional Footer */}
      <footer className="bg-slate-950 py-12 relative z-10 border-t border-white/5 font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <Lock className="w-4.5 h-4.5 text-emerald-400" />
            <span className="text-base font-display font-bold text-white tracking-tight">Aerarium</span>
          </div>

          <p className="text-xs text-slate-500 font-mono text-center md:text-right leading-relaxed">
            © 2026 Aerarium. High-end tools for rules-based personal investing and public-market research. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
