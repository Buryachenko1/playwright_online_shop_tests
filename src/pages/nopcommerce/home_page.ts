import { expect, type Locator, type Page } from "@playwright/test";
import { baseUrl } from "../../config.ts";
import { ProductPage } from "./product_page.ts";

export class HomePage {
  private readonly page: Page;
  public readonly baseUrl = baseUrl;

  readonly productCard: Locator;
  readonly productTitle: Locator;
  readonly productTitles: Locator;
  readonly header: Locator;
  readonly headerUpper: Locator;
  readonly headerLower: Locator;
  readonly headerMenu: Locator;
  readonly contentWrapper: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productCard = page.locator('article.product-item[data-productid="1"]');
    this.productTitle = this.productCard.locator("h2.product-title a");
    this.productTitles = page.locator(
      "article.product-item h2.product-title a",
    );

    this.header = page.locator("header.header");
    this.headerUpper = this.header.locator(".header-upper");
    this.headerLower = this.header.locator(".header-lower");
    this.headerMenu = page.locator(".header-menu");
    this.contentWrapper = page.locator("main#main");
    this.footer = page.locator("footer.footer");
  }

  async openHomePage(): Promise<HomePage> {
    await this.page.goto(this.baseUrl);
    return this;
  }

  async verifyHomePageHasUrl(): Promise<HomePage> {
    await expect.soft(this.page).toHaveURL(this.baseUrl);
    return this;
  }

  async verifyHomePageIsVisible(): Promise<HomePage> {
    await expect(this.header).toBeVisible();
    await expect(this.headerUpper).toBeVisible();
    await expect(this.headerLower).toBeVisible();
    await expect(this.headerMenu).toBeVisible();
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
