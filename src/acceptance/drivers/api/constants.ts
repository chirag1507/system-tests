export const API_CONFIG = {
  BASE_URL: "https://resi.uatz.view.com.au/api/pubui",
  ENDPOINTS: {
    SEARCH: "/listings/search-result-page/listings-by-location",
  },
  HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "avesta-ua",
  },
} as const;
