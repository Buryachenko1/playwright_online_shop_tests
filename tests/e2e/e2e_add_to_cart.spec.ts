import { test } from "@playwright/test";
import { HomePage } from "../../src/pages/presta/home_page";
import { ProductPage } from "../../src/pages/presta/product_page";

test("@smoke Product can be added to cart", async ({ page }) => {
  const homePage = new HomePage(page);
  let productPage: ProductPage;
  let productName: string;

  const productSize = "S";
  const productColor = "Bílá";
  const productQuantity = 1;

  await test.step("Open home page", async () => {
    await homePage
      .openHomePage()
      .then((home) => home.verifyHomePageIsVisible());

    productName = await homePage.getProductName();
  });

  await test.step("Open product detail and configure product", async () => {
    productPage = await homePage.openProductDetail();
    await productPage
      .verifyProductPageIsVisible()
      .then((product) => product.selectSize(productSize))
      .then((product) => product.setQuantity(productQuantity));
  });

  await test.step("Add product to cart and verify modal", async () => {
    await productPage
      .addToCart()
      .then((product) =>
        product.verifyCartModalContent(
          productName,
          productSize,
          productColor,
          productQuantity,
        ),
      );
  });
});
