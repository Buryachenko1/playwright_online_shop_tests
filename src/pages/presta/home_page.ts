import { expect, type Locator, type Page } from "@playwright/test";
import { baseUrl } from "../../config.ts";
import { ProductPage } from "./product_page.ts";

export class HomePage {
  private readonly page: Page;
  public readonly baseUrl = baseUrl;
  readonly productItem: Locator;
  readonly productItemTitle: Locator;
  readonly headerNav: Locator;
  readonly headerTop: Locator;
  readonly contentWrapper: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productItem = page
  .locator('article.product-miniature[data-id-product="1"]')
  .first();
    this.productItemTitle = this.productItem.locator(".product-title");
    this.headerNav = page.locator("header .header-nav");
    this.headerTop = page.locator("header .header-top");
    this.contentWrapper = page.locator("#wrapper");
    this.footer = page.locator("#footer");
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
    await expect(this.headerNav).toBeVisible();
    await expect(this.headerTop).toBeVisible();
    await expect(this.contentWrapper).toBeVisible();
    await expect(this.footer).toBeVisible();
    return this;
  }

  async getProductName(): Promise<string> {
    const name = await this.productItemTitle.textContent();
    return name ? name.trim() : "";
  }
  async openProductDetail(): Promise<ProductPage> {
    await this.productItem.click();
    return new ProductPage(this.page);
  }
}
