import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import MobileSnapBeat from "./MobileSnapBeat";
import { trackOutboundClick } from "../lib/analytics";

/**
 * Hero → Questions scroll scene (all viewports).
 *
 * The foreground (hero) dissolves up and out of focus while the background
 * (the questions) sits behind it, faint and out of focus, then pulls into
 * focus as the hero clears — a rack-focus. The two layers never share the
 * screen prominent-and-blurred at once, so there's no muddy ghosting. The
 * questions then reveal one at a time as you keep scrolling.
 *
 * The same scene runs on phone, tablet, and desktop — only the question
 * LAYOUT differs (floating around the headline on lg+, stacked below it on
 * smaller screens). Scroll-snap is removed globally so nothing traps the
 * sticky scroll. Reduced-motion users get a plain stacked hero + questions.
 */

// 6 worries, each setting up ONE distinct later feature (no repeats), so the
// section works when revealed one-at-a-time on scroll. Five are personal-
// portfolio worries; one is a Research worry — a deliberate early signal that
// Aerarium covers both your portfolio AND the companies you research. Ordered
// top-to-bottom so the reveal follows the scroll; balanced 3 left / 3 right.
// See social-media-kit/FEATURES.md for the feature each question answers.
const QUESTIONS = [
  { text: "How concentrated am I, really?", pos: "left-[5%] top-[9%]", delay: 0.05 },             // → Portfolio X-Ray
  { text: "Am I still following my own plan?", pos: "right-[6%] top-[5%]", delay: 0.12 },          // → Policy Score
  { text: "Am I drifting from my goals?", pos: "left-[8%] top-[45%]", delay: 0.2 },                // → Goal alignment
  { text: "Will this trade break my own rules?", pos: "right-[4%] top-[45%]", delay: 0.27 },       // → Trade Checker / IPS compliance
  { text: "Why did I buy this again?", pos: "left-[7%] bottom-[9%]", delay: 0.34 },                // → Thesis / discipline log
  { text: "Is this company as strong as it looks?", pos: "right-[6%] bottom-[10%]", delay: 0.41 }, // → Research
];

// Shared chip styling. Slightly tighter padding on small screens so the stacked
// mobile column (headline + 6 chips) stays comfortably shorter than the viewport
// and centers clear of the navbar even on short phones (iPhone SE).
const CHIP_BASE =
  "rounded-2xl border border-white/8 bg-slate-900/55 px-5 py-3 text-[15px] font-medium text-slate-300 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:py-3.5";

// Question reveal pacing (as fractions of the scene's scroll progress). A wide
// stagger on a tall track means each question gets a generous slice of scroll
// before the next appears — they reveal one at a time, unhurried. The schedule
// finishes by ~0.87 so there's a real beat of dwell (~0.13 of the track) after
// the last question resolves — time to linger before scrolling to the answer.
const CHIP_START = 0.37;
const CHIP_STAGGER = 0.084;
const CHIP_WINDOW = 0.078;

/* ── Shared content pieces ─────────────────────────────────────────────── */

function HeroCopy() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 text-center sm:gap-9">
      <h1 className="font-editorial text-[40px] leading-[1.02] tracking-tight text-white min-[380px]:text-[46px] sm:text-[88px] sm:leading-[1.0] lg:text-[104px]">
        <span className="block">Invest with intention,</span>
        <span className="block text-emerald-200">not impulse.</span>
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-xl">
        You can’t follow a plan you can’t see. Aerarium helps you understand what you
        really own, build your investment plan, and stay disciplined for the long term.
      </p>

      <div className="flex flex-col items-center gap-4 pt-2">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          {/* Emerald = the iOS app */}
          <a
            href="https://testflight.apple.com/join/Xna39VKU"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick("testflight", "hero")}
            className="py-3 px-7 text-sm sm:py-4 sm:px-9 sm:text-base bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 cursor-pointer text-center"
            id="btn-hero-join-waitlist"
          >
            Get Early Access
          </a>
          {/* Cyan = the web research product */}
          <a
            href="https://research.aerarium.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick("research", "hero")}
            className="py-3 px-7 text-sm sm:py-4 sm:px-9 sm:text-base bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 cursor-pointer text-center"
            id="btn-hero-open-research"
          >
            Open Research
          </a>
        </div>
        <span className="text-sm text-slate-500">Free on iOS via TestFlight · Research free in your browser</span>
      </div>

      <p className="text-sm text-slate-500">
        For long-term investors — whether you’re just starting or already run a playbook.
        <span className="mx-2 text-slate-700">·</span>
        Read-only. No trading. Not financial advice.
      </p>
    </div>
  );
}

function QuestionsCopy() {
  return (
    <div className="text-center">
      <h2 className="font-editorial text-[30px] leading-[1.12] tracking-tight text-white sm:text-5xl sm:leading-[1.05] xl:text-6xl">
        Questions worth asking
        <br className="hidden sm:block" /> about your own money.
      </h2>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-slate-400 sm:mt-6 sm:max-w-md sm:text-lg">
        Most investors can’t answer these with confidence. Aerarium is built so you can.
      </p>
    </div>
  );
}

