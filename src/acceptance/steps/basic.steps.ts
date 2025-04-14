import { Given, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import * as assert from "assert";
import { CustomWorld } from "../support/world";

setDefaultTimeout(30000);

Given("I am on the test page", async function (this: CustomWorld) {
  this.browser = await chromium.launch();
  this.page = await this.browser.newPage();
  await this.page.goto("https://example.com");
});

Then("I should see the page title", async function (this: CustomWorld) {
  if (!this.page) throw new Error("Page not initialized");
  const title = await this.page.title();
  assert.strictEqual(title, "Example Domain");
  await this.browser?.close();
});
