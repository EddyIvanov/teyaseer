export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      ENV: 'test' | 'dev' | 'prod';
      NEXT_PUBLIC_CONTENTFULL_SPACE_ID: string;
      NEXT_PUBLIC_CONTENTFULL_ACCESS_TOKEN: string;
      NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT: string;
      NEXT_PUBLIC_SOURCE_VERSION: string;
      NEXT_PUBLIC_COST_CALCULATOR_API_BASE_URL: string;
      NEXT_PUBLIC_GA_ID: string;
    }
  }
}
