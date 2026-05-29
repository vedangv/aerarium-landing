import React from "react";
import { motion } from "motion/react";
import { BookOpenCheck, Eye, ShieldCheck, Target } from "lucide-react";
import MobileSnapBeat from "./MobileSnapBeat";
import portfolioSrc from "../../assets/product-tour/portfolio.jpg";
import fundingSrc from "../../assets/product-tour/goals-funding.jpg";
import goalsSrc from "../../assets/product-tour/goals-hub.jpg";
import ipsSrc from "../../assets/product-tour/ips-score.jpg";

const surfaces = [
  {
    title: "What am I really exposed to?",
    label: "Portfolio",
    body: "Net worth, holdings, and X-Ray sit together so concentration does not hide inside fund wrappers.",
    image: portfolioSrc,
    icon: Eye,
    imageClass: "object-top",
  },
  {
    title: "Where should each dollar work?",
    label: "Funding Plan",
    body: "Assign assets centrally across goals instead of editing one hidden sleeve at a time.",
    image: fundingSrc,
    icon: Target,
    imageClass: "object-top",
  },
  {
    title: "Which goals need attention?",
    label: "Goals",
    body: "Need, want, and wish goals stay visible without turning long-term targets into a demoralizing wall.",
    image: goalsSrc,
    icon: ShieldCheck,
    imageClass: "object-top",
  },
  {
    title: "Did reality drift from policy?",
    label: "IPS",
    body: "Allocation checks overlay actual holdings against target bands before the score explains the why.",
    image: ipsSrc,
    icon: BookOpenCheck,
    imageClass: "object-bottom",
  },
];

export default function AppSurfaceStrip() {
  return (
    <section id="surfaces" className="scroll-stop-section relative overflow-clip border-y border-white/5 bg-[#080b09] py-24 sm:py-28">
      <MobileSnapBeat />
      <div className="ambient-warm absolute inset-0 opacity-70" />
      <div className="absolute inset-x-0 top-0 h-px warm-hairline" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="inline-flex rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-4 py-2 text-sm font-semibold text-emerald-250">
            Questions the app answers
          </div>
          <h2 className="mt-7 font-editorial text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            The portfolio keeps asking better questions.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            After the hidden exposure moment, Aerarium keeps pulling the same thread: what you own, where it belongs, what needs attention, and whether it still matches the policy.
          </p>
          <div className="mt-8 space-y-3">
            {["Exposure before allocation.", "Goals before guilt.", "Policy before impulse."].map((item) => (
              <div key={item} className="flex items-center gap-3 text-base text-slate-300">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {surfaces.map((surface, index) => {
            const Icon = surface.icon;
            return (
              <motion.article
                key={surface.label}
                className="group overflow-hidden rounded-[30px] border border-white/8 bg-slate-950/70 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                initial={{ opacity: 0, y: 34, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.24 }}
                transition={{ duration: 0.68, ease: "easeOut", delay: index * 0.07 }}
              >
                <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-slate-900">
                  <img
                    src={surface.image}
                    alt=""
                    className={`h-[240px] w-full object-cover contrast-[1.05] transition duration-700 group-hover:scale-[1.025] sm:h-[280px] lg:h-[320px] ${surface.imageClass}`}
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/12 to-transparent" />
                </div>
                <div className="mt-4 flex items-start gap-4 px-1 pb-2">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/14 bg-emerald-300/[0.08] text-emerald-250">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/70">{surface.label}</div>
                    <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-white sm:text-xl">{surface.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-350 sm:text-base">{surface.body}</p>
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
