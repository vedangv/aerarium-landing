import React, { useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logoSrc from "../assets/logo.png";
import { trackOutboundClick } from "../lib/analytics";

const NAV_LINKS = [
  { label: "Portfolio", id: "answer" },
  { label: "Research", id: "research-questions" },
  { label: "Security", id: "security" },
  { label: "Founder story", id: "founder-story" },
  { label: "Launch updates", id: "waitlist" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // The hero copy (with its own CTAs) dissolves within the first ~0.6 of a
      // viewport of scroll. Hold the nav CTAs back until then, so the two
      // buttons aren't duplicated on the hero — they roll up into the bar after.
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      <div className="relative z-50 max-w-7xl mx-auto px-6 flex items-center justify-between">
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

        {/* Desktop section links — absolutely centered on the page, independent
            of the brand (left) and CTA (right) widths. */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToSection(l.id)}
              className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop CTAs — solid cyan Research + solid emerald app. Hidden on the
            hero (where the hero card already shows them), then they roll up into
            the bar as the visitor scrolls past it. */}
        <motion.div
          className="hidden lg:flex items-center gap-2.5"
          animate={{ opacity: pastHero ? 1 : 0, y: pastHero ? 0 : 12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: pastHero ? "auto" : "none" }}
          aria-hidden={!pastHero}
        >
          <a
            href={RESEARCH}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick("research", "navbar_desktop")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            id="btn-nav-open-research"
          >
            Open Research
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={TESTFLIGHT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick("testflight", "navbar_desktop")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-all duration-300 hover:bg-emerald-450 hover:shadow-lg hover:shadow-emerald-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            id="btn-nav-join-cta"
          >
            Join iOS Beta
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-slate-300 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          id="btn-nav-mobile-toggle"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-menu"
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
        <div id="mobile-navigation-menu" className="lg:hidden fixed top-0 left-0 w-full h-[100dvh] bg-slate-950 z-40 flex flex-col px-8 pt-24 pb-10 space-y-5 animate-fadeIn overflow-y-auto">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToSection(l.id)}
              className="text-lg text-left text-slate-300 hover:text-white font-display py-2 border-b border-white/5 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              {l.label}
            </button>
          ))}
          <a
            href={RESEARCH}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick("research", "navbar_mobile")}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-cyan-400/35 bg-cyan-400/[0.08] py-4 text-sm font-semibold text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            <span>Open Research</span>
            <ArrowUpRight className="h-4.5 w-4.5" />
          </a>
          <a
            href={TESTFLIGHT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick("testflight", "navbar_mobile")}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 text-sm font-semibold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          >
            <span>Join iOS Beta</span>
            <ArrowUpRight className="h-4.5 w-4.5" />
          </a>
        </div>
      )}
    </nav>
  );
}
