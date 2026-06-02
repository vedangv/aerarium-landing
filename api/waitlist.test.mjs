import assert from "node:assert/strict";
import { describe, it } from "node:test";

import handler from "./waitlist.js";

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

describe("waitlist API", () => {
  it("rejects invalid email without calling Supabase", async () => {
    const calls = [];
    const res = createResponse();

    await handler(
      { method: "POST", body: { email: "bad" }, headers: {} },
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
      { method: "POST", body: { email: "User@Example.COM" }, headers: { "user-agent": "node" } },
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
        headers: { "user-agent": "node" },
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
        headers: {},
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
