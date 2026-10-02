import { expect, type Locator, type Page } from "@playwright/test";
import { AccountPage } from "./account_page";
import { HomePage } from "./home_page";
import { LoginPage } from "./login_page";
import { CartPage } from "./cart_page";

export class Header {
  private readonly page: Page;

  readonly header: Locator;
  readonly headerUpper: Locator;
  readonly logoutLink: Locator;
  readonly myAccountLink: Locator;
  readonly loginLink: Locator;
  readonly cartLink: Locator;
  readonly headerLower: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = page.locator("header.header");
    this.headerUpper = this.header.locator(".header-upper");
    this.myAccountLink = this.headerUpper.locator(".ico-account");
    this.logoutLink = this.headerUpper.locator(".ico-logout");
    this.loginLink = this.headerUpper.locator(".ico-login");
    this.cartLink = this.headerUpper.locator("#topcartlink a");

    this.headerLower = this.header.locator(".header-lower");
  }

  async verifyHeaderIsVisible(): Promise<Header> {
    await expect(this.header).toBeVisible();
    await expect(this.headerUpper).toBeVisible();
    await expect(this.headerLower).toBeVisible();

    return this;
  }

  async openMyAccount(): Promise<AccountPage> {
    await this.myAccountLink.click();

    return new AccountPage(this.page);
  }

  async logoutUser(): Promise<HomePage> {
    await this.logoutLink.click();

    return new HomePage(this.page);
  }

  async openLoginPage(): Promise<LoginPage> {
    await this.loginLink.click();

    return new LoginPage(this.page);
  }

  async openCart(): Promise<CartPage> {
    await this.cartLink.click();

    return new CartPage(this.page);
  }
}
