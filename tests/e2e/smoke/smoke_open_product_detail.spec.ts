import { test } from "@playwright/test";
import { HomePage } from "../../../src/pages/presta/home_page";


test("@smoke Product can be added to cart", async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step("Open product detail), async () => {
    await homePage
      .openHomePage()

      productName = await homePage.getProductName();
      productPage = await homePage.openProductDetail();

      await productPage.verifyProductPageIsVisible()
  
  });

  await test.step("Add product to cart", async () => {
    await productPage.addProductToCart();
  });

  await test.step("Verify product is in cart", async () => {
    await productPage.verifyProductAddedToCart(productName);
  });
});
