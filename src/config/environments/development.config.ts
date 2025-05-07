import { BaseConfig, defaultConfig } from "./base.config";

export const developmentConfig: BaseConfig = {
  ...defaultConfig,
  baseUrl: "https://resi.uatz.view.com.au",
  timeout: {
    ...defaultConfig.timeout,
    default: 15000, // Longer timeouts for development
  },
};
