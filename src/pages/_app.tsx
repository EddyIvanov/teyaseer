import { ReactElement, ReactNode } from 'react';

import { NextPage } from 'next';

import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';
import { Config } from '@forgerock/javascript-sdk/src/index';
import { AppProps } from 'next/app';

import AppError from '@/components/molecules/AppError/AppError';
import {
  DATADOG_APP_ID,
  DATADOG_ALLOWTRACINGURL,
  DATADOG_CLIENT_TOKEN,
  DATADOG_DEFAULTPRIVACYLEVEL,
  DATADOG_ENV,
  DATADOG_SERVICE,
  DATADOG_SITE,
  DATADOG_VERSION,
  SESSIONREPLAYSAMPLERATE,
  SESSIONSAMPLERATE,
  TRACKLONGTASKS,
  TRACKRESOURCES,
  TRACKUSERINTERACTIONS,
  FORWARDERRORSTOLOGS,
} from '@/constants/datadog_constants';
import {
  AM_URL,
  APP_URL,
  JOURNEY_LOGIN_UAEPASS,
  REALM_PATH,
  SCOPE,
  TIME_OUT,
  WEB_OAUTH_CLIENT,
} from '@/constants/forgrock.constants';
import Providers from '@/providers';
import { WebPage } from '@/types/ContentFul.type';
import { LocalizationTypes } from '@/types/localization.type';

// Config Forgerock
Config.set({
  clientId: WEB_OAUTH_CLIENT,
  redirectUri: `${APP_URL}/authenticate`,
  scope: SCOPE,
  serverConfig: {
    baseUrl: `${AM_URL}`,
    timeout: TIME_OUT,
  },
  realmPath: REALM_PATH,
  tree: JOURNEY_LOGIN_UAEPASS,
});

// Add Datadog RUM and logs initialization
datadogRum.init({
  applicationId: DATADOG_APP_ID,
  clientToken: DATADOG_CLIENT_TOKEN,
  site: DATADOG_SITE,
  service: DATADOG_SERVICE,
  env: DATADOG_ENV,
  version: DATADOG_VERSION, // The version you release
  sessionSampleRate: SESSIONSAMPLERATE,
  sessionReplaySampleRate: SESSIONREPLAYSAMPLERATE,
  trackUserInteractions: TRACKUSERINTERACTIONS,
  trackResources: TRACKRESOURCES,
  trackLongTasks: TRACKLONGTASKS,
  allowedTracingUrls: [DATADOG_ALLOWTRACINGURL],
  defaultPrivacyLevel: DATADOG_DEFAULTPRIVACYLEVEL,
});

// Add Datadog RUM log initialization
datadogLogs.init({
  clientToken: DATADOG_CLIENT_TOKEN,
  site: DATADOG_SITE,
  service: DATADOG_SERVICE,
  env: DATADOG_ENV,
  version: DATADOG_VERSION, // The version you release
  forwardErrorsToLogs: FORWARDERRORSTOLOGS,
  sessionSampleRate: SESSIONSAMPLERATE,
});

export type NextPageWithLayout<Props> = NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<Props> = AppProps & {
  Component: NextPageWithLayout<Props>;
  locale: LocalizationTypes;
};
const getComponentWithError = (
  Component: NextPageWithLayout<WebPage>,
  pageProps: WebPage
) => {
  const { error } = pageProps;

  if (error) {
    return (
      <AppError
        status={error.status}
        extraDetails={{
          error: error.title,
          componentStack: error.message,
        }}
        refresh
      />
    );
  }
  return <Component {...pageProps} />;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout<WebPage>) {
  const getLayout = Component.getLayout ?? (page => page);
  return (
    <Providers>
      {getLayout(getComponentWithError(Component, pageProps))}
    </Providers>
  );
}

export default MyApp;
