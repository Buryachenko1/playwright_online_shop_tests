import { expect, type Locator, type Page } from "@playwright/test";

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  postcode: string;
  city: string;
}

export class CheckoutPage {
  private readonly page: Page;

  // step 1 – personal information
  readonly personalInfoStep: Locator;
  readonly genderMrRadio: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly birthdayInput: Locator;
  readonly gdprCheckbox: Locator;
  readonly privacyCheckbox: Locator;
  readonly personalInfoContinueButton: Locator;

  // step 2 – addresses
  readonly addressInput: Locator;
  readonly postcodeInput: Locator;
  readonly cityInput: Locator;
  readonly countrySelect: Locator;
  readonly addressContinueButton: Locator;

  // step 3 – shipping method
  readonly shippingOptions: Locator;
  readonly shippingContinueButton: Locator;

  // step 4 – payment
  readonly termsCheckbox: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.personalInfoStep = page.locator("#checkout-personal-information-step");
    this.genderMrRadio = page.locator("#field-id_gender-1");
    this.firstNameInput = page.locator("#field-firstname");
    this.lastNameInput = page.locator("#field-lastname");
    this.emailInput = page.locator("#field-email");
    this.passwordInput = page.locator("#field-password");
    this.birthdayInput = page.locator("#field-birthday");
    this.gdprCheckbox = page.locator('input[name="psgdpr"]');
    this.privacyCheckbox = page.locator('input[name="customer_privacy"]');
    this.personalInfoContinueButton = page.locator(
      '#checkout-personal-information-step button[type="submit"]',
    );

    this.addressInput = page.locator("#field-address1");
    this.postcodeInput = page.locator("#field-postcode");
    this.cityInput = page.locator("#field-city");
    this.countrySelect = page.locator("#field-id_country");
    this.addressContinueButton = page.locator(
      'button[name="confirm-addresses"]',
    );

    this.shippingOptions = page.locator(".delivery-option");
    this.shippingContinueButton = page.locator(
      '#checkout-delivery-step button[type="submit"]',
    );

    this.termsCheckbox = page.locator(
      "#conditions_to_approve\\[terms-and-conditions\\]",
    );
    this.placeOrderButton = page.locator("#payment-confirmation button");
  }

  async verifyCheckoutPageIsVisible(): Promise<CheckoutPage> {
    await expect(this.personalInfoStep).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    return this;
  }

  async fillPersonalInformation(customer: CustomerData): Promise<CheckoutPage> {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.emailInput.fill(customer.email);
    await this.passwordInput.fill(customer.password);
    await this.gdprCheckbox.check();
    await this.privacyCheckbox.check();
    await this.personalInfoContinueButton.click();
    return this;
  }

  async fillAddress(customer: CustomerData): Promise<CheckoutPage> {
    await expect(this.addressInput).toBeVisible();
    await this.addressInput.fill(customer.address);
    await this.postcodeInput.fill(customer.postcode);
    await this.cityInput.fill(customer.city);
    await this.countrySelect.selectOption({ label: "Česko" });
    await this.addressContinueButton.click();
    return this;
  }

  async continueFromShipping(): Promise<CheckoutPage> {
    await expect(
      this.shippingOptions.first().locator('input[type="radio"]'),
    ).toBeChecked();
    await this.shippingContinueButton.click();
    return this;
  }

  async verifyPaymentStepIsReached(): Promise<CheckoutPage> {
    await expect(this.termsCheckbox).toBeVisible();
    return this;
  }

  async acceptTermsAndConditions(): Promise<CheckoutPage> {
    await this.termsCheckbox.check();
    await expect(this.termsCheckbox).toBeChecked();
    return this;
  }
}
