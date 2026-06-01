import React from "react";
import { BarChart3, PieChart, Users, Grid3x3, Activity } from "lucide-react";
import WebScreen from "./WebScreen";
import financialsSrc from "../../assets/screenshots/latest/research-financials-charts.png";
import segmentsSrc from "../../assets/screenshots/latest/research-segments.png";
import ownershipSrc from "../../assets/screenshots/latest/research-ownership.png";
import overlapSrc from "../../assets/screenshots/latest/research-13f-overlap.png";
import macroSrc from "../../assets/screenshots/latest/research-macro.png";

/**
 * The five Aerarium Research web screens — each answering a question from the
 * Research-intro beat, using a freshly captured screenshot from the live site
 * (assets/screenshots/latest/). Browser-frame, lighter non-pinned reveal.
 */

const SCREENS = [
  {
    id: "research-financials",
    icon: BarChart3,
    eyebrow: "Financials",
    headline: "The numbers behind the story.",
    subheader:
      "Revenue, margins, cash flow, EPS — every metric charted across decades of quarters, built straight from SEC filings.",
    src: financialsSrc,
    alt: "Aerarium Research financials — multi-quarter charts for revenue, net income, free cash flow, EPS",
    url: "research.aerarium.app/stocks/NVDA",
  },
  {
    id: "research-segments",
    icon: PieChart,
    eyebrow: "Revenue segments",
    headline: "Know what’s actually driving it.",
    subheader:
      "Break revenue down by product, segment, and geography — extracted automatically from the filings, not guessed.",
    src: segmentsSrc,
    alt: "Aerarium Research revenue segments — stacked breakdown by geography",
    url: "research.aerarium.app/stocks/NVDA",
  },
  {
    id: "research-ownership",
    icon: Users,
    eyebrow: "Ownership & insiders",
    headline: "See who’s buying — and who’s bailing.",
    subheader:
      "Institutional 13F holders, quarter-over-quarter moves, and net insider sentiment, all in one view.",
    src: ownershipSrc,
    alt: "Aerarium Research ownership — institutional holders, QoQ changes, insider sentiment",
    url: "research.aerarium.app/stocks/NVDA",
  },
  {
    id: "research-smart-money",
    icon: Grid3x3,
    eyebrow: "Smart money",
    headline: "Find where conviction clusters.",
    subheader:
      "A 13F overlap heatmap across dozens of funds — see which names the smart money crowds into, at a glance.",
    src: overlapSrc,
    alt: "Aerarium Research 13F fund overlap heatmap across smart-money funds",
    url: "research.aerarium.app/funds",
  },
  {
    id: "research-macro",
    icon: Activity,
    eyebrow: "Macro",
    headline: "Read what the market’s pricing in.",
    subheader:
      "Yield curves, Fed-funds futures, inflation, credit, and the week’s high-impact releases — one nerve center.",
    src: macroSrc,
    alt: "Aerarium Research macro dashboard — rates, inflation, labor, and the economic calendar",
    url: "research.aerarium.app/macro",
  },
];

export default function ResearchScreens() {
  return (
    <>
      {SCREENS.map((s) => (
        <WebScreen key={s.id} {...s} />
      ))}
    </>
  );
}
