import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";

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

Then("I should see a list of properties in {string}", async function (this: CustomWorld, suburb: string) {
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

  // Verify each property's location contains "Richmond"
  for (const property of properties) {
    expect(property.location.toLowerCase()).toContain("richmond");
  }
});
