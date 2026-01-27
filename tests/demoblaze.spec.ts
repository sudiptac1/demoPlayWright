import { test, expect } from "@playwright/test";

const PRODUCT = {
  name: "Samsung galaxy s6",
  url: "/prod.html?idp_=1",
  expectedPrice: "360"
};

test("AT-01 Homepage smoke & navigation", async ({ page }) => {
  await page.goto("/index.html");
  await expect(page.getByRole("link", { name: "Cart" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();
});

test("AT-02 Login and Logout functions work", async ({ page }) => {
  await page.goto("/index.html");

  await page.getByRole("link", { name: "Log in" }).click();

  await page.locator("#loginusername").fill("a");
  await page.locator("#loginpassword").fill("a");
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page.getByRole("link", { name: "Log out" })).toBeVisible();
  await page.getByRole("link", { name: "Log out" }).click();
  await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();

});

test("AT-03 PDP renders for known product", async ({ page }) => {
  await page.goto(PRODUCT.url);
  await expect(page.getByRole("heading", { name: PRODUCT.name })).toBeVisible();
  await expect(page.locator("h3.price-container")).toContainText("$");
  await expect(page.getByRole("link", { name: "Add to cart" })).toBeVisible();
});

test("AT-04 Add to cart  happens and triggers confirmation alert", async ({ page }) => {
  await page.goto(PRODUCT.url);

  // page.once("dialog", async (dialog) => {
  //   expect(dialog.message().toLowerCase()).toContain("product");
  //   await dialog.accept();
  // });

  await page.getByRole("link", { name: "Add to cart" }).click();

  page.once("dialog", async (dialog) => {
    expect(dialog.message().toLowerCase()).toContain("product");
    await dialog.accept();
  });
  //await page.getByRole("link", { name: "Add to cart" }).click();

  await page.goto("/cart.html");
  await expect(page.locator("#tbodyid")).toContainText(PRODUCT.name);
  //await expect(page.locator("#totalp")).toHaveText(PRODUCT.expectedPrice);


});

// test("AT-04 Cart shows item and total updates", async ({ page }) => {
//   await page.goto(PRODUCT.url);

//   page.once("dialog", async (dialog) => await dialog.accept());
//   await page.getByRole("link", { name: "Add to cart" }).click();

//   await page.goto("/cart.html");
//   await expect(page.locator("#tbodyid")).toContainText(PRODUCT.name);
//   await expect(page.locator("#totalp")).toHaveText(PRODUCT.expectedPrice);
// });

test("AT-05 Place order completes and shows order confirmation", async ({ page }) => {
  await page.goto(PRODUCT.url);

  page.once("dialog", async (dialog) => await dialog.accept());
  await page.getByRole("link", { name: "Add to cart" }).click();

  await page.goto("/cart.html");
  await page.getByRole("button", { name: "Place Order" }).click();

  const name = "Test User";
  await page.locator("#name").fill(name);
  await page.locator("#country").fill("UK");
  await page.locator("#city").fill("London");
  await page.locator("#card").fill("4111111111111111");
  await page.locator("#month").fill("01");
  await page.locator("#year").fill("2030");

  await page.getByRole("button", { name: "Purchase" }).click();

  // SweetAlert confirmation
  await expect(page.locator(".sweet-alert")).toBeVisible();
  await expect(page.locator(".sweet-alert")).toContainText(name);
  await expect(page.locator(".sweet-alert")).toContainText("Amount:");
});