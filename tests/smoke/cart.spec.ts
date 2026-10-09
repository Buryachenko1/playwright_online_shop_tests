import { test } from "@playwright/test";
import { HomePage } from "../../src/pages/nopcommerce/home_page";
import { CartPage } from "../../src/pages/nopcommerce/cart_page";

test("@smoke Product can be added to cart", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const expectedSuccessNotification = "Produkt byl přidán do Vašeho košíku";

  const { productName, productPage } =
    await test.step("Open product detail", async () => {
      await homePage.openHomePage();

      const productName = await homePage.getProductName();
      const productPage = await homePage.openProductDetail();

      await productPage.verifyProductPageIsVisible();

      return { productName, productPage };
    });

  await test.step("Configure product and add it to cart", async () => {
    await productPage.configureProduct();
    await productPage.addToCart();
    await productPage.verifyNotificationSuccesBarIsVisible(
      expectedSuccessNotification,
    );
  });

  await test.step("Verify product in shopping cart", async () => {
    await page.goto("/cart");

    await cartPage.verifyCartPageIsVisible();
    await cartPage.verifyProductAddedToCart(productName);
  });
});
