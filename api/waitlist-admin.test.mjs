import assert from "node:assert/strict";
import { describe, it } from "node:test";

import handler from "./waitlist-admin.js";

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(key, value) {
      this.headers[key] = value;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

const env = {
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "service",
  ADMIN_DASHBOARD_PASSWORD: "secret",
};

describe("waitlist admin API", () => {
  it("rejects requests without the admin password", async () => {
    const calls = [];
    const res = createResponse();

    await handler(
      { method: "POST", body: { password: "wrong" }, headers: {} },
      res,
      { env, fetchImpl: (...args) => calls.push(args) },
    );

    assert.equal(res.statusCode, 401);
    assert.equal(res.body.error, "unauthorized");
    assert.equal(calls.length, 0);
  });

  it("returns signup rows and referral counts for the admin dashboard", async () => {
    const res = createResponse();
    const fetchImpl = async () => ({
      ok: true,
      status: 200,
      json: async () => [
        {
          email: "friend@example.com",
          referral_code: "AER-FRIEND1",
          referred_by: "AER-FOUNDER",
          source: "landing",
          utm_source: "instagram",
          utm_medium: "social",
          created_at: "2026-05-23T10:05:00.000Z",
        },
        {
          email: "founder@example.com",
          referral_code: "AER-FOUNDER",
          referred_by: null,
          source: "landing",
          created_at: "2026-05-23T10:00:00.000Z",
        },
      ],
    });

    await handler(
      { method: "POST", body: { password: "secret" }, headers: {} },
      res,
      { env, fetchImpl },
    );

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.totalSignups, 2);
    assert.equal(res.body.totalReferredSignups, 1);
    assert.equal(res.body.topReferrerEmail, "founder@example.com");
    assert.equal(res.body.rows[0].utmSource, "instagram");
    assert.equal(res.body.rows[0].utmMedium, "social");
    assert.equal(res.body.rows[1].email, "founder@example.com");
    assert.equal(res.body.rows[1].referralCount, 1);
  });

  it("falls back to the legacy projection before the attribution migration is applied", async () => {
    const urls = [];
    const res = createResponse();
    const fetchImpl = async (url) => {
      urls.push(String(url));
      if (urls.length === 1) return { ok: false, status: 400 };
      return {
        ok: true,
        status: 200,
        json: async () => [{
          email: "legacy@example.com",
          referral_code: "AER-LEGACY01",
          referred_by: null,
          source: "landing",
          created_at: "2026-05-23T10:00:00.000Z",
        }],
      };
    };

    await handler(
      { method: "POST", body: { password: "secret" }, headers: {} },
      res,
      { env, fetchImpl },
    );

    assert.equal(res.statusCode, 200);
    assert.equal(urls.length, 2);
    assert.match(urls[0], /utm_source/);
    assert.doesNotMatch(urls[1], /utm_source/);
    assert.equal(res.body.rows[0].utmSource, null);
  });

  it("rate limits repeated failed password attempts by forwarded client address", async () => {
    const rateLimitStore = new Map();
    const now = () => Date.UTC(2026, 5, 2);

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const res = createResponse();
      await handler(
        {
          method: "POST",
          body: { password: "wrong" },
          headers: { "x-forwarded-for": "203.0.113.10, 10.0.0.1" },
        },
        res,
        { env, fetchImpl: async () => assert.fail("Supabase should not be called"), rateLimitStore, now },
      );
      assert.equal(res.statusCode, 401);
    }

    const blocked = createResponse();
    await handler(
      {
        method: "POST",
        body: { password: "secret" },
        headers: { "x-forwarded-for": "203.0.113.10, 10.0.0.1" },
      },
      blocked,
      { env, fetchImpl: async () => assert.fail("Supabase should not be called"), rateLimitStore, now },
    );

    assert.equal(blocked.statusCode, 429);
    assert.equal(blocked.body.error, "rate_limited");
    assert.equal(blocked.headers["Retry-After"], 900);
  });
});
