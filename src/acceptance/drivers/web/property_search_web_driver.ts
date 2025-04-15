import { Page } from "@playwright/test";
import { Property } from "../../dsl/models/property";
import { PropertySearchDriver } from "../property_search_driver.interface";
import { PageFactory } from "./pages/page.factory";
import { SearchResultsPage } from "./pages/search-results.page";
import { SearchFilters } from "@/acceptance/dsl/models/filters";

export class PropertySearchWebDriver implements PropertySearchDriver {
  private readonly searchResultsPage: SearchResultsPage;

  constructor(private readonly page: Page) {
    this.searchResultsPage = PageFactory.createSearchResultsPage(page);
  }

  async navigateToPropertySearch(): Promise<void> {
    await this.searchResultsPage.navigate();
  }

  async searchProperties(suburb: string, filters?: SearchFilters): Promise<void> {
    await this.searchResultsPage.searchForLocation(suburb);
    if (filters) {
      await this.searchResultsPage.applyFilters(filters);
    }
    await this.searchResultsPage.waitForResults();
  }

  async getSearchResults(): Promise<Property[]> {
    return await this.searchResultsPage.getPropertyListings();
  }
}
