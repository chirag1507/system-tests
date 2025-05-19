import { test } from "@playwright/test";
import { chromium, Browser, Page } from "@playwright/test";
import { HomePage } from "../drivers/web/pages/home.page";
import { SearchResultsPage } from "../drivers/web/pages/search-results.page";
import { API_HEADERS } from "@/config";

test.describe("Property Search", () => {
  let browser: Browser;
  let page: Page;
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.beforeEach(async () => {
    page = await browser.newPage();
    // Add the specific header that bypasses DataDome
    await page.setExtraHTTPHeaders({
      ...API_HEADERS,
    });
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test("Property search works from home page", async () => {
    await page.goto("https://resi.uatz.view.com.au/");

    await homePage.verifyPageLoaded();

    const suburb = "Richmond";
    await homePage.searchProperties(suburb);

    await searchResultsPage.verifyPageLoaded();
    await searchResultsPage.verifySearchResults(suburb);
  });
});
