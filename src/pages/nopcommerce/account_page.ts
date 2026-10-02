import { expect, type Locator, type Page } from "@playwright/test";
import { Header } from "./header";

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
  readonly genderMale: Locator;
  readonly genderFemale: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;

  // Company information
  readonly companyNameInput: Locator;
  readonly companyVatInput: Locator;

  // Options and actions
  readonly newsletterCheckbox: Locator;
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
      .filter({ hasText: /^\s*Registrační údaje\s*$/ });

    this.companyDetailsTitle = this.customerInfoForm
      .locator("h2.title")
      .filter({ hasText: /^\s*Nákup na firmu\s*$/ });

    this.optionsTitle = this.customerInfoForm
      .locator("h2.title")
      .filter({ hasText: /^\s*Přihlásit se k odběru bulletinu\s*$/ });

    // Personal information
    this.genderMale = page.locator("#gender-male");
    this.genderFemale = page.locator("#gender-female");
    this.firstNameInput = page.locator("#FirstName");
    this.lastNameInput = page.locator("#LastName");
    this.emailInput = page.locator("#Email");

    // Company information
    this.companyNameInput = page.locator("#Company");
    this.companyVatInput = page.locator("#VatNumber");

    // Options and actions
    this.newsletterCheckbox = page.locator(
      "#NewsLetterSubscriptions_0__IsActive",
    );
    this.saveButton = page.locator("#save-info-button");

    // Left navigation
    this.accountNavigation = page.locator(".block-account-navigation");

    this.accountNavigationTitle = this.accountNavigation
      .locator("h2.title")
      .filter({ hasText: /^\s*Můj účet\s*$/ });

    this.customerInfoLink = this.accountNavigation.locator(".customer-info a");
    this.addressesLink = this.accountNavigation.locator(
      ".customer-addresses a",
    );
    this.ordersLink = this.accountNavigation.locator(
      "customer-recurring-payments a",
    );
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

  async verifyAccountPageIsVisible(): Promise<AccountPage> {
    await this.header.verifyHeaderIsVisible();

    await expect(this.pageTitle).toBeVisible();
    await expect(this.customerInfoForm).toBeVisible();

    await expect(this.personalDetailsTitle).toBeVisible();
    await expect(this.companyDetailsTitle).toBeVisible();
    await expect(this.optionsTitle).toBeVisible();

    await expect(this.genderMale).toBeVisible();
    await expect(this.genderFemale).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();

    await expect(this.companyNameInput).toBeVisible();
    await expect(this.companyVatInput).toBeVisible();

    await expect(this.newsletterCheckbox).toBeVisible();
    await expect(this.saveButton).toBeVisible();

    await this.verifyAccountNavigationIsVisible();

    return this;
  }

  async verifyAccountNavigationIsVisible(): Promise<AccountPage> {
    await expect(this.accountNavigation).toBeVisible();
    await expect(this.accountNavigationTitle).toBeVisible();
    await expect(this.customerInfoLink).toBeVisible();
    await expect(this.addressesLink).toBeVisible();
    await expect(this.ordersLink).toBeVisible();
    await expect(this.downloadableProductsLink).toBeVisible();
    await expect(this.backInStockSubscriptionsLink).toBeVisible();
    await expect(this.rewardPointsLink).toBeVisible();
    await expect(this.changePasswordLink).toBeVisible();
    await expect(this.productReviewsLink).toBeVisible();
    await expect(this.customerRfqsLink).toBeVisible();
    await expect(this.customerQuotesLink).toBeVisible();

    return this;
  }

  async verifyAccountData(accountData: AccountData): Promise<AccountPage> {
    await expect(this.firstNameInput).toHaveValue(accountData.firstName);
    await expect(this.lastNameInput).toHaveValue(accountData.lastName);
    await expect(this.emailInput).toHaveValue(accountData.email);

    return this;
  }
}
