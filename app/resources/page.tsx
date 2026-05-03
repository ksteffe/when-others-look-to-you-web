import type { Metadata } from "next";
import { SimpleMarketingPage } from "@/components/pages/SimpleMarketingPage";
import { Button } from "@/components/ui/Button";
import { bookGithubDownloads } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Resources",
    description:
      "Download the book in EPUB or Word (DOCX) from GitHub, plus other tools and reading related to When Others Look to You.",
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
            Download the open distribution of the book (EPUB and Word) from
            GitHub. More materials—discussion guides, updates, and recommended
            reading—will live here over time.
          </p>
        </>
      }
    >
      <div className="space-y-4">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-zinc-200">
          Downloads
        </h2>
        <p className="body-lg text-pretty text-zinc-300/95">
          Get the current release files hosted on GitHub. These links open the
          files in a new tab.
        </p>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
          <Button
            href={bookGithubDownloads.epub}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full justify-center sm:w-auto"
          >
            Download EPUB
          </Button>
          <Button
            href={bookGithubDownloads.docx}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full justify-center sm:w-auto"
          >
            Download DOCX
          </Button>
        </div>
      </div>
    </SimpleMarketingPage>
  );
}
