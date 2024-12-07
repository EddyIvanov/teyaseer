import {
  OAuth2Tokens,
  TokenManager,
} from '@forgerock/javascript-sdk/src/index';
import Router from 'next/router';
import nookies, { parseCookies } from 'nookies';

export const AUTH_COOKIE_KEY = 'isAuthenticated';

/**
 * Seed user authentication session
 * @param {boolean} isAuthenticated
 */
export const seedAuthenticationSession = (isAuthenticated: boolean): void => {
  nookies.set(null, AUTH_COOKIE_KEY, isAuthenticated.toString(), {
    sameSite: 'Lax',
    path: '/',
  });
};

/**
 * Clear user authentication session
 */
export const clearAuthenticationSession = (): void => {
  nookies.destroy(null, AUTH_COOKIE_KEY, { path: '/' });
};

/**
 * Get access token
 * @returns {string | null} The access token or null if not found or invalid or user not authenticated.
 */
export const getAccessToken = async () => {
  if (!isUserAuthenticated()) {
    return null;
  }
  try {
    const tokens = await TokenManager.getTokens();

    const { accessToken } = tokens as OAuth2Tokens;

    /**
     * Check for the presence of the access token. As Forgerock refresh the access token from their end,
     * we will always get a valid access token. Otherwise Forgerock handle all the logic and will throw exception,
     * which for most of the cases will means that refresh token has expired.
     */
    return accessToken;
  } catch (error) {
    console.error('----ACCESS TOKEN GET FAILURE----', error);
    Router.push({
      pathname: `/logout`,
      query: { redirectLink: window.location.pathname },
    });
    return null;
  }
};

/**
 * Is user authenticated
 * @returns {boolean}
 */
export const isUserAuthenticated = () => {
  const { isAuthenticated } = parseCookies();

  return !!isAuthenticated;
};
