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

/**
 * Hero → Questions scroll scene (desktop).
 *
 * The foreground (hero) dissolves up and out of focus while the background
 * (the questions) resolves into focus underneath it. Critically, the two
 * layers DON'T share the screen at full opacity: the hero is fully gone
 * (opacity 0) before the questions finish resolving, so there's no muddy
 * ghosting. Scroll-snap is removed globally, so nothing traps the scroll.
 *
 * On < lg, the scroll scene is skipped entirely (sticky + mobile snap fight
 * each other); we render a clean stacked hero + questions instead.
 */

// 5 worries, each setting up ONE distinct later feature (no repeats), so the
// section works when revealed one-at-a-time on scroll. Four are personal-
// portfolio worries; the last is a Research worry — a deliberate early signal
// that Aerarium covers both your portfolio AND the companies you research.
// See social-media-kit/FEATURES.md for the feature each question answers.
const QUESTIONS = [
  { text: "How concentrated am I, really?", pos: "left-[5%] top-[9%]", delay: 0.05 },          // → Portfolio X-Ray
  { text: "Am I still following my own plan?", pos: "right-[6%] top-[5%]", delay: 0.12 },        // → Policy Score
  { text: "Am I drifting from my goals?", pos: "left-[8%] top-[45%]", delay: 0.2 },              // → Goal alignment
  { text: "Is this company as strong as it looks?", pos: "right-[6%] bottom-[10%]", delay: 0.27 }, // → Research
  { text: "Why did I buy this again?", pos: "left-[7%] bottom-[9%]", delay: 0.34 },              // → Thesis / discipline log
];

/* ── Shared content pieces ─────────────────────────────────────────────── */

function HeroCopy() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-9 px-6 text-center">
      <h1 className="font-editorial text-[56px] leading-[1.0] tracking-tight text-white min-[380px]:text-[64px] sm:text-[88px] lg:text-[104px]">
        <span className="block">Invest with intention,</span>
        <span className="block text-emerald-200">not impulse.</span>
      </h1>

      <p className="max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
        You can’t follow a plan you can’t see. Aerarium helps you understand what you
        really own, build your investment plan, and stay disciplined for the long term.
      </p>

      <div className="flex flex-col items-center gap-3 pt-2">
        <a
          href="https://testflight.apple.com/join/Xna39VKU"
          target="_blank"
          rel="noopener noreferrer"
          className="py-4 px-9 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-semibold rounded-2xl text-base transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 cursor-pointer text-center"
          id="btn-hero-join-waitlist"
        >
          Get Early Access
        </a>
        <span className="text-sm text-slate-500">Free on iOS · via TestFlight</span>
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
      <h2 className="font-editorial text-5xl leading-[1.05] tracking-tight text-white xl:text-6xl">
        Questions worth asking
        <br />
        about your own money.
      </h2>
      <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-slate-400">
        Most investors can’t answer these with confidence. Aerarium is built so you can.
      </p>
    </div>
  );
}

/* ── Desktop scroll scene ──────────────────────────────────────────────── */

/**
 * One floating question that reveals on its own slice of the scroll. Each chip
 * derives a staggered [start, end] window from its index so the five appear in
 * sequence (top-to-bottom) rather than all at once. Held at full opacity after
 * its window so it stays put while the rest reveal and the scene dwells.
 */
