import { Property } from "../../dsl/models/property";
import { SearchFilters } from "../../dsl/models/filters";
import { PropertySearchDriver } from "../property_search_driver.interface";

interface LocationPayload {
  state: string;
  suburbNameSlug: string;
  suburbName: string;
  postcode: string;
}

type PropertyType = "House" | "Unit" | "Apartment" | "Studio" | "Townhouse" | "Land" | "Villa" | "Rural";

interface ApiResponse {
  success: boolean;
  data: {
    listings: Array<{
      id: string;
      suburbName: string;
      state: string;
      price: number;
      bedrooms: number;
      bathrooms: number;
      propertyTypes: string[];
    }>;
  };
}

export class PropertySearchApiDriver implements PropertySearchDriver {
  private readonly baseUrl: string;
  private searchResponse: any;

  constructor() {
    this.baseUrl = "https://resi.uatz.view.com.au/api/pubui/listings/search-result-page/listings-by-location";
  }

  async navigateToPropertySearch(): Promise<void> {
    // No navigation needed for API
    return;
  }

  private convertToValidPropertyType(type: string): PropertyType {
    // Ensure first letter is capital and rest is lowercase
    const formattedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    if (this.isValidPropertyType(formattedType)) {
      return formattedType as PropertyType;
    }
    throw new Error(
      `Invalid property type: ${type}. Must be one of: House, Unit, Apartment, Studio, Townhouse, Land, Villa, Rural`
    );
  }

  private isValidPropertyType(type: string): type is PropertyType {
    return ["House", "Unit", "Apartment", "Studio", "Townhouse", "Land", "Villa", "Rural"].includes(type);
  }

  async searchProperties(location: string, filters?: SearchFilters): Promise<void> {
    // Parse location string to extract state and suburb
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
      propertyTypes: filters?.propertyType ? [this.convertToValidPropertyType(filters.propertyType)] : undefined,
    };

    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "avesta-ua",
      },
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
      propertyType: listing.propertyTypes[0] || "House", // Take the first property type or default to "House"
    }));
  }
}
