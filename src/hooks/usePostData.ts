import { useCallback, useState } from 'react';

import { useToast } from '@chakra-ui/react';

export function usePostData<T extends Record<string, unknown>, Response>({
  successMessage,
  failedMessage,
}: {
  successMessage?: string;
  failedMessage?: string;
} = {}) {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>();

  const run = useCallback(
    async (asyncF: (passedArgs?: T) => Promise<Response>, passedArgs?: T) => {
      setIsLoading(true);
      try {
        const res = await asyncF(passedArgs);
        if (successMessage) {
          toast({
            title: successMessage,
            status: 'success',
            isClosable: true,
            position: 'top',
          });
        }

        return res;
      } catch (err) {
        setError(err);
        if (failedMessage) {
          toast({
            title: failedMessage,
            status: 'error',
            isClosable: true,
            position: 'top',
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    run,
    error,
    isLoading,
  };
}
