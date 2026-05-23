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
    assert.equal(res.body.rows[1].email, "founder@example.com");
    assert.equal(res.body.rows[1].referralCount, 1);
  });
});
