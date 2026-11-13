import assert from "node:assert/strict";
import { describe, it } from "node:test";

import handler from "./waitlist.js";

function createResponse() {
  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
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

describe("waitlist API", () => {
  it("confirms a new signup without depending on a referral-count query", async () => {
    const calls = [];
    const res = createResponse();
    await handler(
      { method: "POST", body: { email: "new@example.com" }, headers: { "content-type": "application/json" } },
      res,
      {
        env: { SUPABASE_URL: "https://example.invalid", SUPABASE_SERVICE_ROLE_KEY: "test-service" },
        rateLimitStore: new Map(),
        fetchImpl: async (_url, options) => {
          calls.push(options.method);
          if (options.method !== "POST") throw new Error("Referral counting is unavailable");
          return { ok: true, status: 201, json: async () => [{ ...JSON.parse(options.body), created_at: "2026-11-13T00:00:00.000Z" }] };
        },
      },
    );
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.email, "new@example.com");
    assert.equal(res.body.alreadyRegistered, false);
    assert.equal(res.body.referralCount, 0);
    assert.equal(res.body.referralCountUnavailable, undefined);
    assert.deepEqual(calls, ["POST"], "A confirmed write must not be repeated because an optional statistic failed");
  });

  for (const countFailure of ["network", "upstream", "missing-total", "invalid-total"]) {
    it(`keeps an existing signup usable when its referral count has a ${countFailure} failure`, async () => {
      const methods = [];
      const res = createResponse();
      await handler(
        { method: "POST", body: { email: "existing@example.com" }, headers: { "content-type": "application/json" } },
        res,
        {
          env: { SUPABASE_URL: "https://example.invalid", SUPABASE_SERVICE_ROLE_KEY: "test-service" },
          rateLimitStore: new Map(),
          fetchImpl: async (url, options) => {
            methods.push(options.method);
            if (options.method === "POST") return { ok: false, status: 409 };
            if (url.includes("email=eq.")) return { ok: true, json: async () => [{ email: "existing@example.com", referral_code: "AER-1234ABCD", created_at: "2026-11-13T00:00:00.000Z" }] };
            if (countFailure === "network") throw new Error("Connection failed");
            return { ok: countFailure !== "upstream", status: countFailure === "upstream" ? 503 : 200, headers: { get: () => countFailure === "invalid-total" ? "*/not-a-count" : null }, json: async () => [] };
          },
        },
      );
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.alreadyRegistered, true);
      assert.equal(res.body.referralCode, "AER-1234ABCD");
      assert.equal(res.body.referralCountUnavailable, true);
      assert.equal(res.body.referralCount, 0, "Retain the numeric field for older clients");
      assert.deepEqual(methods, ["POST", "GET", "GET"], "Optional statistics must not repeat writes or lookups");
    });
  }

  it("rejects invalid email without calling Supabase", async () => {
    const calls = [];
    const res = createResponse();

    await handler(
      { method: "POST", body: { email: "bad" }, headers: { "content-type": "application/json" } },
      res,
      { env: { SUPABASE_URL: "https://example.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "service" }, fetchImpl: (...args) => calls.push(args) },
    );

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.error, "invalid_email");
    assert.equal(calls.length, 0);
  });

  it("returns existing reservation when email already exists", async () => {
    const fetchCalls = [];
    const res = createResponse();
    const fetchImpl = async (url, options) => {
      fetchCalls.push({ url: String(url), method: options?.method });
      if (options?.method === "POST") {
        return { ok: false, status: 409, json: async () => ({ code: "23505" }) };
      }
      if (String(url).includes("referred_by=eq.")) {
        return {
          ok: true,
          status: 200,
          headers: { get: () => "0-0/1" },
          json: async () => [{ id: "referral" }],
        };
      }
      return {
        ok: true,
        status: 200,
        json: async () => [{
          email: "user@example.com",
          referral_code: "AER-EXISTING",
          created_at: "2026-05-23T00:00:00.000Z",
        }],
      };
    };

    await handler(
      { method: "POST", body: { email: "User@Example.COM" }, headers: { "content-type": "application/json", "user-agent": "node" } },
      res,
      { env: { SUPABASE_URL: "https://example.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "service" }, fetchImpl },
    );

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.alreadyRegistered, true);
    assert.equal(res.body.email, "user@example.com");
    assert.equal(res.body.referralCode, "AER-EXISTING");
    assert.equal(res.body.referralCount, 1);
    assert.equal(fetchCalls.length, 3);
  });

  it("persists bounded traffic attribution for new signups", async () => {
    const fetchCalls = [];
    const res = createResponse();
    const fetchImpl = async (url, options) => {
      fetchCalls.push({ url: String(url), method: options?.method, body: options?.body });
      if (options?.method === "POST") {
        return {
          ok: true,
          status: 201,
          json: async () => [{
            ...JSON.parse(options.body),
            created_at: "2026-06-02T00:00:00.000Z",
          }],
        };
      }
      return {
        ok: true,
        status: 200,
        headers: { get: () => "0-0/0" },
        json: async () => [],
      };
    };

    await handler(
      {
        method: "POST",
        body: {
          email: "user@example.com",
          utmSource: "instagram",
          utmMedium: "social",
          utmCampaign: "launch",
          utmContent: "bio-link",
        },
        headers: { "content-type": "application/json", "user-agent": "node" },
      },
      res,
      { env: { SUPABASE_URL: "https://example.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "service" }, fetchImpl },
    );

    assert.equal(res.statusCode, 200);
    const insertBody = JSON.parse(fetchCalls[0].body);
    assert.equal(insertBody.utm_source, "instagram");
    assert.equal(insertBody.utm_medium, "social");
    assert.equal(insertBody.utm_campaign, "launch");
    assert.equal(insertBody.utm_content, "bio-link");
  });

  it("falls back to the legacy insert shape before the attribution migration is applied", async () => {
    const insertBodies = [];
    const res = createResponse();
    const fetchImpl = async (url, options) => {
      if (options?.method === "POST") {
        insertBodies.push(JSON.parse(options.body));
        if (insertBodies.length === 1) return { ok: false, status: 400 };
        return {
          ok: true,
          status: 201,
          json: async () => [{
            ...JSON.parse(options.body),
            created_at: "2026-06-02T00:00:00.000Z",
          }],
        };
      }
      return {
        ok: true,
        status: 200,
        headers: { get: () => "0-0/0" },
        json: async () => [],
      };
    };

    await handler(
      {
        method: "POST",
        body: { email: "legacy@example.com", utmSource: "instagram" },
        headers: { "content-type": "application/json" },
      },
      res,
      { env: { SUPABASE_URL: "https://example.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "service" }, fetchImpl },
    );

    assert.equal(res.statusCode, 200);
    assert.equal(insertBodies.length, 2);
    assert.equal(insertBodies[0].utm_source, "instagram");
    assert.equal("utm_source" in insertBodies[1], false);
  });
});
