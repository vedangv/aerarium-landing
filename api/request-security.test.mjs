import assert from 'node:assert/strict';
import { test } from 'node:test';
import signup from './waitlist.js';
import admin from './waitlist-admin.js';

const env = { SUPABASE_URL: 'https://example.invalid', SUPABASE_SERVICE_ROLE_KEY: 'test-service', ADMIN_DASHBOARD_PASSWORD: 'test-password' };
const jsonHeaders = { 'content-type': 'application/json', 'x-real-ip': '203.0.113.10' };
function response() {
  return {
    statusCode: 200, headers: {}, body: null,
    setHeader(key, value) { this.headers[key] = value; },
    status(value) { this.statusCode = value; return this; },
    json(value) { this.body = value; return this; },
  };
}
const noFetch = async () => assert.fail('Rejected requests must not reach the database');

for (const [name, handler, body] of [['signup', signup, { email: 'user@example.com' }], ['admin', admin, { password: 'test-password' }]]) {
  test(`${name}: rejects malformed and non-object JSON without throwing`, async () => {
    for (const invalid of ['null', '[]', 'true', '1', '"text"', '{', null, []]) {
      const res = response();
      await handler({ method: 'POST', headers: jsonHeaders, body: invalid }, res, { env, fetchImpl: noFetch, rateLimitStore: new Map() });
      assert.equal(res.statusCode, 400);
    }
  });

  test(`${name}: rejects browser requests from an untrusted origin`, async () => {
    const res = response();
    await handler({ method: 'POST', body, headers: { ...jsonHeaders, origin: 'https://attacker.invalid' } }, res, { env, fetchImpl: noFetch });
    assert.equal(res.statusCode, 403);
    assert.equal(res.headers['Access-Control-Allow-Origin'], undefined);
  });

  test(`${name}: requires JSON and bounds request size before database access`, async () => {
    for (const [headers, value, expected] of [
      [{ ...jsonHeaders, 'content-type': 'text/plain' }, JSON.stringify(body), 415],
      [{ ...jsonHeaders, 'content-type': 'application/x-www-form-urlencoded' }, body, 415],
      [jsonHeaders, { ...body, padding: 'x'.repeat(8193) }, 413],
      [{ ...jsonHeaders, 'content-length': '100000' }, body, 413],
    ]) {
      const res = response();
      await handler({ method: 'POST', headers, body: value }, res, { env, fetchImpl: noFetch, rateLimitStore: new Map() });
      assert.equal(res.statusCode, expected);
    }
  });

  test(`${name}: does not log upstream response bodies or thrown credentials`, async t => {
    const log = t.mock.method(console, 'error', () => {});
    const res = response();
    await handler({ method: 'POST', headers: jsonHeaders, body }, res, {
      env, rateLimitStore: new Map(),
      fetchImpl: async () => { throw new Error('private-upstream-diagnostic'); },
    });
    assert.equal(res.statusCode, 502);
    assert.ok(!JSON.stringify(log.mock.calls.map(call => call.arguments.map(String))).includes('private-upstream-diagnostic'));
  });

  test(`${name}: advertises supported methods and does not grant cross-origin preflights`, async () => {
    const res = response();
    await handler({ method: 'GET', headers: {} }, res, { env, fetchImpl: noFetch });
    assert.equal(res.statusCode, 405);
    assert.equal(res.headers.Allow, 'POST, OPTIONS');
    assert.equal(res.headers['Cache-Control'], 'no-store');
    const preflight = response();
    await handler({ method: 'OPTIONS', headers: { origin: 'https://attacker.invalid' } }, preflight, { env, fetchImpl: noFetch });
    assert.equal(preflight.statusCode, 403);
    assert.equal(preflight.headers['Access-Control-Allow-Origin'], undefined);
  });
}

test('signup: limits repeated requests, trusts the edge IP over forwarded input, and recovers after expiry', async () => {
  const store = new Map();
  let time = 1000;
  let calls = 0;
  const fetchImpl = async (_url, options) => {
    calls++;
    return options.method === 'POST'
      ? { ok: true, status: 201, json: async () => [{ ...JSON.parse(options.body), created_at: '2026-11-13T00:00:00.000Z' }] }
      : { ok: true, headers: { get: () => '*/0' }, json: async () => [] };
  };
  const submit = async index => {
    const res = response();
    await signup({ method: 'POST', body: { email: `test${index}@example.com` }, headers: { ...jsonHeaders, 'x-forwarded-for': `203.0.113.${index}` } }, res, {
      env, fetchImpl, rateLimitStore: store, now: () => time,
    });
    return res;
  };
  for (let i = 0; i < 5; i++) assert.equal((await submit(i)).statusCode, 200);
  const before = calls;
  const blocked = await submit(6);
  assert.equal(blocked.statusCode, 429);
  assert.equal(blocked.headers['Retry-After'], 900);
  assert.equal(calls, before);
  time += 15 * 60 * 1000;
  assert.equal((await submit(7)).statusCode, 200);
});
