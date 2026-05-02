import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { getAllPatterns } from "@/lib/content";

import sitemap from "./sitemap";

describe("sitemap", () => {
  let prevSiteUrl: string | undefined;

  beforeEach(() => {
    prevSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = prevSiteUrl;
  });

  it("includes core static routes with the configured origin", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    for (const path of ["/", "/idea", "/patterns", "/book", "/about"] as const) {
      expect(urls).toContain(`https://example.com${path}`);
    }
  });

  it("includes one URL per pattern slug", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    const patterns = getAllPatterns();

    for (const p of patterns) {
      expect(urls).toContain(`https://example.com/patterns/${p.slug}`);
    }

    expect(entries.length).toBe(5 + patterns.length);
  });

  it("uses localhost default when NEXT_PUBLIC_SITE_URL is unset", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    const entries = sitemap();
    expect(entries.some((e) => e.url.startsWith("http://localhost:3000"))).toBe(
      true,
    );
  });
});
