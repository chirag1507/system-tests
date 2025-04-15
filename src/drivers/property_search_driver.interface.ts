import { Property } from "../dsl/models/property";

export interface PropertySearchDriver {
  navigateToPropertySearch(): Promise<void>;
  searchProperties(suburb: string): Promise<void>;
  getSearchResults(): Promise<Property[]>;
}
