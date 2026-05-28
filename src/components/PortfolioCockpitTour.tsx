import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  const [autoTourActive, setAutoTourActive] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(0);

  const handleUserInteraction = () => {
    setLastInteraction(Date.now());
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setAutoTourActive(false);
      return;
    }

    if (!autoTourActive) return;

    const interval = setInterval(() => {
      if (Date.now() - lastInteraction < 15000) return;
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [autoTourActive, lastInteraction]);

  const getDistance = (index: number) => {
    const total = FEATURES.length;
    let distance = index - activeIndex;
    while (distance < -total / 2) distance += total;
    while (distance > total / 2) distance -= total;
    return distance;
  };

  return (
    <motion.div
      className="relative overflow-clip rounded-[36px] border border-emerald-400/16 bg-gradient-to-br from-slate-900/65 via-slate-950/80 to-emerald-950/20 p-5 shadow-[0_36px_100px_rgba(0,0,0,0.3)] md:p-8"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.24 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />
      <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-emerald-300/[0.08] blur-3xl" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300/80">
              Guided iOS tour
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl">
              The cockpit changes as the rule changes.
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-slate-350 md:text-base">
              Tap a chapter or let the tour run. Each screen is a different part of the same loop: rules, holdings, hidden exposure, score drivers, goals, thesis notes, and privacy controls.
            </p>
          </div>

          <div className="hidden md:flex relative h-[450px] flex-col items-center justify-center select-none" style={{ perspective: "1000px" }}>
            <div className="absolute left-0 right-0 h-32 rounded-3xl border-y border-emerald-400/18 bg-slate-950/55 backdrop-blur-sm pointer-events-none" />

            <button
              onClick={() => {
                handleUserInteraction();
                setActiveIndex((activeIndex - 1 + FEATURES.length) % FEATURES.length);
              }}
              className="absolute top-0 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/5 bg-slate-950/80 p-2 text-slate-500 transition hover:border-emerald-400/25 hover:text-emerald-300"
              aria-label="Previous feature"
            >
              <ChevronUp className="h-4 w-4" />
            </button>

            <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
              {FEATURES.map((feature, index) => {
                const distance = getDistance(index);
                const isActive = index === activeIndex;

                return (
                  <motion.button
                    key={feature.id}
                    type="button"
                    onClick={() => {
                      handleUserInteraction();
                      setActiveIndex(index);
                    }}
                    initial={false}
                    animate={{
                      y: distance * 88,
                      rotateX: -distance * 16,
                      z: -Math.abs(distance) * 42,
                      scale: isActive ? 1.04 : 1 - Math.abs(distance) * 0.075,
                      opacity: Math.max(0.24, 1 - Math.abs(distance) * 0.24),
                    }}
                    transition={{ type: "spring", stiffness: 140, damping: 19, mass: 0.8 }}
                    className={`absolute left-0 right-0 top-[calc(50%_-_50px)] rounded-2xl border p-4 text-left transition-colors ${
                      isActive
                        ? "border-emerald-400/35 bg-slate-900/95 text-white shadow-[0_24px_70px_rgba(16,185,129,0.12)]"
                        : "border-white/[0.05] bg-slate-950/38 text-slate-500 hover:border-emerald-400/15 hover:text-slate-300"
                    }`}
                    style={{ zIndex: 50 - Math.abs(distance) }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-display text-base font-bold">{feature.title}</div>
                        <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300/75">
                          {feature.label}
                        </div>
                      </div>
                      <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-xs leading-relaxed text-slate-400"
                      >
                        {feature.description}
                      </motion.p>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <button
              onClick={() => {
                handleUserInteraction();
                setActiveIndex((activeIndex + 1) % FEATURES.length);
              }}
              className="absolute bottom-0 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/5 bg-slate-950/80 p-2 text-slate-500 transition hover:border-emerald-400/25 hover:text-emerald-300"
              aria-label="Next feature"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="md:hidden space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {FEATURES.map((feature, index) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => {
                    handleUserInteraction();
                    setActiveIndex(index);
                  }}
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
            <div className="rounded-2xl border border-emerald-400/12 bg-slate-950/55 p-4">
              <div className="font-display text-base font-bold text-white">{FEATURES[activeIndex].title}</div>
              <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300/75">
                {FEATURES[activeIndex].label}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{FEATURES[activeIndex].description}</p>
            </div>
          </div>
        </div>

        <MobileSnapBeat className="md:hidden" />
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-8 rounded-[64px] bg-emerald-400/[0.06] blur-2xl" />
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
    </motion.div>
  );
}
