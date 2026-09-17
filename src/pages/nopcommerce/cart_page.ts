import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  checkoutAsGuest() {
    throw new Error("Method not implemented.");
  }
  verifyCheckoutLoginPageIsVisible() {
    throw new Error("Method not implemented.");
  }
  private readonly page: Page;

  readonly pageTitle: Locator;
  readonly shoppingCartForm: Locator;
  readonly cartTable: Locator;

  readonly cartItem: Locator;
  readonly productImage: Locator;
  readonly productTitle: Locator;
  readonly productAttributes: Locator;
  readonly productPrice: Locator;
  readonly productQuantity: Locator;
  readonly productSubtotal: Locator;
  readonly removeButton: Locator;

  readonly continueShoppingButton: Locator;
  readonly estimateShippingButton: Locator;

  readonly cartTotals: Locator;
  readonly orderSubtotal: Locator;
  readonly orderTotal: Locator;

  readonly termsOfService: Locator;
  readonly termsOfServiceCheckbox: Locator;
  readonly termsOfServiceLabel: Locator;
  readonly termsOfServiceReadLink: Locator;

  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator(".shopping-cart-page .page-title h1");
    this.shoppingCartForm = page.locator("#shopping-cart-form");
    this.cartTable = this.shoppingCartForm.locator("table.cart");

    this.cartItem = this.cartTable.locator(
      'tbody tr:has(a.product-name[href="/build-your-own-computer"])',
    );
    this.productImage = this.cartItem.locator("td.product-picture img");
    this.productTitle = this.cartItem.locator("a.product-name");
    this.productAttributes = this.cartItem.locator(".attributes");
    this.productPrice = this.cartItem.locator(".product-unit-price");
    this.productQuantity = this.cartItem.locator("input.qty-input");
    this.productSubtotal = this.cartItem.locator(".product-subtotal");
    this.removeButton = this.cartItem.locator("button.remove-btn");

    this.continueShoppingButton = this.shoppingCartForm.locator(
      "button.continue-shopping-button",
    );
    this.estimateShippingButton = this.shoppingCartForm.locator(
      "button.estimate-shipping-button",
    );

    this.cartTotals = this.shoppingCartForm.locator(".cart-footer .totals");
    this.orderSubtotal = this.cartTotals.locator(
      ".order-subtotal .value-summary",
    );
    this.orderTotal = this.cartTotals.locator(".order-total .value-summary");

    this.termsOfService = this.cartTotals.locator(".terms-of-service");
    this.termsOfServiceCheckbox =
      this.termsOfService.locator("#termsofservice");
    this.termsOfServiceLabel = this.termsOfService.locator(
      'label[for="termsofservice"]',
    );
    this.termsOfServiceReadLink = this.termsOfService.locator("#read-terms");

    this.checkoutButton = this.cartTotals.locator("#checkout");
  }

  async verifyCartPageIsVisible(): Promise<CartPage> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.shoppingCartForm).toBeVisible();
    await expect(this.cartTable).toBeVisible();
    await expect(this.cartTotals).toBeVisible();
    await expect(this.termsOfServiceCheckbox).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
    return this;
  }

  async verifyProductAddedToCart(expectedTitle: string): Promise<CartPage> {
    await expect(this.cartItem).toBeVisible();
    await expect(this.productImage).toBeVisible();
    await expect(this.productTitle).toHaveText(expectedTitle);
    await expect(this.productAttributes).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productQuantity).toBeVisible();
    await expect(this.productSubtotal).toBeVisible();
    await expect(this.removeButton).toBeVisible();
    return this;
  }

  async verifyProductPrice(expectedPrice: string): Promise<CartPage> {
    await expect(this.productPrice).toHaveText(expectedPrice);
    return this;
  }

  async verifyProductQuantity(expectedQuantity: string): Promise<CartPage> {
    await expect(this.productQuantity).toHaveValue(expectedQuantity);
    return this;
  }

  async verifyProductSubtotal(expectedSubtotal: string): Promise<CartPage> {
    await expect(this.productSubtotal).toHaveText(expectedSubtotal);
    return this;
  }

  async verifyOrderTotal(expectedTotal: string): Promise<CartPage> {
    await expect(this.orderTotal).toHaveText(expectedTotal);
    return this;
  }

  async acceptTermsOfService(): Promise<CartPage> {
    await this.termsOfServiceCheckbox.check();
    return this;
  }

  async verifyTermsOfServiceIsAccepted(): Promise<CartPage> {
    await expect(this.termsOfServiceCheckbox).toBeChecked();
    return this;
  }

  async removeProduct(): Promise<CartPage> {
    await this.removeButton.click();
    return this;
  }

  async proceedToCheckout(): Promise<CartPage> {
    await this.checkoutButton.click();
    return this;
  }
}
