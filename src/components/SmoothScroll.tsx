"use client";
import { useEffect } from "react";
/** Preserve native scrolling, anchor focus, history and touch gestures. */
export default function SmoothScroll() {
  useEffect(() => { document.documentElement.classList.remove("no-js"); }, []);
  return null;
}
