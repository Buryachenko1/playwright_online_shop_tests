import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../../src/pages/nopcommerce/login_page";
import { RegistrationPage } from "../../src/pages/nopcommerce/registration_page";
import { RegistrationResultPage } from "../../src/pages/nopcommerce/registration_result_page";

test("@smoke Registration is successful", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  let registrationResultPage: RegistrationResultPage;

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  await test.step("Open registration page", async () => {
    await registrationPage.openRegistrationNopcommerce();
  });

  await test.step("Verify registration page is visible", async () => {
    await registrationPage.verifyRegistrationPageIsVisible();
  });

  await test.step("Register new user", async () => {
    registrationResultPage = await registrationPage.registerNewUser(
      firstName,
      lastName,
      email,
      password,
    );
  });

  await test.step("Verify registration is successful", async () => {
    await registrationResultPage.verifyRegistrationIsSuccessful();
  });
});

test("@smoke Login is successful", async ({ page }) => {
  const loginPage = new LoginPage(page);

  const email = "testuser@example.com";
  const password = "TestPassword123!";

  await test.step("Open login page", async () => {
    await loginPage.openLoginNopcommerce();
  });

  await test.step("Verify login page is visible", async () => {
    await loginPage.verifyLoginPageIsVisible();
  });

  await test.step("Login with valid credentials", async () => {
    await loginPage.login(email, password);
  });
});
