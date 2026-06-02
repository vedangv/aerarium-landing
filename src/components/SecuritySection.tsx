import React, { useRef } from "react";
import { motion, useScroll, useReducedMotion, type MotionValue } from "motion/react";
import { ShieldCheck, EyeOff, LockKeyhole, FileDown, Database } from "lucide-react";
import { useReveal } from "./useReveal";

/**
 * Security — pinned, scroll-driven trust beat. Pill anchors; headline →
 * subheader → the four verifiable controls cascade in. Emerald (app/trust).
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  { icon: EyeOff, title: "Read-only by design", body: "Brokerage sync (SnapTrade) keeps holdings current — Aerarium never places a trade." },
  { icon: LockKeyhole, title: "Encrypted sensitive fields", body: "Financial data is protected with a recovery-aware encryption flow." },
  { icon: FileDown, title: "Export & delete, always", body: "Your data stays exportable, and account deletion is treated as a first-class right." },
  { icon: Database, title: "Private portfolio, public research", body: "Research uses public-market data and stays separate from your private portfolio records." },
];

const Pill = (
  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
    <ShieldCheck className="h-3.5 w-3.5" />
    Security
  </div>
);

function Card({ item, style }: { item: (typeof ITEMS)[number]; style?: any }) {
  const Icon = item.icon;
  return (
    <motion.div
      style={style}
      className="rounded-2xl border border-white/8 bg-slate-900/45 p-6 backdrop-blur-sm"
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/16 bg-emerald-400/10 text-emerald-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-base font-bold text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
    </motion.div>
  );
}

const CardReveal: React.FC<{ progress: MotionValue<number>; index: number; item: (typeof ITEMS)[number] }> = ({ progress, index, item }) => {
  const r = useReveal(progress, [0.44 + index * 0.08, 0.56 + index * 0.08], 18);
  return <Card item={item} style={{ opacity: r.opacity, y: r.y }} />;
};

export default function SecuritySection() {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const head = useReveal(scrollYProgress, [0.06, 0.2]);
  const sub = useReveal(scrollYProgress, [0.26, 0.4]);

  const Header = (headStyle?: any, subStyle?: any) => (
    <div className="mx-auto max-w-2xl text-center">
      {Pill}
      <motion.h2
        className="mt-5 font-editorial text-[32px] leading-[1.05] tracking-tight text-white sm:text-5xl"
        style={headStyle}
      >
        Security you can verify, not just trust.
      </motion.h2>
      <motion.p
        className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
        style={subStyle}
      >
        Read-only visibility, explicit controls, and source-first research. Your data should
        stay controlled by you.
      </motion.p>
    </div>
  );

  if (prefersReduced) {
    const fade = (delay: number) => ({
      initial: { opacity: 0, y: 14 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.4 },
      transition: { duration: 0.6, ease: EASE, delay },
    });
    return (
      <section id="security" className="relative overflow-hidden border-t border-white/5 bg-slate-950 py-24 sm:py-28">
        <div className="ambient-warm pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div {...fade(0)}>{Pill}</motion.div>
            <motion.h2 className="mt-5 font-editorial text-[32px] leading-[1.05] tracking-tight text-white sm:text-5xl" {...fade(0.06)}>
              Security you can verify, not just trust.
            </motion.h2>
            <motion.p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg" {...fade(0.12)}>
              Read-only visibility, explicit controls, and source-first research. Your data should stay controlled by you.
            </motion.p>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {ITEMS.map((it, i) => (
              <motion.div key={it.title} {...fade(0.18 + i * 0.06)}>
                <Card item={it} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="security" className="relative bg-slate-950">
      <div ref={trackRef} className="relative h-[250svh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden border-t border-white/5 pt-20">
          <div className="ambient-warm pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
            {Header(
              { opacity: head.opacity, y: head.y },
              { opacity: sub.opacity, y: sub.y },
            )}
            <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
              {ITEMS.map((it, i) => (
                <CardReveal key={it.title} progress={scrollYProgress} index={i} item={it} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
