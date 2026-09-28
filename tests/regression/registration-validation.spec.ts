import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { RegistrationPage } from "../../src/pages/registration_page";
const ddtData = [
  {
    testName: "missing first name",
    overrides: { firstName: "" },
    expectedError: "First name is required.",
  },
  {
    testName: "missing last name",
    overrides: { lastName: "" },
    expectedError: "Last name is required.",
  },
  {
    testName: "invalid email - missing domain ending",
    overrides: { email: "invalid@email" },
    expectedError: "Wrong email",
  },
  {
    testName: "missing password",
    overrides: { password: "" },
    expectedError: "Password is required.",
  },
  {
    testName: "missing password confirmation",
    overrides: { confirmPassword: "" },
    expectedError: "Password is required.",
  },
  {
    testName: "missing both passwords",
    overrides: { password: "", confirmPassword: "" },
    expectedError: "Password is required.",
  },
] as const;

test.describe("DDT Registration validation", () => {
  let registrationPage: RegistrationPage;

  let userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);

    const password = "Password123!";

    userData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: password,
      confirmPassword: password,
    };

    await registrationPage.openRegistrationNopcommerce();
  });

  ddtData.forEach((data, index) => {
    const testIndex = index + 1;

    test(`Test ${testIndex} - ${data.testName}`, async () => {
      const testData = {
        ...userData,
        ...data.overrides,
      };

      await test.step("Fill registration form and submit", async () => {
        await registrationPage.registerUser(
          testData.firstName,
          testData.lastName,
          testData.email,
          testData.password,
          testData.confirmPassword,
        );
      });

      await test.step("Verify validation error message", async () => {
        switch (data.testName) {
          case "missing first name":
            await registrationPage.verifyFirstNameError(data.expectedError);
            break;

          case "missing last name":
            await registrationPage.verifyLastNameError(data.expectedError);
            break;

          case "invalid email - missing domain ending":
            await registrationPage.verifyEmailError(data.expectedError);
            break;

          case "missing password":
            await registrationPage.verifyPasswordError(data.expectedError);
            break;

          case "missing password confirmation":
            await registrationPage.verifyConfirmPasswordError(
              data.expectedError,
            );
            break;

          case "missing both passwords":
            await registrationPage.verifyPasswordError(data.expectedError);
            break;
        }
      });
    });
  });
});
