"use client";

import { useEffect, useRef, useState } from "react";
import { statement } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import Glyph from "./Glyph";

/**
 * Two independent behaviours share this section:
 *
 * 1. Word-level phrase cycling. The headline keeps a fixed skeleton and swaps
 *    individual words — outgoing blurs out and lifts, incoming blurs in, with
 *    a ~60ms stagger across the line. Whole-line crossfades look cheap by
 *    comparison; the word-level swap is what sells it.
 *
 * 2. The signature exit: as the section scrolls away the full-bleed dark panel
 *    shrinks into a rounded card, revealing the next section's background
 *    behind it. Scrubbed, so it reverses correctly on the way back up.
 */
export default function Statement() {
  const section = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);

  /* --- phrase cycling ------------------------------------------------- */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (statement.phrases.length < 2) return;

    let inView = false;
    const io = new IntersectionObserver(
      ([e]) => (inView = e.isIntersecting),
      { threshold: 0.35 },
    );
    if (section.current) io.observe(section.current);

    const id = window.setInterval(() => {
      if (!inView || document.hidden) return;
      setSwapping(true);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % statement.phrases.length);
        setSwapping(false);
      }, 380); // matches --d-swap
    }, 3200);

    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, []);

  /* --- shrink-to-card exit -------------------------------------------- */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = section.current;
    const card = panel.current;
    if (!el || !card) return;

    const { gsap, ScrollTrigger } = getGsap();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Below 900px the inset shrink reads as a glitch on a narrow screen,
      // so it only runs on tablet and up.
      mm.add("(min-width: 900px)", () => {
        gsap.fromTo(
          card,
          { borderRadius: 0, scale: 1 },
          {
            borderRadius: 48,
            scale: 0.86,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              // Begins only once the panel's bottom edge reaches the viewport
              // bottom, so the shrink reads as the section leaving rather than
              // as a wobble while it is still being read.
              start: "bottom bottom",
              end: "bottom 22%",
              scrub: 0.6,
            },
          },
        );
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const phrase = statement.phrases[index];

  return (
    <section ref={section} className="statement" data-bg="plum">
      <div ref={panel} className="statement__panel">
        <div className="statement__inner container">
          <div className="statement__block">
          <p className="statement__eyebrow t-eyebrow">{statement.eyebrow}</p>

          <p
            className={`statement__text t-statement ${swapping ? "is-swapping" : ""}`}
            aria-live="polite"
          >
            {phrase.lines.map((line, li) => (
              <span key={li} className="statement__line">
                {line.map((part, pi) => {
                  const delay = { "--w": li * 3 + pi } as React.CSSProperties;
                  return "g" in part ? (
                    <span key={pi} className="statement__word" style={delay}>
                      <Glyph name={part.g} />
                    </span>
                  ) : (
                    <span key={pi} className="statement__word" style={delay}>
                      {part.t}
                    </span>
                  );
                })}
              </span>
            ))}
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
