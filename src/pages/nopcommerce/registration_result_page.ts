import { expect, type Locator, type Page } from "@playwright/test";
import { Header } from "./header.ts";

export class RegistrationResultPage {
  private readonly page: Page;

  readonly header: Header;
  readonly pageTitle: Locator;
  readonly registrationResult: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = new Header(page);

    this.pageTitle = page.locator(".page-title");
    this.registrationResult = page.locator(".result");
    this.continueButton = page.locator(".register-continue-button");
  }

  async verifyRegistrationIsSuccessful(): Promise<void> {
    await expect(this.page).toHaveURL(/registerresult\/1/);
    await expect(this.pageTitle).toBeVisible();
    await expect(this.registrationResult).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }
}
