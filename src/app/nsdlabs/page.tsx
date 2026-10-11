import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BrandLink from "@/components/BrandLink";
import PageBackground from "@/components/PageBackground";
import LabsConstellation from "@/components/LabsConstellation";
import { labsApps } from "@/lib/nsdlabs";
import "./nsdlabs.css";

export const metadata: Metadata = {
  title: "nsdLabs | Custom ERPNext Apps",
  description: "Discover ten custom apps by nsdLabs: contracts, treasury, construction, Egyptian eInvoice, meeting rooms, property, field visits, trips, chat and Nest App.",
  alternates: { canonical: "/nsdlabs" },
  openGraph: { title: "nsdLabs — Built around the way you work", description: "Specialist apps. Connected possibilities. Explore custom ERPNext apps by Nest Software Development.", url: "/nsdlabs", images: [{ url: "/nsdlabs/nsdlabs.png", alt: "nsdLabs" }] },
};

export default function LabsPage() {
  return (
    <main id="main" className="labs-page">
      <PageBackground />
      <section className="labs-hero" data-bg="cream" aria-labelledby="labs-title">
        <div className="container">
          <div className="labs-topbar"><BrandLink height={34} priority /><Link href="/#contact">Talk to our team <span aria-hidden="true">↗</span></Link></div>
          <header className="labs-heading">
            <p className="t-eyebrow">THE APP DEVELOPMENT LAB AT NEST</p>
            <Image className="labs-heading__logo" src="/nsdlabs/nsdlabs.png" alt="nsdLabs" width={410} height={154} priority />
            <h1 id="labs-title">Built around<br />the way you work<span>.</span></h1>
            <p>Every business has work that deserves its own solution.<br className="labs-desktop-break" /> We build specialist ERPNext apps that bring that work into focus.</p>
          </header>
          <LabsConstellation apps={labsApps.map(({ id, name }) => ({ id, name }))} />
        </div>
      </section>

      <section className="labs-catalog container" aria-labelledby="labs-catalog-title" data-bg="cream">
        <header className="labs-section-heading">
          <p className="t-eyebrow">10 APPS. REAL BUSINESS NEEDS.</p>
          <h2 id="labs-catalog-title">Small details.<br />Bigger possibilities.</h2>
          <p>From the agreement that starts a project to the journey that takes your team to a customer. Find the tools for the work in between.</p>
        </header>
        <div className="labs-grid">
          {labsApps.map((app, i) => (
            <article id={app.id} key={app.id} className={`labs-card ${app.id === "nest-app" ? "labs-card--featured" : ""}`} aria-labelledby={`${app.id}-title`}>
              <div className="labs-card__top"><Image src={`/nsdlabs/apps/${app.id}.png`} alt={`${app.name} app icon`} width={76} height={76} /><span className="labs-card__number">{String(i + 1).padStart(2, "0")} / 10</span></div>
              <p className="labs-card__category">{app.category}</p>
              <h3 id={`${app.id}-title`}>{app.name}</h3>
              <p className="labs-card__headline">{app.headline}</p>
              <p className="labs-card__summary">{app.summary}</p>
              <p className="labs-card__body">{app.body}</p>
              <ul className="labs-card__focus" aria-label={`${app.name} focus areas`}>{app.focus.map(item => <li key={item}>{item}</li>)}</ul>
              <div className="labs-card__bottom"><p>{app.audience}</p><a href={`mailto:info@nsd-eg.com?subject=${encodeURIComponent(`I'd like to explore nsdLabs ${app.name}`)}`}>Let’s talk {app.name} <span aria-hidden="true">↗</span></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="labs-next container" aria-labelledby="labs-next-title" data-bg="cream">
        <div><p className="t-eyebrow">START WITH THE WORK</p><h2 id="labs-next-title">Which part of your<br />day could work better<span>?</span></h2></div>
        <div><p>Tell us what your team needs to do. We’ll help you explore the right apps, review your ERPNext setup and shape the next step together.</p><Link className="btn btn-primary" href="/#contact">Explore the possibilities <span aria-hidden="true">↗</span></Link><p className="labs-next__note">Already working with OneSpace? <Link href="/onespace">Bring your ERP and apps into the same conversation.</Link></p></div>
      </section>
    </main>
  );
}
