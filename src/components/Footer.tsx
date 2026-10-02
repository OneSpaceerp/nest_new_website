import Link from "next/link";
import Image from "next/image";
import { site, footer, ecosystemRow } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer" data-bg="night">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" aria-label={`${site.name} — home`}>
              <Image
                src={site.logoDark}
                alt={site.name}
                width={Math.round(76 * site.logoDarkRatio)}
                height={76}
                loading="lazy"
                unoptimized
                className="footer__logo"
              />
            </Link>
            <p className="footer__name">{site.name}</p>
            <p className="t-body t-muted">{site.tagline}</p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="t-mono t-muted footer__coltitle">{col.title}</p>
              <ul className="footer__links">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__contact">
            <p className="t-mono t-muted footer__coltitle">CONTACT</p>
            <ul className="footer__links">
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </li>
              <li className="t-muted">{site.location}</li>
              <li>
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-brand row, after Axentor's "Part of the work at Axentor"
            block: a label on the left, the three brand marks on the right,
            fenced by hairlines above and below. */}
        <div className="footer__eco">
          <p className="footer__eco-label">{ecosystemRow.label}</p>
          <ul className="footer__eco-list">
            {ecosystemRow.brands.map((b) => (
              <li key={b.name}>
                <Link href={b.href} className="footer__eco-item">
                  <Image
                    src={b.logo}
                    alt={b.name}
                    width={Math.round(38 * b.ratio)}
                    height={38}
                    loading="lazy"
                    className="footer__eco-logo"
                  />
                  <span className="footer__eco-caption">{b.caption}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__base">
          <p className="t-mono t-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="t-mono t-muted">
            <Link href="/privacy">PRIVACY</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/terms">TERMS</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
