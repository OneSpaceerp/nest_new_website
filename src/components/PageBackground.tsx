"use client";

import { useEffect } from "react";
import { getGsap, mixHex } from "@/lib/motion";

/**
 * Interpolates the page background between section colours as you scroll.
 *
 * This is the single biggest contributor to the reference's cinematic feel and
 * the easiest thing to miss: the four sections do not paint their own
 * backgrounds, the *page* lerps between them. Sections opt in with
 * `data-bg="plum|warm|cream"`.
 */

const STOPS: Record<string, string> = {
  hero: "#d3cfca",
  plum: "#40383e",
  warm: "#e0dbd8",
  cream: "#f7f2ef",
  night: "#13100f",
};

export default function PageBackground() {
  useEffect(() => {
    const { ScrollTrigger } = getGsap();

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bg]"),
    );
    if (!sections.length) return;

    const root = document.documentElement;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

    const apply = () => {
      // Viewport-relative geometry, not offsetTop. ScrollTrigger pins sections
      // with transforms and spacer elements, so offsetTop stops describing
      // where a section actually is on screen — which left the page background
      // showing the wrong stop for most of the pinned range.
      const mid = window.innerHeight * 0.5;

      const firstTop = sections[0].getBoundingClientRect().top;
      if (mid < firstTop) {
        // Still above the first colour-bearing section: hold the hero tone and
        // blend toward the first stop as it comes up.
        const to = STOPS[sections[0].dataset.bg ?? "warm"] ?? "#e0dbd8";
        const zone = window.innerHeight * 0.5;
        const t = firstTop - mid < zone ? 1 - (firstTop - mid) / zone : 0;
        const color = mixHex(STOPS.hero, to, Math.max(0, Math.min(1, t)));
        root.style.setProperty("--page-bg", color);
        if (meta) meta.content = color;
        return;
      }

      let from = STOPS[sections[0].dataset.bg ?? "warm"];
      let to = from;
      let t = 0;

      for (let i = 0; i < sections.length; i++) {
        const r = sections[i].getBoundingClientRect();
        if (mid < r.bottom || i === sections.length - 1) {
          from = STOPS[sections[i].dataset.bg ?? "warm"] ?? "#e0dbd8";
          const nextEl = sections[i + 1];
          to = nextEl ? (STOPS[nextEl.dataset.bg ?? "warm"] ?? from) : from;

          // Blend across the last stretch of the section, capped at half a
          // viewport so very tall pinned sections don't fade for thousands of px.
          const zone = Math.min(r.height * 0.22, window.innerHeight * 0.6);
          const dist = r.bottom - mid;
          t = zone > 0 && dist < zone ? 1 - dist / zone : 0;
          break;
        }
      }

      const color = mixHex(from, to, Math.max(0, Math.min(1, t)));
      root.style.setProperty("--page-bg", color);
      if (meta) meta.content = color;
    };

    apply();
    const st = ScrollTrigger.create({ onUpdate: apply, onRefresh: apply });
    window.addEventListener("resize", apply);

    return () => {
      st.kill();
      window.removeEventListener("resize", apply);
    };
  }, []);

  return null;
}
