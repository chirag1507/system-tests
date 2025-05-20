import { test, expect } from "@playwright/test";
import { API_CONFIG, API_ENDPOINTS, API_HEADERS } from "@/config";
import { PropertyBuilder } from "../../test-data/builders/property.builder";

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

      const property = new PropertyBuilder().build();

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
            state: property.state.toLowerCase(),
            suburbNameSlug: property.suburb.toLowerCase(),
            suburbName: property.suburb.toUpperCase(),
            postcode: property.postcode,
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
