FROM node:18-alpine AS base


ARG NEXT_PUBLIC_CONTENTFUL_SPACE_ID
ARG NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
ARG NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
ARG NEXT_PUBLIC_MAPS_API_KEY
ARG NEXT_PUBLIC_USERS_API_BASE_URL
ARG NEXT_PUBLIC_VENDORS_API_BASE_URL
ARG NEXT_PUBLIC_COST_CALCULATOR_API_BASE_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_FORGEROCK_AM_URL
ARG NEXT_PUBLIC_FORGEROCK_OAUTH_CLIENT
ARG NEXT_PUBLIC_CALENDLY_BASE_URL
ARG NEXT_PUBLIC_SOURCE_VERSION
ARG NEXT_PUBLIC_REVALIDATION_TOKEN
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_ONLY_UAT_FEATURES_ENABLED
ARG NEXT_UAE_PASS_LOGOUT_URL
ARG NEXT_PUBLIC_DATADOG_APP_ID
ARG NEXT_PUBLIC_DATADOG_CLIENT_TOKEN
ARG NEXT_PUBLIC_DATADOG_SITE
ARG NEXT_PUBLIC_DATADOG_SERVICE
ARG NEXT_PUBLIC_DATADOG_ENV
ARG NEXT_PUBLIC_DATADOG_VERSION
ARG NEXT_PUBLIC_DATADOG_ALLOWTRACINGURL 
ARG NEXT_PUBLIC_DATADOG_TRACKUSERINTERACTIONS
ARG NEXT_PUBLIC_DATADOG_TRACKRESOURCES
ARG NEXT_PUBLIC_DATADOG_TRACKLONGTASKS
ARG NEXT_PUBLIC_DATADOG_FORWARDERRORSTOLOGS
      

# Set work directory
WORKDIR /app

# Copy package manifests and lock files
COPY package.json yarn.lock .npmrc ./

# Install dependencies
RUN yarn install

# Copy application code
COPY . .

ENV NEXT_PUBLIC_CONTENTFUL_SPACE_ID=$NEXT_PUBLIC_CONTENTFUL_SPACE_ID
ENV NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=$NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
ENV NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=$NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
ENV NEXT_PUBLIC_MAPS_API_KEY=$NEXT_PUBLIC_MAPS_API_KEY
ENV NEXT_PUBLIC_USERS_API_BASE_URL=$NEXT_PUBLIC_USERS_API_BASE_URL
ENV NEXT_PUBLIC_VENDORS_API_BASE_URL=$NEXT_PUBLIC_VENDORS_API_BASE_URL
ENV NEXT_PUBLIC_COST_CALCULATOR_API_BASE_URL=$NEXT_PUBLIC_COST_CALCULATOR_API_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_FORGEROCK_AM_URL=$NEXT_PUBLIC_FORGEROCK_AM_URL
ENV NEXT_PUBLIC_FORGEROCK_OAUTH_CLIENT=$NEXT_PUBLIC_FORGEROCK_OAUTH_CLIENT
ENV NEXT_PUBLIC_CALENDLY_BASE_URL=$NEXT_PUBLIC_CALENDLY_BASE_URL
ENV NEXT_PUBLIC_SOURCE_VERSION=$NEXT_PUBLIC_SOURCE_VERSION
ENV NEXT_PUBLIC_REVALIDATION_TOKEN=$NEXT_PUBLIC_REVALIDATION_TOKEN
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_ONLY_UAT_FEATURES_ENABLED=$NEXT_PUBLIC_ONLY_UAT_FEATURES_ENABLED
ENV NEXT_UAE_PASS_LOGOUT_URL=$NEXT_UAE_PASS_LOGOUT_URL
ENV NEXT_PUBLIC_DATADOG_APP_ID=$NEXT_PUBLIC_DATADOG_APP_ID
ENV NEXT_PUBLIC_DATADOG_CLIENT_TOKEN=$NEXT_PUBLIC_DATADOG_CLIENT_TOKEN
ENV NEXT_PUBLIC_DATADOG_SITE=$NEXT_PUBLIC_DATADOG_SITE
ENV NEXT_PUBLIC_DATADOG_SERVICE=$NEXT_PUBLIC_DATADOG_SERVICE
ENV NEXT_PUBLIC_DATADOG_ENV=$NEXT_PUBLIC_DATADOG_ENV
ENV NEXT_PUBLIC_DATADOG_VERSION=$NEXT_PUBLIC_DATADOG_VERSION
ENV NEXT_PUBLIC_DATADOG_ALLOWTRACINGURL=$NEXT_PUBLIC_DATADOG_ALLOWTRACINGURL
ENV NEXT_PUBLIC_DATADOG_TRACKUSERINTERACTIONS=$NEXT_PUBLIC_DATADOG_TRACKUSERINTERACTIONS
ENV NEXT_PUBLIC_DATADOG_TRACKRESOURCES=$NEXT_PUBLIC_DATADOG_TRACKRESOURCES
ENV NEXT_PUBLIC_DATADOG_TRACKLONGTASKS=$NEXT_PUBLIC_DATADOG_TRACKLONGTASKS
ENV NEXT_PUBLIC_DATADOG_FORWARDERRORSTOLOGS=$NEXT_PUBLIC_DATADOG_FORWARDERRORSTOLOGS

# Build the application
RUN yarn build

# Expose port
EXPOSE 3000

# Run the application
CMD ["yarn", "start"]