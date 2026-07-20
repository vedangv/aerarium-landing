import { track } from "@vercel/analytics";

type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

type AnalyticsValue = string | number | boolean;

export function readAttribution(search = window.location.search): Attribution {
  const params = new URLSearchParams(search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmContent: params.get("utm_content") || undefined,
  };
}

function eventProperties(properties: Record<string, AnalyticsValue | undefined>) {
  return Object.fromEntries(
    Object.entries(properties).filter((entry): entry is [string, AnalyticsValue] => entry[1] !== undefined),
  );
}

function attributionProperties(attribution = readAttribution()) {
  return eventProperties({
    utmSource: attribution.utmSource,
    utmMedium: attribution.utmMedium,
    utmCampaign: attribution.utmCampaign,
    utmContent: attribution.utmContent,
  });
}

export function trackOutboundClick(destination: "appstore" | "research" | "instagram" | "linkedin", placement: string) {
  track(`outbound_${destination}_click`, {
    placement,
    ...attributionProperties(),
  });
}

export function trackFounderListSignup({
  alreadyRegistered,
  hasReferral,
  attribution,
}: {
  alreadyRegistered: boolean;
  hasReferral: boolean;
  attribution: Attribution;
}) {
  track("founder_list_signup", {
    alreadyRegistered,
    hasReferral,
    ...attributionProperties(attribution),
  });
}

export function trackReferralLinkCopied(referralCount: number) {
  track("referral_link_copied", {
    referralCount,
    ...attributionProperties(),
  });
}
