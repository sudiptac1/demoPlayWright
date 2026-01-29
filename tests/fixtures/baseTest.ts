import { test as base, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutModal } from "../../pages/CheckoutModal";

/**
 * Custom fixture types
 */
type Evidence = {
  addToCartPayload?: unknown;
};

type Fixtures = {
  home: HomePage;
  product: ProductPage;
  cart: CartPage;
  checkout: CheckoutModal;
  evidence: Evidence;
};

export const test = base.extend<Fixtures>({
  // Page Object fixtures
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  product: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkout: async ({ page }, use) => {
    await use(new CheckoutModal(page));
  },

  // Evidence fixture
  evidence: async ({}, use) => {
    await use({});
  },
});

export { expect };