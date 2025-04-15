import { Property } from "./models/property";
import { PropertySearchDriver } from "../drivers/property_search_driver.interface";
import { SearchFilters } from "./models/filters";

export class PropertySearchDSL {
  private driver: PropertySearchDriver;

  constructor(driver: PropertySearchDriver) {
    this.driver = driver;
  }

  async navigateToPropertySearch(): Promise<void> {
    await this.driver.navigateToPropertySearch();
  }

  async searchProperties(suburb: string, filters?: SearchFilters): Promise<void> {
    await this.driver.searchProperties(suburb, filters);
  }

  async getSearchResults(): Promise<Property[]> {
    return await this.driver.getSearchResults();
  }
}
