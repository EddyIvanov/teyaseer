import { useEffect } from 'react';

import { useRouter } from 'next/router';

const useUnloadUnsaveConsultant = (context: any, redirectUrl: string) => {
  const { serviceRequestId } = context;
  const router = useRouter();

  const handleBeforeUnload = (event: any) => {
    event.preventDefault();
    event.returnValue = '';
  };

  useEffect(() => {
    if (router.isReady && !serviceRequestId) {
      router.push(redirectUrl);
    }
    if (router.isReady && serviceRequestId) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [router.isReady, serviceRequestId]);

  return {};
};

export default useUnloadUnsaveConsultant;
