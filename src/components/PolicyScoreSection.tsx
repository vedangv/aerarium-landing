import React from "react";
import { Gauge } from "lucide-react";
import CenterStageScreen from "./CenterStageScreen";
import scoreScreenSrc from "../../assets/product-tour/xray-policy-score.jpg";

/**
 * Feature screen 2 — Policy Score.
 *
 * Answers "Am I still following my own plan?" with the app's signature metric:
 * a single 0–100 score for discipline (the part you control), not returns. Same
 * calm center-stage layout as screen 1: score phone centered, the small left
 * graphic is the six dimensions the score weighs, subheader explains it.
 *
 * Compliance: describes a discipline metric, not advice or performance claims.
 */

// The six weighted dimensions of the Policy Score (see FEATURES.md).
const DIMENSIONS = [
  "Allocation drift",
  "Concentration",
  "Cash runway",
  "Goal alignment",
  "Speculative limits",
  "Review cadence",
];

function ScoreDimensions() {
  return (
    <div className="mx-auto w-full max-w-[260px] text-left lg:mx-0 lg:max-w-[210px]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Six things it weighs
      </div>
      <ul className="mt-3 space-y-2">
        {DIMENSIONS.map((d) => (
          <li key={d} className="flex items-center gap-2.5 text-sm font-medium text-slate-300">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/70" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PolicyScoreSection() {
  return (
    <CenterStageScreen
      id="policy-score"
      icon={Gauge}
      eyebrow="Policy Score"
      headline="Always know if you’re on plan."
      subheader="You can’t control returns. Aerarium scores what you can — your discipline — as one number, 0 to 100."
      leftSlot={<ScoreDimensions />}
      phoneSrc={scoreScreenSrc}
      phoneAlt="Aerarium Policy Score — a 0–100 score for how closely the portfolio follows its plan"
      phoneObjectPosition="50% 22%"
    />
  );
}
