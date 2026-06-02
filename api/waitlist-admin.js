import { createHash, timingSafeEqual } from "node:crypto";

const TABLE = "landing_waitlist";
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const defaultRateLimitStore = new Map();

function parseBody(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function getConfig(env) {
  const supabaseUrl = env.SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const adminPassword = env.ADMIN_DASHBOARD_PASSWORD;

  if (!supabaseUrl || !serviceKey || !adminPassword) {
    throw new Error("missing_admin_waitlist_env");
  }

  return {
    supabaseUrl: supabaseUrl.replace(/\/$/, ""),
    serviceKey,
    adminPassword,
  };
}

async function fetchWaitlistRows({ supabaseUrl, serviceKey, fetchImpl }) {
  const requestRows = (select) => fetchImpl(
    `${supabaseUrl}/rest/v1/${TABLE}?select=${select}&order=created_at.desc&limit=500`,
    {
      method: "GET",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    },
  );

  let response = await requestRows("email,referral_code,referred_by,source,utm_source,utm_medium,utm_campaign,utm_content,created_at");
  if (response.status === 400) {
    response = await requestRows("email,referral_code,referred_by,source,created_at");
  }

  if (!response.ok) {
    throw new Error(`supabase_admin_lookup_failed_${response.status}`);
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
}

function getClientIp(req) {
  // On Vercel, `x-real-ip` is set by the edge to the true client IP and cannot
  // be spoofed (Vercel overwrites any client-supplied value), so it can't be
  // rotated to escape the rate limit. Prefer it. The `x-forwarded-for` fallback
  // is only for non-Vercel/local environments.
  const realIp = req.headers?.["x-real-ip"];
  if (realIp) {
    return String(Array.isArray(realIp) ? realIp[0] : realIp).trim() || "unknown";
  }
  const forwarded = req.headers?.["x-forwarded-for"];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
}

function passwordsMatch(actual, expected) {
  if (typeof actual !== "string" || typeof expected !== "string") return false;
  // Compare fixed-length SHA-256 digests so the check is constant-time and never
  // short-circuits on length (an early length-mismatch return would leak the
  // admin password's length via response timing).
  const actualHash = createHash("sha256").update(actual).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(actualHash, expectedHash);
}

function getFailureRecord(store, key, now) {
  const current = store.get(key);
  if (!current || now - current.startedAt >= RATE_LIMIT_WINDOW_MS) {
    const fresh = { count: 0, startedAt: now };
    store.set(key, fresh);
    return fresh;
  }
  return current;
}

function buildAdminPayload(rows) {
  const referralCounts = new Map();
  rows.forEach((row) => {
    if (!row.referred_by) return;
    referralCounts.set(row.referred_by, (referralCounts.get(row.referred_by) ?? 0) + 1);
  });

  const mappedRows = rows.map((row) => ({
    email: row.email,
    referralCode: row.referral_code,
    referredBy: row.referred_by,
    source: row.source,
    utmSource: row.utm_source ?? null,
    utmMedium: row.utm_medium ?? null,
    utmCampaign: row.utm_campaign ?? null,
    utmContent: row.utm_content ?? null,
    createdAt: row.created_at,
    referralCount: referralCounts.get(row.referral_code) ?? 0,
  }));
  const topReferrer = mappedRows.reduce(
    (current, row) => (row.referralCount > (current?.referralCount ?? 0) ? row : current),
    null,
  );

  return {
    totalSignups: rows.length,
    totalReferredSignups: rows.filter((row) => Boolean(row.referred_by)).length,
    topReferrerEmail: topReferrer?.email ?? null,
    rows: mappedRows,
  };
}

export default async function handler(req, res, context = {}) {
  res.setHeader?.("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.status(204).json({});
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const env = context.env ?? process.env;
  const fetchImpl = context.fetchImpl ?? fetch;
  const rateLimitStore = context.rateLimitStore ?? defaultRateLimitStore;
  const now = context.now?.() ?? Date.now();
  const clientIp = getClientIp(req);

  let config;
  try {
    config = getConfig(env);
  } catch {
    res.status(500).json({ error: "admin_not_configured" });
    return;
  }

  const body = parseBody(req.body);
  const failureRecord = getFailureRecord(rateLimitStore, clientIp, now);
  if (failureRecord.count >= MAX_FAILED_ATTEMPTS) {
    res.setHeader?.("Retry-After", Math.ceil((RATE_LIMIT_WINDOW_MS - (now - failureRecord.startedAt)) / 1000));
    res.status(429).json({ error: "rate_limited" });
    return;
  }

  if (!passwordsMatch(body.password, config.adminPassword)) {
    failureRecord.count += 1;
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  rateLimitStore.delete(clientIp);

  try {
    const rows = await fetchWaitlistRows({ ...config, fetchImpl });
    res.status(200).json(buildAdminPayload(rows));
  } catch (error) {
    console.error("[waitlist-admin] lookup failed", error);
    res.status(502).json({ error: "waitlist_admin_unavailable" });
  }
}
