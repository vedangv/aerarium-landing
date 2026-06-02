import React, { useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logoSrc from "../assets/logo.png";

const NAV_LINKS = [
  { label: "Portfolio", id: "answer" },
  { label: "Research", id: "research-questions" },
  { label: "Security", id: "security" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const TESTFLIGHT = "https://testflight.apple.com/join/Xna39VKU";
  const RESEARCH = "https://research.aerarium.app/";

  return (
    <nav
      id="aerarium-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md py-4 border-b border-white/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => scrollToSection("hero")}
          className="flex items-center space-x-3 cursor-pointer group"
          id="btn-nav-logo"
        >
          <div className="h-9 w-9 rounded-xl overflow-hidden shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <img src={logoSrc} alt="Aerarium Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
            Aerarium
          </span>
        </div>

        {/* Desktop section links */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToSection(l.id)}
              className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop CTAs — cyan Research + emerald app */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={RESEARCH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/35 bg-cyan-400/[0.08] px-4 py-2 text-xs font-semibold text-cyan-200 transition-all duration-300 hover:border-cyan-300/55 hover:bg-cyan-400/[0.14] hover:text-cyan-100"
            id="btn-nav-open-research"
          >
            Open Research
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={TESTFLIGHT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-all duration-300 hover:bg-emerald-450 hover:shadow-lg hover:shadow-emerald-500/20"
            id="btn-nav-join-cta"
          >
            Join iOS Beta
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white transition-colors focus:outline-none"
          id="btn-nav-mobile-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Scroll progress bar (the two-product journey) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 right-0 bottom-0 bg-slate-950/98 backdrop-blur-lg z-40 border-t border-white/5 flex flex-col p-8 space-y-6 animate-fadeIn">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToSection(l.id)}
              className="text-lg text-left text-slate-300 hover:text-white font-display py-2 border-b border-white/5 cursor-pointer"
            >
              {l.label}
            </button>
          ))}
          <a
            href={RESEARCH}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-cyan-400/35 bg-cyan-400/[0.08] py-4 text-sm font-semibold text-cyan-200"
          >
            <span>Open Research</span>
            <ArrowUpRight className="h-4.5 w-4.5" />
          </a>
          <a
            href={TESTFLIGHT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 text-sm font-semibold text-slate-950"
          >
            <span>Join iOS Beta</span>
            <ArrowUpRight className="h-4.5 w-4.5" />
          </a>
        </div>
      )}
    </nav>
  );
}
