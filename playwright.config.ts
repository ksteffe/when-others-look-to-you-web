import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
const isCI = Boolean(process.env.CI);

/**
 * Local: `npm run test:e2e` runs a production build and `next start` unless a
 * server is already listening (reuse). CI: `build` step runs first; we only
 * `npm run start` here to avoid a second full build.
 */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? "github" : "line",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: isCI ? "npm run start" : "npm run build && npm run start",
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: isCI ? 120_000 : 180_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
