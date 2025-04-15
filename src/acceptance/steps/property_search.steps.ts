import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import * as assert from "assert";
import { CustomWorld } from "../support/world";

setDefaultTimeout(30000);

Given("I am on the property search page", async function (this: CustomWorld) {
  await this.dsl?.navigateToPropertySearch();
});

When("I search for properties in {string}", async function (this: CustomWorld, suburb: string) {
  await this.dsl?.searchProperties(suburb);
});

Then("I should see a list of properties in {string}", async function (this: CustomWorld, suburb: string) {
  const results = await this.dsl?.getSearchResults();
  assert.ok(results && results.length > 0, "No properties found");
  assert.ok(
    results.every((property) => property.location.toLowerCase().includes(suburb.toLowerCase())),
    "Not all properties are in the specified suburb"
  );
});

Then("the search results should be relevant to my search", async function (this: CustomWorld) {
  const results = await this.dsl?.getSearchResults();
  assert.ok(results && results.length > 0, "No properties found");
});