/* ── Scroll scene ──────────────────────────────────────────────────────── */

/**
 * One question that reveals on its own slice of the scroll. Each chip derives a
 * staggered [start, end] window from its index so the six appear in sequence
 * (top-to-bottom) rather than all at once. Held at full opacity after its window
 * so it stays put while the rest reveal and the scene dwells. Layout-agnostic:
 * the caller passes positioning via `className` (absolute float on lg, stacked
 * block on smaller screens).
 */
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

  // NOTE: every transform spans the full [0..1] progress with an explicit HELD
  // final keyframe. motion/react extrapolates past a 2-point input range rather
  // than clamping, which made the hero opacity climb back up and ghost over the
  // questions. Full-range keyframes guarantee the end state stays put.

  // Hero (foreground): fades + lifts away early with a light blur, fully gone by
  // ~0.16 so it doesn't sit half-present over the background during the focus
  // pull. Held invisible for the rest of the scroll.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [1, 0, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.29, 1], [0, -110, -110]);
  const heroScale = useTransform(scrollYProgress, [0, 0.29, 1], [1, 0.96, 0.96]);
  const heroBlurPx = useTransform(scrollYProgress, [0, 0.15, 1], [0, 6, 6]);
  const heroFilter = useMotionTemplate`blur(${heroBlurPx}px)`;
  const cueOpacity = useTransform(scrollYProgress, [0, 0.07, 1], [1, 0, 0]);

  // Questions headline: sits BEHIND the hero from the very start — faint and
  // heavily blurred — so Section 2 reads as out-of-focus DEPTH behind the hero.
  // It stays faint+blurred until the hero has largely cleared (~0.16), THEN
  // pulls into focus (the "background coming into focus" rack-focus) without both
  // layers sitting prominent-and-blurred at once. Anchors the section before the
  // questions pop in.
  const headOpacity = useTransform(scrollYProgress, [0, 0.15, 0.33, 1], [0.16, 0.22, 1, 1]);
  const headScale = useTransform(scrollYProgress, [0, 0.15, 0.33, 1], [0.9, 0.92, 1, 1]);
  const headBlurPx = useTransform(scrollYProgress, [0, 0.15, 0.33, 1], [16, 14, 0, 0]);
  const headFilter = useMotionTemplate`blur(${headBlurPx}px)`;

  const headStyle = { opacity: headOpacity, scale: headScale, filter: headFilter };

  return (
    // Tall track gives the scene room to breathe: the hero clears, the headline
    // pulls into focus, then the six questions reveal one at a time — each with a
    // generous slice of scroll so nothing feels rushed.
    <div ref={trackRef} className="relative h-[450svh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* Warm ambient light so the dark scene reads as lit, not an empty void. */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(50%_42%_at_50%_34%,rgba(16,185,129,0.10)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(38%_34%_at_64%_72%,rgba(245,200,130,0.045)_0%,transparent_72%)]" />

        {/* Background layer: headline pulls into focus, then each question reveals
            in turn. Same reveal logic, two layouts. */}
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
                <QuestionsCopy />
              </motion.div>
            </div>
          </div>

          {/* < lg: headline on top, questions stacked below — same reveal */}
          <div className="flex w-full max-w-md flex-col px-6 lg:hidden">
            <motion.div style={headStyle}>
              <QuestionsCopy />
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

        {/* Foreground layer: the hero, dissolving away */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale, filter: heroFilter }}
        >
          <HeroCopy />
        </motion.div>

        {/* Scroll cue, fades out as soon as the user starts */}
        <motion.div
          className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center space-y-1.5"
          style={{ opacity: cueOpacity }}
        >
          <span className="text-[9px] font-mono tracking-widest text-slate-500">SCROLL</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-emerald-550" />
        </motion.div>
      </div>
    </div>
  );
}

/* ── Reduced-motion fallback: clean stacked sections, no scroll effects ──── */

function StackedFallback() {
  return (
    <div>
      <header
        id="hero-stacked"
        className="relative flex min-h-[100svh] items-center justify-center px-2 pt-28 pb-24"
      >
        <MobileSnapBeat />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(50%_42%_at_50%_34%,rgba(16,185,129,0.10)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(38%_34%_at_64%_72%,rgba(245,200,130,0.045)_0%,transparent_72%)]" />
        <div className="relative z-10">
          <HeroCopy />
        </div>
      </header>

      <section className="relative z-10 overflow-hidden px-6 py-28">
        <MobileSnapBeat />
        <div className="mx-auto max-w-md">
          <QuestionsCopy />
          <div className="mt-10 flex flex-col gap-3">
            {QUESTIONS.map((q) => (
              <div key={q.text} className={`${CHIP_BASE} text-center`}>
                {q.text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HeroQuestionsScene() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="hero" className="relative z-10">
      {prefersReduced ? <StackedFallback /> : <Scene />}
    </section>
  );
}
