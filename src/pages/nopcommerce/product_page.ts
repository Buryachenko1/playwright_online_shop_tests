import { expect, type Locator, type Page } from "@playwright/test";

export class ProductPage {
  private readonly page: Page;

  readonly productDetails: Locator;
  readonly productOverview: Locator;

  readonly productImage: Locator;
  readonly productTitle: Locator;
  readonly productRating: Locator;
  readonly productPrice: Locator;
  readonly productAttributes: Locator;

  readonly processorSelect: Locator;
  readonly ramSelect: Locator;
  readonly quantityInput: Locator;

  readonly addToCartButton: Locator;
  readonly addToCompareListButton: Locator;
  readonly addToWishlistButton: Locator;

  readonly fullDescription: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productDetails = page.locator(
      "#product-details-form > article[data-productid]",
    );
    this.productOverview = this.productDetails.locator(
      ".product-essential > .overview",
    );

    this.productImage = this.productDetails.locator(".gallery .picture img");
    this.productTitle = this.productOverview.locator(".product-name h1");
    this.productRating = this.productOverview.locator(
      ".product-reviews-overview .product-review-box",
    );
    this.productPrice = this.productOverview.locator(
      '.product-price span[id^="price-value-"]',
    );
    this.productAttributes = this.productOverview.locator(".attributes");

    this.processorSelect = this.productAttributes.locator(
      'select[name="product_attribute_1"]',
    );
    this.ramSelect = this.productAttributes.locator(
      'select[name="product_attribute_2"]',
    );
    this.quantityInput = this.productOverview.locator("input.qty-input");

    this.addToCartButton = this.productOverview.locator(
      "button.add-to-cart-button",
    );
    this.addToCompareListButton = this.productOverview.locator(
      "button.add-to-compare-list-button",
    );
    this.addToWishlistButton = this.productOverview.locator(
      "button.add-to-wishlist-button",
    );

    this.fullDescription = this.productDetails.locator(".full-description");
  }

  async verifyProductPageIsVisible(): Promise<ProductPage> {
    await expect(this.productDetails).toBeVisible();
    await expect(this.productImage).toBeVisible();
    await expect(this.productTitle).toBeVisible();
    await expect(this.productRating).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAttributes).toBeVisible();
    await expect(this.processorSelect).toBeVisible();
    await expect(this.ramSelect).toBeVisible();
    await expect(this.quantityInput).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCompareListButton).toBeVisible();
    await expect(this.addToWishlistButton).toBeVisible();
    return this;
  }

  async verifyProductTitle(expectedTitle: string): Promise<ProductPage> {
    await expect(this.productTitle).toHaveText(expectedTitle);
    return this;
  }

  async verifyProductPrice(expectedPrice: string): Promise<ProductPage> {
    await expect(this.productPrice).toHaveText(expectedPrice);
    return this;
  }

  async getProductPrice(): Promise<string> {
    const price = await this.productPrice.textContent();
    return price ? price.replace(/\u00A0/g, " ").trim() : "";
  }

  async configureProduct(): Promise<ProductPage> {
    await this.processorSelect.selectOption({ index: 1 });
    await this.ramSelect.selectOption({ index: 1 });
    return this;
  }

  async addToCart(): Promise<ProductPage> {
    await this.addToCartButton.click();
    return this;
  }
}
