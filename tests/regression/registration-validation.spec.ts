import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { RegistrationPage } from "../../src/pages/nopcommerce/registration_page";
import ddtData from "../../src/assets/ddt/registration_validation_data.json";

test.describe("DDT Registration validation", () => {
  ddtData.forEach((data, index) => {
    test(`Test ${index + 1} - ${data.testName}`, async ({ page }) => {
      const registrationPage = new RegistrationPage(page);
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
        password,
        confirmPassword: password,
      };

      const testData = {
        ...userData,
        ...data.overrides,
      };

      await test.step("Open registration page", async () => {
        await registrationPage.openRegistrationNopcommerce();
        await registrationPage.verifyRegistrationPageIsVisible();
      });

      await test.step("Fill registration form and submit", async () => {
        await registrationPage.registerNewUser(testData);
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
          case "missing password confirmation":
          case "missing both passwords":
            await registrationPage.verifyPasswordError(data.expectedError);
            break;

          default:
            throw new Error(
              `Missing validation assertion for scenario: ${data.testName}`,
            );
        }
      });
    });
  });
});
