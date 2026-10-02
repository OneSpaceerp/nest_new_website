import PageShell from "./PageShell";
import StoryContent, { StoryImage, StoryActions } from "./StoryContent";
import { serviceStories } from "@/lib/stories";
import type { ServicePage } from "@/lib/content";

export default function ServiceRoute({ page }: { page: ServicePage }) {
  const story = serviceStories.find(item => item.slug === page.slug)!;
  return <PageShell eyebrow={story.eyebrow} title={story.title} intro={story.intro} cta={false} heroArt={<StoryImage name={story.image} priority />} actions={<StoryActions label={story.cta} />}><StoryContent story={story} /></PageShell>;
}
