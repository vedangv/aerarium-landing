/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CountdownTimer from "./components/CountdownTimer";
import WaitlistPortal from "./components/WaitlistPortal";
import FeatureGrid from "./components/FeatureGrid";
import MobileSnapBeat from "./components/MobileSnapBeat";
import FounderExposureBridge from "./components/FounderExposureBridge";
import HeroSignalScene from "./components/HeroSignalScene";
import { motion } from "motion/react";
import { Sparkles, ArrowDown, ChevronRight, Lock, CheckCircle2, Instagram } from "lucide-react";

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 1. Global Ambient Parallax Backdrops */}
      <div
        className="absolute top-[10%] left-[5%] w-[320px] h-[320px] bg-emerald-500/[0.07] rounded-full blur-3xl pointer-events-none animate-glow-slow-1"
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      />
      <div
        className="absolute top-[42%] right-[3%] w-[360px] h-[360px] bg-cyan-500/[0.055] rounded-full blur-3xl pointer-events-none animate-glow-slow-2"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />
      <div
        className="absolute bottom-[20%] left-[10%] w-[460px] h-[460px] bg-amber-200/[0.035] rounded-full blur-3xl pointer-events-none animate-glow-slow-3"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />

      {/* Grid Scanline Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none z-0" />

      {/* 2. Navigation */}
      <Navbar />

      {/* 3. Hero Section (Visual Fintech Asset Redesign) */}
      <header id="hero" className="scroll-stop-section relative min-h-[100svh] flex items-center pt-28 pb-16 z-10">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <MobileSnapBeat className="lg:col-span-12" />
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 space-y-8 text-left flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-450/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold tracking-wider w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AERARIUM PORTFOLIO & RESEARCH</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[45px] xl:text-[52px] text-white tracking-tight leading-[1.12]">
                Stop running your portfolio from memory and spreadsheets.
              </h1>
              <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl font-normal leading-relaxed">
                Aerarium turns your investment policy, brokerage accounts, fund exposure, goals, and thesis notes into a private cockpit that keeps your rules visible and your true exposure tracked.
              </p>
            </div>

            {/* Premium proof chips */}
            <div className="flex flex-wrap gap-2.5 py-1">
              {["Read-only sync", "No trades placed", "ETF look-through", "Policy Score", "Free during beta"].map((proof) => (
                <div
                  key={proof}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-400/[0.07] px-3 py-2 text-[11px] font-semibold text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                  <span>{proof}</span>
                </div>
              ))}
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
                href="https://research.aerarium.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-8 rounded-xl bg-slate-900 hover:bg-slate-850 text-sm font-semibold text-white border border-white/5 hover:border-slate-500/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
                id="btn-hero-learn-more"
              >
                <span>Open Research</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </a>
            </div>

            <div className="rounded-2xl border border-white/6 bg-slate-900/35 p-4 text-sm leading-relaxed text-slate-350">
              <span className="font-semibold text-white">Built for investors who</span>{" "}
              write theses before buying, track allocation against a plan, and want one answer when exposure is scattered across accounts and funds.
            </div>

          </div>

          <div className="lg:col-span-7 w-full">
            <HeroSignalScene />
          </div>
        </div>

        {/* Scroll downstream anchor tag */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 pointer-events-none animate-bounce">
          <span className="text-[9px] font-mono tracking-widest text-slate-500">SCROLL</span>
          <ArrowDown className="w-3.5 h-3.5 text-emerald-550" />
        </div>
      </header>

      {/* 4. Founder story + flagship X-Ray proof */}
      <FounderExposureBridge />

      {/* 5. Launch Countdown Block Tracker */}
      <section className="bg-slate-950/80 border-t border-b border-white/5 py-8 relative z-10 font-sans">
        <MobileSnapBeat />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <CountdownTimer />
        </div>
      </section>

      {/* 6. Bento Capabilities Section */}
      <FeatureGrid />

      {/* 7. Reservation Portal Section */}
      <section id="waitlist" style={{ scrollMarginTop: "80px" }} className="scroll-stop-section py-24 relative z-10 px-6 max-w-4xl mx-auto font-sans">
        <MobileSnapBeat />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <WaitlistPortal />
        </motion.div>
      </section>

      {/* 8. Humble and Professional Footer */}
      <footer className="footer-snap bg-slate-950 py-12 relative z-10 border-t border-white/5 font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <Lock className="w-4.5 h-4.5 text-emerald-400" />
            <span className="text-base font-display font-bold text-white tracking-tight">Aerarium</span>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400">
              <a href="/privacy.html" className="hover:text-emerald-300 transition-colors">Privacy</a>
              <a href="/terms.html" className="hover:text-emerald-300 transition-colors">Terms</a>
              <a href="#security" className="hover:text-emerald-300 transition-colors">Security</a>
              <a href="#waitlist" className="hover:text-emerald-300 transition-colors">Founder list</a>
              <a href="https://testflight.apple.com/join/Xna39VKU" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">TestFlight</a>
              <a href="https://research.aerarium.app/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">Research</a>
              <a href="https://www.instagram.com/aerarium.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                <Instagram className="h-3.5 w-3.5" />
                <span>Instagram</span>
              </a>
            </div>
            <p className="text-xs text-slate-500 font-mono text-center md:text-right leading-relaxed">
              © 2026 Aerarium. High-end tools for rules-based personal investing and public-market research. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
