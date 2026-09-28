import { expect, type Locator, type Page } from "@playwright/test";
import { HomePage } from "./home_page";

export class LoginPage {
  private readonly page: Page;
  private readonly url = "/login?returnUrl=%2F";

  readonly pageTitle: Locator;
  readonly loginForm: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly passwordRecovery: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator(".page-title");
    this.loginForm = page.locator(".returning-wrapper");
    this.emailInput = page.locator("#Email");
    this.passwordInput = page.locator("#Password");
    this.rememberMeCheckbox = page.locator("#RememberMe");
    this.passwordRecovery = page.locator(".forgot-password");
    this.loginButton = page.locator(".login-button");
  }

  async openLoginNopcommerce(): Promise<LoginPage> {
    await this.page.goto(this.url);

    return this;
  }

  async verifyLoginPageIsVisible(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.loginForm).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.rememberMeCheckbox).toBeVisible();
    await expect(this.passwordRecovery).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(email: string, password: string): Promise<HomePage> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    return new HomePage(this.page);
  }
}
