import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { SearchFilters } from "../dsl/models/filters";

Given("I am on the property search page", async function (this: CustomWorld) {
  if (!this.dsl) {
    throw new Error("DSL not initialized");
  }
  await this.dsl.navigateToPropertySearch();
});

When("I search for properties in {string}", async function (this: CustomWorld, suburb: string) {
  if (!this.dsl) {
    throw new Error("DSL not initialized");
  }
  await this.dsl.searchProperties(suburb);
});

When(
  "I search for properties in {string} with the following filters:",
  async function (this: CustomWorld, suburb: string, dataTable: any) {
    if (!this.dsl) {
      throw new Error("DSL not initialized");
    }
    const filters: SearchFilters = {};
    const rows = dataTable.hashes();

    for (const row of rows) {
      switch (row["Filter Type"]) {
        case "Bathrooms":
          filters.bathrooms = parseInt(row["Value"]);
          break;
        case "Bedrooms":
          filters.bedrooms = parseInt(row["Value"]);
          break;
        case "Property Type":
          filters.propertyType = row["Value"];
          break;
      }
    }

    await this.dsl.searchProperties(suburb, filters);
  }
);

Then("I should see a list of properties in {string}", async function (this: CustomWorld, suburb: string) {
  if (!this.dsl) {
    throw new Error("DSL not initialized");
  }
  const properties = await this.dsl.getSearchResults();

  expect(properties.length).toBeGreaterThan(0);
});

Then("I should see a list of properties matching all my criteria", async function (this: CustomWorld) {
  if (!this.dsl) {
    throw new Error("DSL not initialized");
  }
  const properties = await this.dsl.getSearchResults();
  expect(properties.length).toBeGreaterThan(0);
});

Then("the search results should be relevant to my search", async function (this: CustomWorld) {
  if (!this.dsl) {
    throw new Error("DSL not initialized");
  }
  const properties = await this.dsl.getSearchResults();

  for (const property of properties) {
    expect(property.suburb.toLowerCase()).toContain("richmond");
  }
});

Then("each property should have at least:", async function (this: CustomWorld, dataTable: any) {
  if (!this.dsl) {
    throw new Error("DSL not initialized");
  }
  const properties = await this.dsl.getSearchResults();
  const criteria = dataTable.hashes();

  for (const property of properties) {
    for (const criterion of criteria) {
      switch (criterion["Attribute"]) {
        case "Bathrooms":
          expect(property.bathrooms).toBeGreaterThanOrEqual(parseInt(criterion["Value"]));
          break;
        case "Bedrooms":
          expect(property.bedrooms).toBeGreaterThanOrEqual(parseInt(criterion["Value"]));
          break;
        case "Type":
          expect(property.propertyType).toBe(criterion["Value"]);
          break;
      }
    }
  }
});
