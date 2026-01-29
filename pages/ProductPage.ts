import { Page, expect } from "@playwright/test";

export class ProductPage {
  constructor(private page: Page) {}

  productHeading(name: string) {
    return this.page.getByRole("heading", { name });
  }

  async goto(productUrl: string) {
    await this.page.goto(productUrl);
  }

  async assertProductRenders(productName: string) {
    await expect(this.productHeading(productName)).toBeVisible();
    await expect(this.page.locator("h3.price-container")).toContainText("$");
    await expect(this.page.getByRole("link", { name: "Add to cart" })).toBeVisible();
  }

  async addToCartExpectingAlert(messageContains: string = "product") {
    
    await this.page.getByRole("link", { name: "Add to cart" }).click();
    this.page.once("dialog", async (dialog) => {
      expect(dialog.message().toLowerCase()).toContain(messageContains.toLowerCase());
      await dialog.accept();
    });
  }

  async addToCartAcceptAlert(productName: string) {
    
  this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

   await this.page.getByRole("link", { name: "Add to cart" }).click();
   await expect(this.productHeading(productName)).toBeVisible();
  }
  
  // async addToCartAndCapturePayload(evidence?: { addToCartPayload?: unknown }) {
  //   const dialogPromise = this.page.waitForEvent("dialog");

  //   let captured: unknown = undefined;

  //   const reqPromise = this.page.waitForRequest((req) => {
  //     if (req.url().includes("addtocart")) {
  //       try {
  //         captured = req.postDataJSON();
  //       } catch {
  //         captured = req.postData(); // fallback if not JSON
  //       }
  //       return true;
  //     }
  //     return false;
  //   });

  //   await this.page.getByRole("link", { name: "Add to cart" }).click();
  //   (await dialogPromise).accept();
  //   await reqPromise;

  //   if (evidence) evidence.addToCartPayload = captured;
  //   return captured;
  // }
}
