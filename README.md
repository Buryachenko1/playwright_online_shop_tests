# Playwright Online Shop Tests

Automated end-to-end testing project for the **nopCommerce** e-commerce application using **Playwright** and **TypeScript**.

The project demonstrates the Page Object Model, reusable test methods, dynamically generated test data, smoke testing, and structured Playwright test steps.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Faker
- ESLint
- Prettier

## Test Design

The project uses the **Page Object Model (POM)** to separate test logic from page-specific implementation.

Tests are structured using `test.step()` to improve readability and make Playwright reports easier to analyze.

Test data for scenarios such as user registration is generated dynamically using `@faker-js/faker`.

Tests are designed to be independent from each other and can be executed separately.

## Covered Scenarios

### Smoke Tests

- Verify products are displayed on the homepage
- Open product detail
- Add product to cart
- User registration
- User login

Additional scenarios will be added as the project develops.

## Project Structure

```text
src/
└── pages/
    └── nopcommerce/
        ├── home_page.ts
        ├── product_page.ts
        ├── cart_page.ts
        ├── registration_page.ts
        ├── registration_result_page.ts
        └── login_page.ts

tests/
└── smoke/
    ├── auth.spec.ts
    ├── cart.spec.ts
    ├── homepage.spec.ts
    └── product.spec.ts

playwright.config.ts
```

## Example Test

```ts
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
```

## Configuration

The application base URL is configured in `playwright.config.ts`:

```ts
use: {
  baseURL: "http://localhost:59580",
  trace: "on-first-retry",
},
```

Page Objects use relative URLs instead of hardcoded full URLs.

Example:

```ts
private readonly url = "/login?returnUrl=%2F";
```

Navigation:

```ts
await this.page.goto(this.url);
```

Playwright automatically combines the relative URL with the configured `baseURL`.

## Local Application

The tests run against a locally hosted **nopCommerce** application.

The application is started automatically through the Playwright `webServer` configuration:

```ts
webServer: {
  command:
    "cd ../nopcommerce-local/src/Presentation/Nop.Web && dotnet run --urls http://localhost:59580",
  url: "http://localhost:59580",
  reuseExistingServer: true,
  timeout: 180000,
},
```

If the application is already running, Playwright reuses the existing server.

## Installation

Clone the repository:

```bash
git clone https://github.com/Buryachenko1/playwright_online_shop_tests.git
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npm test
```

Run tests in Playwright UI mode:

```bash
npm run "test ui"
```

Run smoke tests:

```bash
npx playwright test --grep @smoke
```

Run a specific test file:

```bash
npx playwright test tests/smoke/auth.spec.ts
```

## Code Quality

Run ESLint:

```bash
npm run lint
```

Automatically fix ESLint issues:

```bash
npm run lint:fix
```

Format the project with Prettier:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

Run TypeScript type checking:

```bash
npm run typecheck
```

## Project Goals

The project is being developed as a practical QA automation portfolio focused on:

- Maintainable Playwright test architecture
- Page Object Model
- Reliable locators
- Reusable test methods
- Independent test scenarios
- Dynamic test data
- Smoke and regression testing
- Clean TypeScript code
- Readable Playwright reports
- CI/CD integration

## Planned Improvements

- Expand regression test coverage
- Add negative login and registration scenarios
- Add reusable test data management
- Improve test logging and debugging output
- Explore Promise chaining and asynchronous patterns
- Add data-driven testing (DDT)
- Add API tests
- Add visual regression tests
- Add CI pipeline with automated test execution
- Improve reporting and test artifacts
