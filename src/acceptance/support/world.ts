import { chromium, Browser, Page } from "@playwright/test";
import { setWorldConstructor, World } from "@cucumber/cucumber";
import { PropertySearchWebDriver } from "../drivers/web/property_search_web_driver";
import { PropertySearchApiDriver } from "../drivers/api/property_search_api_driver";
import { PropertySearchDSL } from "../dsl/property_search_dsl";
import { PropertySearchDriver } from "../drivers/property_search_driver.interface";
import { ITestCaseHookParameter } from "@cucumber/cucumber/lib/support_code_library_builder/types";

export class CustomWorld extends World {
  public dsl?: PropertySearchDSL;
  protected page?: Page;
  protected browser?: Browser;
  private driver?: PropertySearchDriver;
  protected scenario?: ITestCaseHookParameter;

  async init() {
    const tags = this.scenario?.pickle.tags.map((tag: { name: string }) => tag.name) || [];
    const isUITest = tags.includes("@ui");
    const isApiTest = tags.includes("@api");

    if (isUITest) {
      this.browser = await chromium.launch();
      this.page = await this.browser.newPage();

      // Add the specific header that bypasses DataDome
      await this.page.setExtraHTTPHeaders({
        "user-agent": "avesta-ua",
      });

      this.driver = new PropertySearchWebDriver(this.page);
    } else if (isApiTest) {
      this.driver = new PropertySearchApiDriver();
    } else {
      throw new Error("Scenario must be tagged with either @ui or @api");
    }

    this.dsl = new PropertySearchDSL(this.driver);
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
