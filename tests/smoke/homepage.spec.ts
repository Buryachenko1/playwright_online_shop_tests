import { expect, test } from "@playwright/test";
import { HomePage } from "../../src/pages/nopcommerce/home_page";

test("@smoke Products are displayed on homepage", async ({ page }) => {
  const homePage = new HomePage(page);
  const expectedProductCount = 4;

  await test.step("Open home page", async () => {
    await homePage.openHomePage();
    await homePage.verifyHomePageIsVisible();
  });

  await test.step("Verify all expected products are visible", async () => {
    await expect(homePage.productTitles).toHaveCount(expectedProductCount);

    for (let index = 0; index < expectedProductCount; index++) {
      await expect(homePage.productTitles.nth(index)).toBeVisible();
    }
  });
});
