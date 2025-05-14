import { test } from "@playwright/test";
import { chromium, Browser, Page } from "@playwright/test";
import { HomePage } from "../drivers/web/pages/home.page";

test.describe("Basic System Health", () => {
  let browser: Browser;
  let page: Page;
  let homePage: HomePage;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.beforeEach(async () => {
    page = await browser.newPage();
    // Add the specific header that bypasses DataDome
    await page.setExtraHTTPHeaders({
      "user-agent": "avesta-ua",
    });
    homePage = new HomePage(page);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test("Homepage loads successfully", async () => {
    // Navigate to the homepage
    await page.goto("https://resi.uatz.view.com.au/");

    // Verify page loads and essential elements are present
    await homePage.verifyPageLoaded();
  });
});
