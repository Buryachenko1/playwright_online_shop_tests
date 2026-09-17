import { expect, type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
  private readonly page: Page;

  readonly checkoutPage: Locator;
  readonly pageTitle: Locator;
  readonly checkoutSteps: Locator;

  // Billing address
  readonly billingSection: Locator;
  readonly billingForm: Locator;
  readonly billingAddressForm: Locator;
  readonly billingFirstNameInput: Locator;
  readonly billingLastNameInput: Locator;
  readonly billingEmailInput: Locator;
  readonly billingCompanyInput: Locator;
  readonly billingCountrySelect: Locator;
  readonly billingStateSelect: Locator;
  readonly billingCityInput: Locator;
  readonly billingAddress1Input: Locator;
  readonly billingAddress2Input: Locator;
  readonly billingZipCodeInput: Locator;
  readonly billingPhoneInput: Locator;
  readonly billingFaxInput: Locator;
  readonly shipToSameAddressCheckbox: Locator;
  readonly billingContinueButton: Locator;

  // Shipping address
  readonly shippingSection: Locator;
  readonly shippingForm: Locator;
  readonly shippingAddressForm: Locator;
  readonly shippingFirstNameInput: Locator;
  readonly shippingLastNameInput: Locator;
  readonly shippingEmailInput: Locator;
  readonly shippingCompanyInput: Locator;
  readonly shippingCountrySelect: Locator;
  readonly shippingStateSelect: Locator;
  readonly shippingCityInput: Locator;
  readonly shippingAddress1Input: Locator;
  readonly shippingAddress2Input: Locator;
  readonly shippingZipCodeInput: Locator;
  readonly shippingPhoneInput: Locator;
  readonly shippingFaxInput: Locator;
  readonly shippingContinueButton: Locator;

  // Shipping method
  readonly shippingMethodSection: Locator;
  readonly shippingMethodForm: Locator;
  readonly shippingMethodOptions: Locator;
  readonly shippingMethodContinueButton: Locator;

  // Payment method
  readonly paymentMethodSection: Locator;
  readonly paymentMethodForm: Locator;
  readonly paymentMethodOptions: Locator;
  readonly paymentMethodContinueButton: Locator;

  // Payment info
  readonly paymentInfoSection: Locator;
  readonly paymentInfoForm: Locator;
  readonly paymentInfoContent: Locator;
  readonly paymentInfoContinueButton: Locator;

  // Confirm order
  readonly confirmOrderSection: Locator;
  readonly confirmOrderContent: Locator;
  readonly orderSummary: Locator;
  readonly confirmTermsOfServiceCheckbox: Locator;
  readonly confirmOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkoutPage = page.locator(".checkout-page");
    this.pageTitle = this.checkoutPage.locator(".page-title h1");
    this.checkoutSteps = this.checkoutPage.locator("#checkout-steps");

    // Billing address
    this.billingSection = this.checkoutSteps.locator("#opc-billing");
    this.billingForm = this.billingSection.locator("#co-billing-form");
    this.billingAddressForm = this.billingForm.locator(
      "#billing-new-address-form",
    );
    this.billingFirstNameInput = this.billingAddressForm.locator(
      "#BillingNewAddress_FirstName",
    );
    this.billingLastNameInput = this.billingAddressForm.locator(
      "#BillingNewAddress_LastName",
    );
    this.billingEmailInput = this.billingAddressForm.locator(
      "#BillingNewAddress_Email",
    );
    this.billingCompanyInput = this.billingAddressForm.locator(
      "#BillingNewAddress_Company",
    );
    this.billingCountrySelect = this.billingAddressForm.locator(
      "#BillingNewAddress_CountryId",
    );
    this.billingStateSelect = this.billingAddressForm.locator(
      "#BillingNewAddress_StateProvinceId",
    );
    this.billingCityInput = this.billingAddressForm.locator(
      "#BillingNewAddress_City",
    );
    this.billingAddress1Input = this.billingAddressForm.locator(
      "#BillingNewAddress_Address1",
    );
    this.billingAddress2Input = this.billingAddressForm.locator(
      "#BillingNewAddress_Address2",
    );
    this.billingZipCodeInput = this.billingAddressForm.locator(
      "#BillingNewAddress_ZipPostalCode",
    );
    this.billingPhoneInput = this.billingAddressForm.locator(
      "#BillingNewAddress_PhoneNumber",
    );
    this.billingFaxInput = this.billingAddressForm.locator(
      "#BillingNewAddress_FaxNumber",
    );
    this.shipToSameAddressCheckbox =
      this.billingSection.locator("#ShipToSameAddress");
    this.billingContinueButton = this.billingSection.locator(
      "button.new-address-next-step-button",
    );

    // Shipping address
    this.shippingSection = this.checkoutSteps.locator("#opc-shipping");
    this.shippingForm = this.shippingSection.locator("#co-shipping-form");
    this.shippingAddressForm = this.shippingForm.locator(
      "#shipping-new-address-form",
    );
    this.shippingFirstNameInput = this.shippingAddressForm.locator(
      "#ShippingNewAddress_FirstName",
    );
    this.shippingLastNameInput = this.shippingAddressForm.locator(
      "#ShippingNewAddress_LastName",
    );
    this.shippingEmailInput = this.shippingAddressForm.locator(
      "#ShippingNewAddress_Email",
    );
    this.shippingCompanyInput = this.shippingAddressForm.locator(
      "#ShippingNewAddress_Company",
    );
    this.shippingCountrySelect = this.shippingAddressForm.locator(
      "#ShippingNewAddress_CountryId",
    );
    this.shippingStateSelect = this.shippingAddressForm.locator(
      "#ShippingNewAddress_StateProvinceId",
    );
    this.shippingCityInput = this.shippingAddressForm.locator(
      "#ShippingNewAddress_City",
    );
    this.shippingAddress1Input = this.shippingAddressForm.locator(
      "#ShippingNewAddress_Address1",
    );
    this.shippingAddress2Input = this.shippingAddressForm.locator(
      "#ShippingNewAddress_Address2",
    );
    this.shippingZipCodeInput = this.shippingAddressForm.locator(
      "#ShippingNewAddress_ZipPostalCode",
    );
    this.shippingPhoneInput = this.shippingAddressForm.locator(
      "#ShippingNewAddress_PhoneNumber",
    );
    this.shippingFaxInput = this.shippingAddressForm.locator(
      "#ShippingNewAddress_FaxNumber",
    );
    this.shippingContinueButton = this.shippingSection.locator(
      "button.new-address-next-step-button",
    );

    // Shipping method
    this.shippingMethodSection = this.checkoutSteps.locator(
      "#opc-shipping_method",
    );
    this.shippingMethodForm = this.shippingMethodSection.locator(
      "#co-shipping-method-form",
    );
    this.shippingMethodOptions = this.shippingMethodForm.locator(
      'input[name="shippingoption"]',
    );
    this.shippingMethodContinueButton = this.shippingMethodSection.locator(
      "button.shipping-method-next-step-button",
    );

    // Payment method
    this.paymentMethodSection = this.checkoutSteps.locator(
      "#opc-payment_method",
    );
    this.paymentMethodForm = this.paymentMethodSection.locator(
      "#co-payment-method-form",
    );
    this.paymentMethodOptions = this.paymentMethodForm.locator(
      'input[name="paymentmethod"]',
    );
    this.paymentMethodContinueButton = this.paymentMethodSection.locator(
      "button.payment-method-next-step-button",
    );

    // Payment info
    this.paymentInfoSection = this.checkoutSteps.locator("#opc-payment_info");
    this.paymentInfoForm = this.paymentInfoSection.locator(
      "#co-payment-info-form",
    );
    this.paymentInfoContent = this.paymentInfoSection.locator(
      "#checkout-payment-info-load",
    );
    this.paymentInfoContinueButton = this.paymentInfoSection.locator(
      "button.payment-info-next-step-button",
    );

    // Confirm order
    this.confirmOrderSection = this.checkoutSteps.locator("#opc-confirm_order");
    this.confirmOrderContent = this.confirmOrderSection.locator(
      "#checkout-confirm-order-load",
    );
    this.orderSummary = this.confirmOrderContent.locator(".order-summary");
    this.confirmTermsOfServiceCheckbox =
      this.confirmOrderContent.locator("#termsofservice");
    this.confirmOrderButton = this.confirmOrderSection.locator(
      "button.confirm-order-next-step-button",
    );
  }

  async verifyCheckoutPageIsVisible(): Promise<CheckoutPage> {
    await expect(this.checkoutPage).toBeVisible();
    await expect(this.pageTitle).toBeVisible();
    await expect(this.billingSection).toBeVisible();
    await expect(this.billingAddressForm).toBeVisible();
    return this;
  }

  async fillBillingAddress(
    firstName: string,
    lastName: string,
    email: string,
    country: string,
    city: string,
    address: string,
    zipCode: string,
    phone: string,
  ): Promise<CheckoutPage> {
    await this.billingFirstNameInput.fill(firstName);
    await this.billingLastNameInput.fill(lastName);
    await this.billingEmailInput.fill(email);
    await this.billingCountrySelect.selectOption({ label: country });
    await this.billingCityInput.fill(city);
    await this.billingAddress1Input.fill(address);
    await this.billingZipCodeInput.fill(zipCode);
    await this.billingPhoneInput.fill(phone);
    return this;
  }

  async continueFromBilling(): Promise<CheckoutPage> {
    await this.billingContinueButton.click();
    return this;
  }

  async continueFromShipping(): Promise<CheckoutPage> {
    await this.shippingContinueButton.click();
    return this;
  }

  async continueFromShippingMethod(): Promise<CheckoutPage> {
    await this.shippingMethodContinueButton.click();
    return this;
  }

  async continueFromPaymentMethod(): Promise<CheckoutPage> {
    await this.paymentMethodContinueButton.click();
    return this;
  }

  async continueFromPaymentInfo(): Promise<CheckoutPage> {
    await this.paymentInfoContinueButton.click();
    return this;
  }
}
