import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { LoginPage } from "../../src/pages/nopcommerce/login_page";
import { RegistrationPage } from "../../src/pages/nopcommerce/registration_page";
import { HomePage } from "../../src/pages/nopcommerce/home_page";

test("@smoke Registration is successful", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const password = process.env.TEST_USER_PASSWORD;

  if (!password) {
    throw new Error(
      "Missing required environment variable: TEST_USER_PASSWORD",
    );
  }

  const registrationData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `test-${faker.string.uuid()}@example.com`,
    password,
    confirmPassword: password,
  };

  await test.step("Open registration page", async () => {
    await registrationPage.openRegistrationNopcommerce();
    await registrationPage.verifyRegistrationPageIsVisible();
  });

  await test.step("Register a new user and verify success", async () => {
    const registrationResultPage =
      await registrationPage.registerNewUser(registrationData);

    await registrationResultPage.verifyRegistrationIsSuccessful();
  });
});

test("@smoke Login is successful", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Missing required environment variables: TEST_USER_EMAIL and/or TEST_USER_PASSWORD",
    );
  }

  await test.step("Open login page", async () => {
    await loginPage.openLoginNopcommerce();
    await loginPage.verifyLoginPageIsVisible();
  });

  await test.step("Log in with valid credentials", async () => {
    console.log("Logging in with registered user", {
      email,
    });

    await loginPage.login(email, password);
  });

  await test.step("Verify login is successful", async () => {
    await expect(homePage.header.myAccountLink).toBeVisible();
    await expect(homePage.header.logoutLink).toBeVisible();
    await expect(homePage.header.loginLink).toBeHidden();
  });
});
