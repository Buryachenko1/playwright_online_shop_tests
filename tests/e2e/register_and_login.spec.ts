import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { RegistrationPage } from "../../src/pages/nopcommerce/registration_page";
import { AccountPage } from "../../src/pages/nopcommerce/account_page";
import { HomePage } from "../../src/pages/nopcommerce/home_page";
import { LoginPage } from "../../src/pages/nopcommerce/login_page";

test("@e2e New user can register and log in", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const accountPage = new AccountPage(page);
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  const password = process.env.TEST_USER_PASSWORD;

  if (!password) {
    throw new Error(
      "Missing required environment variable: TEST_USER_PASSWORD",
    );
  }

  const userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `test-${faker.string.uuid()}@example.com`,
  };

  const registrationData = {
    ...userData,
    password,
    confirmPassword: password,
  };

  await test.step("Open registration page", async () => {
    await registrationPage.openRegistrationNopcommerce();
    await registrationPage.verifyRegistrationPageIsVisible();
  });

  await test.step("Register a new user and verify success", async () => {
    console.log("[Registration] Registering a new user", {
      "First name": userData.firstName,
      "Last name": userData.lastName,
      Email: userData.email,
    });

    const registrationResultPage =
      await registrationPage.registerNewUser(registrationData);

    await registrationResultPage.verifyRegistrationIsSuccessful();
  });

  await test.step("Log out and verify logout", async () => {
    await homePage.header.logoutUser();

    await expect(homePage.header.loginLink).toBeVisible();
    await expect(homePage.header.logoutLink).toBeHidden();
    await expect(homePage.header.myAccountLink).toBeHidden();
  });

  await test.step("Log in with the registered user", async () => {
    console.log("[Login] Logging in with registered user", {
      Email: userData.email,
    });

    await homePage.header.openLoginPage();
    await loginPage.login(userData.email, password);
  });

  await test.step("Verify login is successful", async () => {
    await expect(homePage.header.myAccountLink).toBeVisible();
    await expect(homePage.header.logoutLink).toBeVisible();
    await expect(homePage.header.loginLink).toBeHidden();
  });

  await test.step("Verify saved account data after login", async () => {
    await homePage.header.openMyAccount();

    console.log("[Account] Expected saved user data", {
      "First name": userData.firstName,
      "Last name": userData.lastName,
      Email: userData.email,
    });

    await accountPage.verifyAccountPageHasUrl();
    await accountPage.verifyAccountPageDetails();
    await accountPage.verifyAccountData(userData);
  });
});
