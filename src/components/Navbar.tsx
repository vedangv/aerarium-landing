import React, { useEffect, useState } from "react";
import { ArrowUpRight, Lock, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        {/* Brand Logo */}
        <div 
          onClick={() => scrollToSection("hero")} 
          className="flex items-center space-x-3 cursor-pointer group"
          id="btn-nav-logo"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Lock className="w-4.5 h-4.5 text-emerald-400 group-hover:text-cyan-400 transition-colors" />
            </div>
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
            Aerarium
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
            id="btn-nav-portfolio"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("research")}
            className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
            id="btn-nav-research"
          >
            Research
          </button>
          <button
            onClick={() => scrollToSection("security")}
            className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
            id="btn-nav-security"
          >
            Security
          </button>
          <a
            href="https://testflight.apple.com/join/Xna39VKU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
            id="btn-nav-legacy-testflight"
          >
            Early Access
          </a>
          <a
            href="https://finsight-beryl.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
            id="btn-nav-legacy-finsight"
          >
            Open Research
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="https://testflight.apple.com/join/Xna39VKU"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-[1px] hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer inline-block"
            id="btn-nav-join-cta"
          >
            <span className="relative block px-5 py-2.5 bg-slate-950 rounded-[11px] text-xs font-semibold text-white group-hover:bg-slate-950/40 transition-colors flex items-center space-x-1.5">
              <span>Join iOS Beta</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white transition-colors focus:outline-none"
          id="btn-nav-mobile-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 right-0 bottom-0 bg-slate-950/98 backdrop-blur-lg z-40 border-t border-white/5 flex flex-col p-8 space-y-6 animate-fadeIn">
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-lg text-left text-slate-300 hover:text-white font-display py-2 border-b border-white/5 cursor-pointer"
            id="btn-mobile-nav-portfolio"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("research")}
            className="text-lg text-left text-slate-300 hover:text-white font-display py-2 border-b border-white/5 cursor-pointer"
            id="btn-mobile-nav-research"
          >
            Research
          </button>
          <button
            onClick={() => scrollToSection("security")}
            className="text-lg text-left text-slate-300 hover:text-white font-display py-2 border-b border-white/5 cursor-pointer"
            id="btn-mobile-nav-security"
          >
            Security
          </button>
          <a
            href="https://testflight.apple.com/join/Xna39VKU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-left text-slate-300 hover:text-white font-display py-2 border-b border-white/5 cursor-pointer"
            id="btn-mobile-nav-testflight"
          >
            Early Access
          </a>
          <a
            href="https://finsight-beryl.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-left text-slate-300 hover:text-white font-display py-2 border-b border-white/5 cursor-pointer"
            id="btn-mobile-nav-finsight"
          >
            Open Research
          </a>

          <a
            href="https://testflight.apple.com/join/Xna39VKU"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-4 flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-white text-sm"
            id="btn-mobile-nav-join-cta"
          >
            <span>Join iOS Beta</span>
            <ArrowUpRight className="w-4.5 h-4.5" />
          </a>
        </div>
      )}
    </nav>
  );
}
