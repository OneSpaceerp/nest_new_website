import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import StoryContent, { StoryImage, StoryActions } from "@/components/StoryContent";
import { serviceStories } from "@/lib/stories";
import { nestcloud } from "@/lib/content";
const story = serviceStories.find(item => item.slug === "nestcloud")!;
export const metadata: Metadata = { title: nestcloud.title, description: story.intro, alternates: { canonical: "/nestcloud" } };
export default function Page() {
  return <PageShell eyebrow={story.eyebrow} title={story.title} intro={story.intro} logo={nestcloud.logo} cta={false} heroArt={<StoryImage name={story.image} priority />} actions={<StoryActions label={story.cta} />}><StoryContent story={story} /></PageShell>;
}
