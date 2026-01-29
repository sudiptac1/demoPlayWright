import { Page, expect } from "@playwright/test";

export type OrderDetails = {
  name: string;
  country: string;
  city: string;
  card: string;
  month: string;
  year: string;
};

export class CheckoutModal {
  constructor(private page: Page) {}

  async fill(details: OrderDetails) {
    await this.page.locator("#name").fill(details.name);
    await this.page.locator("#country").fill(details.country);
    await this.page.locator("#city").fill(details.city);
    await this.page.locator("#card").fill(details.card);
    await this.page.locator("#month").fill(details.month);
    await this.page.locator("#year").fill(details.year);
  }

  async purchase() {
    await this.page.getByRole("button", { name: "Purchase" }).click();
  }

  async assertConfirmationContains(name: string) {
    await expect(this.page.locator(".sweet-alert")).toBeVisible();
    await expect(this.page.locator(".sweet-alert")).toContainText(name);
    await expect(this.page.locator(".sweet-alert")).toContainText("Amount:");
  }
}