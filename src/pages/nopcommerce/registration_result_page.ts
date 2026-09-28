import { expect, type Locator, type Page } from "@playwright/test";

export class RegistrationResultPage {
  private readonly page: Page;
  private readonly url = "/registerresult/1?returnUrl=/";

  readonly pageTitle: Locator;
  readonly registrationResult: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator(".page-title");
    this.registrationResult = page.locator(".result");
    this.continueButton = page.locator(".register-continue-button");
  }

  async verifyRegistrationIsSuccessful(): Promise<void> {
    await expect(this.page).toHaveURL(this.url);
    await expect(this.pageTitle).toBeVisible();
    await expect(this.registrationResult).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }
}
