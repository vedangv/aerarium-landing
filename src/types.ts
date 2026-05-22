export interface WaitlistUser {
  email: string;
  registeredAt: string;
  ticketNumber: string;
  referralCode: string;
  referralCount: number;
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
