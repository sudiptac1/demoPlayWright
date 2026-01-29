
import { test, expect } from "./fixtures/baseTest";
import { PRODUCT } from "../data/productDtls";
import { PurchaseDetails } from "../data/parchaseOrderDtls";

import { clearCartState } from "../utils/clearCart";

test.beforeEach(async ({ page }) => {
  await clearCartState(page);
});

test.afterEach(async ({ evidence }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    if (evidence.addToCartPayload !== undefined) {
      await testInfo.attach("addtocart-payload.json", {
        body: Buffer.from(JSON.stringify(evidence.addToCartPayload, null, 2)),
        contentType: "application/json",
      });
    }
  }
});

test("AT-01 Homepage smoke & navigation", async ({ home}) => {
  await home.goto();
  await home.assertNavigationVisible();
});

test("AT-02 PDP renders for known product", async ({ product }) => {
 
  await product.goto(PRODUCT.url);
  await product.assertProductRenders(PRODUCT.name);

});

test("AT-03 Add to cart  works and triggers confirmation alert", async ({ product }) => {

  await product.goto(PRODUCT.url);
  await product.addToCartExpectingAlert("product");

});

test("AT-04 After adding cart shows the correct item  in the cart with correct amount" , async ({ product, cart  }) => {
 
  await product.goto(PRODUCT.url);
  await product.addToCartAcceptAlert(PRODUCT.name);

  await cart.goto();
  await cart.assertItemPresent(PRODUCT.name);
  await cart.assertTotal(PRODUCT.expectedPrice);


});

test("AT-05 Place order completes and shows order confirmation", async ({ product, cart, checkout }) => {
  
  await product.goto(PRODUCT.url);
  await product.addToCartAcceptAlert(PRODUCT.name);

  await cart.goto();
  await cart.clickPlaceOrder();

  await checkout.fill(PurchaseDetails);
  await checkout.purchase();
  await checkout.assertConfirmationContains(PurchaseDetails.name);

});
