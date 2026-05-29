import React from "react";
import { motion, AnimatePresence } from "motion/react";
import ss0 from "../assets/ss0.png";
import ss1 from "../assets/ss1.png";
import ss2 from "../assets/ss2.png";
import ss3 from "../assets/ss3.png";
import ss4 from "../assets/ss4.png";
import ss5 from "../assets/ss5.png";
import ss6 from "../assets/ss6.png";

const screenshots = [ss0, ss1, ss2, ss3, ss4, ss5, ss6];

interface IosCockpitMockupProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  autoTourActive: boolean;
  setAutoTourActive: (active: boolean) => void;
  handleUserInteraction: () => void;
}

export default function IosCockpitMockup({
  activeIndex,
  setActiveIndex,
  handleUserInteraction,
}: IosCockpitMockupProps) {
  const activeScreenshot = screenshots[((activeIndex % screenshots.length) + screenshots.length) % screenshots.length];

  // Handlers for interaction
  const onScreenTap = () => {
    handleUserInteraction();
    const nextIndex = (activeIndex + 1) % screenshots.length;
    setActiveIndex(nextIndex);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-1" id="ios-device-mockup">
      {/* Premium iPhone 16 Pro Style Chassis */}
      <div 
        onClick={onScreenTap}
        className="relative w-[345px] h-[720px] rounded-[52px] bg-slate-950 p-3 shadow-2xl border-4 border-slate-900 overflow-hidden flex flex-col justify-between cursor-pointer select-none transition-transform duration-300 hover:scale-[1.01]" 
        id="iphone-chassis-outer"
      >
        {/* Dynamic Island cut-out pill */}
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-28 h-[28px] bg-slate-950 rounded-full z-50 flex items-center justify-between px-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          <span className="w-10 h-1 bg-slate-900 rounded-full" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
        </div>

        {/* Side physical buttons */}
        <div className="absolute left-[-3px] top-[120px] w-[3px] h-[34px] bg-slate-800 rounded-r" id="iphone-btn-action" />
        <div className="absolute left-[-3px] top-[170px] w-[3px] h-[50px] bg-slate-800 rounded-r" id="iphone-btn-volup" />
        <div className="absolute left-[-3px] top-[230px] w-[3px] h-[50px] bg-slate-800 rounded-r" id="iphone-btn-voldown" />
        <div className="absolute right-[-3px] top-[190px] w-[3px] h-[70px] bg-slate-800 rounded-l" id="iphone-btn-power" />

        {/* Inner Screen Panel */}
        <div 
          className="relative w-full h-full bg-[#040805] rounded-[41px] overflow-hidden border border-white/5" 
          id="iphone-screen-container"
        >
          {/* Screenshot Container with smooth fade transition */}
          <div className="absolute inset-0 w-full h-full z-10 rounded-[39px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={activeScreenshot}
                  alt={`Aerarium Screen ${activeIndex}`} 
                  className="w-full h-full object-cover select-none pointer-events-none rounded-[39px]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Premium Hardware Gloss Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20 rounded-[39px]" />

          {/* Interactive Screen Tap Guide overlay */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-slate-950/80 border border-white/10 rounded-full px-3 py-1.5 text-[9px] font-mono text-slate-400 backdrop-blur-md opacity-45 hover:opacity-100 transition-opacity whitespace-nowrap z-30">
            Scroll chapters to advance
          </div>

        </div>
      </div>
    </div>
  );
}
