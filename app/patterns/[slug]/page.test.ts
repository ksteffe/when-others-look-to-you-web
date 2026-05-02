import { describe, expect, it } from "vitest";

import { getAllPatterns } from "@/lib/content";

import { generateStaticParams } from "./page";

describe("patterns/[slug] page", () => {
  it("generateStaticParams lists every pattern slug", () => {
    const params = generateStaticParams();
    const expected = getAllPatterns().map((p) => ({ slug: p.slug }));

    expect(params).toEqual(expected);
  });
});
