import { appStoreLink, researchLink } from "../lib/product-links.mjs";
import React, { useState, useEffect, useRef } from "react";
import { WaitlistUser } from "../types";
import { ArrowRight, CheckCircle, Mail, Share2, Sparkles, AlertCircle } from "lucide-react";
import { isWaitlistUser } from "../lib/waitlist";
import {
  readAttribution,
  trackFounderListSignup,
  trackOutboundClick,
  trackReferralLinkCopied,
} from "../lib/analytics";

const INVALID_EMAIL = "Please enter a valid email address.";

function barcodeOpacity(code: string, index: number) {
  const charCode = code.charCodeAt(index % code.length);
  return 0.5 + ((charCode + index * 17) % 50) / 100;
}

export default function WaitlistPortal() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [registeredUser, setRegisteredUser] = useState<WaitlistUser | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyError, setCopyError] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aerarium_registered_user");
      if (stored) {
        const user: unknown = JSON.parse(stored);
        if (isWaitlistUser(user)) setRegisteredUser(user);
      }
    } catch {
      // Storage can be unavailable in private or restricted browsing. Signup
      // remains usable; neither storage contents nor email addresses are logged.
    }
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
      requestRef.current?.abort();
    };
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError("");

    if (!email || !email.includes("@") || email.length < 5) {
      setError(INVALID_EMAIL);
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const params = new URLSearchParams(window.location.search);
      const attribution = readAttribution();
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          referredBy: params.get("ref"),
          source: "landing-waitlist-portal",
          ...attribution,
        }),
        signal: controller.signal,
      });

      const payload = await response.json();
      if (!response.ok) {
        setError(payload?.error === "invalid_email"
          ? INVALID_EMAIL
          : payload?.error === "rate_limited"
            ? "Too many signup attempts. Please try again in a few minutes."
            : "Couldn't save your signup. Try again in a moment."
        );
        return;
      }

      const newUser = {
        email: payload.email,
        registeredAt: payload.registeredAt ?? new Date().toISOString(),
        ticketNumber: payload.ticketNumber,
        referralCode: payload.referralCode,
        referralCount: payload.referralCount ?? 0,
        alreadyRegistered: payload.alreadyRegistered,
      };
      if (!isWaitlistUser(newUser)) throw new Error("invalid_signup_response");
      setRegisteredUser(newUser);
      requestAnimationFrame(() => confirmationRef.current?.focus());
      try {
        localStorage.setItem("aerarium_registered_user", JSON.stringify(newUser));
      } catch {
        // The server has already saved the signup. Storage is only a convenience.
      }
      try {
        trackFounderListSignup({
          alreadyRegistered: Boolean(newUser.alreadyRegistered),
          hasReferral: Boolean(params.get("ref")),
          attribution,
        });
      } catch {
        // Optional analytics must not turn a successful signup into an error.
      }
    } catch {
      setError("Couldn't save your signup. Check your connection and try again.");
    } finally {
      clearTimeout(timeout);
      requestRef.current = null;
      setIsSubmitting(false);
    }
  };

  const copyReferralLink = async () => {
    if (!registeredUser) return;
    setCopyError("");
    setCopiedReferral(false);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    const shareUrl = `${window.location.origin}/?ref=${registeredUser.referralCode}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      setCopyError("Couldn't copy automatically. Select and copy your referral link.");
      return;
    }
    setCopiedReferral(true);
    copyTimer.current = setTimeout(() => setCopiedReferral(false), 2000);
    try {
      trackReferralLinkCopied(registeredUser.referralCount);
    } catch {
      // Copying has already succeeded.
    }
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
            <h2 ref={confirmationRef} tabIndex={-1} className="font-display font-bold text-xl text-white focus:outline-none">You're on the founder list</h2>
            <p className="text-slate-400 text-xs mt-1">Launch updates and founder pricing notes will go to: {registeredUser.email}</p>
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
                  AERARIUM FOUNDER LIST
                </span>
                <h3 className="font-display font-medium text-lg text-white mt-1">
                  Launch Pass
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block">ACCESS ID</span>
                <span className="font-mono text-emerald-400 font-bold tracking-tight text-sm">
                  {registeredUser.referralCode}
                </span>
              </div>
            </div>

            {/* Middle Section: Stats */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 my-2 text-left">
              <div>
                <span className="text-[10px] font-mono text-slate-500 block">STATUS</span>
                <span className="text-xs font-semibold text-white tracking-wide uppercase">
                  Launch updates
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 block">REFERRED SIGNUPS</span>
                <span className="text-xs font-semibold text-cyan-400 tracking-wide">
                  {registeredUser.referralCount}
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
                      opacity: barcodeOpacity(registeredUser.referralCode, i),
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
            <h3 className="text-xs font-semibold text-white flex items-center justify-center space-x-1.5">
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Share launch updates</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Share this link with people who want Aerarium launch updates. We track referrals quietly for future founder offers.
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                readOnly
                aria-label="Your referral link"
                onFocus={(event) => event.currentTarget.select()}
                value={`${window.location.origin}/?ref=${registeredUser.referralCode}`}
                className="bg-slate-900 border border-white/5 rounded-lg py-2 px-3 text-[11px] font-mono text-slate-300 w-full select-all focus:outline-none focus:border-emerald-500/20"
              />
              <button
                onClick={copyReferralLink}
                className="py-3 px-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-xs font-semibold text-slate-950 hover:opacity-90 transition-all shrink-0 cursor-pointer flex items-center space-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                id="btn-copy-referral-link"
              >
                <Share2 className="w-3 h-3" />
                <span>{copiedReferral ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p role="status" className="text-xs text-slate-300">{copyError || (copiedReferral ? "Referral link copied." : "")}</p>
          </div>

        </div>
      ) : (
        /* Empty Input Registration State */
        <div className="space-y-6" id="waitlist-register-view">
          <div>
            <h2 className="font-display font-medium text-lg text-white">
              Founder launch list
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Get App Store launch updates, founder pricing notes, and major Portfolio release news.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["App Store launch alerts", "Founder pricing notes", "No trading access requested"].map((item) => (
              <span key={item} className="rounded-full border border-emerald-400/16 bg-emerald-400/[0.07] px-3 py-1.5 text-[10px] font-bold text-emerald-200">
                {item}
              </span>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4" aria-busy={isSubmitting}>
            <div className="space-y-1.5">
              <label htmlFor="input-waitlist-email" className="block text-sm font-medium text-slate-300">Email address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  aria-describedby={error ? "waitlist-error" : undefined}
                  aria-invalid={error === INVALID_EMAIL}
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full bg-slate-950/80 border border-white/10 focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 rounded-xl py-3 pl-10 pr-4 text-base font-mono text-slate-100 placeholder-slate-400 focus:outline-none transition-all duration-300 shadow-inner"
                  id="input-waitlist-email"
                />
              </div>
              {error && (
                <div id="waitlist-error" role="alert" className="flex items-center space-x-1.5 text-rose-300 px-1 pt-1.5 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <p className="text-xs leading-relaxed">{error}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-500 p-[1px] rounded-xl hover:shadow-lg hover:shadow-cyan-400/15 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
                isSubmitting ? "cursor-wait opacity-75" : "cursor-pointer"
              }`}
              id="btn-waitlist-submit"
            >
              <div className="bg-slate-950 rounded-[11px] py-3 text-xs font-semibold text-white group-hover:bg-transparent group-hover:text-slate-950 transition-colors flex items-center justify-center space-x-2">
                <span>{isSubmitting ? "Saving..." : "Get launch updates"}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSubmitting ? "animate-pulse" : "group-hover:translate-x-0.5"}`} />
              </div>
            </button>
          </form>

          {/* Sourced direct Apple App Store download link */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-[10px] font-mono text-slate-500 uppercase">Already ready to download?</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={appStoreLink("waitlist_portal")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutboundClick("appstore", "waitlist_portal")}
              className="w-full relative block text-center bg-slate-900 hover:bg-slate-850 border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl py-3 text-xs font-semibold text-emerald-400 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              id="link-appstore-direct"
            >
              <span className="flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Get the App Now</span>
              </span>
            </a>
            
            <a
              href={researchLink("waitlist_portal")}
              target="_blank"
              rel="noopener"
              onClick={() => trackOutboundClick("research", "waitlist_portal")}
              className="w-full relative block text-center bg-slate-900 hover:bg-slate-850 border border-cyan-500/20 hover:border-cyan-500/40 rounded-xl py-3 text-xs font-semibold text-cyan-400 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              id="link-research-direct"
            >
              <span className="flex items-center justify-center space-x-2">
                <ArrowRight className="w-4 h-4" />
                <span>Open Web Research</span>
              </span>
            </a>
          </div>

          {/* Secure lock disclaimer footer */}
          <div className="flex items-center space-x-2 bg-slate-950/40 p-3 rounded-xl border border-white/5 text-[10px] text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Email signup is for launch updates. App Store download and Research stay available through the links above.</span>
          </div>
        </div>
      )}
    </div>
  );
}
