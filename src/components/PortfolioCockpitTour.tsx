import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import IosCockpitMockup from "./IosCockpitMockup";
import dashboardScreen from "../../assets/product-tour/dashboard.jpg";
import goalsFundingScreen from "../../assets/product-tour/goals-funding.jpg";
import ipsScoreScreen from "../../assets/product-tour/ips-score.jpg";
import ipsScoreSheetScreen from "../../assets/product-tour/ips-score-sheet.jpg";
import profileMainScreen from "../../assets/product-tour/profile-main.jpg";
import tradeCheckerScreen from "../../assets/product-tour/trade-checker.jpg";
import xrayHoldingsScreen from "../assets/ss1.png";

const FEATURES = [
  {
    id: "overview",
    label: "Overview Dashboard",
    title: "Understand Your Portfolio Fast",
    description: "Net worth, spend, invest, holdings, and account health stay visible without turning into spreadsheet upkeep.",
    screenshot: dashboardScreen,
    screenshotAlt: "Aerarium dashboard showing net worth, policy score, portfolio, goals, and cash flow",
  },
  {
    id: "ips-cockpit",
    label: "IPS Cockpit",
    title: "Stop Drifting From Your Plan",
    description: "Turn a written investment policy into live guardrails, review versions, and surface what needs attention.",
    screenshot: ipsScoreScreen,
    screenshotAlt: "Aerarium IPS cockpit showing policy score and allocation check",
  },
  {
    id: "policy-score",
    label: "Policy Score",
    title: "Know Portfolio Health at a Glance",
    description: "Allocation drift, concentration risk, liquidity, goals, and review cadence collapse into one transparent score.",
    screenshot: ipsScoreSheetScreen,
    screenshotAlt: "Aerarium policy score sheet with score drivers and healthy areas",
  },
  {
    id: "portfolio-xray",
    label: "Portfolio X-Ray",
    title: "See Through Your ETFs",
    description: "Look through fund holdings to reveal true stock, sector, asset-class, and currency exposure.",
    screenshot: xrayHoldingsScreen,
    screenshotAlt: "Aerarium Portfolio X-Ray showing direct and fund-derived stock exposure",
  },
  {
    id: "goals-funding",
    label: "Goals + Funding Plan",
    title: "Assign Assets to Goals",
    description: "Centralize funding decisions so goal sleeves are easy to adjust without hiding global tradeoffs.",
    screenshot: goalsFundingScreen,
    screenshotAlt: "Aerarium funding plan showing central goal sleeve allocation",
  },
  {
    id: "thesis-checkins",
    label: "Thesis Check-ins",
    title: "Never Forget Why You Bought",
    description: "Keep investing decisions tied to a written thesis instead of letting impulse trades rewrite the plan.",
    screenshot: tradeCheckerScreen,
    screenshotAlt: "Aerarium trade checker and thesis workflow",
  },
  {
    id: "private-design",
    label: "Private by Design",
    title: "Keep Private Data Private",
    description: "Read-only brokerage sync, encrypted financial fields, recovery planning, and user-controlled data.",
    screenshot: profileMainScreen,
    screenshotAlt: "Aerarium profile showing security, privacy, and account controls",
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
      <div className="hidden" aria-hidden="true">
        {FEATURES.map((feature) => (
          <img key={feature.id} src={feature.screenshot} alt="" />
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-20 z-10 max-h-[calc(100svh-6rem)] overflow-hidden rounded-[40px] border border-emerald-400/14 bg-gradient-to-br from-slate-900/52 via-slate-950/88 to-emerald-950/16 p-6 shadow-[0_36px_100px_rgba(0,0,0,0.3)]">
          <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-emerald-300/[0.08] blur-3xl" />

          <div className="relative z-10 grid h-[calc(100svh-9rem)] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
            <div className="space-y-5">
              <div className="space-y-2.5">
                <div className="text-sm font-semibold text-emerald-300/85">
                  Scroll-guided iOS tour
                </div>
                <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl">
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
                    aria-current={index === activeIndex ? "true" : undefined}
                    className={`rounded-2xl border px-3.5 py-2.5 text-left transition ${
                      index === activeIndex
                        ? "border-emerald-400/35 bg-emerald-400/10 text-white shadow-[0_18px_55px_rgba(16,185,129,0.1)]"
                        : "border-white/[0.06] bg-slate-950/42 text-slate-500 hover:border-emerald-400/18 hover:text-slate-300"
                    }`}
                  >
                    <div className="text-[11px] font-semibold text-emerald-300/70">
                      {feature.label}
                    </div>
                    <div className="mt-0.5 font-display text-sm font-bold">{feature.title}</div>
                  </button>
                ))}
              </div>

              <div className="rounded-3xl border border-emerald-400/22 bg-slate-950/55 p-5">
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
                        <div className="text-sm font-semibold text-emerald-300/75">
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
                    <p className="mt-4 max-w-md text-base leading-relaxed text-slate-350">
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

            <div className="flex h-full items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[64px] bg-emerald-400/[0.06] blur-2xl" />
                <IosCockpitMockup
                  frameKey={activeFeature.id}
                  screenshotSrc={activeFeature.screenshot}
                  screenshotAlt={activeFeature.screenshotAlt}
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
              className="h-[52svh]"
            />
          ))}
          <div className="h-[40svh]" />
        </div>
      </div>

      <div className="space-y-7 lg:hidden">
        {FEATURES.map((feature, index) => (
          <motion.article
            key={feature.id}
            ref={(node) => {
              mobileChapterRefs.current[index] = node;
            }}
            data-tour-index={index}
            className="rounded-[32px] border border-emerald-400/14 bg-gradient-to-br from-slate-900/68 via-slate-950/90 to-emerald-950/14 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.26)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.22 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-emerald-300/75">
                  {feature.label}
                </div>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
                  {feature.title}
                </h3>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-slate-500">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-3 text-base leading-relaxed text-slate-350">
              {feature.description}
            </p>

            <div className="mt-5 overflow-hidden rounded-[26px] border border-white/8 bg-slate-950/80">
              <img
                src={feature.screenshot}
                alt={feature.screenshotAlt}
                className="h-auto w-full object-cover brightness-[1.08] contrast-[1.04]"
                loading={index > 1 ? "lazy" : "eager"}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
