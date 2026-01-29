import { test as base } from "@playwright/test";

type Evidence = {
  addToCartPayload?: unknown;
};

export const test = base.extend<{ evidence: Evidence }>({
  evidence: async ({}, use) => {
    await use({});
  },
});

export { expect } from "@playwright/test";