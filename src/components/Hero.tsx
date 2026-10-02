import Link from "next/link";
import Image from "next/image";
import BrandLink from "./BrandLink";
import Accent from "./Accent";
import { hero } from "@/lib/content";

/**
 * Hero composition, matched to the reference frame at t=36.8s (settled state):
 *
 *   logo          top-left
 *   headline      bottom-left, oversized
 *   "Scroll"      bottom-centre
 *   body + CTA    bottom-right
 *
 * Everything sits on a full-bleed pearlescent field. Copy is low-contrast
 * against it by design — the reference never uses hard black on the hero.
 */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg grain">
        <Image
          src="/illustrations/hero-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero__image"
        />
      </div>

      <div className="hero__inner container">
        <div className="hero__top">
          <div className="hero__brand-stack">
            <BrandLink height={38} priority />
            <p className="hero__top-body t-body">{hero.body}</p>
          </div>

          <p className="hero__status t-mono">
            <span className="hero__dot" aria-hidden="true" />
            {hero.status}
          </p>
        </div>

        <div className="hero__bottom">
          <h1 className="hero__headline t-hero">
            {hero.headline.map((line, i) => (
              <span
                key={line}
                className="hero__line"
                style={{ "--i": i } as React.CSSProperties}
              >
                {line}
                {i === hero.headline.length - 1 ? <Accent /> : null}
              </span>
            ))}
          </h1>

          <div className="hero__scroll" aria-hidden="true">
            <span>Scroll</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="hero__aside">
            <div className="hero__actions">
              <Link href={hero.primary.href} className="btn btn-primary">
                {hero.primary.label}
              </Link>
              <Link href={hero.secondary.href} className="btn btn-ghost">
                {hero.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
