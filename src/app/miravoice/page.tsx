import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import StoryContent, { StoryImage, StoryActions } from "@/components/StoryContent";
import { serviceStories } from "@/lib/stories";
import { miravoice } from "@/lib/content";
const story = serviceStories.find(item => item.slug === "miravoice")!;
export const metadata: Metadata = { title: miravoice.title, description: story.intro, alternates: { canonical: "/miravoice" } };
export default function Page() {
  return <PageShell eyebrow={story.eyebrow} title={story.title} intro={story.intro} logo={miravoice.logo} cta={false} heroArt={<StoryImage name={story.image} priority />} actions={<StoryActions label={story.cta} />}><StoryContent story={story} /></PageShell>;
}
