import React from "react";
import { ScrollText } from "lucide-react";
import CenterStageScreen from "./CenterStageScreen";
import thesisScreenSrc from "../../assets/product-tour/thesis.png";

/**
 * Feature screen 5 — Thesis log.
 *
 * Answers "Why did I buy this again?" Locked center-stage template: the New
 * Thesis phone is the centerpiece; the small graphic is a saved thesis summary
 * (strategy / conviction / horizon).
 */

function ThesisCard() {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-2xl border border-white/8 bg-slate-900/45 p-5 text-left shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-sm lg:mx-0 lg:max-w-[220px]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Thesis · QQQ
      </div>
      <ul className="mt-3.5 space-y-3 text-sm">
        <li className="flex items-center justify-between">
          <span className="text-slate-400">Strategy</span>
          <span className="font-medium text-slate-200">Growth</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-slate-400">Conviction</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-slate-400">Horizon</span>
          <span className="font-medium text-slate-200">1–3 years</span>
        </li>
      </ul>
      <div className="mt-4 border-t border-white/8 pt-3 text-xs italic leading-relaxed text-slate-500">
        “Long-term hold on broad tech…”
      </div>
    </div>
  );
}

export default function ThesisSection() {
  return (
    <CenterStageScreen
      id="thesis"
      icon={ScrollText}
      eyebrow="Thesis log"
      headline="Remember why you bought it."
      subheader="Write the thesis behind every position — your reasoning, conviction, and time horizon — so months later you never have to guess why it’s there."
      leftSlot={<ThesisCard />}
      phoneSrc={thesisScreenSrc}
      phoneAlt="Aerarium thesis — capture your reasoning, conviction, and horizon for every position"
      phoneObjectPosition="50% 20%"
    />
  );
}
