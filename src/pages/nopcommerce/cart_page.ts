import { expect, type Locator, type Page } from "@playwright/test";
import { CheckoutPage } from "./checkout_page";
import { baseUrl } from "../../config";

export class CartPage {
  private readonly page: Page;

  readonly cartTitle: Locator;
  readonly cartItems: Locator;
  readonly itemName: Locator;
  readonly itemImage: Locator;
  readonly itemPrice: Locator;
  readonly itemSize: Locator;
  readonly itemColor: Locator;
  readonly itemQuantityInput: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryShipping: Locator;
  readonly summaryTotal: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartTitle = page.locator(".cart-container h1, #main h1");
    this.cartItems = page.locator(".cart-item");
    this.itemName = page.locator(".cart-item .product-line-info a").first();
    this.itemImage = page.locator(".cart-item .product-image, .cart-item img");
    this.itemPrice = page.locator(".cart-item .product-price .price").first();
    this.itemSize = page.locator(".cart-item .value").first();
    this.itemColor = page.locator(".cart-item .value").nth(1);
    this.itemQuantityInput = page.locator(
      ".cart-item .js-cart-line-product-quantity",
    );
    this.summarySubtotal = page.locator("#cart-subtotal-products .value");
    this.summaryShipping = page.locator("#cart-subtotal-shipping .value");
    this.summaryTotal = page.locator(".cart-summary-line.cart-total .value");
    this.proceedToCheckoutButton = page.locator(".checkout a");
  }

  async openCart(): Promise<CartPage> {
    await this.page.goto(`${baseUrl}/kosik?action=show`);
    return this;
  }

  async verifyCartPageIsVisible(): Promise<CartPage> {
    await expect(this.cartTitle).toBeVisible();
    await expect(this.cartItems.first()).toBeVisible();
    await expect(this.itemImage.first()).toBeVisible();
    await expect(this.summaryTotal).toBeVisible();
    await expect(this.proceedToCheckoutButton).toBeVisible();
    return this;
  }

  async verifyCartItemsCount(expectedCount: number): Promise<CartPage> {
    await expect(this.cartItems).toHaveCount(expectedCount);
    return this;
  }

  async verifyCartItemDetails(
    expectedName: string,
    expectedSize: string,
    expectedColor: string,
    expectedQuantity: number,
  ): Promise<CartPage> {
    await expect(this.itemName).toContainText(expectedName);
    await expect(this.itemSize).toHaveText(expectedSize);
    await expect(this.itemColor).toHaveText(expectedColor);
    await expect(this.itemQuantityInput).toHaveValue(String(expectedQuantity));
    return this;
  }

  async verifyItemPrice(expectedPrice: string): Promise<CartPage> {
    const cartPrice = await this.getItemPrice();
    expect(cartPrice).toBe(expectedPrice);
    return this;
  }

  async verifyCartSummary(expectedSubtotal: string): Promise<CartPage> {
    const subtotal = await this.summarySubtotal.textContent();
    expect(subtotal?.replace(/\u00A0/g, " ").trim()).toBe(expectedSubtotal);
    await expect(this.summaryShipping).toBeVisible();
    await expect(this.summaryTotal).toBeVisible();
    return this;
  }

  async getItemPrice(): Promise<string> {
    const price = await this.itemPrice.textContent();
    return price ? price.replace(/\u00A0/g, " ").trim() : "";
  }

  async proceedToCheckout(): Promise<CheckoutPage> {
    await expect(this.proceedToCheckoutButton).toBeVisible();
    await this.proceedToCheckoutButton.click();
    return new CheckoutPage(this.page);
  }
}
