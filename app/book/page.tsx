import type { Metadata } from "next";
import { BookLanding } from "@/components/sections/BookLanding";
import { assets, bookPageContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "The Book",
    description:
      "When Others Look to You — renewal and erosion in leadership. Find where to read the book.",
    path: "/book",
    image: assets.bookCover,
  });
}

export default function BookRoute() {
  return <BookLanding content={bookPageContent} />;
}
