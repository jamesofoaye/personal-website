import { Hero } from "@/components/home/hero";
import { WorkIndex } from "@/components/home/work-index";
import { AiSection } from "@/components/home/ai-section";
import { Experience, Skills, Archive } from "@/components/home/experience";
import { Contact } from "@/components/home/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkIndex />
      <AiSection />
      <Experience />
      <Skills />
      <Archive />
      <Contact />
    </>
  );
}
