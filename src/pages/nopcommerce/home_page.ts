import { expect, type Locator, type Page } from "@playwright/test";
import { Header } from "./header.ts";
import { ProductPage } from "./product_page.ts";

export class HomePage {
  private readonly page: Page;

  readonly header: Header;
  readonly productCard: Locator;
  readonly productTitle: Locator;
  readonly productTitles: Locator;
  readonly contentWrapper: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = new Header(page);

    this.productCard = page.locator('article.product-item[data-productid="1"]');
    this.productTitle = this.productCard.locator("h2.product-title a");
    this.productTitles = page.locator(
      "article.product-item h2.product-title a",
    );
    this.contentWrapper = page.locator("main#main");
    this.footer = page.locator("footer.footer");
  }

  async openHomePage(): Promise<HomePage> {
    await this.page.goto("/");

    return this;
  }

  async verifyHomePageHasUrl(): Promise<HomePage> {
    await expect.soft(this.page).toHaveURL("/");

    return this;
  }

  async verifyHomePageIsVisible(): Promise<HomePage> {
    await this.header.verifyHeaderIsVisible();
    await expect(this.contentWrapper).toBeVisible();
    await expect(this.productCard).toBeVisible();
    await expect(this.footer).toBeVisible();

    return this;
  }

  async getProductName(): Promise<string> {
    const name = await this.productTitle.textContent();

    return name ? name.trim() : "";
  }

  async getProductNames(): Promise<string[]> {
    return await this.productTitles.allTextContents();
  }

  async openProductDetail(): Promise<ProductPage> {
    await this.productTitle.click();

    return new ProductPage(this.page);
  }
}
