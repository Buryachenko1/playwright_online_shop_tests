import { expect, type Locator, type Page } from "@playwright/test";
import { Header } from "./header";
import { nopCommerceTexts } from "../../assets/dictionaries/cs";

export interface AccountData {
  firstName: string;
  lastName: string;
  email: string;
}

export class AccountPage {
  private readonly page: Page;

  readonly header: Header;

  // Main content
  readonly pageTitle: Locator;
  readonly customerInfoForm: Locator;

  // Section headings
  readonly personalDetailsTitle: Locator;
  readonly companyDetailsTitle: Locator;
  readonly optionsTitle: Locator;

  // Personal information
  readonly genderLabel: Locator;
  readonly genderMale: Locator;
  readonly genderMaleLabel: Locator;
  readonly genderFemale: Locator;
  readonly genderFemaleLabel: Locator;

  readonly firstNameInput: Locator;
  readonly firstNameLabel: Locator;
  readonly lastNameInput: Locator;
  readonly lastNameLabel: Locator;
  readonly emailInput: Locator;
  readonly emailLabel: Locator;

  // Company information
  readonly companyNameInput: Locator;
  readonly companyNameLabel: Locator;
  readonly companyVatInput: Locator;
  readonly companyVatLabel: Locator;

  // Options and actions
  readonly newsletterCheckbox: Locator;
  readonly newsletterLabel: Locator;
  readonly saveButton: Locator;

