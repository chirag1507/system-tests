export interface BaseConfig {
  baseUrl: string;
  timeout: {
    default: number;
    navigation: number;
    assertion: number;
  };
  retry: {
    maxAttempts: number;
    initialDelay: number;
    maxDelay: number;
  };
}

export const defaultConfig: BaseConfig = {
  baseUrl: "https://resi.uatz.view.com.au",
  timeout: {
    default: 10000,
    navigation: 30000,
    assertion: 5000,
  },
  retry: {
    maxAttempts: 3,
    initialDelay: 1000,
    maxDelay: 10000,
  },
};
