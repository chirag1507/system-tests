import { test } from "@playwright/test";
import { HomePage } from "../drivers/web/pages/home.page";
import { SearchResultsPage } from "../drivers/web/pages/search-results.page";
import { WEB_PAGES, WEB_CONFIG } from "@/config";

test.describe("Property Search", () => {
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
  });

  test("Property search works from home page", async ({ page }) => {
    await page.goto(`${WEB_CONFIG.BASE_URL}${WEB_PAGES.HOME}`);
    await homePage.verifyPageLoaded();

    const suburb = "Richmond";
    await homePage.searchProperties(suburb);

    await searchResultsPage.verifyPageLoaded();
    await searchResultsPage.verifySearchResults(suburb);
  });
});
