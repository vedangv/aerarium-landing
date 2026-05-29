import React from "react";
import { motion } from "motion/react";
import { BookOpenCheck, Eye, ShieldCheck, Target } from "lucide-react";
import MobileSnapBeat from "./MobileSnapBeat";
import xraySrc from "../../assets/portfolio-showcase/etf-xray.jpg";
import ipsSrc from "../../assets/portfolio-showcase/ips-cockpit.jpg";
import goalsSrc from "../../assets/portfolio-showcase/goals-funding.jpg";
import profileSrc from "../../assets/portfolio-showcase/private-profile.jpg";

const surfaces = [
  {
    title: "See hidden exposure",
    label: "Portfolio X-Ray",
    body: "ETF look-through turns direct shares and through-fund holdings into one exposure view.",
    image: xraySrc,
    icon: Eye,
    rotate: "-2.4deg",
    y: "0px",
  },
  {
    title: "Check the rules",
    label: "IPS Cockpit",
    body: "Policy Score and allocation checks show where the portfolio has drifted from the plan.",
    image: ipsSrc,
    icon: BookOpenCheck,
    rotate: "1.6deg",
    y: "54px",
  },
  {
    title: "Assign assets",
    label: "Goals",
    body: "Goal funding stays central instead of forcing every goal into its own hidden allocation screen.",
    image: goalsSrc,
    icon: Target,
    rotate: "-1.2deg",
    y: "108px",
  },
  {
    title: "Keep control",
    label: "Privacy",
    body: "Read-only brokerage sync, account controls, and privacy tools stay visible in the product.",
    image: profileSrc,
    icon: ShieldCheck,
    rotate: "2.2deg",
    y: "162px",
  },
];

export default function AppSurfaceStrip() {
  return (
    <section id="surfaces" className="scroll-stop-section relative overflow-clip border-y border-white/5 bg-[#080b09] py-24 sm:py-28">
      <MobileSnapBeat />
      <div className="ambient-warm absolute inset-0 opacity-70" />
      <div className="absolute inset-x-0 top-0 h-px warm-hairline" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="inline-flex rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-4 py-2 text-sm font-semibold text-emerald-250">
            Actual app surfaces
          </div>
          <h2 className="mt-7 font-editorial text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            The product opens up as you scroll.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Aerarium is not a static report. The same portfolio moves through X-Ray, policy, goals, and privacy controls so the investor can see what changed and why it matters.
          </p>
          <div className="mt-8 space-y-3">
            {["Real screenshots, not placeholders.", "One portfolio story across every surface.", "Calm controls before more data."].map((item) => (
              <div key={item} className="flex items-center gap-3 text-base text-slate-300">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="hidden min-h-[680px] lg:block">
          <div className="relative h-full">
            {surfaces.map((surface, index) => {
              const Icon = surface.icon;
              return (
                <motion.article
                  key={surface.label}
                  className="absolute left-0 right-0 mx-auto grid max-w-[760px] grid-cols-[190px_minmax(0,1fr)] gap-5 rounded-[32px] border border-white/8 bg-slate-950/72 p-4 shadow-[0_32px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl"
                  style={{ top: surface.y, rotate: surface.rotate }}
                  initial={{ opacity: 0, x: 70, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.34 }}
                  transition={{ duration: 0.75, ease: "easeOut", delay: index * 0.08 }}
                >
                  <div className="overflow-hidden rounded-[24px] border border-white/8 bg-slate-900">
                    <img src={surface.image} alt="" className="h-[238px] w-full object-cover object-top" loading="lazy" />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center pr-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/14 bg-emerald-300/[0.08] text-emerald-250">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300/70">{surface.label}</div>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">{surface.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-350">{surface.body}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="space-y-5 lg:hidden">
          {surfaces.map((surface, index) => {
            const Icon = surface.icon;
            return (
              <motion.article
                key={surface.label}
                className="rounded-[28px] border border-white/8 bg-slate-950/70 p-4"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.04 }}
              >
                <div className="overflow-hidden rounded-[22px] border border-white/8 bg-slate-900">
                  <img src={surface.image} alt="" className="h-auto w-full" loading="lazy" />
                </div>
                <div className="mt-5 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/14 bg-emerald-300/[0.08] text-emerald-250">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/70">{surface.label}</div>
                    <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-white">{surface.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-350">{surface.body}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
