"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site, nav } from "@/lib/content";

/**
 * The floating bottom pill from the reference: cream, fully rounded, centred,
 * 24px off the viewport bottom. It is hidden over the hero and slides up once
 * the hero has been scrolled past.
 *
 * The reference is a single-page site so its pill holds only a wordmark and a
 * CTA. NSD has eleven routes, so the wordmark doubles as a menu trigger —
 * the pill expands upward into the full navigation.
 */
export default function NavPill() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  // Reveal once the first viewport has been passed.
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dismiss on Escape or outside click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={wrap}
      className={`navpill ${shown ? "is-shown" : ""} ${open ? "is-open" : ""}`}
    >
      <nav className="navpill__menu" aria-label="Main" hidden={!open}>
        <ul>
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="navpill__bar">
        <button
          type="button"
          className="navpill__brand"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {/*
            The compact cyan "nest" mark, not the full badge. The badge is
            2.54:1 and carries a "Software Development" line at 12% of its
            height — inside a 64px pill that line is under 3px and reads as
            dirt. A wordmark-only mark is what this slot needs.
          */}
          <Image
            src={site.wordmark}
            alt=""
            aria-hidden="true"
            width={Math.round(22 * site.wordmarkRatio)}
            height={22}
            unoptimized
            className="navpill__mark"
          />
          {/* No text label: the mark beside it already says "nest", and
              "nest Nest SD" reads as a duplication. The chevron carries the
              menu affordance. */}
          <svg
            className="navpill__chev"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 15l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <Link href="/#contact" className="btn btn-primary navpill__cta">
          Partner With Us
        </Link>
      </div>
    </div>
  );
}
