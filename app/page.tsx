import { Hero } from "@/components/sections/Hero";
import { PatternSection } from "@/components/sections/PatternSection";
import { RenewalErosionSection } from "@/components/sections/RenewalErosionSection";
import { WhyItMattersSection } from "@/components/sections/WhyItMattersSection";
import {
  heroContent,
  patternSectionContent,
  sectionContent,
} from "@/lib/content";

/**
 * Homepage wires sections to `lib/content.ts` only — swap copy and asset paths there.
 */
export default function Home() {
  const { renewalErosion, whyItMatters } = sectionContent;

  return (
    <div className="flex min-w-0 flex-col">
      {/* 1. Hero */}
      <Hero {...heroContent} />
      {/* 2. Pattern cards */}
      <PatternSection {...patternSectionContent} />
      {/* 3. Renewal vs. erosion */}
      <RenewalErosionSection {...renewalErosion} />
      {/* 4. Why it matters */}
      <WhyItMattersSection {...whyItMatters} />
    </div>
  );
}
