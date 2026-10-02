import { expect, type Locator, type Page } from "@playwright/test";
import { AccountPage } from "./account_page";

export class Header {
  private readonly page: Page;

  readonly header: Locator;
  readonly headerUpper: Locator;
  readonly myAccountLink: Locator;
  readonly headerLower: Locator;
  readonly headerMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = page.locator("header.header");
    this.headerUpper = this.header.locator(".header-upper");
    this.myAccountLink = this.headerUpper.locator(".ico-account");
    this.logoutLink = this.headerUpper.locator(".ico-logout");

    this.headerLower = this.header.locator(".header-lower");
    this.headerMenu = this.headerLower.locator(".header-menu");
  }

  async verifyHeaderIsVisible(): Promise<Header> {
    await expect(this.header).toBeVisible();
    await expect(this.headerUpper).toBeVisible();
    await expect(this.headerLower).toBeVisible();
    await expect(this.headerMenu).toBeVisible();

    return this;
  }

  async openMyAccount(): Promise<AccountPage> {
    await this.myAccountLink.click();

    return new AccountPage(this.page);
  }

  async logoutUser(): Promise;
}
