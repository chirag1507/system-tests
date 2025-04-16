export type PropertyType = "House" | "Unit" | "Apartment" | "Studio" | "Townhouse" | "Land" | "Villa" | "Rural";

export interface ApiResponse {
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
