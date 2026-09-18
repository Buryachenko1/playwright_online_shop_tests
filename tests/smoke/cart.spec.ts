import { test } from "@playwright/test";
import { HomePage } from "../../src/pages/nopcommerce/home_page";
import { CartPage } from "../../src/pages/nopcommerce/cart_page";

test("@smoke Product can be added to cart", async ({ page }) => {
  const homePage = new HomePage(page);

  let productName: string;

  await test.step("Open product detail", async () => {
    await homePage.openHomePage();

    productName = await homePage.getProductName();

    const productPage = await homePage.openProductDetail();

    await productPage.verifyProductPageIsVisible();

    await productPage.processorSelect.selectOption({ index: 1 });
    await productPage.ramSelect.selectOption({ index: 1 });

    await productPage.addToCart();
  });

  await test.step("Open shopping cart", async () => {
    await page.goto(`${homePage.baseUrl}cart`);
  });

  await test.step("Verify product is added to cart", async () => {
    const cartPage = new CartPage(page);

    await cartPage.verifyCartPageIsVisible();
    await cartPage.verifyProductAddedToCart(productName);
  });
});
