import React, { useEffect, useState } from "react";
import { TimeLeft } from "../types";
import { Calendar, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function CountdownTimer() {
    // Target Launch Date: June 09, 2026 12:00 AM PDT
  const targetDate = new Date("2026-06-09T00:00:00-07:00").getTime();
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

  return (
    <motion.div 
      className="w-full" 
      id="countdown-timer-container"
      initial={false}
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
        <div className="rounded-3xl border border-white/6 bg-slate-900/35 px-5 py-5 text-left shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:px-7">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/18 bg-emerald-400/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Beta is live now
              </div>
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                  App Store launch target: June 2026
                </h2>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-400">
                  Portfolio is free during beta. Join the founder list for launch updates and early pricing notes.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-mono">
                  <Calendar className="h-3.5 w-3.5 text-emerald-300/80" />
                  Target date: June 09, 2026
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Clock className="h-3.5 w-3.5 text-cyan-300/80" />
                  {timeLeft.days}d {padZero(timeLeft.hours)}h remaining
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex">
              <a
                href="https://testflight.apple.com/join/Xna39VKU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Join beta
              </a>
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/8 bg-slate-950/50 px-4 py-3 text-xs font-bold text-slate-200 transition hover:border-emerald-400/30 hover:text-white"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                Founder list
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
