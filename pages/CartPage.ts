import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/cart.html");
  }

  async assertItemPresent(productName: string) {
    await expect(this.page.locator("#tbodyid")).toContainText(productName);
  }

  async assertTotal(expectedTotal: string) {
    await expect(this.page.locator("#totalp")).toHaveText(expectedTotal);
  }

  async clickPlaceOrder() {
    await this.page.getByRole("button", { name: "Place Order" }).click();
  }
}