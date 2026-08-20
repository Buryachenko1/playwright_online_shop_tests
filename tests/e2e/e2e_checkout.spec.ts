// import { test } from "@playwright/test";
// import { HomePage } from "../../src/pages/presta/home_page";
// import { ProductPage } from "../../src/pages/presta/product_page";
// import { CartPage } from "../../src/pages/presta/cart_page";
// import { CheckoutPage } from "../../src/pages/presta/checkout_page";
// import { faker } from "@faker-js/faker";
// import type { CustomerData } from "../../src/pages/presta/checkout_page";

// test("@e2e, @regression E2E Order Flow", async ({ page }) => {
//   const homePage = new HomePage(page);
//   let productPage: ProductPage;
//   let cartPage: CartPage;
//   let checkoutPage: CheckoutPage;

//   const customer: CustomerData = {
//     firstName: faker.person.firstName(),
//     lastName: faker.person.lastName(),
//     email: faker.internet.email().toLowerCase(),
//     password: faker.internet.password({ length: 12 }),
//     address: faker.location.streetAddress(),
//     postcode: faker.string.numeric(5),
//     city: faker.location.city(),
//   };

//   let productName: string;
//   const productSize = "S";
//   const productColor = "Bílá";
//   const productQuantity = 1;
//   let detailPrice: string;

//   await test.step("Open home page", async () => {
//     await homePage
//       .openHomePage()
//       .then((home) => home.verifyHomePageHasUrl())
//       .then((home) => home.verifyHomePageIsVisible());

//     productName = await homePage.getProductName();
//   });

//   await test.step("Open product detail and configure product", async () => {
//     productPage = await homePage.openProductDetail();
//     await productPage
//       .verifyProductPageIsVisible()
//       .then((product) => product.verifyProductTitle(productName))
//       .then((product) => product.selectSize(productSize))
//       .then((product) => product.setQuantity(productQuantity));

//     detailPrice = await productPage.getProductPrice();
//     console.log(
//       `Ordering product: ${productName}, size: ${productSize}, price: ${detailPrice}`,
//     );
//   });

//   await test.step("Add product to cart and verify modal", async () => {
//     await productPage
//       .addToCart()
//       .then((product) =>
//         product.verifyCartModalContent(
//           productName,
//           productSize,
//           productColor,
//           productQuantity,
//         ),
//       )
//       .then((product) => product.verifyModalSubtotal(detailPrice));
//   });

//   await test.step("Verify cart content", async () => {
//     cartPage = await productPage.proceedToCheckout();
//     await cartPage
//       .verifyCartPageIsVisible()
//       .then((cart) => cart.verifyCartItemsCount(1))
//       .then((cart) =>
//         cart.verifyCartItemDetails(
//           productName,
//           productSize,
//           productColor,
//           productQuantity,
//         ),
//       )
//       .then((cart) => cart.verifyItemPrice(detailPrice))
//       .then((cart) => cart.verifyCartSummary(detailPrice));
//   });

//   await test.step("Fill customer information and address in checkout", async () => {
//     checkoutPage = await cartPage.proceedToCheckout();
//     await checkoutPage
//       .verifyCheckoutPageIsVisible()
//       .then((checkout) => checkout.fillPersonalInformation(customer))
//       .then((checkout) => checkout.fillAddress(customer));

//     console.log(
//       `Customer: ${customer.firstName} ${customer.lastName}, email: ${customer.email}, password: ${customer.password}`,
//     );
//   });

//   await test.step("Continue from shipping step", async () => {
//     await checkoutPage.continueFromShipping();
//   });

//   await test.step("Reach payment step and accept terms", async () => {
//     await checkoutPage
//       .verifyPaymentStepIsReached()
//       .then((checkout) => checkout.acceptTermsAndConditions());
//   });
// });
