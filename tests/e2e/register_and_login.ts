import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { RegistrationPage } from "../../src/pages/nopcommerce/registration_page";
import { LoginPage } from "../../src/pages/nopcommerce/login_page";
import { RegistrationResultPage } from "../../src/pages/nopcommerce/registration_result_page";
import { AccountPage } from "../../src/pages/nopcommerce/account_page";

test("@e2e New user can register and login", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const registrationResultPage = new RegistrationResultPage(page);
  const accountPage = new AccountPage(page);
  const loginPage = new LoginPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const confirmPassword = password;
  const userData = {
    firstName,
    lastName,
    email,
  };

  await test.step("Open registration page", async () => {
    await registrationPage.openRegistrationNopcommerce();
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
    await accountPage.verifyAccountData(userData);
  });
});
