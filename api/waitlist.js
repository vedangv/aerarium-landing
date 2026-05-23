import { buildWaitlistRow, generateReferralCode, normalizeEmail } from "./waitlist-utils.mjs";

const TABLE = "landing_waitlist";

function getHeader(headers, key) {
  const value = headers?.[key] ?? headers?.[key.toLowerCase()];
  return Array.isArray(value) ? value.join(", ") : value;
}

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
  if (!supabaseUrl || !serviceKey) {
    throw new Error("missing_supabase_waitlist_env");
  }
  return {
    supabaseUrl: supabaseUrl.replace(/\/$/, ""),
    serviceKey,
  };
}

async function fetchExistingWaitlistUser({ supabaseUrl, serviceKey, email, fetchImpl }) {
  const response = await fetchImpl(
    `${supabaseUrl}/rest/v1/${TABLE}?email=eq.${encodeURIComponent(email)}&select=email,referral_code,created_at`,
    {
      method: "GET",
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

async function insertWaitlistUser({ supabaseUrl, serviceKey, row, fetchImpl }) {
  const response = await fetchImpl(`${supabaseUrl}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });

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

  let detail = "";
  try {
    detail = JSON.stringify(await response.json());
  } catch {
    detail = response.statusText ?? "";
  }
  throw new Error(`supabase_insert_failed_${response.status}:${detail}`);
}

function publicPayload(row, alreadyRegistered = false) {
  return {
    email: row.email,
    registeredAt: row.created_at,
    ticketNumber: row.referral_code,
    referralCode: row.referral_code,
    referralCount: 0,
    alreadyRegistered,
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

  const body = parseBody(req.body);
  const email = normalizeEmail(body.email);
  if (!email) {
    res.status(400).json({ error: "invalid_email" });
    return;
  }

  const env = context.env ?? process.env;
  const fetchImpl = context.fetchImpl ?? fetch;

  let config;
  try {
    config = getConfig(env);
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
    });

    try {
      const inserted = await insertWaitlistUser({ ...config, row, fetchImpl });
      if (!inserted.duplicate) {
        res.status(200).json(publicPayload(inserted.row));
        return;
      }

      const existing = await fetchExistingWaitlistUser({ ...config, email, fetchImpl });
      if (existing) {
        res.status(200).json(publicPayload(existing, true));
        return;
      }
    } catch (error) {
      if (attempt === 2) {
        console.error("[waitlist] submission failed", error);
        res.status(502).json({ error: "waitlist_unavailable" });
        return;
      }
    }
  }

  res.status(502).json({ error: "waitlist_unavailable" });
}
