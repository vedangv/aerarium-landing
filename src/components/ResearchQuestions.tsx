import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/**
 * Research intro — the pivot from the Portfolio app to the web product.
 *
 * Mirrors the app's Section-2 questions beat: a pinned scene with a centered
 * headline anchoring six floating questions that reveal one-at-a-time on scroll
 * (floating on lg, stacked on mobile). Same scrutiny as the portfolio worries,
 * now aimed at the companies you research. Each question maps to a Research
 * feature (see social-media-kit/FEATURES.md). Balanced 3 left / 3 right.
 */

const CHIP_BASE =
  "rounded-2xl border border-white/8 bg-slate-900/55 px-5 py-3 text-[15px] font-medium text-slate-300 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:py-3.5";

const QUESTIONS = [
  { text: "Is this company actually profitable?", pos: "left-[5%] top-[9%]" },        // → financials
  { text: "Can I trust these numbers?", pos: "right-[6%] top-[5%]" },                  // → SEC-sourced provenance
  { text: "What’s really driving the revenue?", pos: "left-[8%] top-[45%]" },          // → revenue segments
  { text: "Who else owns it — and are they buying?", pos: "right-[4%] top-[45%]" },    // → 13F / insiders
  { text: "Is the growth real, or slowing?", pos: "left-[7%] bottom-[9%]" },           // → financial trends
  { text: "What’s the market pricing in?", pos: "right-[6%] bottom-[10%]" },           // → macro dashboard
];

const CHIP_START = 0.28;
const CHIP_STAGGER = 0.092;
const CHIP_WINDOW = 0.08;

function ResearchCopy() {
  return (
    <div className="text-center">
      <h2 className="font-editorial text-[30px] leading-[1.12] tracking-tight text-white sm:text-5xl sm:leading-[1.05] xl:text-6xl">
        Now ask the same
        <br className="hidden sm:block" /> of every company.
      </h2>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-slate-400 sm:mt-6 sm:max-w-md sm:text-lg">
        Aerarium Research answers them — straight from the source, built on raw SEC filings.
      </p>
    </div>
  );
}

const RevealChip: React.FC<{
  progress: MotionValue<number>;
  index: number;
  text: string;
  className: string;
}> = ({ progress, index, text, className }) => {
  const start = CHIP_START + index * CHIP_STAGGER;
  const end = start + CHIP_WINDOW;
  const opacity = useTransform(progress, [0, start, end, 1], [0, 0, 1, 1]);
  const y = useTransform(progress, [start, end], [18, 0]);
  const blurPx = useTransform(progress, [start, end], [6, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return (
    <motion.div className={className} style={{ opacity, y, filter }}>
      {text}
    </motion.div>
  );
};

function Scene() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Headline anchors in early, then the questions reveal one at a time.
  const headOpacity = useTransform(scrollYProgress, [0, 0.04, 0.18, 1], [0, 0, 1, 1]);
  const headY = useTransform(scrollYProgress, [0, 0.04, 0.18, 1], [24, 24, 0, 0]);
  const headStyle = { opacity: headOpacity, y: headY };

  return (
    <div ref={trackRef} className="relative h-[280svh]">
      {/* pt clears the navbar for the pinned content */}
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(50%_42%_at_50%_34%,rgba(16,185,129,0.10)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(38%_34%_at_64%_72%,rgba(245,200,130,0.045)_0%,transparent_72%)]" />

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {/* lg+: questions float around the centered headline */}
          <div className="relative mx-auto hidden h-[560px] w-full max-w-6xl px-6 lg:block">
            {QUESTIONS.map((q, i) => (
              <RevealChip
                key={q.text}
                progress={scrollYProgress}
                index={i}
                text={q.text}
                className={`absolute ${q.pos} max-w-[280px] ${CHIP_BASE}`}
              />
            ))}
            <div className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2">
              <motion.div style={headStyle}>
                <ResearchCopy />
              </motion.div>
            </div>
          </div>

          {/* < lg: headline on top, questions stacked below — same reveal */}
          <div className="flex w-full max-w-md flex-col px-6 lg:hidden">
            <motion.div style={headStyle}>
              <ResearchCopy />
            </motion.div>
            <div className="mt-6 flex flex-col gap-2.5">
              {QUESTIONS.map((q, i) => (
                <RevealChip
                  key={q.text}
                  progress={scrollYProgress}
                  index={i}
                  text={q.text}
                  className={`${CHIP_BASE} text-center`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedFallback() {
  return (
    <section className="relative z-10 overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(50%_42%_at_50%_34%,rgba(16,185,129,0.08)_0%,transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-md">
        <ResearchCopy />
        <div className="mt-10 flex flex-col gap-3">
          {QUESTIONS.map((q) => (
            <div key={q.text} className={`${CHIP_BASE} text-center`}>
              {q.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ResearchQuestions() {
  const prefersReduced = useReducedMotion();
  return (
    <section id="research-questions" className="relative z-10 bg-slate-950">
      {prefersReduced ? <StackedFallback /> : <Scene />}
    </section>
  );
}
