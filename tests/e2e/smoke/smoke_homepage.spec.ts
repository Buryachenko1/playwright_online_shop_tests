import { expect, test } from "@playwright/test";
import {HomePage} from "../../../src/pages/presta/home_page";

test("@smoke Products are displayed on homepage", async ({page}) =>{
 const homePage = new HomePage(page);

 await test.step ("Open Home Page", async () => {
    await homePage.openHomePage();
    await homePage.verifyHomePageIsVisible();

 });

 await test.step ("Check count of products", async () => {
    const productNames = await homePage.getProductNames();
    
    expect(productNames.length).toBeGreaterThan(0);

 });
} )