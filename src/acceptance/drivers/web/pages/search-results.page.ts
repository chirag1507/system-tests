import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Property } from "../../../dsl/models/property";

export class SearchResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto("https://resi.uatz.view.com.au/for-sale/vic/in-richmond-3121/");
    await this.waitForPageLoad();
  }

  async waitForResults(): Promise<void> {
    await this.page.waitForSelector("#lsrCardsParent");
  }

  async searchForLocation(location: string): Promise<void> {
    await this.page.getByTestId("search-input").click();
    await this.page.getByTestId("search-input").fill(location);

    await this.page.waitForSelector('[data-testid="search-list-wrapper"]', { timeout: 10000 });
    const suggestionLocator = this.page.getByText(location, { exact: true });
    await suggestionLocator.waitFor({ timeout: 10000 });
    await suggestionLocator.click();

    await this.waitForPageLoad();
  }

  async getPropertyListings(): Promise<Property[]> {
    const propertyElements = await this.page.$$('span[data-testid^="listing-"]');
    const properties: Property[] = [];

    for (const element of propertyElements) {
      const propertyCard = await element.$("xpath=..");
      if (!propertyCard) continue;

      try {
        const property: Property = {
          id: (await element.getAttribute("id")) || "",
          location: await propertyCard.$eval(
            'a[data-testid="property-link"]',
            (el) => el.getAttribute("aria-label") || ""
          ),
          price: 0,
          bedrooms: 0,
          bathrooms: 0,
          propertyType: "House",
        };
        properties.push(property);
      } catch (error) {
        console.log(`Error extracting property data: ${error}`);
        continue;
      }
    }

    return properties;
  }
}
