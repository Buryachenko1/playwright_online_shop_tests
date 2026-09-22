import { expect, type Locator, type Page } from "@playwright/test";

export class RegistrationPage {
  private readonly page: Page;

  readonly genderMale: Locator;
  readonly genderFemale: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly companyNameInput: Locator;
  readonly companyVatIput: Locator;
  readonly passwordInput: Locator;
  readonly passwordConfirmationInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.genderMale = page.locator("#gender-male");
    this.genderFemale = page.locator("#gender-female");
    this.firstNameInput = page.locator("#FirstName");
    this.lastNameInput = page.locator("#LastName");
    this.emailInput = page.locator("#Email");
    this.companyNameInput = page.locator("#Company");
    this.companyVatIput = page.locator("#VatNumber");
    this.passwordInput = page.locator("#Password");
    this.passwordConfirmationInput = page.locator("#ConfirmPassword");
    this.registerButton = page.locator("#register-button");
  }

  async verifyRegistrationPageIsVisible(): Promise<RegistrationPage> {
    await expect(this.genderMale).toBeVisible();

    return this;
  }
}
