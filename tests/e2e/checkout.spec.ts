import { test } from "@playwright/test";

import { HomePage } from "../../src/pages/nopcommerce/home_page";
import { ProductPage } from "../../src/pages/nopcommerce/product_page";
import { CartPage } from "../../src/pages/nopcommerce/cart_page";
import { CheckoutLoginPage } from "../../src/pages/nopcommerce/checkout_login_page";
import { CheckoutPage } from "../../src/pages/nopcommerce/checkout_page";
import { CookieBanner } from "../../src/pages/nopcommerce/cookie_banner";
import { Header } from "../../src/pages/nopcommerce/header";

test("@smoke Guest can start checkout", async ({ page }) => {
  // Page Objects
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutLoginPage = new CheckoutLoginPage(page);
  const checkoutPage = new CheckoutPage(page);
  const cookieBanner = new CookieBanner(page);
  const header = new Header(page);

  await test.step("Open product detail", async () => {
    await homePage.openHomePage();
    await cookieBanner.confirmCookies();
    await homePage.openProductDetail();
  });

  await test.step("Add product to cart", async () => {
    await productPage.configureProduct();
    await productPage.addToCart();
    await header.openCart();
  });

  await test.step("Verify cart and accept terms of service", async () => {
    await cartPage.verifyCartPageIsVisible();
    await cartPage.acceptTermsOfService();
  });

  await test.step("Proceed to checkout", async () => {
    await cartPage.proceedToCheckout();
    await checkoutLoginPage.verifyCheckoutLoginPageIsVisible();
  });

  await test.step("Continue checkout as guest", async () => {
    await checkoutLoginPage.checkoutAsGuest();
    await checkoutPage.verifyCheckoutPageIsVisible();
  });
});
