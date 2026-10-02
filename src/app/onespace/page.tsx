import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import OneSpaceNav from "@/components/OneSpaceNav";
import { Enquiry, Questions, StoryImage } from "@/components/StoryContent";
import { oneSpaceOverview as content, oneSpacePages } from "@/lib/onespace";

export const metadata: Metadata = {
  title: "OneSpace | ERPNext Implementation & ERP Solutions in Egypt",
  description: content.intro,
  alternates: { canonical: "/onespace" },
};
export default function Page() {
  return <PageShell eyebrow={content.eyebrow} title={content.title} intro={content.intro} subnav={<OneSpaceNav />} cta={false} heroArt={<StoryImage name="onespace" priority />} actions={<div className="story-actions story-actions--top"><a className="btn btn-primary" href="#enquiry">Let’s connect your business ↗</a><Link className="story-textlink" href="/onespace/erpnext">Explore ERPNext →</Link></div>}>
    <section className="story-opening"><p className="t-eyebrow">THE BUSINESS BETWEEN THE SYSTEMS</p><div><h2 className="t-h2">{content.opening.title}</h2><p className="t-lead t-muted">{content.opening.body}</p></div></section>
    <section className="story-section"><div className="story-section__head"><p className="t-eyebrow">FOLLOW ONE ORDER</p><h2 className="t-h2">From a promise to a complete picture.</h2><p className="t-lead t-muted">A connected workflow, configured around the way your business delivers.</p></div>
      <ol className="journey-track">{content.journey.map((item,i) => <li key={item.title}><span className="story-index">0{i + 1}</span><h3 className="t-h3">{item.title}</h3><p>{item.desc}</p></li>)}</ol>
    </section>
    <section className="story-section"><div className="story-section__head"><p className="t-eyebrow">YOUR STARTING POINT</p><h2 className="t-h2">What needs to change first?</h2></div><div className="story-cards">{content.paths.map(item => <Link className="story-card" href={item.href} key={item.title}><h3 className="t-h3">{item.title}</h3><p>{item.desc}</p><span className="story-textlink">{item.label} ↗</span></Link>)}</div></section>
    <section className="story-platform"><div><p className="t-eyebrow">THE PLATFORM / THE PARTNERSHIP</p><h2 className="t-h2">ERPNext at the core. Your business in focus.</h2></div><div><p className="t-lead">Open-source ERP brings connected capabilities. OneSpace brings the discovery, implementation, integrations, and adoption work that makes them useful to your team.</p><p>Already considering Odoo or Oracle? We can discuss platform fit, product editions, and total ownership costs against your requirements.</p><Link href="/onespace/erpnext" className="story-textlink">Understand the platform →</Link></div></section>
    <section className="story-section"><div className="story-section__head"><p className="t-eyebrow">EXPLORE ONESPACE</p><h2 className="t-h2">The detail behind the decision.</h2></div><div className="story-directory">{oneSpacePages.filter(p => p.slug !== "erpnext").map((page,i) => <Link href={`/onespace/${page.slug}`} key={page.slug}><span className="t-mono">0{i+1}</span><div><h3 className="t-h3">{page.eyebrow.split(" / ")[1]}</h3><p>{page.intro}</p></div><span aria-hidden="true">↗</span></Link>)}</div></section>
    <Questions items={content.faq} />
    <div id="enquiry"><Enquiry label="Discuss your ERP project" subject="OneSpace ERP project enquiry" /></div>
  </PageShell>;
}
