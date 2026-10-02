import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/content";

/**
 * The header brand mark: the cyan "nest" wordmark, on its own, linking home.
 *
 * Deliberately image-only — no adjacent text label. The accessible name comes
 * from the alt text and the link's aria-label, so screen readers still get the
 * full company name even though it is not drawn.
 *
 * Used on every route: in the hero on the home page, and at the top of
 * PageShell on every inner page.
 */
export default function BrandLink({
  height = 54,
  priority = false,
  className = "",
}: {
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`brand ${className}`}
      aria-label={`${site.name} — home`}
    >
      {/*
        `unoptimized` on purpose. The badge is two flat brand colours, and
        Next's optimiser re-encodes lossily at q=75 — enough to drift #02C8F0
        off by a step. The source is already sized for delivery (720px wide,
        53KB) so there is nothing to gain from re-encoding, and this way the
        exact brand hexes reach the browser.
      */}
      <Image
        src={site.logo}
        alt={site.name}
        width={Math.round(height * site.logoRatio)}
        height={height}
        priority={priority}
        unoptimized
        className="brand__mark"
      />
    </Link>
  );
}
