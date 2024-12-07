import { useEffect } from 'react';

import { AbsoluteCenter, Box, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { logOut } from '../authenticate';

import CenteredLoader from '@/components/organism/dashboard/CenteredLoader/CenteredLoader';
import AppRoutes from '@/constants/AppRoutes';
import { APP_URL, LOGOUT_URL } from '@/constants/forgrock.constants';
import { setCookie } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import { AR, EN } from '@/types/localization.type';

/**
 * Single entrypoint of logout
 */
const Logout = () => {
  const router = useRouter();
  const { locale = AR } = router;
  const { redirectLink } = router.query;
  const { t } = useTranslation();
  const toast = useToast();
  /**
   * Handle logout
   * Logout from Forgerock user
   * Clear user authentication session
   */
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('----LOGOUT ERROR-----', error);
    } finally {
      if (redirectLink) {
        toast({
          title: t('session_time_out_please_login_again'),
          status: 'error',
          isClosable: true,
          position: 'top',
        });
        // set cookie for redirection back with 3 minute expiry
        setCookie('teyaseer_login.redirectUrl', redirectLink as string, 3 * 60);
        router.push(AppRoutes.Signup.Customer, AppRoutes.Signup.Customer, {
          locale: locale,
        });
      } else {
        const url = `${LOGOUT_URL}${APP_URL}${locale == EN ? '/en' : ''}`;
        window.location.href = url;
      }
    }
  };

  useEffect(() => {
    if (router.isReady) {
      handleLogout();
    }
  }, [router.isReady, redirectLink]);
  return (
    <Box position="relative" h="100vh">
      <AbsoluteCenter axis="both">
        <CenteredLoader />
      </AbsoluteCenter>
    </Box>
  );
};

export default Logout;
