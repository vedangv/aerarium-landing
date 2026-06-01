import React from "react";
import { ShieldCheck, Check, X } from "lucide-react";
import CenterStageScreen from "./CenterStageScreen";
import tradeScreenSrc from "../../assets/product-tour/trade-checker.jpg";

/**
 * Feature screen 4 — Trade Checker.
 *
 * Answers "Will this trade break my own rules?" Locked center-stage template:
 * the Trade Checker phone is the centerpiece; the small graphic is a pre-trade
 * compliance check showing one breach (illustrative).
 */

const CHECKS = [
  { label: "Cash floor", ok: true },
  { label: "Sector limit", ok: true },
  { label: "25% position cap", ok: false, note: "→ 31%" },
];

function TradeCheck() {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-2xl border border-white/8 bg-slate-900/45 p-5 text-left shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-sm lg:mx-0 lg:max-w-[220px]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Hypothetical trade
      </div>
      <div className="mt-1 font-display text-base font-semibold text-slate-200">Buy 50 NVDA</div>
      <ul className="mt-3.5 space-y-2.5">
        {CHECKS.map((c) => (
          <li key={c.label} className="flex items-center gap-2.5 text-sm">
            {c.ok ? (
              <Check className="h-4 w-4 shrink-0 text-emerald-400" />
            ) : (
              <X className="h-4 w-4 shrink-0 text-rose-400" />
            )}
            <span className={c.ok ? "text-slate-300" : "font-medium text-rose-300"}>{c.label}</span>
            {c.note && <span className="ml-auto font-mono text-xs text-rose-300">{c.note}</span>}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[10px] leading-relaxed text-slate-500">Illustrative example.</p>
    </div>
  );
}

export default function TradeCheckerSection() {
  return (
    <CenterStageScreen
      id="trade-checker"
      icon={ShieldCheck}
      eyebrow="Trade Checker"
      headline="Know before you break a rule."
      subheader="Run a trade through your own caps and limits first — Aerarium flags the breach before you place it, not after."
      leftSlot={<TradeCheck />}
      phoneSrc={tradeScreenSrc}
      phoneAlt="Aerarium Trade Checker — simulate a trade's compliance impact before you place it"
      phoneObjectPosition="50% 26%"
    />
  );
}
