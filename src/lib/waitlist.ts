import type { WaitlistUser, WaitlistAdminPayload } from "../types";

/** Storage and network responses are untrusted even when TypeScript knows the UI type. */
export function isWaitlistUser(value: unknown): value is WaitlistUser {
  if (!value || typeof value !== "object") return false;
  const user = value as Partial<WaitlistUser>;
  return typeof user.email === "string" && user.email.length <= 254 && user.email.includes("@")
    && typeof user.registeredAt === "string" && Number.isFinite(Date.parse(user.registeredAt))
    && typeof user.referralCode === "string" && /^AER-[A-Z0-9]{8}$/.test(user.referralCode)
    && typeof user.ticketNumber === "string" && user.ticketNumber.length <= 64
    && typeof user.referralCount === "number" && Number.isInteger(user.referralCount) && user.referralCount >= 0
    && (user.referralCountUnavailable === undefined || typeof user.referralCountUnavailable === "boolean")
    && (user.alreadyRegistered === undefined || typeof user.alreadyRegistered === "boolean");
}

export function isWaitlistAdminPayload(value: unknown): value is WaitlistAdminPayload {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<WaitlistAdminPayload>;
  const count = (number: unknown) => typeof number === "number" && Number.isSafeInteger(number) && number >= 0;
  const optionalText = (text: unknown) => text === null || typeof text === "string";
  return count(data.totalSignups) && count(data.totalReferredSignups)
    && optionalText(data.topReferrerEmail)
    && Array.isArray(data.rows) && data.rows.length <= 500
    && data.rows.every(row => row && typeof row === "object"
      && typeof row.email === "string" && typeof row.referralCode === "string"
      && typeof row.source === "string" && typeof row.createdAt === "string"
      && optionalText(row.referredBy) && count(row.referralCount)
      && [row.utmSource, row.utmMedium, row.utmCampaign, row.utmContent].every(optionalText));
}
