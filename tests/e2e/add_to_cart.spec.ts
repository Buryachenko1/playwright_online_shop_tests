import { test } from "@playwright/test";
import { HomePage } from "../../src/pages/nopcommerce/home_page";
import { CartPage } from "../../src/pages/nopcommerce/cart_page";

test("@e2e @smoke Product can be added to cart", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);

  let productName: string;

  await test.step("Open home page", async () => {
    await homePage.openHomePage();
    await homePage.verifyHomePageIsVisible();

    productName = await homePage.getProductName();
  });

  await test.step("Open product detail", async () => {
    const productPage = await homePage.openProductDetail();

    await productPage.verifyProductPageIsVisible();
    await productPage.verifyProductTitle(productName);

    await productPage.configureProduct();
    await productPage.addToCart();
  });

  await test.step("Open shopping cart", async () => {
    await page.goto(`${homePage.baseUrl}cart`);
    await cartPage.verifyCartPageIsVisible();
  });

  await test.step("Verify product is added to cart", async () => {
    await cartPage.verifyProductAddedToCart(productName);
    await cartPage.verifyProductQuantity("1");
  });
});
