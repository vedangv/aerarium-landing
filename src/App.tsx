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
import AppSurfaceStrip from "./components/AppSurfaceStrip";
import InvestorQuestions from "./components/InvestorQuestions";
import { motion } from "motion/react";
import { ArrowDown, Lock, Instagram } from "lucide-react";

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
      
      {/* 1. Global ambient backdrops */}
      <div
        className="absolute top-[6%] right-[2%] w-[560px] h-[560px] bg-emerald-500/[0.06] rounded-full blur-[120px] pointer-events-none animate-glow-slow-1"
        style={{ transform: `translateY(${scrollY * 0.18}px)` }}
      />
      <div
        className="absolute top-[46%] left-[2%] w-[420px] h-[420px] bg-amber-200/[0.035] rounded-full blur-[120px] pointer-events-none animate-glow-slow-2"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      />
      <div
        className="absolute bottom-[14%] right-[12%] w-[480px] h-[480px] bg-emerald-400/[0.035] rounded-full blur-[120px] pointer-events-none animate-glow-slow-3"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      />

      {/* 2. Navigation */}
      <Navbar />

      {/* 3. Hero Section — calm, centered, text-only (Luffu/Poly air) */}
      <header id="hero" className="scroll-stop-section relative min-h-[100svh] flex items-center justify-center pt-28 pb-24 z-10">
        <MobileSnapBeat />
        {/* Warm ambient light so the dark hero reads as lit, not an empty void.
            Soft single glow above the headline; kept subtle so text stays crisp. */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(50%_42%_at_50%_34%,rgba(16,185,129,0.10)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(38%_34%_at_64%_72%,rgba(245,200,130,0.045)_0%,transparent_72%)]" />
        <motion.div
          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-9 px-6 text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h1 className="font-editorial text-[56px] leading-[1.0] tracking-tight text-white min-[380px]:text-[64px] sm:text-[88px] lg:text-[104px]">
            <span className="block">Invest with intention,</span>
            <span className="block text-emerald-200">not impulse.</span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            You can’t follow a plan you can’t see. Aerarium helps you understand what you
            really own, build your investment plan, and stay disciplined for the long term.
          </p>

          <div className="flex flex-col items-center gap-3 pt-2">
            <a
              href="https://testflight.apple.com/join/Xna39VKU"
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-9 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-semibold rounded-2xl text-base transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 cursor-pointer text-center"
              id="btn-hero-join-waitlist"
            >
              Get Early Access
            </a>
            <span className="text-sm text-slate-500">Free on iOS · via TestFlight</span>
          </div>

          <p className="text-sm text-slate-500">
            For long-term investors — whether you’re just starting or already run a playbook.
            <span className="mx-2 text-slate-700">·</span>
            Read-only. No trading. Not financial advice.
          </p>
        </motion.div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 pointer-events-none animate-bounce">
          <span className="text-[9px] font-mono tracking-widest text-slate-500">SCROLL</span>
          <ArrowDown className="w-3.5 h-3.5 text-emerald-550" />
        </div>
      </header>

      {/* 4. Empathy — the questions every investor carries */}
      <InvestorQuestions />

      {/* 4. Launch Status */}
      <section className="bg-slate-950 py-14 relative z-10 font-sans">
        <MobileSnapBeat />
        <motion.div
          className="max-w-7xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <CountdownTimer />
        </motion.div>
      </section>

      {/* 5. Product surfaces */}
      <AppSurfaceStrip />

      {/* 6. Product proof */}
      <FeatureGrid />

      {/* 7. Founder story + product philosophy */}
      <FounderExposureBridge />

      {/* 8. Reservation Portal Section */}
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

      {/* 9. Humble and Professional Footer */}
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
