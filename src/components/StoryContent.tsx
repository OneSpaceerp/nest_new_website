import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/lib/stories";
import { illustrationAlts } from "@/lib/stories";
import { site } from "@/lib/content";
import Reveal from "./Reveal";

export function StoryImage({ name, priority = false }: { name: Story["image"]; priority?: boolean }) {
  return <div className="story-art"><Image src={`/illustrations/${name}.png`} alt={illustrationAlts[name]} width={1536} height={1024} sizes="(max-width: 760px) 100vw, 70vw" priority={priority} /></div>;
}
export function StoryActions({label}: {label:string}) {
  return <div className="story-actions story-actions--top"><a href="#enquiry" className="btn btn-primary">{label} <span aria-hidden="true">↗</span></a><a href="#story" className="story-textlink">Explore the approach ↓</a></div>;
}
export function Questions({ items }: { items: Story["faq"] }) {
  return <section className="story-section" aria-labelledby="questions-heading">
    <div className="story-section__head"><p className="t-eyebrow">BEFORE WE BEGIN</p><h2 id="questions-heading" className="t-h2">Good questions. Clear answers.</h2></div>
    <div className="story-faq">{items.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
  </section>;
}
export function Enquiry({ label, subject }: { label: string; subject: string }) {
  return <section className="story-enquiry">
    <div><p className="t-eyebrow">YOUR NEXT CHAPTER</p><h2 className="t-h2">Start with what needs to work better.</h2><p>Tell us where things stand, what is getting in the way, and what you want to achieve. We can shape the next step from there.</p></div>
    <div className="story-actions"><a className="btn btn-primary" href={`mailto:${site.email}?subject=${encodeURIComponent(subject)}`}>{label} <span aria-hidden="true">↗</span></a><a className="story-textlink" href={`tel:${site.phoneHref}`}>Prefer a call? {site.phone}</a></div>
  </section>;
}
export default function StoryContent({ story, children }: { story: Story; children?: React.ReactNode }) {
  return <>
    <section className="story-opening" id="story"><p className="t-eyebrow">THE STARTING POINT</p><div><h2 className="t-h2">{story.opening.title}</h2><p className="t-lead t-muted">{story.opening.body}</p></div></section>
    {children}
    <div className="story-chapters">{story.chapters.map((chapter, i) => <Reveal as="section" className="story-chapter" key={chapter.title}>
      <div><span className="story-index">{String(i + 1).padStart(2, "0")}</span><h2 className="t-h2">{chapter.title.replace(/^\d\d \/ /, "")}</h2></div>
      <div><p className="t-lead t-muted">{chapter.body}</p><ul className="story-points">{chapter.points.map(point => <li key={point}>{point}</li>)}</ul></div>
    </Reveal>)}</div>
    <section className="story-outcomes"><p className="t-eyebrow">WHAT THIS MAKES POSSIBLE</p><h2 className="t-h2">Better work, in practical terms.</h2><ol>{story.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ol></section>
    <Questions items={story.faq} />
    <div id="enquiry"><Enquiry label={story.cta} subject={story.title} /></div>
    <div className="story-related"><p className="t-eyebrow">CONNECTED THROUGH NEST</p><Link href="/onespace">Business operations ↗</Link><Link href="/miravoice">Business communications ↗</Link><Link href="/nestcloud">Cloud & hosting ↗</Link></div>
  </>;
}
