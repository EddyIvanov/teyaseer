import { useContext, useEffect, useRef } from 'react';

import { AbsoluteCenter, Box, useToast } from '@chakra-ui/react';
import {
  FRAuth,
  FRStep,
  FRUser,
  OAuth2Tokens,
  TokenManager,
} from '@forgerock/javascript-sdk/src/index';
import { useRouter } from 'next/router';

import CenteredLoader from '@/components/organism/dashboard/CenteredLoader/CenteredLoader';
import { envVars } from '@/configs/env';
import {
  PREFERRED_LANG_COOKIE,
  REMIND_LATER_SURVEY_COOKIE,
} from '@/constants/storage.constants';
import { getLocaleCode } from '@/helpers/locale';
import {
  clearAuthenticationSession,
  seedAuthenticationSession,
} from '@/helpers/session';
import { deleteCookie, getCookie, setCookie } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import { useUAEPassSession } from '@/hooks/useUAEPassSession';
import { Context } from '@/providers/MainContext';
import { loginPreCheck } from '@/services/users';
import { AR, LocalizationTypes } from '@/types/localization.type';

/**
 * Single entry point of authentication
 * Handles authentication after redirect from UAEPass with approval from App
 */
const Authenticate = () => {
  const { setContextData } = useContext(Context);
  const localeRef = useRef<LocalizationTypes>(AR);
  const router = useRouter();
  const APP_URL = envVars.APP_URL;
  const INVALID_CUSTOMER = 'You are not a valid customer';
  const UAE_PASS_SIGN_UP_LINK = 'https://selfcare.uaepass.ae/signup';
  const toast = useToast();
  const { translateByLocaleKey } = useTranslation();
  const { initiateUAE, isUaeInitated } = useUAEPassSession();

  /**
   * Handle auth failure
   * On auth failure logout, clear session and return to home page
   */
  const handleAuthFailure = async (errorMessage?: string) => {
    await logOut();
    router.push('/', '/', { locale: localeRef.current });

    if (errorMessage) {
      toast({
        title: errorMessage,
        status: 'error',
        duration: 30000,
        isClosable: true,
        icon: <></>,
      });
    }
  };

  /**
   * Handle response type LoginFailure
   */
  const handleLoginFailure = async () => {
    await logOut();
    window.location.href = UAE_PASS_SIGN_UP_LINK;
    return;
  };

  /**
   * Handle response type Step
   * Redirect to external link of UAE pass creation if user is invalid
   * @param {FRStep} response
   */
  const handleResponseTypeStep = async (response: FRStep) => {
    if (
      response.payload.callbacks &&
      response.payload.callbacks[0].output[0].value === INVALID_CUSTOMER
    ) {
      // Auth failure with invalid customer
      await logOut(); // Incase !!!
      window.location.href = UAE_PASS_SIGN_UP_LINK;
      return;
    }

    // Incase !!!
    await logOut(); // Incase !!!
    router.push('/', '/', { locale: localeRef.current });
  };

  /**
   * Handle login success of UAEPass
   * Get the access token from the token manager and call for user eligibility
   * Return and navigate to non-eligible page if user is not eligible
   * Set and store the authentication session state on cookies
   * Navigate to home page if onboarding completed - scoped out
   * Navigate to onboarding page if onboarding is not complete - scoped out
   */
  const handleAuthSuccess = async () => {
    try {
      const tokens = await TokenManager.getTokens({
        forceRenew: true,
      });
      const { accessToken } = tokens as OAuth2Tokens;
      const {
        isEligible,
        isUAEPassUpgraded,
        preferredLanguage: userLocale,
      } = (await loginPreCheck(accessToken)).data.data;

      const preferredLanguage = getLocaleCode(userLocale);
      setCookie(PREFERRED_LANG_COOKIE, preferredLanguage);
      setContextData({
        locale: preferredLanguage,
        is_rtl: preferredLanguage === AR,
      });
      if (!isUAEPassUpgraded || !isEligible) {
        await logOut();
        const redirectPath = !isUAEPassUpgraded
          ? '/sign-up/non-upgraded'
          : '/sign-up/non-eligible';
        router.push(redirectPath, redirectPath, {
          locale: localeRef.current,
        });
        return;
      }

      // Set the authentication session
      seedAuthenticationSession(true);

      /**
       * we get the preffreLocale from the preCheck api and update the cookie
       * we redirect to /dashboard and middleware will handle to redirect to the right url.
       * For this case we don't have to pass locale, as will trigger loop inside of middleware function.
       *
       * If user login for first time, he has no cookies, in this case, we will redirect based on the locale,
       * that the user had in the public website, as it will be high chance, public website and portal preferred language to be same.
       *  */
      deleteCookie(REMIND_LATER_SURVEY_COOKIE);

      const userRedirectUrl = getCookie('teyaseer_login.redirectUrl');
      if (userRedirectUrl) {
        // parse the url and remove the cookie
        setCookie('login.redirectUrl', '');
        // in the userRedirectUrl we have all kind of %20 and etc, so we need to decode it.
        const decodedUrl = decodeURIComponent(userRedirectUrl);
        router.push(decodedUrl, decodedUrl, {
          locale: preferredLanguage,
        });
        return;
      } else {
        router.replace('/dashboard', '/dashboard', {
          locale: preferredLanguage,
        });
      }
    } catch (error) {
      console.error('-------TOKEN GET FAILURE--------', error);
      handleAuthFailure();
    }
  };

  /**
   * Handle authentication if router is ready
   * If query param has error return with auth failure handler
   * If query param has code and state resume the auth process with actual URL
   * Switch to different response type handler
   */
  const handleAuthentication = async () => {
    if (router.isReady) {
      if (router.query.error) {
        console.error('---UAEPassLoginCancelled---', router.query.error);
        const errorMessage = translateByLocaleKey(
          localeRef.current,
          'error_user_cancel_login'
        );
        handleAuthFailure(errorMessage);
        return;
      }

      if (router.query.code && router.query.state && !isUaeInitated()) {
        try {
          initiateUAE(true);

          const response = await FRAuth.resume(APP_URL + router.asPath);
          const { type } = response;
          switch (type) {
            case 'Step':
              handleResponseTypeStep(response);
              break;
            case 'LoginSuccess':
              handleAuthSuccess();
              break;
            case 'LoginFailure':
              handleLoginFailure();
              break;
            default:
              handleAuthFailure();
              break;
          }
        } catch (error) {
          console.error('-------AUTH ERROR--------', error);
          initiateUAE(false);
          handleAuthFailure();
        }
      }
    }
  };

  useEffect(() => {
    localeRef.current =
      (localStorage.getItem('locale') as LocalizationTypes) || AR;
  }, []);

  useEffect(() => {
    handleAuthentication();
  }, [router.query.code, router.query.state]);

  return (
    <Box position="relative" h="100vh">
      <AbsoluteCenter axis="both">
        <CenteredLoader />
      </AbsoluteCenter>
    </Box>
  );
};
export const logOut = async () => {
  const preferredLanguage = getCookie(PREFERRED_LANG_COOKIE) || AR;
  clearAuthenticationSession();
  await FRUser.logout();
  setCookie(PREFERRED_LANG_COOKIE, preferredLanguage);
};

export default Authenticate;
