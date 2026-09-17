import { test } from "@playwright/test";
import { HomePage } from "../../../src/pages/presta/home_page";

test("@smoke Product detail opens and displays basic information", async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step("Open home page", async () => {
    await homePage.openHomePage();
    await homePage.verifyHomePageIsVisible();
  });

  await test.step("Open product detail and verify basic information", async () => {
    const productName = await homePage.getProductName();
    const productPage = await homePage.openProductDetail();

    await productPage.verifyProductPageIsVisible();
    await productPage.verifyProductTitle(productName);
  });
});