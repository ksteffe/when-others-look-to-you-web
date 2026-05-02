import type { Metadata } from "next";
import { SimpleMarketingPage } from "@/components/pages/SimpleMarketingPage";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Resources",
    description:
      "Downloads, guides, newsletter updates, and recommended reading related to When Others Look to You.",
    path: "/resources",
  });
}

export default function ResourcesPage() {
  return (
    <SimpleMarketingPage
      eyebrow="RESOURCES"
      title="Tools and reading"
      lead={
        <>
          <p>
            Future home for PDFs, discussion guides, newsletter signup details, and
            recommended reading. Placeholder content.
          </p>
          <p>
            Structure this page as a simple list or cards when assets are
            available.
          </p>
        </>
      }
    />
  );
}
