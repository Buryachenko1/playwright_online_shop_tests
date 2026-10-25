import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { HomePage } from "../../src/pages/nopcommerce/home_page";
import { ProductPage } from "../../src/pages/nopcommerce/product_page";
import { CartPage } from "../../src/pages/nopcommerce/cart_page";
import { CheckoutLoginPage } from "../../src/pages/nopcommerce/checkout_login_page";
import { CheckoutPage } from "../../src/pages/nopcommerce/checkout_page";
import { CookieBanner } from "../../src/pages/nopcommerce/cookie_banner";
import { Header } from "../../src/pages/nopcommerce/header";

test("@e2e Guest can complete checkout", async ({ page }) => {
  // Page objects
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutLoginPage = new CheckoutLoginPage(page);
  const checkoutPage = new CheckoutPage(page);
  const cookieBanner = new CookieBanner(page);
  const header = new Header(page);

  // Customer details
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const country = "Czechia";
  const stateProvince = "Hlavní město Praha";
  const city = faker.location.city();
  const address = faker.location.streetAddress();
  const zipCode = faker.string.numeric(5);
  const phone = faker.string.numeric(9);

  // Test payment details
  const cardholderName = `${firstName} ${lastName}`;
  const cardNumber = "4111111111111111";
  const cardCode = "123";
  const expiryMonth = "12";
  const expiryYear = "2028";

  // Expected order details
  const quantity = "1";
  const expectedShippingMethod = "Ground";
  const expectedPaymentMethod = "Credit Card";
  const completedOrderUrl = /\/checkout\/completed\/?(?:[?#].*)?$/;

  // Values collected during the test
  let productName: string;
  let productPrice: string;
  let shippingPrice: string;
  let taxPrice: string;

  await test.step("Open product detail", async () => {
    await homePage.openHomePage();
    await homePage.verifyHomePageIsVisible();

    productName = await homePage.getProductName();

    await homePage.openProductDetail();
    await productPage.verifyProductPageIsVisible();
    await productPage.verifyProductTitle(productName);
  });

  await test.step("Configure product and add it to cart", async () => {
    await productPage.configureProduct();
    await productPage.addToCart();

    productPrice = await productPage.getProductPrice();

    console.log("[Product] Add-to-cart action completed", {
      Product: productName,
      Quantity: quantity,
      "Product Price": productPrice,
    });
  });

  await test.step("Verify product, quantity and read cart charges", async () => {
    await header.openCart();
    await cookieBanner.confirmCookies();

    await cartPage.verifyProductAddedToCart(productName);
    await cartPage.verifyProductQuantity(quantity);

    shippingPrice = await cartPage.verifyShippingPrice();
    taxPrice = await cartPage.verifyTaxPrice();

    console.log("[Cart] Product and quantity verified; charges collected", {
      Product: productName,
      Quantity: quantity,
      "Shipping price": shippingPrice,
      "Tax price": taxPrice,
    });
  });

  await test.step("Start checkout as guest", async () => {
    await cartPage.acceptTermsOfService();
    await cartPage.proceedToCheckout();

    await checkoutLoginPage.verifyCheckoutLoginPageIsVisible();
    await checkoutLoginPage.checkoutAsGuest();

    await checkoutPage.verifyCheckoutPageIsVisible();
  });

  await test.step("Fill billing address and continue", async () => {
    await checkoutPage.fillBillingAddress(
      firstName,
      lastName,
      email,
      country,
      city,
      address,
      zipCode,
      phone,
    );
  });

  await test.step("Select shipping method and continue", async () => {
    await checkoutPage.selectShippingMethod();
  });

  await test.step("Select payment method and continue", async () => {
    await checkoutPage.selectPaymentMethod();
  });

  await test.step("Fill payment details and continue", async () => {
    await checkoutPage.fillPaymentInfo(
      cardholderName,
      cardNumber,
      cardCode,
      expiryMonth,
      expiryYear,
    );
  });

  await test.step("Verify addresses, payment and shipping in summary", async () => {
    console.log("[Summary] Expected checkout options", {
      Country: country,
      Province: stateProvince,
      "Payment method": expectedPaymentMethod,
      "Shipping method": expectedShippingMethod,
    });

    await checkoutPage.verifyOrderSummaryWraps(
      firstName,
      lastName,
      email,
      phone,
      country,
      stateProvince,
      city,
      address,
      zipCode,
      expectedPaymentMethod,
      expectedShippingMethod,
    );
  });

  await test.step("Verify product, quantity and price in summary", async () => {
    await checkoutPage.verifySummaryCart(productName, productPrice);
    console.log("[Summary] Expected product values", {
      Product: productName,
      "Product price": productPrice,
      Quantity: quantity,
    });
  });

  await test.step("Verify shipping, tax and order total", async () => {
    console.log("[Summary] Values used to verify order total", {
      "Product price": productPrice,
      "Shipping price": shippingPrice,
      "Tax price": taxPrice,
    });

    await checkoutPage.verifyOrderTotal(productPrice, shippingPrice, taxPrice);
  });

  await test.step("Confirm order and verify completion", async () => {
    console.log("[Order] Submitting order");

    await checkoutPage.confirmOrder();

    await expect(page).toHaveURL(completedOrderUrl);

    console.log("[Order] Completion URL verified", {
      url: page.url(),
    });
  });
});
