import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Eye, Loader2, Lock, LogOut, RefreshCw, Users } from "lucide-react";
import { WaitlistAdminPayload } from "../types";
import { isWaitlistAdminPayload } from "../lib/waitlist";

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function AdminWaitlist() {
  const [password, setPassword] = useState("");
  const [payload, setPayload] = useState<WaitlistAdminPayload | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => () => {
    requestRef.current?.abort();
    requestRef.current = null;
  }, []);

  const clearSession = () => {
    requestRef.current?.abort();
    requestRef.current = null;
    setPayload(null);
    setPassword("");
    setIsLoading(false);
    setStatus("");
    requestAnimationFrame(() => passwordRef.current?.focus());
  };

  const fetchRows = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (requestRef.current) return;
    setError("");
    setStatus("");
    setIsLoading(true);
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    const failureMessage = payload
      ? "Could not refresh. The previous list is still shown; try again."
      : "The founder list could not be loaded. Please try again.";

    try {
      const response = await fetch("/api/waitlist-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        signal: controller.signal,
      });
      if (requestRef.current !== controller) return;
      if (response.status === 401) {
        clearSession();
        setError("Password was not accepted. Enter it again.");
        return;
      }
      const data = await response.json();
      if (requestRef.current !== controller) return;

      if (!response.ok) {
        if (data?.error === "admin_not_configured") {
          setError("Admin password is not configured in Vercel.");
        } else if (data?.error === "rate_limited") {
          setError("Too many failed attempts. Wait 15 minutes before trying again.");
        } else {
          setError(failureMessage);
        }
        return;
      }

      if (!isWaitlistAdminPayload(data)) throw new Error("invalid_admin_response");
      setPayload(data);
      setStatus(payload ? "List refreshed." : "Founder list loaded.");
    } catch {
      if (requestRef.current === controller) setError(failureMessage);
    } finally {
      clearTimeout(timeout);
      if (requestRef.current === controller) {
        requestRef.current = null;
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden px-6 py-10">
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">
          <ArrowLeft className="h-4 w-4" />
          Back to landing page
        </a>

        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
              <Lock className="h-3.5 w-3.5" />
              Private admin
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Founder List
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
              View launch-update signups and referral attribution for the Aerarium landing page.
            </p>
          </div>

          {payload && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => fetchRows()}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 hover:border-emerald-400/30 hover:text-emerald-300 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <button
                onClick={() => { clearSession(); setError(""); }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </header>

        {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
        <p role="status" className="sr-only">{status}</p>

        {!payload ? (
          <form onSubmit={fetchRows} className="glass-card max-w-md rounded-3xl p-6 md:p-8">
            <label htmlFor="admin-password" className="block text-sm font-semibold text-white">
              Admin password
            </label>
            <input
              ref={passwordRef}
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-emerald-400/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !password}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
              View founder list
            </button>
          </form>
        ) : (
          <>
            <section className="grid gap-4 md:grid-cols-3">
              <div className="glass-card rounded-3xl p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Signups shown</p>
                <p className="mt-3 font-display text-4xl font-bold text-white">{payload.totalSignups}</p>
              </div>
              <div className="glass-card rounded-3xl p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Referred signups shown</p>
                <p className="mt-3 font-display text-4xl font-bold text-emerald-300">{payload.totalReferredSignups}</p>
              </div>
              <div className="glass-card rounded-3xl p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Top referrer shown</p>
                <p className="mt-3 truncate font-mono text-sm font-bold text-white">
                  {payload.topReferrerEmail ?? "None yet"}
                </p>
              </div>
            </section>

            <p className="text-sm text-slate-400">Counts and referral totals cover only the latest 500 signups shown here.</p>

            <section aria-busy={isLoading} className="glass-card overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <h2 id="admin-signups-heading" className="flex items-center gap-2 font-display text-lg font-bold text-white">
                  <Users className="h-5 w-5 text-emerald-300" />
                  Launch update signups
                </h2>
                <span className="text-xs text-slate-500">Latest 500 rows</span>
              </div>
              <div role="region" aria-labelledby="admin-signups-heading" tabIndex={0} className="overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-300">
                <table aria-labelledby="admin-signups-heading" className="min-w-full text-left text-sm">
                  <thead className="border-b border-white/10 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">Email</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Code</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Referred by</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Referrals</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Source</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Campaign</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {payload.rows.map((row) => (
                      <tr key={`${row.email}-${row.createdAt}`} className="text-slate-300">
                        <td className="whitespace-nowrap px-5 py-4 font-semibold text-white">{row.email}</td>
                        <td className="whitespace-nowrap px-5 py-4 font-mono text-emerald-300">{row.referralCode}</td>
                        <td className="whitespace-nowrap px-5 py-4 font-mono text-slate-400">{row.referredBy ?? "-"}</td>
                        <td className="whitespace-nowrap px-5 py-4">{row.referralCount}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-slate-400">{row.source}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                          {[row.utmSource, row.utmMedium, row.utmCampaign, row.utmContent].filter(Boolean).join(" / ") || "-"}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-slate-400">{formatDate(row.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
