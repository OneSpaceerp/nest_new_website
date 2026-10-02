import Link from "next/link";
import { StoryImage } from "./StoryContent";

export default function HomeStory() {
  return <section className="home-story" data-bg="cream"><div className="container home-story__grid">
    <div><p className="t-eyebrow">THE NEXT CHAPTER STARTS HERE</p><h2 className="t-h2">Your business has a rhythm. Your technology should keep up.</h2><p className="t-lead t-muted">An enquiry becomes a conversation. A conversation becomes an order. An order becomes work for several teams. We help connect those moments, so the experience outside your business matches the work happening inside it.</p><Link href="/onespace" className="story-textlink">Meet OneSpace, your connected operation ↗</Link></div>
    <StoryImage name="onespace" />
  </div></section>;
}
