import { Page } from "@playwright/test";
import { SearchResultsPage } from "./search-results.page";

export class PageFactory {
  static createSearchResultsPage(page: Page): SearchResultsPage {
    return new SearchResultsPage(page);
  }
}
