import { SearchFilters } from "../dsl/models/filters";
import { Property } from "../dsl/models/property";

export interface PropertySearchDriver {
  navigateToPropertySearch(): Promise<void>;
  searchProperties(suburb: string, filters?: SearchFilters): Promise<void>;
  getSearchResults(): Promise<Property[]>;
}
