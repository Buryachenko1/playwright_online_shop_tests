import { test } from "@playwright/test";
import { HomePage } from "../../src/pages/nopcommerce/home_page";
import { CartPage } from "../../src/pages/nopcommerce/cart_page";
import { CheckoutPage } from "../../src/pages/nopcommerce/checkout_page";

test("@smoke Guest can start checkout", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);

  await test.step("Add product to cart", async () => {
    await homePage.openHomePage();

    const productPage = await homePage.openProductDetail();

    await productPage.configureProduct();
    await productPage.addToCart();

    await page.goto(`${homePage.baseUrl}cart`);
  });

  await test.step("Verify cart and accept terms of service", async () => {
    await cartPage.verifyCartPageIsVisible();
    await cartPage.acceptTermsOfService();
  });

  const checkoutLoginPage = await cartPage.proceedToCheckout();

  await test.step("Continue checkout as guest", async () => {
    await checkoutLoginPage.verifyCheckoutLoginPageIsVisible();

    await checkoutLoginPage.checkoutAsGuest();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyCheckoutPageIsVisible();
  });
});