  // Left navigation
  readonly accountNavigation: Locator;
  readonly accountNavigationTitle: Locator;
  readonly customerInfoLink: Locator;
  readonly addressesLink: Locator;
  readonly ordersLink: Locator;
  readonly recurringPaymentsLink: Locator;
  readonly downloadableProductsLink: Locator;
  readonly backInStockSubscriptionsLink: Locator;
  readonly rewardPointsLink: Locator;
  readonly changePasswordLink: Locator;
  readonly productReviewsLink: Locator;
  readonly customerRfqsLink: Locator;
  readonly customerQuotesLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);

    // Main content
    this.pageTitle = page.locator(".page-title h1");
    this.customerInfoForm = page.locator('form[action="/customer/info"]');

    // Section headings
    this.personalDetailsTitle = this.customerInfoForm
      .locator("h2.title")
      .nth(0);

    this.companyDetailsTitle = this.customerInfoForm.locator("h2.title").nth(1);

    this.optionsTitle = this.customerInfoForm.locator("h2.title").nth(2);

    // Personal information
    this.genderLabel = this.customerInfoForm.locator(
      ".inputs:has(#gender-male) > label",
    );

    this.genderMale = this.customerInfoForm.locator("#gender-male");
    this.genderMaleLabel = this.customerInfoForm.locator(
      'label[for="gender-male"]',
    );

    this.genderFemale = this.customerInfoForm.locator("#gender-female");
    this.genderFemaleLabel = this.customerInfoForm.locator(
      'label[for="gender-female"]',
    );

    this.firstNameInput = this.customerInfoForm.locator("#FirstName");
    this.firstNameLabel = this.customerInfoForm.locator(
      'label[for="FirstName"]',
    );

    this.lastNameInput = this.customerInfoForm.locator("#LastName");
    this.lastNameLabel = this.customerInfoForm.locator('label[for="LastName"]');

    this.emailInput = this.customerInfoForm.locator("#Email");
    this.emailLabel = this.customerInfoForm.locator('label[for="Email"]');

    // Company information
    this.companyNameInput = this.customerInfoForm.locator("#Company");
    this.companyNameLabel = this.customerInfoForm.locator(
      'label[for="Company"]',
    );

    this.companyVatInput = this.customerInfoForm.locator("#VatNumber");
    this.companyVatLabel = this.customerInfoForm.locator(
      'label[for="VatNumber"]',
    );

    // Options and actions
    this.newsletterCheckbox = this.customerInfoForm.locator(
      "#NewsLetterSubscriptions_0__IsActive",
    );
    this.newsletterLabel = this.customerInfoForm.locator(
      'label[for="NewsLetterSubscriptions_0__IsActive"]',
    );

    this.saveButton = this.customerInfoForm.locator("#save-info-button");

    // Left navigation
    this.accountNavigation = page.locator(".block-account-navigation");

    this.accountNavigationTitle = this.accountNavigation.locator("h2.title");

    this.customerInfoLink = this.accountNavigation.locator(".customer-info a");

    this.addressesLink = this.accountNavigation.locator(
      ".customer-addresses a",
    );

    this.ordersLink = this.accountNavigation.locator(".customer-orders a");

    this.recurringPaymentsLink = this.accountNavigation.locator(
      ".customer-recurring-payments a",
    );

    this.downloadableProductsLink = this.accountNavigation.locator(
      ".downloadable-products a",
    );

    this.backInStockSubscriptionsLink = this.accountNavigation.locator(
      ".back-in-stock-subscriptions a",
    );

    this.rewardPointsLink = this.accountNavigation.locator(".reward-points a");

    this.changePasswordLink =
      this.accountNavigation.locator(".change-password a");

    this.productReviewsLink = this.accountNavigation.locator(
      ".customer-reviews a",
    );

    this.customerRfqsLink = this.accountNavigation.locator(".customer-rfqs a");

    this.customerQuotesLink =
      this.accountNavigation.locator(".customer-quotes a");
  }

  async verifyAccountPageHasUrl(): Promise<AccountPage> {
    await expect(this.page).toHaveURL(/\/customer\/info\/?(?:\?.*)?$/);

    return this;
  }

  async verifyAccountPageDetails(): Promise<AccountPage> {
    await this.header.verifyHeaderIsVisible();

    await expect.soft(this.pageTitle).toBeVisible();
    await expect.soft(this.customerInfoForm).toBeVisible();

    await expect.soft(this.personalDetailsTitle).toBeVisible();
    await expect
      .soft(this.personalDetailsTitle)
      .toHaveText(nopCommerceTexts.account.personalDetailsTitle);

    await expect.soft(this.companyDetailsTitle).toBeVisible();
    await expect
      .soft(this.companyDetailsTitle)
      .toHaveText(nopCommerceTexts.account.companyDetailsTitle);

    await expect.soft(this.optionsTitle).toBeVisible();
    await expect
      .soft(this.optionsTitle)
      .toHaveText(nopCommerceTexts.account.optionsTitle);

    await expect.soft(this.genderMale).toBeVisible();
    await expect.soft(this.genderFemale).toBeVisible();
    await expect.soft(this.firstNameInput).toBeVisible();
    await expect.soft(this.lastNameInput).toBeVisible();
    await expect.soft(this.emailInput).toBeVisible();

    await expect.soft(this.companyNameInput).toBeVisible();
    await expect.soft(this.companyVatInput).toBeVisible();

    await expect.soft(this.newsletterCheckbox).toBeVisible();
    await expect.soft(this.saveButton).toBeVisible();

    await this.verifyAccountNavigationDetails();

    return this;
  }

  async verifyAccountNavigationDetails(): Promise<AccountPage> {
    await expect.soft(this.accountNavigation).toBeVisible();

    await expect.soft(this.accountNavigationTitle).toBeVisible();
    await expect
      .soft(this.accountNavigationTitle)
      .toHaveText(nopCommerceTexts.account.accountNavigationTitle);

    await expect.soft(this.customerInfoLink).toBeVisible();
    await expect
      .soft(this.customerInfoLink)
      .toHaveText(nopCommerceTexts.account.customerInfoLink);

    await expect.soft(this.addressesLink).toBeVisible();
    await expect
      .soft(this.addressesLink)
      .toHaveText(nopCommerceTexts.account.addressesLink);

    await expect.soft(this.ordersLink).toBeVisible();
    await expect
      .soft(this.ordersLink)
      .toHaveText(nopCommerceTexts.account.ordersLink);

    await expect.soft(this.recurringPaymentsLink).toBeVisible();
    await expect
      .soft(this.recurringPaymentsLink)
      .toHaveText(nopCommerceTexts.account.recurringPaymentsLink);

    await expect.soft(this.downloadableProductsLink).toBeVisible();
    await expect
      .soft(this.downloadableProductsLink)
      .toHaveText(nopCommerceTexts.account.downloadableProductsLink);

    await expect.soft(this.backInStockSubscriptionsLink).toBeVisible();
    await expect
      .soft(this.backInStockSubscriptionsLink)
      .toHaveText(nopCommerceTexts.account.backInStockSubscriptionsLink);

    await expect.soft(this.rewardPointsLink).toBeVisible();
    await expect
      .soft(this.rewardPointsLink)
      .toHaveText(nopCommerceTexts.account.rewardPointsLink);

    await expect.soft(this.changePasswordLink).toBeVisible();
    await expect
      .soft(this.changePasswordLink)
      .toHaveText(nopCommerceTexts.account.changePasswordLink);

    await expect.soft(this.productReviewsLink).toBeVisible();
    await expect
      .soft(this.productReviewsLink)
      .toHaveText(nopCommerceTexts.account.productReviewsLink);

    await expect.soft(this.customerRfqsLink).toBeVisible();
    await expect
      .soft(this.customerRfqsLink)
      .toHaveText(nopCommerceTexts.account.customerRfqsLink);

    await expect.soft(this.customerQuotesLink).toBeVisible();
    await expect
      .soft(this.customerQuotesLink)
      .toHaveText(nopCommerceTexts.account.customerQuotesLink);

    return this;
  }

  async verifyAccountData(accountData: AccountData): Promise<AccountPage> {
    await expect(this.firstNameInput).toHaveValue(accountData.firstName);
    await expect(this.lastNameInput).toHaveValue(accountData.lastName);
    await expect(this.emailInput).toHaveValue(accountData.email);

    return this;
  }
}
