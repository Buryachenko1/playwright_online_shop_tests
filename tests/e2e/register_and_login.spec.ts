import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { RegistrationPage } from "../../src/pages/nopcommerce/registration_page";
import { RegistrationResultPage } from "../../src/pages/nopcommerce/registration_result_page";
import { AccountPage } from "../../src/pages/nopcommerce/account_page";
import { HomePage } from "../../src/pages/nopcommerce/home_page";
import { LoginPage } from "../../src/pages/nopcommerce/login_page";

test("@e2e New user can register and log in", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const registrationResultPage = new RegistrationResultPage(page);
  const accountPage = new AccountPage(page);
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const password = "TestPassword123!";
  const confirmPassword = password;

  const userData = {
    firstName,
    lastName,
    email,
  };

  await test.step("Open registration page", async () => {
    await registrationPage.openRegistrationNopcommerce();
    await registrationPage.verifyRegistrationPageIsVisible();
  });

  await test.step("Register new user", async () => {
    await registrationPage.registerNewUser(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    );
  });

  await test.step("Verify registration is successful", async () => {
    await registrationResultPage.verifyRegistrationIsSuccessful();
  });

  await test.step("Open My Account", async () => {
    await registrationResultPage.header.openMyAccount();
  });

  await test.step("Verify created user", async () => {
    await accountPage.verifyAccountPageHasUrl();
    await accountPage.verifyAccountPageIsVisible();
    await accountPage.verifyAccountData(userData);
  });

  await test.step("Log out and verify logout", async () => {
    await accountPage.header.logoutUser();

    await expect(homePage.header.loginLink).toBeVisible();
    await expect(homePage.header.logoutLink).toBeHidden();
    await expect(homePage.header.myAccountLink).toBeHidden();
  });

  await test.step("Log in with the registered user", async () => {
    await homePage.header.openLoginPage();
    await loginPage.login(email, password);
  });

  await test.step("Verify login is successful", async () => {
    await expect(homePage.header.myAccountLink).toBeVisible();
    await expect(homePage.header.logoutLink).toBeVisible();
    await expect(homePage.header.loginLink).toBeHidden();
  });

  await test.step("Verify account after login", async () => {
    await homePage.header.openMyAccount();

    await accountPage.verifyAccountPageHasUrl();
    await accountPage.verifyAccountData(userData);
  });
});
