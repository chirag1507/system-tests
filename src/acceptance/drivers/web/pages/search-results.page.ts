import { Page, ElementHandle } from "@playwright/test";
import { BasePage } from "./base.page";
import { Property } from "../../../dsl/models/property";
import { SearchFilters } from "../../../dsl/models/filters";
import { WEB_CONFIG, WEB_PAGES } from "../../../../config";
export class SearchResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto(`${WEB_CONFIG.BASE_URL}${WEB_PAGES.RICHMOND_SEARCH_RESULTS}`);
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

  async applyFilters(filters: SearchFilters): Promise<void> {
    await this.page.click('[data-testid="filter-section"]');
    await this.page.waitForSelector('[data-testid="Filters"]');

    if (filters.bathrooms) {
      await this.page.click(`[data-testid="bathrooms-${filters.bathrooms}"]`);
    }

    if (filters.bedrooms) {
      await this.page.click(`[data-testid="bedrooms-${filters.bedrooms}"]`);
    }

    if (filters.propertyType) {
      await this.page.click(`[data-testid="house-chip"]`);
    }

    await this.page.click('[data-testid="filter-search-button"]');
    await this.page.waitForSelector('[data-testid="filters-modal"]', { state: "hidden" });
  }

  async getPropertyListings(): Promise<Property[]> {
    const propertyElements = await this.page.$$('span[data-testid^="listing-"]');
    const properties: Property[] = [];

    for (const element of propertyElements) {
      const propertyCard = await element.$("xpath=..");
      if (!propertyCard) continue;

      try {
        const ariaLabel = await propertyCard.$eval(
          'a[data-testid="property-link"]',
          (el) => el.getAttribute("aria-label") || ""
        );
        let address = "";
        let suburb = "";
        let state = "";
        let postcode = "";
        if (ariaLabel) {
          // Try: "123 Test St, Richmond, VIC 3121"
          let match = ariaLabel.match(/^(.*?),\s*(.*?),\s*([A-Z]{2,3})\s*(\d{4})?$/);
          if (match) {
            address = match[1] || "";
            suburb = match[2] || "";
            state = match[3] || "";
            postcode = match[4] || "";
          } else {
            // Try: "Richmond, VIC 3121"
            match = ariaLabel.match(/^([^,]+),\s*([A-Z]{2,3})\s*(\d{4})?$/);
            if (match) {
              suburb = match[1] || "";
              state = match[2] || "";
              postcode = match[3] || "";
            } else {
              // Fallback: treat the whole string as suburb
              suburb = ariaLabel;
            }
          }
        }

        const property: Property = {
          id: (await element.getAttribute("id")) || "",
          address,
          suburb,
          state,
          postcode,
          price: 0,
          bedrooms: await this.extractNumber(propertyCard, '[data-testid="bedrooms"]'),
          bathrooms: await this.extractNumber(propertyCard, '[data-testid="bathrooms"]'),
          propertyType: await this.extractPropertyType(propertyCard),
        };
        properties.push(property);
      } catch (error) {
        console.log(`Error extracting property data: ${error}`);
        continue;
      }
    }

    return properties;
  }

  private async extractNumber(element: ElementHandle, selector: string): Promise<number> {
    try {
      const text = await element.$eval(selector, (el) => el.textContent?.trim() || "0");
      return parseInt(text) || 0;
    } catch (error) {
      console.log(`Error extracting number for selector ${selector}:`, error);
      return 0;
    }
  }

  private async extractPropertyType(element: ElementHandle): Promise<string> {
    try {
      const propertyTypeChips = [
        { id: "unit-chip", type: "Unit" },
        { id: "apartment-chip", type: "Apartment" },
        { id: "townhouse-chip", type: "Townhouse" },
        { id: "land-chip", type: "Land" },
        { id: "villa-chip", type: "Villa" },
        { id: "rural-chip", type: "Rural" },
      ];

      for (const { id, type } of propertyTypeChips) {
        const chip = await element.$(`[data-testid="${id}"]`);
        if (chip) {
          return type;
        }
      }
      return "House";
    } catch (error) {
      console.log("Error extracting property type:", error);
      return "House";
    }
  }
}
