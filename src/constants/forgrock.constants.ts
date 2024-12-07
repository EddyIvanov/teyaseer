import { envVars } from '@/configs/env';

export const WEB_OAUTH_CLIENT = envVars.NEXT_PUBLIC_FORGEROCK_OAUTH_CLIENT;
export const APP_URL = envVars.APP_URL;
export const LOGOUT_URL = envVars.NEXT_UAE_PASS_LOGOUT_URL;
export const AM_URL = envVars.FORGEROCK.AM_URL;
export const REALM_PATH = 'alpha';
export const JOURNEY_LOGIN_UAEPASS = 'Teyaseer Customer Portal UAE PASS Login';
export const SCOPE = 'openid profile email phone UAEPASS';
export const TIME_OUT = 120000; // Forgerock session API on logout takes around 1.5min, otherwise recommended API timeout is 5000 (5sec)
