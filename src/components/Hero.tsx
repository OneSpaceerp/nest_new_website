import Link from "next/link";
import Image from "next/image";
import BrandLink from "./BrandLink";
import Accent from "./Accent";
import { hero } from "@/lib/content";

/**
 * Craft hero.
 *
 *   left   brand, eyebrow, headline, lede, actions
 *   right  the paper stage: the illustration mounted on a cut-corner sheet,
 *          two offset sheets behind it, and a cyan and a navy paper strip
 *          crossing underneath, like a model laid out on a work table.
 *
 * The cut corners (top-left and bottom-right) come straight from the Nest
 * logo plate, so the brand's own silhouette is the page's signature shape.
 * The stage is decorative and adds no copy of its own.
 */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner container">
        <div className="hero__copy">
          <div className="hero__brandrow">
            <BrandLink height={38} priority />
            <p className="hero__status t-mono">
              <span className="hero__dot" aria-hidden="true" />
              {hero.status}
            </p>
          </div>

          <p className="t-eyebrow hero__eyebrow">{hero.eyebrow}</p>

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

          <p className="hero__lede t-lead">{hero.body}</p>

          <div className="hero__actions">
            <Link href={hero.primary.href} className="btn btn-primary">
              {hero.primary.label}
            </Link>
            <Link href={hero.secondary.href} className="btn btn-ghost">
              {hero.secondary.label}
            </Link>
          </div>
        </div>

        <div className="hero__stage" aria-hidden="true">
          <span className="strip strip--brand hero__strip-a" />
          <span className="strip strip--navy hero__strip-b" />
          <span className="hero__back hero__back--1" />
          <span className="hero__back hero__back--2" />
          <div className="hero__sheet sheet-cut">
            <div className="hero__art">
              <Image
                src="/illustrations/hero-v2.png"
                alt=""
                fill
                priority
                sizes="(max-width: 900px) 92vw, 52vw"
                className="hero__image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
