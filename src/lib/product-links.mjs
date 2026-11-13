// Canonical product identities. Keep tracking parameters out of structured data.
export const APP_STORE_URL = 'https://apps.apple.com/app/aerarium/id6760155168';
export const RESEARCH_URL = 'https://research.aerarium.app/';

function crosslink(destination, campaign, placement) {
  const url = new URL(destination);
  url.searchParams.set('utm_source', 'landing');
  url.searchParams.set('utm_medium', 'crosslink');
  url.searchParams.set('utm_campaign', campaign);
  url.searchParams.set('utm_content', placement);
  return url.href;
}

export const appStoreLink = placement => crosslink(APP_STORE_URL, 'app', placement);
export const researchLink = placement => crosslink(RESEARCH_URL, 'research', placement);
