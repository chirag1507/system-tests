import { test, expect } from "@playwright/test";
import { HomePage } from "../drivers/web/pages/home.page";
import { WEB_CONFIG, WEB_PAGES } from "../../config";

test.describe("Home Page", () => {
  test("should load home page successfully", async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto(`${WEB_CONFIG.BASE_URL}${WEB_PAGES.HOME}`);
    await homePage.verifyPageLoaded();
  });

  test("should search for properties in Richmond", async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto(`${WEB_CONFIG.BASE_URL}${WEB_PAGES.HOME}`);
    await homePage.verifyPageLoaded();
    await homePage.searchProperties("Richmond");
  });
});
