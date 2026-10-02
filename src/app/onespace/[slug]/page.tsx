import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import OneSpaceNav from "@/components/OneSpaceNav";
import StoryContent, { StoryImage, StoryActions } from "@/components/StoryContent";
import { erpModules, industryWorkflows, oneSpacePages } from "@/lib/onespace";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return oneSpacePages.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const page = oneSpacePages.find(p => p.slug === slug);
  if (!page) notFound();
  return { title: `${page.eyebrow.split(" / ")[1]} | OneSpace`, description: page.intro, alternates: {canonical: `/onespace/${slug}`} };
}
export default async function Page({params}: Props) {
  const {slug} = await params;
  const page = oneSpacePages.find(p => p.slug === slug);
  if (!page) notFound();
  return <PageShell eyebrow={page.eyebrow} title={page.title} intro={page.intro} subnav={<OneSpaceNav />} cta={false} heroArt={<StoryImage name={page.image} priority />} actions={<StoryActions label={page.cta} />}>
    <StoryContent story={page}>
      {slug === "erpnext" ? <section className="story-section"><div className="story-section__head"><p className="t-eyebrow">CONNECTED CAPABILITIES</p><h2 className="t-h2">Across the working day.</h2></div><div className="module-grid">{erpModules.map(module => <article key={module.title}><h3 className="t-h3">{module.title}</h3><p>{module.desc}</p></article>)}</div></section> : null}
      {slug === "industries" ? <section className="story-section"><div className="story-section__head"><p className="t-eyebrow">FIND YOUR WORKFLOW</p><h2 className="t-h2">Built around the work you do.</h2></div><div className="industry-list">{industryWorkflows.map(item => <details key={item.title}><summary>{item.title}<span aria-hidden="true">+</span></summary><p>{item.desc}</p><ul className="story-points">{item.points.map(point => <li key={point}>{point}</li>)}</ul><Link className="story-textlink" href="/onespace/implementation">See how implementation works →</Link></details>)}</div></section> : null}
    </StoryContent>
  </PageShell>;
}
