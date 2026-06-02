export interface WaitlistUser {
  email: string;
  registeredAt: string;
  ticketNumber: string;
  referralCode: string;
  referralCount: number;
  alreadyRegistered?: boolean;
}

export interface WaitlistAdminRow {
  email: string;
  referralCode: string;
  referredBy: string | null;
  source: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  createdAt: string;
  referralCount: number;
}

export interface WaitlistAdminPayload {
  totalSignups: number;
  totalReferredSignups: number;
  topReferrerEmail: string | null;
  rows: WaitlistAdminRow[];
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  category: "Security" | "Liquidity" | "Sovereignty";
  metric: string;
}

export interface SimulatorState {
  treasurySize: number; // in USD
  durationYears: number;
  riskProfile: "safe" | "balanced" | "optimized";
}
