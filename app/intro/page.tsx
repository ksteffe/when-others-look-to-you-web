import type { Metadata } from "next";
import { IntroVideoPage } from "@/components/sections/IntroVideoPage";
import { introVideoPageContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Intro video",
    description: introVideoPageContent.description,
    path: "/intro",
  });
}

export default function IntroRoute() {
  return <IntroVideoPage content={introVideoPageContent} />;
}
