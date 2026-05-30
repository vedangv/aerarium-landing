import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface IosCockpitMockupProps {
  screenshotSrc: string;
  screenshotAlt: string;
  frameKey: string;
}

export default function IosCockpitMockup({
  screenshotSrc,
  screenshotAlt,
  frameKey,
}: IosCockpitMockupProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-1" id="ios-device-mockup">
      <div
        className="relative aspect-[345/720] h-[clamp(420px,calc(100svh-13rem),680px)] rounded-[52px] bg-slate-950 p-3 shadow-2xl border-4 border-slate-900 overflow-hidden flex flex-col justify-between select-none transition-transform duration-300 hover:scale-[1.01]"
        id="iphone-chassis-outer"
      >
        <div className="absolute left-[-3px] top-[120px] w-[3px] h-[34px] bg-slate-800 rounded-r" id="iphone-btn-action" />
        <div className="absolute left-[-3px] top-[170px] w-[3px] h-[50px] bg-slate-800 rounded-r" id="iphone-btn-volup" />
        <div className="absolute left-[-3px] top-[230px] w-[3px] h-[50px] bg-slate-800 rounded-r" id="iphone-btn-voldown" />
        <div className="absolute right-[-3px] top-[190px] w-[3px] h-[70px] bg-slate-800 rounded-l" id="iphone-btn-power" />

        <div 
          className="relative w-full h-full bg-[#040805] rounded-[41px] overflow-hidden border border-white/5" 
          id="iphone-screen-container"
        >
          <div className="absolute inset-0 w-full h-full z-10 rounded-[39px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={frameKey}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={screenshotSrc}
                  alt={screenshotAlt} 
                  className="w-full h-full object-cover select-none pointer-events-none rounded-[39px]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20 rounded-[39px]" />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-slate-950/80 border border-white/10 rounded-full px-3 py-1.5 text-[9px] font-mono text-slate-400 backdrop-blur-md opacity-45 hover:opacity-100 transition-opacity whitespace-nowrap z-30">
            Scroll chapters to advance
          </div>

        </div>
      </div>
    </div>
  );
}
