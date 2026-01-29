import { Page } from "@playwright/test";

export async function clearCartState(page: Page) {
  
  await page.goto("/index.html");

  await page.evaluate(() => {
    localStorage.removeItem("cart");
    localStorage.clear();
  })
}