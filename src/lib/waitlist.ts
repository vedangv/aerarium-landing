import type { WaitlistUser } from "../types";

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
