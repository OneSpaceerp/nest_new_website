import Link from "next/link";
import Reveal from "./Reveal";
import Accent from "./Accent";

/**
 * The closing card from the reference: near-black, radius 40, a small kicker
 * above an oversized wordmark, and an inverse pill button.
 */
export default function CtaCard({
  kicker,
  wordmark,
  action,
  href,
}: {
  kicker: string;
  wordmark: string;
  action: string;
  href: string;
}) {
  return (
    <section className="ctacard section" data-bg="cream">
      <div className="container">
        <Reveal className="ctacard__card chamfer">
          {/* The kicker already ends in a full stop; lift it out so the accent
              lands on the real punctuation rather than adding a second one. */}
          <p className="ctacard__kicker">
            {kicker.endsWith(".") ? kicker.slice(0, -1) : kicker}
            <Accent />
          </p>
          <p className="ctacard__mark t-display">{wordmark}</p>
          <Link href={href} className="btn btn-inverse ctacard__btn">
            {action}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
