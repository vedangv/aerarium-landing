import { createHash, timingSafeEqual } from "node:crypto";

import { getClientIp, readJsonRequest, getRateLimitRecord, rejectRateLimit } from "./request-utils.mjs";

const TABLE = "landing_waitlist";
const MAX_FAILED_ATTEMPTS = 5;
const defaultRateLimitStore = new Map();

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

async function fetchWaitlistRows({ supabaseUrl, serviceKey, fetchImpl, signal }) {
  const requestRows = (select) => fetchImpl(
    `${supabaseUrl}/rest/v1/${TABLE}?select=${select}&order=created_at.desc&limit=500`,
    {
      method: "GET",
      signal,
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

function passwordsMatch(actual, expected) {
  if (typeof actual !== "string" || typeof expected !== "string") return false;
  // Compare fixed-length SHA-256 digests so the check is constant-time and never
  // short-circuits on length (an early length-mismatch return would leak the
  // admin password's length via response timing).
  const actualHash = createHash("sha256").update(actual).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(actualHash, expectedHash);
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
  const env = context.env ?? process.env;
  const body = readJsonRequest(req, res, env);
  if (!body) return;

  const fetchImpl = context.fetchImpl ?? fetch;
  const rateLimitStore = context.rateLimitStore ?? defaultRateLimitStore;
  const now = context.now?.() ?? Date.now();
  const clientIp = getClientIp(req);

  let config;
  try {
    config = { ...getConfig(env), signal: AbortSignal.timeout(8000) };
  } catch {
    res.status(500).json({ error: "admin_not_configured" });
    return;
  }

  const failureRecord = getRateLimitRecord(rateLimitStore, clientIp, now);
  if (!failureRecord || failureRecord.count >= MAX_FAILED_ATTEMPTS) {
    rejectRateLimit(res, failureRecord, now);
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
  } catch {
    console.error("[waitlist-admin] lookup failed");
    res.status(502).json({ error: "waitlist_admin_unavailable" });
  }
}
