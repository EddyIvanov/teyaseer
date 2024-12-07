import { useEffect } from 'react';

import { AbsoluteCenter, Box } from '@chakra-ui/react';
import { FRAuth } from '@forgerock/javascript-sdk/src/index';
import { useRouter } from 'next/navigation';

import { logOut } from '../authenticate';

import CenteredLoader from '@/components/organism/dashboard/CenteredLoader/CenteredLoader';
import { useUAEPassSession } from '@/hooks/useUAEPassSession';

/**
 * Initiate UAEPass authentication process
 * Redirect to dashboard if user already authenticated [Handled in middleware]
 */
const Login = () => {
  const router = useRouter();
  const { initiateUAE } = useUAEPassSession();
  /**
   * Initiate UAEPass authentication
   * Redirect to UAEPass authenticate page with required config
   */
  const initiateLogin = async () => {
    initiateUAE(false);

    try {
      //UAE pass login step 0
      const uaePassLoginStepZero: any = await FRAuth.start();
      //UAE pass login step 1
      const uaePassLoginStepOne: any = await FRAuth.next(uaePassLoginStepZero);
      FRAuth.redirect(uaePassLoginStepOne);
    } catch (err) {
      console.error(err, '--UAE pass login failed--');
      logOut();
      router.push('/');
    }
  };

  useEffect(() => {
    initiateLogin();
  }, []);
  return (
    <Box position="relative" h="100vh">
      <AbsoluteCenter axis="both">
        <CenteredLoader />
      </AbsoluteCenter>
    </Box>
  );
};

export default Login;
