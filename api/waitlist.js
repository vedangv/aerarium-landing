import { buildWaitlistRow, generateReferralCode, normalizeEmail } from "./waitlist-utils.mjs";

import { getHeader, getClientIp, readJsonRequest, getRateLimitRecord, rejectRateLimit } from "./request-utils.mjs";

const TABLE = "landing_waitlist";
const defaultRateLimitStore = new Map();
const MAX_SIGNUP_ATTEMPTS = 5;

function getConfig(env) {
  const supabaseUrl = env.SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("missing_supabase_waitlist_env");
  }
  return {
    supabaseUrl: supabaseUrl.replace(/\/$/, ""),
    serviceKey,
  };
}

async function fetchExistingWaitlistUser({ supabaseUrl, serviceKey, email, fetchImpl, signal }) {
  const response = await fetchImpl(
    `${supabaseUrl}/rest/v1/${TABLE}?email=eq.${encodeURIComponent(email)}&select=email,referral_code,created_at`,
    {
      method: "GET",
      signal,
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`supabase_lookup_failed_${response.status}`);
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] ?? null : null;
}

async function fetchReferralCount({ supabaseUrl, serviceKey, referralCode, fetchImpl, signal }) {
  if (!referralCode) return 0;

  const response = await fetchImpl(
    `${supabaseUrl}/rest/v1/${TABLE}?referred_by=eq.${encodeURIComponent(referralCode)}&select=id&limit=0`,
    {
      method: "GET",
      signal,
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "count=exact",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`supabase_referral_count_failed_${response.status}`);
  }

  const contentRange = response.headers?.get?.("content-range");
  const total = contentRange?.split("/")?.[1];
  if (total && total !== "*") return Number.parseInt(total, 10) || 0;

  const rows = await response.json();
  return Array.isArray(rows) ? rows.length : 0;
}

async function insertWaitlistUser({ supabaseUrl, serviceKey, row, fetchImpl, signal }) {
  const requestInsert = (body) => fetchImpl(`${supabaseUrl}/rest/v1/${TABLE}`, {
    method: "POST",
    signal,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(body),
  });

  let response = await requestInsert(row);
  if (response.status === 400) {
    const legacyRow = { ...row };
    delete legacyRow.utm_source;
    delete legacyRow.utm_medium;
    delete legacyRow.utm_campaign;
    delete legacyRow.utm_content;
    response = await requestInsert(legacyRow);
  }

  if (response.ok) {
    const rows = await response.json();
    return {
      row: Array.isArray(rows) ? rows[0] : rows,
      duplicate: false,
    };
  }

  if (response.status === 409) {
    return {
      row: null,
      duplicate: true,
    };
  }

  throw new Error(`supabase_insert_failed_${response.status}`);
}

async function publicPayload({ row, alreadyRegistered = false, config, fetchImpl }) {
  const referralCount = await fetchReferralCount({
    ...config,
    referralCode: row.referral_code,
    fetchImpl,
  });

  return {
    email: row.email,
    registeredAt: row.created_at,
    ticketNumber: row.referral_code,
    referralCode: row.referral_code,
    referralCount,
    alreadyRegistered,
  };
}

export default async function handler(req, res, context = {}) {
  const env = context.env ?? process.env;
  const body = readJsonRequest(req, res, env);
  if (!body) return;

  const now = context.now?.() ?? Date.now();
  const record = getRateLimitRecord(context.rateLimitStore ?? defaultRateLimitStore, getClientIp(req), now);
  if (!record || record.count >= MAX_SIGNUP_ATTEMPTS) {
    rejectRateLimit(res, record, now);
    return;
  }
  record.count += 1;

  const email = normalizeEmail(body.email);
  if (!email) {
    res.status(400).json({ error: "invalid_email" });
    return;
  }

  const fetchImpl = context.fetchImpl ?? fetch;

  let config;
  try {
    config = { ...getConfig(env), signal: AbortSignal.timeout(8000) };
  } catch {
    res.status(500).json({ error: "waitlist_not_configured" });
    return;
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const row = buildWaitlistRow({
      email,
      referralCode: generateReferralCode(),
      referredBy: body.referredBy ?? body.ref,
      source: body.source ?? "landing",
      userAgent: getHeader(req.headers, "user-agent"),
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      utmContent: body.utmContent,
    });

    try {
      const inserted = await insertWaitlistUser({ ...config, row, fetchImpl });
      if (!inserted.duplicate) {
        res.status(200).json(await publicPayload({ row: inserted.row, config, fetchImpl }));
        return;
      }

      const existing = await fetchExistingWaitlistUser({ ...config, email, fetchImpl });
      if (existing) {
        res.status(200).json(await publicPayload({ row: existing, alreadyRegistered: true, config, fetchImpl }));
        return;
      }
    } catch {
      if (attempt === 2) {
        console.error("[waitlist] submission failed");
        res.status(502).json({ error: "waitlist_unavailable" });
        return;
      }
    }
  }

  res.status(502).json({ error: "waitlist_unavailable" });
}
