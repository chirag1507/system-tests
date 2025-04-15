import { Property } from "./models/property";
import { PropertySearchDriver } from "../drivers/property_search_driver.interface";

export class PropertySearchDSL implements PropertySearchDSL {
  private driver: PropertySearchDriver;

  constructor(driver: PropertySearchDriver) {
    this.driver = driver;
  }

  async navigateToPropertySearch(): Promise<void> {
    await this.driver.navigateToPropertySearch();
  }

  async searchProperties(suburb: string): Promise<void> {
    await this.driver.searchProperties(suburb);
  }

  async getSearchResults(): Promise<Property[]> {
    return await this.driver.getSearchResults();
  }
}
