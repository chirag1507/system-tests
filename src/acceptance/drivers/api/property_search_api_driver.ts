import { Property } from "../../dsl/models/property";
import { SearchFilters } from "../../dsl/models/filters";
import { PropertySearchDriver } from "../property_search_driver.interface";
import { ApiResponse } from "./types";
import { convertToValidPropertyType } from "./utils";
import { API_CONFIG } from "./constants";

export class PropertySearchApiDriver implements PropertySearchDriver {
  private searchResponse: any;

  async navigateToPropertySearch(): Promise<void> {
    // No navigation needed for API
    return;
  }

  async searchProperties(location: string, filters?: SearchFilters): Promise<void> {
    const parts = location.split(",");
    const suburb = parts[0].trim();
    const state = parts.length > 1 ? parts[1].trim() : "VIC";

    const payload = {
      includeSurrounding: true,
      excludeUnderContract: false,
      includeP360Properties: false,
      exactBaths: false,
      exactBeds: false,
      exactCars: false,
      saleMethod: ["Sale"],
      locations: [
        {
          state: state.toLowerCase(),
          suburbNameSlug: suburb.toLowerCase(),
          suburbName: suburb.toUpperCase(),
          postcode: "3121",
        },
      ],
      page: 1,
      bathrooms: filters?.bathrooms,
      bedrooms: filters?.bedrooms,
      propertyTypes: filters?.propertyType ? [convertToValidPropertyType(filters.propertyType)] : undefined,
    };

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEARCH}`, {
      method: "POST",
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.statusText}. Details: ${errorText}`);
    }

    const responseData = (await response.json()) as ApiResponse;
    if (!responseData.success) {
      throw new Error("API request was not successful");
    }
    this.searchResponse = responseData.data;
  }

  async getSearchResults(): Promise<Property[]> {
    if (!this.searchResponse) {
      throw new Error("No search has been performed yet");
    }

    return this.searchResponse.listings.map((listing: any) => ({
      id: listing.id,
      location: listing.suburbName,
      price: listing.price,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      propertyType: listing.propertyTypes[0] || "House",
    }));
  }
}
