const TABLE = "landing_waitlist";

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
  const response = await fetchImpl(
    `${supabaseUrl}/rest/v1/${TABLE}?select=email,referral_code,referred_by,source,created_at&order=created_at.desc&limit=500`,
    {
      method: "GET",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`supabase_admin_lookup_failed_${response.status}`);
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
}

function buildAdminPayload(rows) {
  const referralCounts = new Map();
  rows.forEach((row) => {
    if (!row.referred_by) return;
    referralCounts.set(row.referred_by, (referralCounts.get(row.referred_by) ?? 0) + 1);
  });

  return {
    totalSignups: rows.length,
    totalReferredSignups: rows.filter((row) => Boolean(row.referred_by)).length,
    rows: rows.map((row) => ({
      email: row.email,
      referralCode: row.referral_code,
      referredBy: row.referred_by,
      source: row.source,
      createdAt: row.created_at,
      referralCount: referralCounts.get(row.referral_code) ?? 0,
    })),
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

  let config;
  try {
    config = getConfig(env);
  } catch {
    res.status(500).json({ error: "admin_not_configured" });
    return;
  }

  const body = parseBody(req.body);
  if (body.password !== config.adminPassword) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  try {
    const rows = await fetchWaitlistRows({ ...config, fetchImpl });
    res.status(200).json(buildAdminPayload(rows));
  } catch (error) {
    console.error("[waitlist-admin] lookup failed", error);
    res.status(502).json({ error: "waitlist_admin_unavailable" });
  }
}
