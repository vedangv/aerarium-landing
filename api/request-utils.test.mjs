import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getRateLimitRecord, MAX_RATE_LIMIT_KEYS, RATE_LIMIT_WINDOW_MS, readJsonRequest } from './request-utils.mjs';

test('rate-limit memory is bounded without evicting active client limits', () => {
  const store = new Map();
  for (let i = 0; i < MAX_RATE_LIMIT_KEYS; i++) getRateLimitRecord(store, `ip-${i}`, 0).count = 5;
  assert.equal(getRateLimitRecord(store, 'new-ip', 1), null);
  assert.equal(store.size, MAX_RATE_LIMIT_KEYS);
  assert.equal(getRateLimitRecord(store, 'ip-0', 1).count, 5);
  assert.equal(getRateLimitRecord(store, 'new-ip', RATE_LIMIT_WINDOW_MS).count, 0);
  assert.equal(store.size, 1);
});

test('only canonical, this deployment, or development loopback origins are accepted', () => {
  for (const [origin, env, accepted] of [
    ['https://aerarium.app', { NODE_ENV: 'production' }, true],
    ['https://branch-owner.vercel.app', { VERCEL_URL: 'branch-owner.vercel.app' }, true],
    ['https://attacker.vercel.app', { VERCEL_URL: 'branch-owner.vercel.app' }, false],
    ['https://aerarium.app.attacker.invalid', {}, false],
    ['http://127.0.0.1:3000', { NODE_ENV: 'development' }, true],
    ['http://127.0.0.1:3000', { NODE_ENV: 'production' }, false],
    ['null', {}, false],
  ]) {
    let status;
    const res = { setHeader() {}, status(code) { status = code; return this; }, json() {} };
    const body = readJsonRequest({ method: 'POST', headers: { origin, host: 'attacker.vercel.app', 'content-type': 'application/json; charset=utf-8' }, body: '{"email":"test@example.com"}' }, res, env);
    assert.equal(Boolean(body), accepted, origin);
    if (!accepted) assert.equal(status, 403);
  }
});

test('UTF-8 byte limits also apply to already parsed bodies', () => {
  let status;
  const res = { setHeader() {}, status(code) { status = code; return this; }, json() {} };
  assert.equal(readJsonRequest({ method: 'POST', headers: { 'content-type': 'application/json' }, body: { extra: '🙂'.repeat(2050) } }, res, {}), null);
  assert.equal(status, 413);
});
