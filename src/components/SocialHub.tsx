import React, { useState } from "react";
import { Send, Twitter, Disc, Users, Share2, Globe, Heart, Megaphone } from "lucide-react";
import { motion } from "motion/react";

export default function SocialHub() {
  const [shares, setShares] = useState<number>(3124);
  const [voted, setVoted] = useState<boolean>(false);

  // Quick viral text copy
  const shareText = "Aerarium brings portfolio discipline and market research under one roof. Join the priority waitlist for early access! https://aerarium.com";
  
  const handleShareClick = (platform: "twitter" | "telegram" | "linkedin") => {
    setShares((prev) => prev + 1);
    let url = "";
    if (platform === "twitter") {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    } else if (platform === "telegram") {
      url = `https://t.me/share/url?url=${encodeURIComponent("https://aerarium.com")}&text=${encodeURIComponent(shareText)}`;
    } else if (platform === "linkedin") {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://aerarium.com")}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSupportVote = () => {
    if (voted) return;
    setVoted(true);
  };

  return (
    <motion.section 
      id="social" 
      className="py-20 relative overflow-hidden bg-slate-950/40 border-t border-b border-white/5"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Absolute glow mesh context */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-14">
        {/* Banner callout */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase font-semibold">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Multiply Organic Hype</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Connect & Broaden the Network
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Help us scale rules-based portfolio discipline and source-first public-market research. Share your priority alpha access to jump the waitlist.
          </p>
        </div>

        {/* Global Floating Counters to trigger massive excitement */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-slate-900/35 border border-white/5 p-5 rounded-2xl">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">COMMUNITY SIZE</span>
            <span className="text-xl font-display font-semibold text-white block mt-1">12,940 APPLICANTS</span>
          </div>

          <div className="bg-slate-900/35 border border-white/5 p-5 rounded-2xl">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">POLICY COMPLIANCE</span>
            <span className="text-xl font-display font-semibold text-emerald-400 block mt-1">92% ALIGNED AVERAGE</span>
          </div>

          <div className="bg-slate-900/35 border border-white/5 p-5 rounded-2xl">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">RESEARCH COVERAGE</span>
            <span className="text-xl font-display font-semibold text-cyan-400 block mt-1">500+ STOCKS SOURCED</span>
          </div>

          <div className="bg-slate-900/35 border border-white/5 p-5 rounded-2xl">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">SHARED PEERS</span>
            <span className="text-xl font-display font-semibold text-purple-400 block mt-1">{(shares + 490).toLocaleString()} MEMBER LINKS</span>
          </div>
        </div>

        {/* Dynamic Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Card 1: X (formerly Twitter) */}
          <div className="glass-card hover:border-slate-500/20 p-6 rounded-3xl flex flex-col justify-between items-center space-y-6 group cursor-pointer transition-all duration-300">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-slate-200 border border-white/10 group-hover:bg-slate-900 group-hover:scale-105 duration-300 mx-auto">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-display font-semibold text-white text-base">Broadcast on X</h4>
              <p className="text-xs text-slate-400 leading-tight">Post your priority code to trend in the personal finance community.</p>
            </div>
            <button
              onClick={() => handleShareClick("twitter")}
              className="py-2.5 px-6 rounded-xl border border-white/10 hover:border-white/30 text-xs font-semibold text-white transition-colors flex items-center space-x-1.5 w-full justify-center bg-slate-950/60 cursor-pointer"
              id="btn-social-twitter"
            >
              <span>Publish Alert</span>
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Telegram */}
          <div className="glass-card hover:border-cyan-500/30 p-6 rounded-3xl flex flex-col justify-between items-center space-y-6 group cursor-pointer transition-all duration-300">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-cyan-950/20 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-900/10 group-hover:scale-105 duration-300 mx-auto">
                <Send className="w-5 h-5 text-cyan-400" />
              </div>
              <h4 className="font-display font-semibold text-white text-base">Join Telegram</h4>
              <p className="text-xs text-slate-400 leading-tight">Converse directly with the product team and find answers.</p>
            </div>
            <button
              onClick={() => handleShareClick("telegram")}
              className="py-2.5 px-6 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/10 text-xs font-semibold text-cyan-300 transition-all flex items-center space-x-1.5 w-full justify-center bg-slate-950/60 cursor-pointer"
              id="btn-social-telegram"
            >
              <span>Enter Feed Channel</span>
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Discord */}
          <div className="glass-card hover:border-indigo-500/30 p-6 rounded-3xl flex flex-col justify-between items-center space-y-6 group cursor-pointer transition-all duration-300">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-950/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-900/10 group-hover:scale-105 duration-300 mx-auto">
                <Disc className="w-5 h-5 text-indigo-400" />
              </div>
              <h4 className="font-display font-semibold text-white text-base">Syndicate Community</h4>
              <p className="text-xs text-slate-400 leading-tight">Participate inside private AMAs, feature feedback, and early TestFlight releases.</p>
            </div>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-6 rounded-xl border border-indigo-500/20 hover:bg-indigo-500/10 text-xs font-semibold text-indigo-300 transition-all flex items-center space-x-1.5 w-full justify-center bg-slate-950/60 text-center"
              id="btn-social-discord"
            >
              <span>Connect Discord</span>
              <Users className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Supportive interactive pulse click button */}
        <div className="max-w-md mx-auto pt-4">
          <button
            onClick={handleSupportVote}
            className={`py-3 px-6 rounded-2xl border text-xs font-medium font-sans flex items-center justify-center space-x-2 w-full transition-all duration-300 cursor-pointer ${
              voted
                ? "bg-rose-500/10 border-rose-500/40 text-rose-300"
                : "bg-slate-900/45 border-white/5 hover:border-slate-500/20 text-slate-400 hover:text-white"
            }`}
            id="btn-support-vote"
          >
            <Heart className={`w-4 h-4 ${voted ? "fill-rose-400 text-rose-400 animate-[bounce_0.5s_ease-out_1]" : ""}`} />
            <span>{voted ? "Thanks for signaling high excitement!" : "Press here to signal interest & support"}</span>
          </button>
        </div>
      </div>
    </motion.section>
  );
}
