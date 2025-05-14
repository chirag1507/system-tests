import { Page, expect } from "@playwright/test";
import { BasePage } from "../../../../acceptance/drivers/web/pages/base.page";

export class HomePage extends BasePage {
  async verifyPageLoaded(): Promise<void> {
    await this.waitForPageLoad();
    await expect(this.page).toHaveTitle(/resi.uatz.view.com.au | Real Estate Listings, Properties for Sale & Rent/);
  }
}