const RevealChip: React.FC<{
  progress: MotionValue<number>;
  q: (typeof QUESTIONS)[number];
  index: number;
}> = ({ progress, q, index }) => {
  const start = 0.46 + index * 0.08;
  const end = start + 0.1;
  const opacity = useTransform(progress, [0, start, end, 1], [0, 0, 1, 1]);
  const y = useTransform(progress, [start, end], [18, 0]);
  const blurPx = useTransform(progress, [start, end], [6, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return (
    <motion.div
      className={`absolute ${q.pos} max-w-[280px] rounded-2xl border border-white/8 bg-slate-900/55 px-5 py-3.5 text-[15px] font-medium text-slate-300 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm`}
      style={{ opacity, y, filter }}
    >
      {q.text}
    </motion.div>
  );
};

function DesktopScene() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // NOTE: every transform spans the full [0..1] progress with an explicit HELD
  // final keyframe. motion/react extrapolates past a 2-point input range rather
  // than clamping, which made the hero opacity climb back up and ghost over the
  // questions. Full-range keyframes guarantee the end state stays put.

  // Hero (foreground): fades + blurs + lifts away early, fully gone by ~0.24
  // and held invisible for the rest of the scroll.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.24, 1], [1, 0, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.4, 1], [0, -110, -110]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.96, 0.96]);
  const heroBlurPx = useTransform(scrollYProgress, [0, 0.24, 1], [0, 8, 8]);
  const heroFilter = useMotionTemplate`blur(${heroBlurPx}px)`;
  const cueOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [1, 0, 0]);

  // Questions headline: resolves into focus right after the hero clears (~0.22),
  // anchoring the section BEFORE the individual questions begin popping in.
  const headOpacity = useTransform(scrollYProgress, [0, 0.22, 0.4, 1], [0, 0, 1, 1]);
  const headScale = useTransform(scrollYProgress, [0, 0.22, 0.42, 1], [0.94, 0.94, 1, 1]);
  const headBlurPx = useTransform(scrollYProgress, [0, 0.22, 0.4, 1], [10, 10, 0, 0]);
  const headFilter = useMotionTemplate`blur(${headBlurPx}px)`;

  return (
    // Tall track gives the scene room to breathe: the hero clears, the headline
    // resolves, then the five questions pop in one at a time as you scroll.
    <div ref={trackRef} className="relative hidden h-[300vh] lg:block">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* Warm ambient light so the dark scene reads as lit, not an empty void. */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(50%_42%_at_50%_34%,rgba(16,185,129,0.10)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(38%_34%_at_64%_72%,rgba(245,200,130,0.045)_0%,transparent_72%)]" />

        {/* Background layer: headline resolves into focus, then each question
            reveals in turn (top-to-bottom, following the scroll). */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative mx-auto h-[560px] w-full max-w-6xl px-6">
            {QUESTIONS.map((q, i) => (
              <RevealChip key={q.text} progress={scrollYProgress} q={q} index={i} />
            ))}
            <div className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2">
              <motion.div style={{ opacity: headOpacity, scale: headScale, filter: headFilter }}>
                <QuestionsCopy />
              </motion.div>
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

/* ── Mobile / reduced-motion fallback: clean stacked sections ──────────── */

function StackedFallback({ className }: { className: string }) {
  return (
    <div className={className}>
      <header
        id="hero-stacked"
        className="scroll-stop-section relative flex min-h-[100svh] items-center justify-center px-2 pt-28 pb-24"
      >
        <MobileSnapBeat />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(50%_42%_at_50%_34%,rgba(16,185,129,0.10)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(38%_34%_at_64%_72%,rgba(245,200,130,0.045)_0%,transparent_72%)]" />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <HeroCopy />
        </motion.div>
      </header>

      <section className="relative z-10 overflow-hidden px-6 py-28">
        <MobileSnapBeat />
        <motion.div
          className="mx-auto max-w-md text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-editorial text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl">
            Questions worth asking about your own money.
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-slate-400">
            Most investors can’t answer these with confidence. Aerarium is built so you can.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-3">
          {QUESTIONS.map((q, i) => (
            <motion.div
              key={q.text}
              className="rounded-2xl border border-white/8 bg-slate-900/55 px-5 py-3.5 text-[15px] font-medium text-slate-300"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
            >
              {q.text}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function HeroQuestionsScene() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="hero" className="relative z-10">
      {/* Desktop gets the scroll scene; reduced-motion users get the fallback. */}
      {prefersReduced ? (
        <StackedFallback className="hidden lg:block" />
      ) : (
        <DesktopScene />
      )}
      {/* Mobile always gets the clean stacked version. */}
      <StackedFallback className="lg:hidden" />
    </section>
  );
}
