import { Page, expect } from "@playwright/test";
import { BasePage } from "../../../../acceptance/drivers/web/pages/base.page";

export class HomePage extends BasePage {
  async verifyPageLoaded(): Promise<void> {
    await this.waitForPageLoad();
    await expect(this.page).toHaveTitle(/resi.uatz.view.com.au | Real Estate Listings, Properties for Sale & Rent/);
  }

  async searchProperties(suburb: string): Promise<void> {
    await this.page.getByTestId("search-input").click();
    await this.page.getByTestId("search-input").fill(suburb);

    await this.page.waitForSelector('[data-testid="search-list-wrapper"]', { timeout: 10000 });
    const suggestionLocator = this.page.getByTestId(`${suburb}, VIC 3121`);
    await suggestionLocator.waitFor({ timeout: 10000 });
    await suggestionLocator.click();

    await Promise.all([
      this.page.waitForNavigation({ waitUntil: "networkidle" }),
      this.page.getByTestId("home-search-btn").click(),
    ]);
  }
}
