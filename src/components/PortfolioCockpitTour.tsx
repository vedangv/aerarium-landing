import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import IosCockpitMockup from "./IosCockpitMockup";

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
  const desktopBeatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileChapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeFeature = FEATURES[activeIndex] ?? FEATURES[0];

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

    const nodes = [...desktopBeatRefs.current, ...mobileChapterRefs.current];
    nodes.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToChapter = (index: number) => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const target = isDesktop ? desktopBeatRefs.current[index] : mobileChapterRefs.current[index];
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="relative">
      <div className="hidden lg:block">
        <div className="sticky top-24 z-10 rounded-[36px] border border-emerald-400/16 bg-gradient-to-br from-slate-900/65 via-slate-950/80 to-emerald-950/20 p-8 shadow-[0_36px_100px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 rounded-[36px] bg-cyber-grid opacity-15 pointer-events-none" />
          <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-emerald-300/[0.08] blur-3xl" />

          <div className="relative z-10 grid min-h-[calc(100svh-9rem)] items-center gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(380px,1.12fr)]">
            <div className="space-y-7">
              <div className="space-y-3">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300/80">
                  Scroll-guided iOS tour
                </div>
                <h3 className="font-display text-4xl font-bold tracking-tight text-white">
                  The cockpit changes as you move through the system.
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-slate-350">
                  Scroll to advance the screen. The tour stays pinned until the final iOS view has appeared.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {FEATURES.map((feature, index) => (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => scrollToChapter(index)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      index === activeIndex
                        ? "border-emerald-400/35 bg-emerald-400/10 text-white shadow-[0_18px_55px_rgba(16,185,129,0.1)]"
                        : "border-white/[0.06] bg-slate-950/42 text-slate-500 hover:border-emerald-400/18 hover:text-slate-300"
                    }`}
                  >
                    <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300/70">
                      {feature.label}
                    </div>
                    <div className="mt-1 font-display text-sm font-bold">{feature.title}</div>
                  </button>
                ))}
              </div>

              <div className="rounded-3xl border border-emerald-400/22 bg-slate-950/55 p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300/75">
                          {activeFeature.label}
                        </div>
                        <h4 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
                          {activeFeature.title}
                        </h4>
                      </div>
                      <span className="font-mono text-sm text-slate-500">
                        {String(activeIndex + 1).padStart(2, "0")} / {FEATURES.length}
                      </span>
                    </div>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-350">
                      {activeFeature.description}
                    </p>
                    <div className="mt-5 h-1 rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-emerald-300/75 transition-all duration-500"
                        style={{ width: `${((activeIndex + 1) / FEATURES.length) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
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
        </div>

        <div className="pointer-events-none" aria-hidden="true">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              ref={(node) => {
                desktopBeatRefs.current[index] = node;
              }}
              data-tour-index={index}
              className="h-[58svh]"
            />
          ))}
          <div className="h-[46svh]" />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="sticky top-24 z-10 rounded-[32px] border border-emerald-400/16 bg-gradient-to-br from-slate-900/75 via-slate-950/90 to-emerald-950/20 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 rounded-[32px] bg-cyber-grid opacity-15 pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-300/75">
                    {activeFeature.label}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-white">
                    {activeFeature.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-350">
                    {activeFeature.description}
                  </p>
                </motion.div>
              </AnimatePresence>
              <span className="shrink-0 font-mono text-[11px] text-slate-500">
                {String(activeIndex + 1).padStart(2, "0")} / {FEATURES.length}
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {FEATURES.map((feature, index) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => scrollToChapter(index)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-bold transition ${
                    index === activeIndex
                      ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-200"
                      : "border-white/6 bg-slate-900/55 text-slate-400"
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>

            <div className="mx-auto flex h-[54svh] min-h-[430px] max-h-[560px] max-w-[360px] items-start justify-center overflow-hidden">
              <div className="origin-top scale-[0.68] min-[390px]:scale-[0.74]">
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
        </div>

        <div className="pointer-events-none" aria-hidden="true">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              ref={(node) => {
                mobileChapterRefs.current[index] = node;
              }}
              data-tour-index={index}
              className="h-[64svh]"
            />
          ))}
          <div className="h-[54svh]" />
        </div>
      </div>
    </div>
  );
}
