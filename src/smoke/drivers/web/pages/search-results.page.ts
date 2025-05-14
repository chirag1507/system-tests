import { Page, expect } from "@playwright/test";
import { BasePage } from "../../../../acceptance/drivers/web/pages/base.page";

export class SearchResultsPage extends BasePage {
  async verifyPageLoaded(): Promise<void> {
    await this.waitForPageLoad();
    await expect(this.page).toHaveURL(/for-sale\/vic\/in-richmond-3121/);
    await expect(this.page).toHaveTitle(/Real Estate Properties for Sale in Richmond, VIC 3121/);
  }

  async verifySearchResults(suburb: string): Promise<void> {
    const propertyElements = await this.page.$$('span[data-testid^="listing-"]');
    expect(propertyElements.length).toBeGreaterThan(0);
  }
}
