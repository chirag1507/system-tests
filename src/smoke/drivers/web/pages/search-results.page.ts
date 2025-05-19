import { expect } from "@playwright/test";
import { BasePage } from "../../../../acceptance/drivers/web/pages/base.page";
import { WEB_CONFIG, WEB_PAGES } from "../../../../config";

export class SearchResultsPage extends BasePage {
  async verifyPageLoaded(): Promise<void> {
    await this.waitForPageLoad();
    await expect(this.page).toHaveURL(`${WEB_CONFIG.BASE_URL}${WEB_PAGES.RICHMOND_SEARCH_RESULTS}`);
    await expect(this.page).toHaveTitle(/Real Estate Properties for Sale in Richmond, VIC 3121/);
  }

  async verifySearchResults(suburb: string): Promise<void> {
    const propertyElements = await this.page.$$('span[data-testid^="listing-"]');
    expect(propertyElements.length).toBeGreaterThan(0);
  }
}
