import type { Metadata } from "next";
import { AboutPage } from "@/components/sections/AboutPage";
import { aboutPageContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "About",
    description:
      "Why When Others Look to You was written and what questions sit behind it.",
    path: "/about",
  });
}

export default function AboutRoute() {
  return <AboutPage content={aboutPageContent} />;
}
