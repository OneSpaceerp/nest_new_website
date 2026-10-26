"use client";

import { useEffect, useRef } from "react";
import { statement } from "@/lib/content";
import { useQuietMotion } from "@/lib/useMotionPreference";
import { getGsap } from "@/lib/motion";
import Glyph from "./Glyph";

/** A stable headline with a restrained scroll-linked exit on spacious screens. */
export default function Statement() {
  const quiet = useQuietMotion();
  const section = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  /* --- shrink-to-card exit -------------------------------------------- */
  useEffect(() => {
    if (quiet) return;
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
  }, [quiet]);

  const phrase = statement.phrases[0];

  return (
    <section ref={section} className="statement" data-bg="plum">
      <div ref={panel} className="statement__panel">
        <div className="statement__inner container">
          <div className="statement__block">
          <p className="statement__eyebrow t-eyebrow">{statement.eyebrow}</p>

          <p
            className="statement__text t-statement"
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
