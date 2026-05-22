import React, { useEffect, useState } from "react";
import { TimeLeft } from "../types";
import { Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";

export default function CountdownTimer() {
  // Target Launch Date: June 09, 2026
  const targetDate = new Date("2026-06-09T00:00:00Z").getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsLaunched(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  const timerItems = [
    { label: "DAYS", value: timeLeft.days, max: 60, color: "from-emerald-400 to-emerald-500" },
    { label: "HOURS", value: timeLeft.hours, max: 24, color: "from-emerald-400 to-cyan-400" },
    { label: "MINUTES", value: timeLeft.minutes, max: 60, color: "from-cyan-400 to-cyan-500" },
    { label: "SECONDS", value: timeLeft.seconds, max: 60, color: "from-cyan-500 to-emerald-400" },
  ];

  return (
    <motion.div 
      className="w-full" 
      id="countdown-timer-container"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {isLaunched ? (
        <div className="text-center py-6">
          <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AERARIUM PORTFOLIO & RESEARCH LIVE</span>
          </span>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header Tagline with pulsing marker */}
          <div className="flex items-center justify-center space-x-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <p className="text-xs font-mono tracking-[0.2em] text-emerald-400 font-semibold uppercase">
              Aerarium Phase-1 Launch Countdown
            </p>
          </div>

          {/* Time Dial grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {timerItems.map((item, index) => {
              const percentage = item.max > 0 ? (item.value / item.max) * 100 : 0;
              return (
                <motion.div
                  key={index}
                  className="relative group rounded-2xl bg-slate-900/45 border border-white/5 p-4 md:p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:border-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                  id={`timer-col-${item.label.toLowerCase()}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  {/* Circular visual sweep background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent pointer-events-none" />

                  {/* Active Segment Gradient Underglow */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent group-hover:via-emerald-400/30 transition-all duration-300" />

                  {/* Large Value */}
                  <div className="relative font-mono text-3xl md:text-4xl font-bold text-white tracking-tight tabular-nums select-none">
                    <span className="text-gradient drop-shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                      {padZero(item.value)}
                    </span>
                  </div>

                  {/* Label */}
                  <span className="text-[10px] font-mono font-medium tracking-widest text-slate-500 mt-2">
                    {item.label}
                  </span>

                  {/* Segment Bar representation */}
                  <div className="w-full bg-slate-950 h-1 rounded-full mt-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${Math.max(4, percentage)}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Target timestamp date tag */}
          <div className="flex items-center justify-center space-x-6 text-xs text-slate-500">
            <span className="flex items-center space-x-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-emerald-400/70" />
              <span>Target: June 09, 2026</span>
            </span>
            <span className="flex items-center space-x-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-400/70" />
              <span>Timezone: UTC</span>
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
