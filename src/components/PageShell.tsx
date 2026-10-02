import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import PageBackground from "./PageBackground";
import CtaCard from "./CtaCard";
import BrandLink from "./BrandLink";
import Accent from "./Accent";

/**
 * Shared chrome for every inner route: page background controller, a
 * consistent masthead, then whatever the page supplies, then the closing CTA.
 */
export default function PageShell({
  eyebrow,
  title,
  intro,
  logo,
  children,
  cta = true,
  subnav,
  heroArt,
  actions,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  logo?: string;
  children?: ReactNode;
  cta?: boolean;
  subnav?: ReactNode;
  heroArt?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <main id="main">
      <PageBackground />

      <section className={`page${heroArt ? " page--story" : ""}`} data-bg="cream">
        <div className="container">
          {/* Same brand mark as the hero carries on the home page, so every
              route has a way back to / above the fold. In normal flow, so it
              scrolls away like the hero's does. */}
          <div className="page__brand">
            <BrandLink height={34} priority />
          </div>

          {subnav}
          <div className={heroArt ? "story-hero" : undefined}>
          <Reveal as="header" className="page__head">
            {logo ? (
              <Image
                src={logo}
                alt={title}
                width={220}
                height={52}
                className="page__logo"
                priority
              />
            ) : null}
            <p className="t-eyebrow t-muted">{eyebrow}</p>
            {/* Some titles already end in a full stop ("TERMS OF SERVICE.").
                Lift it so the accent lands on the real punctuation instead of
                producing a doubled one. */}
            <h1 className="t-h2">
              {title.endsWith(".") ? title.slice(0, -1) : title}
              <Accent />
            </h1>
            <p className="t-lead t-muted page__intro">{intro}</p>
            {actions}
          </Reveal>
          {heroArt}
          </div>

          {children}
        </div>
      </section>

      {cta ? (
        <CtaCard
          kicker="Ready when you are."
          wordmark="Let's talk"
          action="Partner With Us"
          href="/#contact"
        />
      ) : null}
    </main>
  );
}
