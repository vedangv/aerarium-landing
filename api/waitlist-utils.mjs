import { randomBytes } from "node:crypto";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REFERRAL_PATTERN = /^AER-[A-Z0-9]{8}$/;

export function normalizeEmail(value) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(normalized)) return null;
  if (normalized.length > 254) return null;
  return normalized;
}

export function generateReferralCode(randomHex = () => randomBytes(4).toString("hex")) {
  return `AER-${randomHex().replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase().padEnd(8, "0")}`;
}

export function cleanReferralCode(value) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim().toUpperCase();
  return REFERRAL_PATTERN.test(cleaned) ? cleaned : null;
}

function cleanOptionalText(value, fallback = null, maxLength = 160) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.trim();
  if (!cleaned) return fallback;
  return cleaned.slice(0, maxLength);
}

export function buildWaitlistRow({
  email,
  referralCode,
  referredBy,
  source,
  userAgent,
  utmSource,
  utmMedium,
  utmCampaign,
  utmContent,
}) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    throw new Error("invalid_email");
  }

  return {
    email: normalizedEmail,
    referral_code: cleanReferralCode(referralCode) ?? generateReferralCode(),
    referred_by: cleanReferralCode(referredBy),
    source: cleanOptionalText(source, "landing", 64),
    user_agent: cleanOptionalText(userAgent, null, 512),
    utm_source: cleanOptionalText(utmSource, null, 64),
    utm_medium: cleanOptionalText(utmMedium, null, 64),
    utm_campaign: cleanOptionalText(utmCampaign, null, 96),
    utm_content: cleanOptionalText(utmContent, null, 96),
  };
}
