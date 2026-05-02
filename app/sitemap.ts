import type { MetadataRoute } from "next";

import { getAllPatterns } from "@/lib/content";

function getBaseUrl(): URL {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
}

/** Static marketing routes (see requirements). */
const STATIC_PATHS = [
  "/",
  "/idea",
  "/patterns",
  "/book",
  "/about",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const patternEntries: MetadataRoute.Sitemap = getAllPatterns().map((p) => ({
    url: new URL(`/patterns/${p.slug}`, base).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...patternEntries];
}
