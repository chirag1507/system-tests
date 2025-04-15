import { Page } from "@playwright/test";
import { Property } from "../../dsl/models/property";
import { PropertySearchDriver } from "../property_search_driver.interface";

export class PropertySearchWebDriver implements PropertySearchDriver {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPropertySearch(): Promise<void> {
    await this.page.goto("https://resi.uatz.view.com.au/for-sale/vic/in-richmond-3121/");
    await this.page.waitForLoadState("networkidle");
  }

  async searchProperties(suburb: string): Promise<void> {
    await this.page.getByTestId("search-input").click();

    await this.page.getByTestId("search-input").fill(suburb);

    await this.page.waitForSelector('[data-testid="search-list-wrapper"]', { timeout: 10000 });

    const suggestionLocator = this.page.getByText(suburb, { exact: true });
    await suggestionLocator.waitFor({ timeout: 10000 });
    await suggestionLocator.click();

    await this.page.waitForLoadState("networkidle");
  }

  async getSearchResults(): Promise<Property[]> {
    await this.page.waitForSelector("#lsrCardsParent");

    const propertyElements = await this.page.$$('span[data-testid^="listing-"]');

    const properties: Property[] = [];

    for (const element of propertyElements) {
      const propertyCard = await element.$("xpath=..");

      if (!propertyCard) {
        console.log("Could not find property card parent element");
        continue;
      }

      try {
        const property: Property = {
          id: (await element.getAttribute("id")) || "",
          location: await propertyCard.$eval(
            'a[data-testid="property-link"]',
            (el) => el.getAttribute("aria-label") || ""
          ),
          // For now, setting default values as the structure needs to be analyzed further
          price: 0,
          bedrooms: 0,
          bathrooms: 0,
          propertyType: "House", // Default value
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
