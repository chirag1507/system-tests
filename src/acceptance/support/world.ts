import { chromium, Browser, Page } from "@playwright/test";
import { setWorldConstructor, World } from "@cucumber/cucumber";
import { PropertySearchWebDriver } from "../drivers/web/property_search_web_driver";
import { PropertySearchApiDriver } from "../drivers/api/property_search_api_driver";
import { PropertySearchDSL } from "../dsl/property_search_dsl";

export class CustomWorld extends World {
  public dsl?: PropertySearchDSL;
  protected page?: Page;
  protected browser?: Browser;

  async init() {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();

    // Add the specific header that bypasses DataDome
    await this.page.setExtraHTTPHeaders({
      "user-agent": "avesta-ua",
    });

    const driver = new PropertySearchWebDriver(this.page);
    //const driver = new PropertySearchApiDriver();
    this.dsl = new PropertySearchDSL(driver);
  }

  async destroy() {
    if (this.page) {
      await this.page.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}
setWorldConstructor(CustomWorld);
