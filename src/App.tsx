/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WaitlistPortal from "./components/WaitlistPortal";
import MobileSnapBeat from "./components/MobileSnapBeat";
import FounderExposureBridge from "./components/FounderExposureBridge";
import SecuritySection from "./components/SecuritySection";
import HeroQuestionsScene from "./components/HeroQuestionsScene";
import HiddenExposureReveal from "./components/HiddenExposureReveal";
import PolicyScoreSection from "./components/PolicyScoreSection";
import GoalsSection from "./components/GoalsSection";
import TradeCheckerSection from "./components/TradeCheckerSection";
import ThesisSection from "./components/ThesisSection";
import CtaBridge from "./components/CtaBridge";
import ResearchQuestions from "./components/ResearchQuestions";
import ResearchScreens from "./components/ResearchScreens";
import ResearchCloseCta from "./components/ResearchCloseCta";
import { motion } from "motion/react";
import { Lock, Instagram } from "lucide-react";
import { trackOutboundClick } from "./lib/analytics";

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

      {/* 3. Hero → Questions scroll scene — foreground hero dissolves as the
             background questions resolve into focus (desktop). Mobile + reduced
             motion get a clean stacked hero → questions. */}
      <HeroQuestionsScene />

      {/* 3b. The Answer — hidden-exposure reveal (answers "how concentrated am I?") */}
      <HiddenExposureReveal />

      {/* 3c. Policy Score — one number for discipline (answers "am I on plan?") */}
      <PolicyScoreSection />

      {/* 3d. Goals — funding + drift (answers "am I drifting from my goals?") */}
      <GoalsSection />

      {/* 3e. Trade Checker — pre-trade compliance (answers "will this trade break my rules?") */}
      <TradeCheckerSection />

      {/* 3f. Thesis log — capture your reasoning (answers "why did I buy this again?") */}
      <ThesisSection />

      {/* 3g. CTA bridge — caps the app screens, free TestFlight, before the web pivot */}
      <CtaBridge />

      {/* 3h. Research intro — the pivot to the web product (questions about companies) */}
      <ResearchQuestions />

      {/* 3i. Research web screens — 5 browser-frame beats showing the web product */}
      <ResearchScreens />

      {/* 3j. Research closing CTA — source-first positioning + Open Research */}
      <ResearchCloseCta />

      {/* 5. Security — verifiable trust beat (restyled, was inside FeatureGrid) */}
      <SecuritySection />

      {/* 6. Founder story */}
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
              <a href="/privacy.html" className="hover:text-emerald-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">Privacy</a>
              <a href="/terms.html" className="hover:text-emerald-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">Terms</a>
              <a href="/support.html" className="hover:text-emerald-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">Support</a>
              <a href="/methodology" className="hover:text-emerald-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">Methodology</a>
              <a href="/portfolio-x-ray" className="hover:text-emerald-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">Portfolio X-Ray</a>
              <a href="/security" className="hover:text-emerald-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">Security</a>
              <a href="#waitlist" className="hover:text-emerald-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">Launch updates</a>
              <a href="https://testflight.apple.com/join/Xna39VKU" target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundClick("testflight", "footer")} className="hover:text-emerald-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">TestFlight</a>
              <a href="https://research.aerarium.app/" target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundClick("research", "footer")} className="hover:text-emerald-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Research</a>
              <a href="https://www.instagram.com/aerarium.app/" target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundClick("instagram", "footer")} className="inline-flex items-center gap-1.5 hover:text-emerald-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">
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
