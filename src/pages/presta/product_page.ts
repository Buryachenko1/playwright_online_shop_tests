import { expect, type Locator, type Page } from "@playwright/test";
import { CartPage } from "./cart_page.ts";

export class ProductPage {
  private readonly page: Page;

  // product detail
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly sizeSelect: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  // modal after adding to cart
  readonly cartModal: Locator;
  readonly cartModalTitle: Locator;
  readonly modalProductName: Locator;
  readonly modalProductPrice: Locator;
  readonly modalProductSize: Locator;
  readonly modalProductColor: Locator;
  readonly modalProductQuantity: Locator;
  readonly modalSubtotal: Locator;
  readonly modalShipping: Locator;
  readonly modalTotal: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productTitle = page.locator("h1");
    this.productPrice = page.locator(".current-price-value");
    this.sizeSelect = page.locator("#group_1");
    this.quantityInput = page.locator("#quantity_wanted");
    this.addToCartButton = page.locator("button.add-to-cart");

    this.cartModal = page.locator("#blockcart-modal");
    this.cartModalTitle = page.locator("#blockcart-modal .modal-title");
    this.modalProductName = page.locator("#blockcart-modal .product-name");
    this.modalProductPrice = page.locator("#blockcart-modal .product-price");
    this.modalProductSize = page
      .locator("#blockcart-modal span", { hasText: "Velikost" })
      .locator("strong");
    this.modalProductColor = page
      .locator("#blockcart-modal span", { hasText: "Barva" })
      .locator("strong");
    this.modalProductQuantity = page
      .locator("#blockcart-modal span", { hasText: "Množství" })
      .locator("strong");
    this.modalSubtotal = page.locator("#blockcart-modal .subtotal.value");
    this.modalShipping = page.locator("#blockcart-modal .shipping.value");
    this.modalTotal = page.locator("#blockcart-modal .product-total .value");
    this.proceedToCheckoutButton = page.locator(
      "#blockcart-modal .cart-content-btn a",
    );
    this.continueShoppingButton = page.locator(
      "#blockcart-modal .cart-content-btn button",
    );
  }

  async verifyProductPageIsVisible(): Promise<ProductPage> {
    await expect(this.productTitle).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.sizeSelect).toBeVisible();
    await expect(this.quantityInput).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
    return this;
  }

  async verifyProductTitle(expectedTitle: string): Promise<ProductPage> {
    await expect(this.productTitle).toContainText(expectedTitle);
    return this;
  }

  async selectSize(size: string): Promise<ProductPage> {
    await expect(this.sizeSelect).toBeVisible();
    await this.sizeSelect.selectOption({ label: size });
    return this;
  }

  async setQuantity(quantity: number): Promise<ProductPage> {
    await expect(this.quantityInput).toBeVisible();
    await this.quantityInput.fill(String(quantity));
    return this;
  }

  async getProductPrice(): Promise<string> {
    const price = await this.productPrice.textContent();
    return price ? price.replace(/\u00A0/g, " ").trim() : "";
  }

  async addToCart(): Promise<ProductPage> {
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click();
    await expect(this.cartModal).toBeVisible();
    await expect(this.cartModalTitle).toContainText(/přidán/i);
    return this;
  }

  async verifyProductAddedToCart(expectedName: string): Promise<ProductPage> {
    await expect(this.modalProductName).toContainText(expectedName);
    await expect(this.modalProductPrice).toBeVisible();
    await expect(this.modalProductSize).toBeVisible();
    await expect(this.modalProductColor).toBeVisible();
    await expect(this.modalProductQuantity).toBeVisible();
    return this;
  }

  async verifyCartModalContent(
    expectedName: string,
    expectedSize: string,
    expectedColor: string,
    expectedQuantity: number,
  ): Promise<ProductPage> {
    await expect(this.modalProductName).toContainText(expectedName);
    await expect(this.modalProductPrice).toBeVisible();
    await expect(this.modalProductSize).toHaveText(expectedSize);
    await expect(this.modalProductColor).toHaveText(expectedColor);
    await expect(this.modalProductQuantity).toHaveText(
      String(expectedQuantity),
    );
    return this;
  }

  async verifyModalSubtotal(expectedPrice: string): Promise<ProductPage> {
    const subtotal = await this.modalSubtotal.textContent();
    expect(subtotal?.replace(/\u00A0/g, " ").trim()).toBe(expectedPrice);
    return this;
  }

  async proceedToCheckout(): Promise<CartPage> {
    await expect(this.proceedToCheckoutButton).toBeVisible();
    await this.proceedToCheckoutButton.click();
    return new CartPage(this.page);
  }
}
