import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/content";
import { fontBody, fontHeading } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "When Others Look to You",
  description: "Web application",
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
        <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
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
