import React from "react";
import { motion } from "motion/react";
import { Layers } from "lucide-react";
import CenterStageScreen from "./CenterStageScreen";
import xrayScreenSrc from "../../assets/product-tour/xray-policy-score.jpg";

/**
 * Feature screen 1 — "The Answer" (hidden exposure / Portfolio X-Ray).
 *
 * Answers "How concentrated am I, really?" Calm center-stage layout: the X-Ray
 * phone is the centerpiece; the small left graphic is the signature 8% → 18.7%
 * reveal; the subheader explains the look-through.
 *
 * Compliance: the 8% / 18.7% figures are an ILLUSTRATIVE example (labeled),
 * not a personalized claim or advice.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function ExposureReveal() {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-2xl border border-white/8 bg-slate-900/45 p-5 text-left shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-sm lg:mx-0 lg:max-w-[220px]">
      <div className="text-xs font-medium text-slate-400">What you’d guess</div>
      <div className="mt-1 font-display text-base font-semibold text-slate-300">NVDA 8%</div>
      <div aria-hidden className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full w-[43%] rounded-full bg-slate-500/70" />
      </div>

      <div className="mt-4 text-xs font-medium text-emerald-300/90">What an X-Ray finds</div>
      <div className="mt-1 font-display text-2xl font-bold text-white">
        NVDA <span className="text-emerald-300">18.7%</span>
      </div>
      <div aria-hidden className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        />
      </div>

      <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
        Illustrative example — one name compounding across many funds.
      </p>
    </div>
  );
}

export default function HiddenExposureReveal() {
  return (
    <CenterStageScreen
      id="answer"
      icon={Layers}
      eyebrow="The hidden exposure"
      headline="You own more than you think."
      subheader="Index funds quietly stack the same megacaps. One stock can hide across every fund you hold — until something looks through them."
      leftSlot={<ExposureReveal />}
      phoneSrc={xrayScreenSrc}
      phoneAlt="Aerarium Portfolio X-Ray — true exposure across every fund and account"
      phoneObjectPosition="50% 72%"
    />
  );
}
