import Link from "next/link";
import { services, advantage, industries } from "@/lib/content";
import Reveal from "./Reveal";
import Accent from "./Accent";

/** Services grid + the two supporting statement blocks, all copy preserved. */
export default function Services() {
  return (
    <>
      <section id="services" className="services section" data-bg="cream">
        <div className="container">
          <Reveal as="header" className="services__head">
            <p className="t-eyebrow t-muted">{services.eyebrow}</p>
            <h2 className="t-h2">
              {services.heading}
              <Accent />
            </h2>
            <p className="t-lead t-muted services__lead">{services.body}</p>
          </Reveal>

          <div className="services__grid">
            {services.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <Link href={s.href} className="scard">
                  <span className="scard__stat chip">{s.stat}</span>
                  <h3 className="scard__title">{s.title}</h3>
                  <p className="scard__desc t-muted">{s.desc}</p>
                  <span className="scard__go" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="advantage section" data-bg="cream">
        <div className="container advantage__grid">
          <Reveal>
            <p className="t-eyebrow t-muted">{advantage.eyebrow}</p>
            <h2 className="t-h2">
              {advantage.heading}
              <Accent />
            </h2>
            <p className="t-lead t-muted advantage__body">{advantage.body}</p>
            <Link href={advantage.cta.href} className="btn btn-primary">
              {advantage.cta.label}
            </Link>
          </Reveal>

          <Reveal delay={120} className="advantage__panel">
            <h3 className="t-h3">{advantage.control.title}</h3>
            <p className="t-body t-muted">{advantage.control.body}</p>
            <hr className="rule" />
            <h3 className="t-h3">{industries.heading}</h3>
            <p className="t-body t-muted">{industries.body}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
