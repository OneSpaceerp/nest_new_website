"use client";

import { useEffect, useRef, useState } from "react";
import { methodology } from "@/lib/content";
import { useQuietMotion } from "@/lib/useMotionPreference";
import { getGsap } from "@/lib/motion";
import Accent from "./Accent";

/**
 * The pinned checklist. The card sticks while the step list translates upward
 * inside it and steps complete one at a time.
 *
 * Two details make this read as premium rather than as a plain sticky section:
 *  - the list is feathered top and bottom with a mask-image gradient, so rows
 *    dissolve at the card edges instead of being hard-clipped;
 *  - upcoming steps sit at ~35% opacity and lift to full as they activate,
 *    so the eye always knows where it is in the sequence.
 */
export default function HowItWorks() {
  const quiet = useQuietMotion();
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = section.current;
    const ul = list.current;
    if (!el || !ul) return;

    if (quiet) {
      setActive(methodology.steps.length - 1);
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    const count = methodology.steps.length;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          // Pin the header with the card so the section title stays put while
          // the steps advance, as it does in the reference.
          pin: ".hiw__pin",
          pinSpacing: true,
          end: () => `+=${count * 60}%`,
          scrub: 0.5,
          onUpdate: (self) => {
            // Map progress -> step index, biased slightly so the first step is
            // already lit when the card arrives.
            const i = Math.min(count - 1, Math.floor(self.progress * count * 1.08));
            setActive(i);
          },
        });

        // Translate the list so the sequence walks past the card window.
        // The list is not itself a scroll container (the card clips it), so
        // scrollHeight === clientHeight and the travel has to be measured
        // against the card's inner height instead.
        const travel = () => {
          const card = ul.parentElement as HTMLElement | null;
          if (!card) return 0;
          const inner =
            card.clientHeight -
            parseFloat(getComputedStyle(card).paddingTop) -
            parseFloat(getComputedStyle(card).paddingBottom);
          return Math.max(0, ul.scrollHeight - inner);
        };

        gsap.fromTo(
          ul,
          { y: 0 },
          {
            y: () => -travel(),
            ease: "none",
            scrollTrigger: {
              invalidateOnRefresh: true,
              trigger: el,
              start: "top top",
              end: () => `+=${count * 60}%`,
              scrub: 0.5,
            },
          },
        );
      });

      // Mobile: no pin, just reveal each row as it enters.
      mm.add("(max-width: 899px)", () => {
        setActive(count - 1);
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [quiet]);

  return (
    <section ref={section} id="methodology" className="hiw" data-bg="warm">
      <div className="hiw__pin">
        <div className="container">
          <header className="hiw__head">
            <p className="t-eyebrow t-muted">{methodology.eyebrow}</p>
            <h2 className="t-h2">
              {methodology.heading}
              <Accent />
            </h2>
            <p className="t-lead t-muted hiw__lead">{methodology.body}</p>
          </header>

          <div className="hiw__card">
          <ol ref={list} className="hiw__list">
            {methodology.steps.map((step, i) => (
              <li
                key={step.number}
                className={`hiw__step ${i <= active ? "is-done" : ""}`}
              >
                <span className="hiw__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div className="hiw__body">
                  <h3 className="t-step">
                    <span className="hiw__num t-mono">{step.number}</span>
                    {step.title}
                  </h3>
                  <p className="hiw__desc">{step.desc}</p>
                  <div className="hiw__chips">
                    {step.chips.map((c) => (
                      <span key={c} className="chip">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
