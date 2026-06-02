import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildWaitlistRow,
  generateReferralCode,
  normalizeEmail,
} from "./waitlist-utils.mjs";

describe("waitlist utilities", () => {
  it("normalizes valid email addresses", () => {
    assert.equal(normalizeEmail("  Priya.Sharma@Test.Aerarium.IO "), "priya.sharma@test.aerarium.io");
  });

  it("rejects invalid email addresses", () => {
    assert.equal(normalizeEmail("not-an-email"), null);
    assert.equal(normalizeEmail("missing-domain@"), null);
    assert.equal(normalizeEmail(""), null);
  });

  it("generates stable Aerarium referral code shape", () => {
    assert.match(generateReferralCode(() => "abc123ff"), /^AER-[A-Z0-9]{8}$/);
  });

  it("builds a bounded waitlist insert row", () => {
    const row = buildWaitlistRow({
      email: "  User@Example.COM ",
      referralCode: "AER-ABC123FF",
      referredBy: "AER-REF12345",
      source: "landing-waitlist",
      userAgent: "Safari Test Agent",
    });

    assert.deepEqual(row, {
      email: "user@example.com",
      referral_code: "AER-ABC123FF",
      referred_by: "AER-REF12345",
      source: "landing-waitlist",
      user_agent: "Safari Test Agent",
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
    });
  });

  it("sanitizes optional source and referrer fields", () => {
    const row = buildWaitlistRow({
      email: "user@example.com",
      referralCode: "AER-ABC123FF",
      referredBy: "not valid",
      source: "",
      userAgent: "",
    });

    assert.equal(row.referred_by, null);
    assert.equal(row.source, "landing");
    assert.equal(row.user_agent, null);
  });

  it("sanitizes and bounds attribution fields", () => {
    const row = buildWaitlistRow({
      email: "user@example.com",
      referralCode: "AER-ABC123FF",
      utmSource: " instagram ",
      utmMedium: " social ",
      utmCampaign: "x".repeat(120),
      utmContent: " launch-video ",
    });

    assert.equal(row.utm_source, "instagram");
    assert.equal(row.utm_medium, "social");
    assert.equal(row.utm_campaign.length, 96);
    assert.equal(row.utm_content, "launch-video");
  });
});
