import { expect, test } from "@playwright/test";

/** Stable catalog entry used by `generateStaticParams` for `/patterns/[slug]`. */
const PATTERN_SLUG = "attention-finds-a-focus";

test.describe("smoke", () => {
  test("home: 200, main landmark, hero", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.ok()).toBeTruthy();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.locator("#idea")).toBeVisible();
  });

  test("patterns: 200, index heading", async ({ page }) => {
    const res = await page.goto("/patterns");
    expect(res?.ok()).toBeTruthy();
    await expect(
      page.getByRole("heading", { level: 1, name: /Leadership patterns/i }),
    ).toBeVisible();
  });

  test("pattern detail: 200, title", async ({ page }) => {
    const res = await page.goto(`/patterns/${PATTERN_SLUG}`);
    expect(res?.ok()).toBeTruthy();
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Attention Finds a Focus",
      }),
    ).toBeVisible();
  });

  test("idea: 200, definition anchor", async ({ page }) => {
    const res = await page.goto("/idea");
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator("#idea-definition-leader")).toBeVisible();
  });
});
