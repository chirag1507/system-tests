import { test, expect } from "@playwright/test";
import { API_CONFIG, API_ENDPOINTS, API_HEADERS } from "@/config";

test.describe("API Health Checks", () => {
  test.describe("Server Health", () => {
    test("Server health endpoint returns 200", async ({ request }) => {
      const startTime = Date.now();
      const response = await request.get(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.HEALTH}`, {
        timeout: API_CONFIG.TIMEOUT,
        headers: API_HEADERS,
      });

      const responseTime = Date.now() - startTime;

      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
      expect(responseTime).toBeLessThan(API_CONFIG.RESPONSE_TIME_THRESHOLD);
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

      const response = await request.post(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SEARCH}`, {
        timeout: API_CONFIG.TIMEOUT,
        headers: API_HEADERS,
        data: payload,
      });

      const responseTime = Date.now() - startTime;

      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
      expect(responseTime).toBeLessThan(API_CONFIG.RESPONSE_TIME_THRESHOLD);
    });
  });
});
