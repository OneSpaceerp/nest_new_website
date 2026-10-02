import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import HowItWorks from "@/components/HowItWorks";
import Showcase from "@/components/Showcase";
import Services from "@/components/Services";
import ClientMarquee from "@/components/ClientMarquee";
import Contact from "@/components/Contact";
import CtaCard from "@/components/CtaCard";
import PageBackground from "@/components/PageBackground";
import HomeStory from "@/components/HomeStory";

export default function Home() {
  return (
    <main id="main">
      <PageBackground />
      <Hero />
      <Statement />
      <HomeStory />
      <HowItWorks />
      <Showcase />
      <Services />
      <ClientMarquee />
      <Contact />
      <CtaCard
        kicker="Your next chapter starts with a conversation."
        wordmark="Nest Software"
        action="Partner With Us"
        href="/#contact"
      />
    </main>
  );
}
