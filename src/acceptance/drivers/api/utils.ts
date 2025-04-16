import { PropertyType } from "./types";

export const convertToValidPropertyType = (type: string): PropertyType => {
  // Ensure first letter is capital and rest is lowercase
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  if (isValidPropertyType(formattedType)) {
    return formattedType;
  }
  throw new Error(
    `Invalid property type: ${type}. Must be one of: House, Unit, Apartment, Studio, Townhouse, Land, Villa, Rural`
  );
};

export const isValidPropertyType = (type: string): type is PropertyType => {
  return ["House", "Unit", "Apartment", "Studio", "Townhouse", "Land", "Villa", "Rural"].includes(type);
};
