import { BaseConfig } from "./environments/base.config";
import { developmentConfig } from "./environments/development.config";
import { productionConfig } from "./environments/production.config";

const environment = process.env.TEST_ENV || "development";

const configs: Record<string, BaseConfig> = {
  development: developmentConfig,
  production: productionConfig,
};

export const config: BaseConfig = configs[environment] || developmentConfig;

// Export individual config sections for easier access
export const { baseUrl, timeout, retry } = config;
