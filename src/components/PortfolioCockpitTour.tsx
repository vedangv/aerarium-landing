import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import IosCockpitMockup from "./IosCockpitMockup";
import MobileSnapBeat from "./MobileSnapBeat";

const FEATURES = [
  {
    id: "overview",
    label: "Overview Dashboard",
    title: "Understand Your Portfolio Fast",
    description: "Net worth, spend, invest, holdings, and account health stay visible without turning into spreadsheet upkeep.",
  },
  {
    id: "ips-cockpit",
    label: "IPS Cockpit",
    title: "Stop Drifting From Your Plan",
    description: "Turn a written investment policy into live guardrails, review versions, and surface what needs attention.",
  },
  {
    id: "policy-score",
    label: "Policy Score",
    title: "Know Portfolio Health at a Glance",
    description: "Allocation drift, concentration risk, liquidity, goals, and review cadence collapse into one transparent score.",
  },
  {
    id: "portfolio-xray",
    label: "Portfolio X-Ray",
    title: "See Through Your ETFs",
    description: "Look through fund holdings to reveal true stock, sector, asset-class, and currency exposure.",
  },
  {
    id: "goals-funding",
    label: "Goals + Funding Plan",
    title: "Assign Assets to Goals",
    description: "Centralize funding decisions so goal sleeves are easy to adjust without hiding global tradeoffs.",
  },
  {
    id: "thesis-checkins",
    label: "Thesis Check-ins",
    title: "Never Forget Why You Bought",
    description: "Keep investing decisions tied to a written thesis instead of letting impulse trades rewrite the plan.",
  },
  {
    id: "private-design",
    label: "Private by Design",
    title: "Keep Private Data Private",
    description: "Read-only brokerage sync, encrypted financial fields, recovery planning, and user-controlled data.",
  },
];

export default function PortfolioCockpitTour() {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const strongest = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const nextIndex = strongest?.target.getAttribute("data-tour-index");
        if (nextIndex != null) {
          setActiveIndex(Number(nextIndex));
        }
      },
      {
        root: null,
        rootMargin: "-32% 0px -42% 0px",
        threshold: [0.18, 0.36, 0.54, 0.72],
      },
    );

    chapterRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToChapter = (index: number) => {
    chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <motion.div
      className="relative rounded-[36px] border border-emerald-400/16 bg-gradient-to-br from-slate-900/65 via-slate-950/80 to-emerald-950/20 p-5 shadow-[0_36px_100px_rgba(0,0,0,0.3)] md:p-8"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.24 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />
      <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-emerald-300/[0.08] blur-3xl" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(380px,1.12fr)] lg:items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300/80">
              Scroll-guided iOS tour
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl">
              The cockpit changes as you move through the system.
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-slate-350 md:text-base">
              Scroll through the chapters. Each card controls the device screen, so the visitor chooses the pace instead of waiting for a timer.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {FEATURES.map((feature, index) => (
              <button
                key={feature.id}
                type="button"
                onClick={() => scrollToChapter(index)}
                className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition ${
                  index === activeIndex
                    ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-200"
                    : "border-white/6 bg-slate-900/55 text-slate-400"
                }`}
              >
                {feature.title}
              </button>
            ))}
          </div>

          <div className="space-y-5 lg:space-y-8">
            {FEATURES.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={feature.id}
                  ref={(node) => {
                    chapterRefs.current[index] = node;
                  }}
                  data-tour-index={index}
                  className={`min-h-[170px] rounded-3xl border p-5 transition-colors duration-300 lg:min-h-[235px] lg:p-6 ${
                    isActive
                      ? "border-emerald-400/35 bg-slate-900/92 text-white shadow-[0_24px_70px_rgba(16,185,129,0.12)]"
                      : "border-white/[0.06] bg-slate-950/42 text-slate-400"
                  }`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300/75">
                        {feature.label}
                      </div>
                      <h4 className="mt-2 font-display text-xl font-bold tracking-tight text-white">
                        {feature.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-350">
                    {feature.description}
                  </p>
                  <div className={`mt-5 h-1 rounded-full transition-colors ${isActive ? "bg-emerald-300/70" : "bg-white/8"}`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        <MobileSnapBeat className="lg:hidden" />
        <div className="flex justify-center lg:sticky lg:top-28 lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-8 rounded-[64px] bg-emerald-400/[0.06] blur-2xl" />
            <IosCockpitMockup
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              autoTourActive={false}
              setAutoTourActive={() => {}}
              handleUserInteraction={() => {}}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
