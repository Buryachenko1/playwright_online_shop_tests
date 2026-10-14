import { expect, type Locator, type Page } from "@playwright/test";
import { RegistrationResultPage } from "./registration_result_page";

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class RegistrationPage {
  private readonly page: Page;
  private readonly url = "/register?returnUrl=%2F";

  readonly genderMale: Locator;
  readonly genderFemale: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly companyNameInput: Locator;
  readonly companyVatInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordConfirmationInput: Locator;
  readonly registerButton: Locator;

  private readonly firstNameError: Locator;
  private readonly lastNameError: Locator;
  private readonly emailError: Locator;
  private readonly passwordConfirmationError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.genderMale = page.locator("#gender-male");
    this.genderFemale = page.locator("#gender-female");
    this.firstNameInput = page.locator("#FirstName");
    this.lastNameInput = page.locator("#LastName");
    this.emailInput = page.locator("#Email");
    this.companyNameInput = page.locator("#Company");
    this.companyVatInput = page.locator("#VatNumber");
    this.passwordInput = page.locator("#Password");
    this.passwordConfirmationInput = page.locator("#ConfirmPassword");
    this.registerButton = page.locator("#register-button");

    this.firstNameError = page.locator("#FirstName-error");
    this.lastNameError = page.locator("#LastName-error");
    this.emailError = page.locator("#Email-error");
    this.passwordConfirmationError = page.locator("#ConfirmPassword-error");
  }

  async openRegistrationNopcommerce(): Promise<RegistrationPage> {
    await this.page.goto(this.url);

    return this;
  }

  async verifyRegistrationPageIsVisible(): Promise<void> {
    await expect(this.genderMale).toBeVisible();
    await expect(this.genderFemale).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.companyNameInput).toBeVisible();
    await expect(this.companyVatInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordConfirmationInput).toBeVisible();
    await expect(this.registerButton).toBeVisible();
  }

  async verifyGenderRadioButtons(): Promise<void> {
    await this.genderMale.check();
    await expect(this.genderMale).toBeChecked();
    await expect(this.genderFemale).not.toBeChecked();

    await this.genderFemale.check();
    await expect(this.genderFemale).toBeChecked();
    await expect(this.genderMale).not.toBeChecked();
  }

  async registerNewUser(
    data: RegistrationData,
  ): Promise<RegistrationResultPage> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.passwordConfirmationInput.fill(data.confirmPassword);

    await this.registerButton.click();

    return new RegistrationResultPage(this.page);
  }

  async verifyFirstNameError(expectedError: string): Promise<void> {
    await expect(this.firstNameError).toHaveText(expectedError);
  }

  async verifyLastNameError(expectedError: string): Promise<void> {
    await expect(this.lastNameError).toHaveText(expectedError);
  }

  async verifyEmailError(expectedError: string): Promise<void> {
    await expect(this.emailError).toHaveText(expectedError);
  }

  async verifyPasswordError(expectedError: string): Promise<void> {
    await expect(this.passwordConfirmationError).toHaveText(expectedError);
  }
}
