import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logoSrc from "../../assets/brand/apple-touch-icon.png";
import { trackOutboundClick } from "../lib/analytics";
import { appStoreLink, researchLink } from "../lib/product-links.mjs";

const NAV_LINKS = [
  { label: "Portfolio", id: "answer" },
  { label: "Research", href: researchLink("navbar") },
  { label: "Security", id: "security" },
  { label: "Founder story", id: "founder-story" },
  { label: "Launch updates", id: "waitlist" },
];

function revealSection(section: HTMLElement, behavior: ScrollBehavior) {
  const track = section.querySelector<HTMLElement>("[data-scroll-scene]");
  if (track && section.id !== "hero") {
    // A desktop scene starts before its content is revealed. Both clicks and
    // direct fragment URLs should land where the whole section is readable.
    window.scrollTo({
      top: track.getBoundingClientRect().top + window.scrollY + (track.offsetHeight - window.innerHeight) * 0.85,
      behavior,
    });
  } else {
    section.scrollIntoView({ behavior, block: "start" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let frame = 0;
    const revealFragment = () => {
      cancelAnimationFrame(frame);
      // Wait for React's layout and the browser's native fragment scroll.
      frame = requestAnimationFrame(() => {
        let id: string;
        try { id = decodeURIComponent(window.location.hash.slice(1)); }
        catch { return; }
        const section = document.getElementById(id);
        if (section?.matches("section[id]")) revealSection(section, "instant");
      });
    };
    revealFragment();
    window.addEventListener("load", revealFragment);
    window.addEventListener("hashchange", revealFragment);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", revealFragment);
      window.removeEventListener("hashchange", revealFragment);
    };
  }, []);

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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const menu = menuRef.current;
    menu?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      menu?.close();
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const section = document.getElementById(id);
    if (!section) return;
    event.preventDefault();
    menuRef.current?.close();
    setMobileMenuOpen(false);
    window.history.pushState(null, "", `#${id}`);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    revealSection(section, reduced ? "instant" : "smooth");
    section.tabIndex = -1;
    section.focus({ preventScroll: true });
  };

  const keepMenuFocus = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href], button"));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <nav
      id="aerarium-navbar"
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md py-4 border-b border-white/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="relative z-50 max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          aria-label="Aerarium home"
          onClick={(event) => scrollToSection(event, "hero")}
          className="flex items-center space-x-3 cursor-pointer group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          id="btn-nav-logo"
        >
          <div className="h-9 w-9 rounded-xl overflow-hidden shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <img src={logoSrc} alt="" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
            Aerarium
          </span>
        </a>

        {/* Desktop section links — absolutely centered on the page, independent
            of the brand (left) and CTA (right) widths. */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id ?? l.href}
              href={l.href ?? `#${l.id}`}
              target={l.href ? "_blank" : undefined}
              rel={l.href ? "noopener" : undefined}
              onClick={(event) => l.id ? scrollToSection(event, l.id) : trackOutboundClick("research", "navbar_desktop")}
              className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              {l.label}
              {l.href && <ArrowUpRight aria-hidden="true" className="ml-1 inline h-3.5 w-3.5" />}
            </a>
          ))}
        </div>

        {/* The app is the primary action; Research is a secondary text link. */}
        <motion.div
          className="hidden lg:flex items-center gap-2.5"
          animate={{ opacity: pastHero ? 1 : 0, y: pastHero ? 0 : 12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: pastHero ? "auto" : "none" }}
          aria-hidden={!pastHero}
          inert={!pastHero}
        >
          <a
            href={appStoreLink("navbar_desktop")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick("appstore", "navbar_desktop")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-all duration-300 hover:bg-emerald-450 hover:shadow-lg hover:shadow-emerald-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            id="btn-nav-join-cta"
          >
            Get the App
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center text-slate-300 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          id="btn-nav-mobile-toggle"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Scroll progress bar (the two-product journey) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Mobile drawer */}
        <dialog ref={menuRef} onKeyDown={keepMenuFocus} onClose={() => setMobileMenuOpen(false)} aria-label="Navigation" id="mobile-navigation-menu" className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none bg-slate-950 text-slate-100 px-8 py-6 space-y-5 overflow-y-auto open:flex open:flex-col">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-bold">Aerarium</span>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation menu" className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"><X className="h-6 w-6" /></button>
          </div>
          {NAV_LINKS.map((l) => (
            <a
              key={l.id ?? l.href}
              href={l.href ?? `#${l.id}`}
              target={l.href ? "_blank" : undefined}
              rel={l.href ? "noopener" : undefined}
              onClick={(event) => l.id ? scrollToSection(event, l.id) : trackOutboundClick("research", "navbar_mobile")}
              className="text-lg text-left text-slate-300 hover:text-white font-display py-2 border-b border-white/5 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              {l.label}
              {l.href && <ArrowUpRight aria-hidden="true" className="ml-1 inline h-4 w-4" />}
            </a>
          ))}
          <a
            href={appStoreLink("navbar_mobile")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick("appstore", "navbar_mobile")}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 text-sm font-semibold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          >
            <span>Get the App</span>
            <ArrowUpRight className="h-4.5 w-4.5" />
          </a>
        </dialog>
    </nav>
  );
}
