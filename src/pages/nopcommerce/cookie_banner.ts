import { type Locator, type Page } from "@playwright/test";

export class CookieBanner {
  private readonly page: Page;

  readonly cookieBanner: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cookieBanner = page.locator(".ok-button");
  }

  async confirmCookies(): Promise<void> {
    await this.cookieBanner.click();
  }
}
