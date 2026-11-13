import { useSyncExternalStore } from "react";

// Pinned scenes need enough room for both the fixed navigation and the content.
// CSS pixels also account for zoom: zooming in falls back to normal page flow.
const QUERY = "(max-width: 1023px), (max-height: 759px), (prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function useStaticLayout() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true,
  );
}
