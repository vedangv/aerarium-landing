import React from "react";
import { Target } from "lucide-react";
import CenterStageScreen from "./CenterStageScreen";
import goalsScreenSrc from "../../assets/product-tour/goals-hub.jpg";

/**
 * Feature screen 3 — Goals.
 *
 * Answers "Am I drifting from my goals?" Locked center-stage template: the Goals
 * phone is the centerpiece; the small graphic is the need/want/wish breakdown.
 */

const GOALS = [
  { label: "Need", count: 3, dot: "bg-amber-400/80" },
  { label: "Want", count: 1, dot: "bg-sky-400/80" },
  { label: "Wish", count: 0, dot: "bg-violet-400/80" },
];

function GoalBreakdown() {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-2xl border border-white/8 bg-slate-900/45 p-5 text-left shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-sm lg:mx-0 lg:max-w-[220px]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Goals by priority
      </div>
      <ul className="mt-3.5 space-y-3">
        {GOALS.map((g) => (
          <li key={g.label} className="flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-sm font-medium text-slate-300">
              <span className={`h-2 w-2 rounded-full ${g.dot}`} />
              {g.label}
            </span>
            <span className="font-display text-base font-bold text-white">{g.count}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-white/8 pt-3 text-xs text-slate-500">
        $132K funded across 4 goals
      </div>
    </div>
  );
}

export default function GoalsSection() {
  return (
    <CenterStageScreen
      id="goals"
      icon={Target}
      eyebrow="Goals"
      headline="See a goal slip before it falls."
      subheader="Sort goals by need, want, and wish, fund them in one view, and get flagged the moment one drifts off pace."
      leftSlot={<GoalBreakdown />}
      phoneSrc={goalsScreenSrc}
      phoneAlt="Aerarium Goals — needs, wants, and wishes funded and tracked in one place"
      phoneObjectPosition="50% 30%"
    />
  );
}
