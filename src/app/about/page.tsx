import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import { about, advantage } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <PageShell
      eyebrow={about.eyebrow}
      title={about.heading}
      intro={about.intro}
    >
      <div className="twocol">
        <Reveal className="panel">
          <h3 className="t-h3">{about.mission.title}</h3>
          <p className="t-body t-muted">{about.mission.body}</p>
        </Reveal>
        <Reveal className="panel" delay={110}>
          <h3 className="t-h3">{about.vision.title}</h3>
          <p className="t-body t-muted">{about.vision.body}</p>
        </Reveal>
      </div>

      <Reveal className="panel" style={{ marginTop: "1.25rem" }}>
        <h3 className="t-h3">{advantage.control.title}</h3>
        <p className="t-body t-muted">{advantage.control.body}</p>
      </Reveal>

      <section className="about-products" aria-labelledby="about-products-heading">
        <Reveal className="about-products__head">
          <p className="t-eyebrow">THE NEST ECOSYSTEM</p>
          <h2 id="about-products-heading" className="t-h2">Specialist products. One connected direction.</h2>
          <p className="t-lead t-muted">Each product has a focused role. Together, they give your business a clearer path from customer experience to daily operation.</p>
        </Reveal>
        <div className="about-products__grid">
          {about.products.map((product, i) => (
            <Reveal as="article" className="about-product" delay={i * 90} key={product.name}>
              <div className="about-product__logo"><Image src={product.logo} alt={product.name} width={220} height={72} /></div>
              <p className="t-eyebrow">{product.kicker}</p>
              <h3 className="t-h3">{product.title}</h3>
              <p className="t-body t-muted">{product.body}</p>
              <Link href={product.href} className="story-textlink">{product.action} ↗</Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
