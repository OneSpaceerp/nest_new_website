"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { ecosystem } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import BrandArt from "./BrandArt";
import Accent from "./Accent";

/**
 * The card-promotion stack.
 *
 * Three slots: a parked thumbnail top-left (where you came from), the active
 * card, and a parked thumbnail bottom-right under the copy (where you're
 * going). On scroll the next thumbnail grows into the active slot while the
 * active card shrinks into the left thumbnail slot. Both are driven off the
 * same scroll progress so they cross exactly.
 *
 * Implementation: every slide lives in the ACTIVE slot with
 * `transform-origin: 0 0`, and is transformed out to the PREV or NEXT slot.
 * That keeps the maths to one translate + one uniform scale per slide, which
 * the compositor handles without a single layout pass.
 */

/**
 * Track proportions read off the reference at 1848px: thumb 186 / active 857 /
 * copy 400, i.e. roughly 12.6% / 58% / 27%. Holding the thumb and copy columns
 * at fixed pixel widths makes the active card collapse on narrower screens, so
 * they scale with the stage and are only clamped at the extremes.
 */
const GAP = 32;
const THUMB_GAP = 34;
const RATIO = 1.085; // active card w:h

const clamp = (min: number, v: number, max: number) =>
  Math.max(min, Math.min(max, v));

type Geo = { x: number; w: number; h: number; s: number; tw: number; th: number };

export default function Showcase() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const el = section.current;
    const st = stage.current;
    if (!el || !st) return;

    if (prefersReducedMotion() || window.innerWidth < 900) return;
    setEnabled(true);

    const { gsap, ScrollTrigger } = getGsap();
    const count = ecosystem.brands.length;

    /**
     * Slot geometry, measured from the live stage width. The card height is
     * clamped to what actually fits in the pinned viewport — on short screens
     * the natural 1.085 aspect would overflow, so the card narrows instead.
     */
    const geo = (): Geo => {
      const stageW = st.clientWidth;
      const tw = clamp(120, stageW * 0.126, 190);
      const th = tw / 1.09;
      const textW = clamp(290, stageW * 0.27, 420);
      const x = tw + THUMB_GAP;

      const avail = window.innerHeight - 150;
      let w = stageW - x - GAP - textW;
      let h = w / RATIO;
      if (h > avail) {
        h = avail;
        w = h * RATIO;
      }
      st.style.setProperty("--sc-text-w", `${textW}px`);
      return { x, w, h, s: tw / w, tw, th };
    };

    /** Place one slide given its signed distance from the active index. */
    const place = (node: HTMLDivElement, d: number, g: Geo) => {
      const clamp = Math.max(-1, Math.min(1, d));
      const t = Math.abs(clamp);

      // Targets, in the ACTIVE slot's local space (origin top-left).
      const prev = { x: -g.x, y: 0, s: g.s };
      const next = { x: g.w + GAP, y: g.h - g.th, s: g.s };
      const target = clamp < 0 ? prev : next;

      const x = target.x * t;
      const y = target.y * t;
      const s = 1 + (target.s - 1) * t;

      node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
      node.style.zIndex = String(100 - Math.round(t * 100));
      // Parked thumbs sit slightly back so the active card reads as nearer.
      node.style.opacity = t > 0.98 ? "0.92" : "1";
    };

    const layout = () => {
      const g = geo();
      st.style.setProperty("--sc-x", `${g.x}px`);
      st.style.setProperty("--sc-w", `${g.w}px`);
      st.style.setProperty("--sc-h", `${g.h}px`);
      return g;
    };

    let g = layout();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${count * 85}%`,
        pin: ".sc__pin",
        pinSpacing: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onRefresh: () => {
          g = layout();
        },
        onUpdate: (self) => {
          // Continuous index across the whole pinned range.
          const p = self.progress * (count - 1);
          setActive(Math.round(p));
          slides.current.forEach((node, i) => {
            if (node) place(node, i - p, g);
          });

          // Fade the copy out through the handoff. Without this the growing
          // card sweeps across the text column and briefly sits on top of it.
          const frac = Math.abs(p - Math.round(p)); // 0 at rest, 0.5 mid-swap
          st.style.setProperty(
            "--sc-copy-op",
            String(Math.max(0, 1 - frac * 2.6)),
          );
        },
      });
    }, el);

    // Initial paint before the first scroll event.
    slides.current.forEach((node, i) => node && place(node, i - 0, g));

    const onResize = () => {
      g = layout();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    ScrollTrigger.refresh();
    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  const brand = ecosystem.brands[active];

  return (
    <section ref={section} id="ecosystem" className="sc" data-bg="cream">
      <div className="sc__pin">
        <div className="container">
          <div ref={stage} className={`sc__stage ${enabled ? "is-live" : ""}`}>
            <div className="sc__cards">
              {ecosystem.brands.map((b, i) => (
                <div
                  key={b.slug}
                  ref={(n) => {
                    slides.current[i] = n;
                  }}
                  className="sc__slide"
                >
                  <BrandArt
                    variant={b.art}
                    logo={b.logo}
                    name={b.name}
                    instance="stage"
                  />
                </div>
              ))}
            </div>

            <div className="sc__copy">
              {ecosystem.brands.map((b, i) => (
                <div
                  key={b.slug}
                  className={`sc__text ${i === active ? "is-active" : ""}`}
                  aria-hidden={i !== active}
                >
                  <p className="t-eyebrow t-muted">{b.name}</p>
                  <h3 className="t-h3">
                    {b.title}
                    <Accent />
                  </h3>
                  <p className="t-body t-muted">{b.desc}</p>
                  <dl className="spec">
                    {b.specs.map((row) => (
                      <Fragment key={row.k}>
                        <dt>{row.k}</dt>
                        <dd>{row.v}</dd>
                      </Fragment>
                    ))}
                  </dl>
                  <Link href={b.href} className="sc__link" tabIndex={i === active ? 0 : -1}>
                    Explore {b.name}
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/*
            Mobile gets its own markup rather than a CSS reflow of the stage.
            The stage keeps all cards in one container and all copy in another,
            which stacks into card-card-card / copy-copy-copy — the pairing
            breaks. Toggled with CSS, not state, so SSR and hydration agree.
          */}
          <div className="sc__list">
            {ecosystem.brands.map((b) => (
              <article className="sc__listitem" key={b.slug}>
                <div className="sc__listart">
                  <BrandArt
                    variant={b.art}
                    logo={b.logo}
                    name={b.name}
                    instance="list"
                  />
                </div>
                <p className="t-eyebrow t-muted">{b.name}</p>
                <h3 className="t-h3">{b.title}</h3>
                <p className="t-body t-muted">{b.desc}</p>
                <dl className="spec">
                  {b.specs.map((row) => (
                    <Fragment key={row.k}>
                      <dt>{row.k}</dt>
                      <dd>{row.v}</dd>
                    </Fragment>
                  ))}
                </dl>
                <Link href={b.href} className="sc__link">
                  Explore {b.name}
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
