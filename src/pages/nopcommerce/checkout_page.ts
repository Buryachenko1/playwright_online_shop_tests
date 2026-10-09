import { expect, type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
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
  readonly billingStateLoading: Locator;
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
  readonly cardTypeSelect: Locator;
  readonly cardholderName: Locator;
  readonly cardNumber: Locator;
  readonly expireMonthSelect: Locator;
  readonly expireYearSelect: Locator;
  readonly cardCode: Locator;
  readonly paymentContinueButton: Locator;

  // Summary
  readonly orderSummary: Locator;
  readonly billingInfoWrap: Locator;
  readonly shippingInfoWrap: Locator;
  readonly billingInfo: Locator;
  readonly shippingInfo: Locator;
  readonly paymentMethodSummary: Locator;
  readonly shippingMethodSummary: Locator;

  // Product table
  readonly summaryCart: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productQuantity: Locator;
  readonly productSubtotal: Locator;

  // Order total
  readonly summaryShippingPrice: Locator;
  readonly summaryTax: Locator;
  readonly summaryTotal: Locator;
  readonly confirmOrderButton: Locator;

  constructor(page: Page) {
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
    this.billingStateLoading = this.billingSection.locator(
      "#states-loading-progress",
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
      "#billing-buttons-container .new-address-next-step-button",
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
      "#shipping-buttons-container .new-address-next-step-button",
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
    this.cardTypeSelect = this.checkoutSteps.locator("#CreditCardType");
    this.cardholderName = this.checkoutSteps.locator("#CardholderName");
    this.cardNumber = this.checkoutSteps.locator("#CardNumber");
    this.expireMonthSelect = this.checkoutSteps.locator("#ExpireMonth");
    this.expireYearSelect = this.checkoutSteps.locator("#ExpireYear");
    this.cardCode = this.checkoutSteps.locator("#CardCode");
    this.paymentContinueButton = this.checkoutSteps.locator(
      "#payment-info-buttons-container .payment-info-next-step-button",
    );

    // Summary
    this.orderSummary = this.checkoutSteps.locator(
      "#checkout-confirm-order-load",
    );
    this.billingInfoWrap = this.orderSummary.locator(".billing-info-wrap");
    this.shippingInfoWrap = this.orderSummary.locator(".shipping-info-wrap");
    this.billingInfo = this.billingInfoWrap.locator(".billing-info");
    this.shippingInfo = this.shippingInfoWrap.locator(".shipping-info");

    this.paymentMethodSummary = this.billingInfoWrap.locator(
      ".payment-method-info .payment-method .value",
    );
    this.shippingMethodSummary = this.shippingInfoWrap.locator(
      ".shipping-method-info .shipping-method .value",
    );

    // Product table
    this.summaryCart = this.orderSummary.locator("table.cart");
    this.productName = this.summaryCart.locator("td.product .product-name");
    this.productPrice = this.summaryCart.locator(".product-unit-price");
    this.productQuantity = this.summaryCart.locator(".product-quantity");
    this.productSubtotal = this.summaryCart.locator(".product-subtotal");

    // Order total
    this.summaryShippingPrice = this.orderSummary.locator(
      ".shipping-cost .cart-total-right .value-summary",
    );
    this.summaryTax = this.orderSummary.locator(
      ".tax-value .cart-total-right .value-summary",
    );
    this.summaryTotal = this.orderSummary.locator(
      ".order-total .cart-total-right .value-summary",
    );
    this.confirmOrderButton = this.checkoutSteps.locator(
      "#confirm-order-buttons-container .confirm-order-next-step-button",
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
    // Verify the checkbox is checked by default.
    await expect(this.shipToSameAddressCheckbox).toBeVisible();
    await expect(this.shipToSameAddressCheckbox).toBeChecked();

    await this.billingFirstNameInput.fill(firstName);
    await this.billingLastNameInput.fill(lastName);
    await this.billingEmailInput.fill(email);

    await this.billingCountrySelect.selectOption({ label: country });
    await expect(this.billingStateLoading).toBeHidden();

    // Prague — this scenario uses Czechia.
    await this.billingStateSelect.selectOption({ value: "327" });
    await expect(this.billingStateSelect).toHaveValue("327");

    await this.billingCityInput.fill(city);
    await this.billingAddress1Input.fill(address);
    await this.billingZipCodeInput.fill(zipCode);
    await this.billingPhoneInput.fill(phone);

    await expect(this.shipToSameAddressCheckbox).toBeChecked();
    await expect(this.billingStateSelect).toHaveValue("327");

    await this.billingContinueButton.click();

    return this;
  }

  async selectShippingMethod(): Promise<CheckoutPage> {
    const firstOption = this.shippingMethodOptions.first();

    await expect(firstOption).toHaveAccessibleName(/^Ground(?:\s|\(|$)/);

    await firstOption.check();
    await expect(firstOption).toBeChecked();

    await this.shippingMethodContinueButton.click();

    return this;
  }

  async selectPaymentMethod(): Promise<CheckoutPage> {
    const firstOption = this.paymentMethodOptions.first();

    await expect(firstOption).toHaveAccessibleName(/^Credit Card(?:\s|\(|$)/);

    await firstOption.check();
    await expect(firstOption).toBeChecked();

    await this.paymentMethodContinueButton.click();

    return this;
  }

  async fillPaymentInfo(
    cardholderName: string,
    cardNumber: string,
    cardCode: string,
    month: string,
    year: string,
  ): Promise<CheckoutPage> {
    await this.cardTypeSelect.selectOption({ label: "Visa" });
    await this.cardholderName.fill(cardholderName);
    await this.cardNumber.fill(cardNumber);
    await this.expireMonthSelect.selectOption({ label: month });
    await this.expireYearSelect.selectOption({ label: year });
    await this.cardCode.fill(cardCode);

    await this.paymentContinueButton.click();

    return this;
  }

  async verifyOrderSummaryWraps(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    country: string,
    stateProvince: string,
    city: string,
    address: string,
    zipCode: string,
    expectedPaymentMethod: string,
    expectedShippingMethod: string,
  ): Promise<void> {
    await expect(this.billingInfoWrap).toBeVisible();
    await expect(this.shippingInfoWrap).toBeVisible();

    // Verify the same details in both addresses.
    for (const addressBlock of [this.billingInfo, this.shippingInfo]) {
      await expect(addressBlock).toBeVisible();

      await expect(addressBlock.locator(".name")).toHaveText(
        `${firstName} ${lastName}`,
      );
      await expect(addressBlock.locator(".email")).toContainText(email);
      await expect(addressBlock.locator(".phone")).toContainText(phone);
      await expect(addressBlock.locator(".country")).toHaveText(country);
      await expect(addressBlock.locator(".stateprovince")).toHaveText(
        stateProvince,
      );
      await expect(addressBlock.locator(".city")).toHaveText(city);
      await expect(addressBlock.locator(".address1")).toHaveText(address);
      await expect(addressBlock.locator(".zippostalcode")).toHaveText(zipCode);
    }

    await expect(this.paymentMethodSummary).toHaveText(expectedPaymentMethod);
    await expect(this.shippingMethodSummary).toHaveText(expectedShippingMethod);
  }

  async verifySummaryCart(
    expectedProductName: string,
    expectedProductPrice: string,
  ): Promise<void> {
    await expect(this.summaryCart).toBeVisible();
    await expect(this.summaryCart.locator("tbody tr")).toHaveCount(1);

    await expect(this.productName).toHaveText(expectedProductName);
    await expect(this.productQuantity).toHaveText("1");
    await expect(this.productPrice).toHaveText(expectedProductPrice);
    await expect(this.productSubtotal).toHaveText(expectedProductPrice);
  }

  async verifyOrderTotal(
    expectedProductPrice: string,
    expectedShippingPrice: string,
    expectedTaxPrice: string,
  ): Promise<void> {
    const productAmount = this.priceToMinorUnits(expectedProductPrice);
    const shippingAmount = this.priceToMinorUnits(expectedShippingPrice);
    const taxAmount = this.priceToMinorUnits(expectedTaxPrice);

    // One item, prices excluding tax, no extra fees or discounts.
    const expectedTotal = productAmount + shippingAmount + taxAmount;

    await expect(this.summaryShippingPrice).toHaveText(expectedShippingPrice);
    await expect(this.summaryTax).toHaveText(expectedTaxPrice);

    await expect(this.summaryTotal).toBeVisible();

    await expect
      .poll(async () =>
        this.priceToMinorUnits(await this.summaryTotal.innerText()),
      )
      .toBe(expectedTotal);
  }

  async confirmOrder(): Promise<void> {
    await this.confirmOrderButton.click();
  }

  private priceToMinorUnits(price: string): number {
    const normalized = price.replace(/\s/g, "");
    const match = normalized.match(/^(\d+),(\d{2})Kč$/);

    if (!match) {
      throw new Error(`Unexpected price format: "${price}"`);
    }

    return Number(match[1]) * 100 + Number(match[2]);
  }
}
