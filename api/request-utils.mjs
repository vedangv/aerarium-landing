const MAX_BODY_BYTES = 8192;
const ALLOWED_ORIGINS = new Set([
  'https://aerarium.app', 'https://www.aerarium.app',
  'https://aerariumapp.com', 'https://www.aerariumapp.com',
]);

export function getHeader(headers, key) {
  const value = headers?.[key.toLowerCase()];
  return Array.isArray(value) ? value.join(', ') : value;
}

function allowedOrigin(origin, env) {
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // Vercel provides this deployment's hostname; never trust a client Host header
  // or grant access to all *.vercel.app sites.
  if (env.VERCEL_URL && origin === `https://${env.VERCEL_URL}`) return true;
  return env.NODE_ENV !== 'production' && env.VERCEL !== '1'
    && /^http:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/.test(origin);
}

/** Validate the HTTP boundary before using credentials or contacting Supabase. */
export function readJsonRequest(req, res, env) {
  res.setHeader?.('Cache-Control', 'no-store');
  res.setHeader?.('X-Content-Type-Options', 'nosniff');
  const reject = (status, error) => {
    res.status(status).json({ error });
    return null;
  };

  if (req.method !== 'POST' && req.method !== 'OPTIONS') {
    res.setHeader?.('Allow', 'POST, OPTIONS');
    return reject(405, 'method_not_allowed');
  }
  const origin = getHeader(req.headers, 'origin');
  if ((origin && !allowedOrigin(origin, env)) || getHeader(req.headers, 'sec-fetch-site') === 'cross-site') {
    return reject(403, 'origin_not_allowed');
  }
  // No CORS grants: these forms and API routes are served from the same origin.
  if (req.method === 'OPTIONS') {
    res.status(204).json({});
    return null;
  }
  const type = getHeader(req.headers, 'content-type')?.split(';')[0].trim().toLowerCase();
  if (type !== 'application/json') return reject(415, 'json_required');

  if (Number(getHeader(req.headers, 'content-length')) > MAX_BODY_BYTES) {
    return reject(413, 'body_too_large');
  }
  try {
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (!raw) return reject(400, 'invalid_body');
    if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) return reject(413, 'body_too_large');
    const body = typeof req.body === 'string' ? JSON.parse(raw) : req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) return reject(400, 'invalid_body');
    return body;
  } catch {
    return reject(400, 'invalid_body');
  }
}

export function getClientIp(req) {
  // Vercel overwrites x-real-ip at its edge. Forwarded-for is a local fallback.
  const real = getHeader(req.headers, 'x-real-ip');
  const forwarded = getHeader(req.headers, 'x-forwarded-for');
  return String(real || forwarded?.split(',')[0] || req.socket?.remoteAddress || 'unknown').trim().slice(0, 128);
}

// These limits are per warm function instance, not a distributed abuse barrier.
// Bound memory without evicting active limits (which would enable churn bypass).
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const MAX_RATE_LIMIT_KEYS = 4096;
export function getRateLimitRecord(store, key, now) {
  for (const [ip, record] of store) {
    if (now - record.startedAt >= RATE_LIMIT_WINDOW_MS) store.delete(ip);
  }
  if (store.has(key)) return store.get(key);
  if (store.size >= MAX_RATE_LIMIT_KEYS) return null;
  const record = { count: 0, startedAt: now };
  store.set(key, record);
  return record;
}

export function rejectRateLimit(res, record, now) {
  const remaining = record ? RATE_LIMIT_WINDOW_MS - (now - record.startedAt) : RATE_LIMIT_WINDOW_MS;
  res.setHeader?.('Retry-After', Math.max(1, Math.ceil(remaining / 1000)));
  res.status(429).json({ error: 'rate_limited' });
}
