import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../../src/pages/nopcommerce/home_page";
import { CartPage } from "../../src/pages/nopcommerce/cart_page";
import { CheckoutPage } from "../../src/pages/nopcommerce/checkout_page";

test("@e2e Guest can complete checkout", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const city = faker.location.city();
  const address = faker.location.streetAddress();
  const zipCode = faker.string.numeric(5);
  const phone = faker.string.numeric(9);

  let productName = "";

  await test.step("Open product detail", async () => {
    await homePage.openHomePage();
    await homePage.verifyHomePageIsVisible();

    productName = await homePage.getProductName();

    const productPage = await homePage.openProductDetail();

    await productPage.verifyProductPageIsVisible();
    await productPage.verifyProductTitle(productName);
    await productPage.configureProduct();
    await productPage.addToCart();
  });

  await test.step("Verify product in shopping cart", async () => {
    await page.goto(`${homePage.baseUrl}cart`);

    await cartPage.verifyCartPageIsVisible();
    await cartPage.verifyProductAddedToCart(productName);
    await cartPage.verifyProductQuantity("1");
    await cartPage.acceptTermsOfService();
  });

  const checkoutLoginPage = await cartPage.proceedToCheckout();

  await test.step("Continue checkout as guest", async () => {
    await checkoutLoginPage.verifyCheckoutLoginPageIsVisible();
  });

  await checkoutLoginPage.checkoutAsGuest();
  const checkoutPage = new CheckoutPage(page);

  await test.step("Fill billing address", async () => {
    await checkoutPage.verifyCheckoutPageIsVisible();

    await checkoutPage.fillBillingAddress(
      firstName,
      lastName,
      email,
      "Czech Republic",
      city,
      address,
      zipCode,
      phone,
    );

    await checkoutPage.shipToSameAddressCheckbox.check();
    await checkoutPage.continueFromBilling();
  });

  await test.step("Select shipping method", async () => {
    await checkoutPage.shippingMethodOptions.first().check();
    await checkoutPage.continueFromShippingMethod();
  });

  await test.step("Select payment method", async () => {
    await checkoutPage.paymentMethodOptions.first().check();
    await checkoutPage.continueFromPaymentMethod();
  });

  await test.step("Continue payment information", async () => {
    await checkoutPage.continueFromPaymentInfo();
  });

  await test.step("Confirm order", async () => {
    if (await checkoutPage.confirmTermsOfServiceCheckbox.isVisible()) {
      await checkoutPage.confirmTermsOfServiceCheckbox.check();
    }

    await checkoutPage.confirmOrderButton.click();

    await expect(page).toHaveURL(/checkout\/completed/);
  });
});
