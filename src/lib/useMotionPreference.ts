"use client";
import { useSyncExternalStore } from "react";
const query = "(prefers-reduced-motion: reduce), (max-width: 899px), (max-height: 600px)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
/** Avoid large scroll choreography on compact screens and react to preference changes. */
export function useQuietMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => true);
}
