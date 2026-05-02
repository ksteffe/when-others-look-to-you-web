import type { Metadata } from "next";
import { PatternsPage } from "@/components/sections/PatternsPage";
import { patternsPageContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Patterns",
    description:
      "Leadership patterns—recurring behaviors others mirror. Explore each pattern in depth.",
    path: "/patterns",
  });
}

export default function PatternsIndexRoute() {
  return (
    <PatternsPage content={patternsPageContent} />
  );
}
