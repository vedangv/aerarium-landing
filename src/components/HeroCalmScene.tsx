import React from "react";
import { motion } from "motion/react";
import dashboardScreen from "../../assets/product-tour/dashboard.jpg";

/**
 * Calm hero visual: a single clean iPhone on a soft warm halo of light.
 * Deliberately low-density (the dashboard, not the ticker-heavy X-Ray card) so
 * the hero reads calm and beginner-friendly, in the Luffu/Poly spirit. The
 * dense NVDA / X-Ray proof lives further down the page once the visitor is
 * engaged.
 */
export default function HeroCalmScene() {
  return (
    <motion.div
      className="relative flex justify-center lg:justify-end"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
    >
      <div className="ambient-warm absolute -inset-16 rounded-[80px] blur-3xl" />
      <div className="relative mx-auto w-full max-w-[300px] rounded-[48px] border-[6px] border-slate-900 bg-slate-950 p-2 shadow-[0_50px_140px_rgba(0,0,0,0.5)] ring-1 ring-emerald-300/20 sm:max-w-[340px] sm:rounded-[56px]">
        <div className="relative aspect-[1206/2622] overflow-hidden rounded-[42px] border border-white/5 bg-[#040805] sm:rounded-[50px]">
          <img
            src={dashboardScreen}
            alt="Aerarium dashboard showing net worth, policy score, and portfolio health at a glance"
            className="h-full w-full object-cover object-top brightness-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
