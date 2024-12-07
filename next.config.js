/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    SONAR_CONNECTION_ID: process.env.SONAR_CONNECTION_ID,
    SONAR_PROJECT_KEY: process.env.SONAR_PROJECT_KEY,
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID:
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT:
      process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
    NEXT_PUBLIC_USERS_API_BASE_URL: process.env.NEXT_PUBLIC_USERS_API_BASE_URL,
    NEXT_PUBLIC_VENDORS_API_BASE_URL:
      process.env.NEXT_PUBLIC_VENDORS_API_BASE_URL,
    NEXT_PUBLIC_COST_CALCULATOR_API_BASE_URL:
      process.env.NEXT_PUBLIC_COST_CALCULATOR_API_BASE_URL,
    NEXT_PUBLIC_MAPS_API_KEY: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_FORGEROCK_AM_URL: process.env.NEXT_PUBLIC_FORGEROCK_AM_URL,
    NEXT_PUBLIC_CALENDLY_BASE_URL: process.env.NEXT_PUBLIC_CALENDLY_BASE_URL,
    NEXT_PUBLIC_SOURCE_VERSION: process.env.NEXT_PUBLIC_SOURCE_VERSION,
    NEXT_PUBLIC_REVALIDATION_TOKEN: process.env.NEXT_PUBLIC_REVALIDATION_TOKEN,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_ONLY_UAT_FEATURES_ENABLED:
      process.env.NEXT_PUBLIC_ONLY_UAT_FEATURES_ENABLED,
    NEXT_UAE_PASS_LOGOUT_URL: process.env.NEXT_UAE_PASS_LOGOUT_URL,
    NEXT_PUBLIC_FORGEROCK_OAUTH_CLIENT:
      process.env.NEXT_PUBLIC_FORGEROCK_OAUTH_CLIENT,
    NEXT_PUBLIC_DATADOG_APP_ID: process.env.NEXT_PUBLIC_DATADOG_APP_ID,
    NEXT_PUBLIC_DATADOG_CLIENT_TOKEN:
      process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
    NEXT_PUBLIC_DATADOG_SITE: process.env.NEXT_PUBLIC_DATADOG_SITE,
    NEXT_PUBLIC_DATADOG_SERVICE: process.env.NEXT_PUBLIC_DATADOG_SERVICE,
    NEXT_PUBLIC_DATADOG_ENV: process.env.NEXT_PUBLIC_DATADOG_ENV,
    NEXT_PUBLIC_DATADOG_VERSION: process.env.NEXT_PUBLIC_DATADOG_VERSION,
    NEXT_PUBLIC_DATADOG_DEFAULTPRIVACYLEVEL:
      process.env.NEXT_PUBLIC_DATADOG_DEFAULTPRIVACYLEVEL,
    NEXT_PUBLIC_DATADOG_ALLOWTRACINGURL:
      process.env.NEXT_PUBLIC_DATADOG_ALLOWTRACINGURL,
    NEXT_PUBLIC_DATADOG_TRACKUSERINTERACTIONS:
      process.env.NEXT_PUBLIC_DATADOG_TRACKUSERINTERACTIONS,
    NEXT_PUBLIC_DATADOG_TRACKRESOURCES:
      process.env.NEXT_PUBLIC_DATADOG_TRACKRESOURCES,
    NEXT_PUBLIC_DATADOG_TRACKLONGTASKS:
      process.env.NEXT_PUBLIC_DATADOG_TRACKLONGTASKS,
    NEXT_PUBLIC_DATADOG_FORWARDERRORSTOLOGS:
      process.env.NEXT_PUBLIC_DATADOG_FORWARDERRORSTOLOGS,
  },
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'ar',
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
    ],
  },
  cacheMaxMemorySize: 0,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

nextConfig.webpack = config => {
  config.module.rules.push({
    test: /\.svg$/,
    use: '@svgr/webpack',
  });
  return config;
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
