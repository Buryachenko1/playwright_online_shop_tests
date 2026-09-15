import { test } from "@playwright/test";
import { HomePage } from "../../src/pages/presta/home_page";

test("@smoke Home page loads with all main sections", async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step("Open home page and verify layout", async () => {
    await homePage
      .openHomePage()
      .then((home) => home.verifyHomePageHasUrl())
      .then((home) => home.verifyHomePageIsVisible());
  });
});

test("@smoke Product detail is accessible from home page", async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step("Open home page", async () => {
    await homePage
      .openHomePage()
      .then((home) => home.verifyHomePageIsVisible());
  });

  await test.step("Open product detail and verify it", async () => {
    const productName = await homePage.getProductName();
    const productPage = await homePage.openProductDetail();
    await productPage
      .verifyProductPageIsVisible()
      .then((product) => product.verifyProductTitle(productName));
  });
});
