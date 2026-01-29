import { Page, expect } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/index.html");
  }

  async assertNavigationVisible() {
    await expect(this.page.getByRole("link", { name: "Cart" })).toBeVisible();
    await expect(this.page.getByRole("link", { name: "Log in" })).toBeVisible();
    await expect(this.page.getByRole("link", { name: "Sign up" })).toBeVisible();
  }
}