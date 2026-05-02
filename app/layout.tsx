import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { assets, site } from "@/lib/content";
import { DEFAULT_DESCRIPTION, SITE_TITLE } from "@/lib/metadata";
import { fontBody, fontHeading } from "@/lib/fonts";
import "./globals.css";

const metadataBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Root defaults — merged with each segment’s `generateMetadata()`.
 * `metadataBase` resolves relative URLs (canonical, OG images) to absolute links.
 */
export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: {
    default: SITE_TITLE,
    template: "%s | When Others Look To You",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    images: [
      {
        url: assets.heroBackground,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [assets.heroBackground],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-pt-20 ${fontHeading.variable} ${fontBody.variable}`}
    >
      <body
        className={`${fontBody.className} flex min-h-screen flex-col bg-brand-navy text-zinc-200 antialiased`}
      >
        <Header
          title={site.headerTitle}
          nav={site.nav}
          cta={site.headerCta}
        />
        <main className="relative min-h-0 min-w-0 flex-1 overflow-x-clip">
          {children}
        </main>
        <Footer
          bookTitle={site.footerTitle}
          bookSubtitle={site.footerSubtitle}
          nav={site.nav}
          copyrightLine={site.copyrightLine}
        />
      </body>
    </html>
  );
}
