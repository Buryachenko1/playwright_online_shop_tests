import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../../src/pages/nopcommerce/login_page";
import { RegistrationPage } from "../../src/pages/nopcommerce/registration_page";
import { RegistrationResultPage } from "../../src/pages/nopcommerce/registration_result_page";
import { HomePage } from "../../src/pages/nopcommerce/home_page";

test("@smoke Registration is successful", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const registrationResultPage = new RegistrationResultPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const password = process.env.TEST_USER_PASSWORD!;
  const confirmPassword = password;

  await test.step("Open registration page", async () => {
    await registrationPage.openRegistrationNopcommerce();
  });

  await test.step("Verify registration page is visible", async () => {
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
});

test("@smoke Login is successful", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  const email = process.env.TEST_USER_EMAIL!;
  const password = process.env.TEST_USER_PASSWORD!;

  await test.step("Open login page", async () => {
    await loginPage.openLoginNopcommerce();
  });

  await test.step("Verify login page is visible", async () => {
    await loginPage.verifyLoginPageIsVisible();
  });

  await test.step("Login with valid credentials", async () => {
    await loginPage.login(email, password);
  });
  await test.step("Verify login is successful", async () => {
    await expect(homePage.header.myAccountLink).toBeVisible();
    await expect(homePage.header.logoutLink).toBeVisible();
    await expect(homePage.header.loginLink).toBeHidden();
  });
});
