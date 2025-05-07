import { BaseConfig, defaultConfig } from "./base.config";

export const productionConfig: BaseConfig = {
  ...defaultConfig,
  baseUrl: "https://resi.view.com.au",
  timeout: {
    ...defaultConfig.timeout,
    default: 10000, // Stricter timeouts for production
  },
};
