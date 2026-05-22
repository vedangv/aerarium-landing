import React, { useState, useEffect } from "react";
import { WaitlistUser } from "../types";
import { ArrowRight, CheckCircle, Mail, Share2, Sparkles, Trophy, RotateCcw, AlertCircle } from "lucide-react";

export default function WaitlistPortal() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [registeredUser, setRegisteredUser] = useState<WaitlistUser | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [totalSignups, setTotalSignups] = useState(8744);

  useEffect(() => {
    // Read from local storage upon mount to check if user already signed up
    const stored = localStorage.getItem("aerarium_registered_user");
    if (stored) {
      try {
        setRegisteredUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored waitlist user");
      }
    }

    // Dynamic ticking signup tracker for hyper hype
    const interval = setInterval(() => {
      setTotalSignups((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@") || email.length < 5) {
      setError("Please enter a valid personal or corporate email address.");
      return;
    }

    const referralCode = `AER-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const ticketNo = Math.floor(Math.random() * 2000) + totalSignups + 1;
    const ticketNumber = `#${ticketNo.toString().padStart(5, "0")}`;

    const newUser: WaitlistUser = {
      email,
      registeredAt: new Date().toISOString(),
      ticketNumber,
      referralCode,
      referralCount: 0,
    };

    localStorage.setItem("aerarium_registered_user", JSON.stringify(newUser));
    setRegisteredUser(newUser);
    setTotalSignups((prev) => prev + 1);
  };

  const copyReferralLink = () => {
    if (!registeredUser) return;
    const shareUrl = `${window.location.origin}/?ref=${registeredUser.referralCode}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const handleReset = () => {
    localStorage.removeItem("aerarium_registered_user");
    setRegisteredUser(null);
    setEmail("");
  };

  return (
    <div
      className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden"
      style={{ boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.05)" }}
      id="aerarium-waitlist-portal"
    >
      {/* Background neon radial flare styling */}
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none animate-pulse" />

      {registeredUser ? (
        /* Confirmed Ticket State */
        <div className="space-y-6 text-center animate-fadeIn" id="waitlist-registered-view">
          <div className="inline-flex h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 items-center justify-center text-emerald-400 mb-2">
            <CheckCircle className="w-6 h-6 animate-bounce" />
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-white">Priority Claim Verified</h3>
            <p className="text-slate-400 text-xs mt-1">A holographic entry pass was reserved for: {registeredUser.email}</p>
          </div>

          {/* Interactive Hype Ticket Visualizer */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 border-2 border-emerald-500/35 overflow-hidden group shadow-[0_15px_40px_rgba(16,185,129,0.1)]">
            {/* Gloss shine card overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/2 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
            
            {/* Decentered vector dash cutouts for real physical ticket feeling */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[10px] w-5 h-5 rounded-full bg-slate-950 border-r border-emerald-500/35" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[10px] w-5 h-5 rounded-full bg-slate-950 border-l border-emerald-500/35" />

            <div className="flex justify-between items-start text-left mb-6">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                  AERARIUM PORTFOLIO
                </span>
                <h4 className="font-display font-medium text-lg text-white mt-1">
                  Access Ticket
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block">ALPHA QUEUE</span>
                <span className="font-mono text-emerald-400 font-bold tracking-tight text-sm">
                  {registeredUser.ticketNumber}
                </span>
              </div>
            </div>

            {/* Middle Section: Stats */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 my-2 text-left">
              <div>
                <span className="text-[10px] font-mono text-slate-500 block">TIER RATING</span>
                <span className="text-xs font-semibold text-white tracking-wide uppercase">
                  Genesis Reservist
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 block">REFERRALS</span>
                <span className="text-xs font-semibold text-cyan-400 tracking-wide">
                  {registeredUser.referralCount} ACTIVE
                </span>
              </div>
            </div>

            {/* Barcode representation */}
            <div className="mt-5 space-y-2">
              <div className="h-6 w-full flex space-x-[2px] overflow-hidden opacity-45 grayscale hover:grayscale-0 transition-all duration-300">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-white rounded-sm"
                    style={{
                      width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px`,
                      opacity: Math.random() * 0.5 + 0.5,
                    }}
                  />
                ))}
              </div>
              <span className="text-[8px] font-mono text-slate-500 tracking-[8px] uppercase">
                {registeredUser.referralCode}
              </span>
            </div>
          </div>

          {/* Referral action module */}
          <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-white/2">
            <h4 className="text-xs font-semibold text-white flex items-center justify-center space-x-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Invite Peers to Boost Queue Slot</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Each priority registration made with your link bumps your access queue positioning up by 1500 places.
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/?ref=${registeredUser.referralCode}`}
                className="bg-slate-900 border border-white/5 rounded-lg py-2 px-3 text-[11px] font-mono text-slate-300 w-full select-all focus:outline-none focus:border-emerald-500/20"
              />
              <button
                onClick={copyReferralLink}
                className="py-2 px-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all shrink-0 cursor-pointer flex items-center space-x-1"
                id="btn-copy-referral-link"
              >
                <Share2 className="w-3 h-3" />
                <span>{copiedReferral ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleReset}
              className="text-[10px] text-slate-500 hover:text-slate-300 font-mono inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
              id="btn-waitlist-register-another"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Register clean for demo</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Input Registration State */
        <div className="space-y-6" id="waitlist-register-view">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                Phase-1 iOS Beta Active
              </span>
            </div>
            <h3 className="font-display font-medium text-lg text-white">
              Portfolio access opens first on iOS
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Research is already usable on web. Portfolio is the private discipline layer that will launch through iOS early access. Join <strong className="text-emerald-400 font-medium">{totalSignups.toLocaleString()} allocators</strong> in the queue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full bg-slate-950/80 border border-white/5 focus:border-cyan-500/20 rounded-xl py-3 pl-10 pr-4 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none transition-all duration-300 shadow-inner"
                  id="input-waitlist-email"
                />
              </div>
              {error && (
                <div className="flex items-center space-x-1.5 text-rose-400 px-1 pt-1.5 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <p className="text-[10px] font-mono leading-tight">{error}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-500 p-[1px] rounded-xl hover:shadow-lg hover:shadow-cyan-400/15 transition-all duration-300 cursor-pointer"
              id="btn-waitlist-submit"
            >
              <div className="bg-slate-950 rounded-[11px] py-3 text-xs font-semibold text-white group-hover:bg-transparent transition-colors flex items-center justify-center space-x-2">
                <span>Secure Gen-0 Priority Pass</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </form>

          {/* Sourced direct Apple TestFlight download link */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-[10px] font-mono text-slate-500 uppercase">Or Immediate Early TestFlight</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <a
            href="https://testflight.apple.com/join/Xna39VKU"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full relative block text-center bg-slate-900 hover:bg-slate-850 border border-white/10 rounded-xl py-3 text-xs font-semibold text-emerald-400 transition-colors cursor-pointer"
            id="link-testflight-direct"
          >
            <span className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Get Immediate iOS Beta (TestFlight) →</span>
            </span>
          </a>

          {/* Secure lock disclaimer footer */}
          <div className="flex items-center space-x-2 bg-slate-950/40 p-3 rounded-xl border border-white/5 text-[10px] text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Portfolio access launches first on iOS. The private investing rules model lives securely on your device.</span>
          </div>
        </div>
      )}
    </div>
  );
}
