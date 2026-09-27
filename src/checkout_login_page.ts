import { expect, type Locator, type Page } from "@playwright/test";

export class CheckoutLoginPage {
  private readonly page: Page;

  readonly pageTitle: Locator;
  readonly checkoutAsGuestButton: Locator;
  readonly registerButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator(".login-page .page-title h1");
    this.checkoutAsGuestButton = page.locator(
      "button.checkout-as-guest-button",
    );
    this.registerButton = page.locator("button.register-button");
    this.emailInput = page.locator("#Email");
    this.passwordInput = page.locator("#Password");
    this.rememberMeCheckbox = page.locator("#RememberMe");
    this.loginButton = page.locator("button.login-button");
  }

  async verifyCheckoutLoginPageIsVisible(): Promise<CheckoutLoginPage> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.checkoutAsGuestButton).toBeVisible();
    await expect(this.registerButton).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    return this;
  }

  async checkoutAsGuest(): Promise<void> {
    await this.checkoutAsGuestButton.click();
  }
}
