import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../../src/pages/nopcommerce/home_page";
import { ProductPage } from "../../src/pages/nopcommerce/product_page";
import { CartPage } from "../../src/pages/nopcommerce/cart_page";
import { CheckoutLoginPage } from "../../src/pages/nopcommerce/checkout_login_page";
import { CheckoutPage } from "../../src/pages/nopcommerce/checkout_page";
import { CookieBanner } from "../../src/pages/nopcommerce/cookie_banner";

test("@e2e Guest can complete checkout", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutLoginPage = new CheckoutLoginPage(page);
  const checkoutPage = new CheckoutPage(page);
  const cookieBanner = new CookieBanner(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const country = "Czechia";
  const city = faker.location.city();
  const address = faker.location.streetAddress();
  const zipCode = faker.string.numeric(5);
  const phone = faker.string.numeric(9);
  const cardholderName = `${firstName} ${lastName}`;
  const cardNumber = "4111111111111111";
  const cardCode = "123";
  const quantity = "1";
  //const expectedSuccessNotification =
  //"The product has been added to your shopping cart";

  let productName: string;

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
    // await productPage.verifyNotificationSuccesBarIsVisible(expectedSuccessNotification);
  });

  await test.step("Verify product and quantity in cart", async () => {
    await page.goto("/cart");

    await cookieBanner.confirmCookies();
    //await cartPage.verifyCartPageIsVisible();
    await cartPage.verifyProductAddedToCart(productName);
    await cartPage.verifyProductQuantity(quantity);
  });

  await test.step("Start checkout as guest", async () => {
    await cartPage.acceptTermsOfService();
    await cartPage.proceedToCheckout();

    await checkoutLoginPage.verifyCheckoutLoginPageIsVisible();
    await checkoutLoginPage.checkoutAsGuest();

    await checkoutPage.verifyCheckoutPageIsVisible();
  });

  await test.step("Fill billing and shipping address", async () => {
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

    await checkoutPage.shipToSameAddressCheckbox.check();
    await checkoutPage.continueFromBilling();
  });

  await test.step("Select shipping method and continue", async () => {
    await checkoutPage.selectShippingMethod();
  });

  await test.step("Select payment method and continue", async () => {
    await checkoutPage.selectPaymentMethod();
  });

  await test.step("Fill payment card details", async () => {
    await checkoutPage.fillPaymentCardDetails(
      cardholderName,
      cardNumber,
      cardCode,
      "12",
      "2028",
    );
  });

  //await test.step("Confirm order", async () => {
});
