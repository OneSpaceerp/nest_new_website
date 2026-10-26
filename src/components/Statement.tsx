"use client";

import { useEffect, useRef, useState } from "react";
import { statement } from "@/lib/content";
import { useQuietMotion } from "@/lib/useMotionPreference";
import { getGsap } from "@/lib/motion";
import Glyph from "./Glyph";

/** Rotating business goals with optional motion and a restrained desktop exit. */
export default function Statement() {
  const quiet = useQuietMotion();
  const section = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = section.current;
    if (!el || statement.phrases.length < 2) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let interval: number | undefined;
    let timeout: number | undefined;
    const stop = () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      setSwapping(false);
    };
    const sync = () => {
      stop();
      if (paused || preference.matches || !visible || document.hidden) return;
      interval = window.setInterval(() => {
        setSwapping(true);
        timeout = window.setTimeout(() => {
          setIndex((current) => (current + 1) % statement.phrases.length);
          setSwapping(false);
        }, 380);
      }, 3200);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.2 });
    observer.observe(el);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [paused]);

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

  const phrase = statement.phrases[index];

  return (
    <section ref={section} className="statement" data-bg="plum">
      <div ref={panel} className="statement__panel">
        <div className="statement__inner container">
          <div className="statement__block">
          <p className="statement__eyebrow t-eyebrow">{statement.eyebrow}</p>

          <p
            className={`statement__text t-statement ${swapping ? "is-swapping" : ""}`}
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
          <button type="button" className="motion-control statement__pause" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
            {paused ? "Resume text animation" : "Pause text animation"}
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}
