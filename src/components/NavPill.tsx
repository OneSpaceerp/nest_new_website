"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site, nav } from "@/lib/content";

/** Persistent, keyboard-accessible navigation. The floating control layer stays separate from page content. */
export default function NavPill() {
  const shown = true;
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  // Dismiss on Escape or outside click.
  useEffect(() => {
    if (!open) return;
    wrap.current?.querySelector<HTMLAnchorElement>("nav a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
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
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}
      className={`navpill ${shown ? "is-shown" : ""} ${open ? "is-open" : ""}`}
    >
      <nav id="main-navigation" className="navpill__menu" aria-label="Main" hidden={!open}>
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
          ref={trigger}
          aria-controls="main-navigation"
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
