

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  // Allow tests to run in parallel
  fullyParallel: true,

  // Retries for flaky environments (CI-friendly)
  retries: 1,

  // Control parallelism (CI vs local)
  //workers: process.env.CI ? 4 : undefined,

  reporter: [["html", { open: "never" }]],

  workers: process.env.CI
    ? Number(process.env.PLAYWRIGHT_WORKERS ?? "2")
    : undefined,

  use: {
    baseURL: "https://www.demoblaze.com",
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  // ✅ Multi-browser configuration
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});