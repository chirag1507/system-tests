import { test, expect } from "@playwright/test";

// Configuration
const API_BASE_URL = "https://resi.uatz.view.com.au/api/pubui";
const TIMEOUT = 10000; // 10 seconds
const RESPONSE_TIME_THRESHOLD = 5000;

test.describe("API Health Checks", () => {
  test.describe("Server Health", () => {
    test("Server health endpoint returns 200", async ({ request }) => {
      const startTime = Date.now();
      const response = await request.get(`${API_BASE_URL}/health-check`, {
        timeout: TIMEOUT,
      });

      const responseTime = Date.now() - startTime;

      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
      expect(responseTime).toBeLessThan(RESPONSE_TIME_THRESHOLD);
    });
  });

  test.describe("Critical Business Endpoints", () => {
    test("Search API endpoint is healthy", async ({ request }) => {
      const startTime = Date.now();

      const location = "Richmond, VIC";

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
      };

      const response = await request.post(`${API_BASE_URL}/listings/search-result-page/listings-by-location`, {
        timeout: TIMEOUT,
        data: payload,
      });

      const responseTime = Date.now() - startTime;

      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
      expect(responseTime).toBeLessThan(RESPONSE_TIME_THRESHOLD);
    });
  });
});
