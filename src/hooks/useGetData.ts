import { useCallback, useState } from 'react';

import { useToast } from '@chakra-ui/react';

import useTranslation from '@/hooks/useTranslate';

type NormalizerFunction<T, R> = (input: R) => T;

interface UseGetDataOptions<T, R> {
  successMessage?: string;
  failedMessage?: string;
  normalizer?: NormalizerFunction<T, R>;
}

export function useGetData<T, R = T>({
  successMessage,
  failedMessage,
  normalizer,
}: UseGetDataOptions<T | undefined, R> = {}) {
  const toast = useToast();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown | undefined>();

  const fetchData = useCallback(async (fetchFunc: () => Promise<R>) => {
    setIsLoading(true);
    try {
      const response = await fetchFunc();
      const normalizedData = normalizer
        ? normalizer(response)
        : (response as unknown as T);
      setData(normalizedData);

      if (successMessage) {
        toast({
          title: successMessage,
          status: 'success',
          isClosable: true,
          position: 'top',
        });
      }
      return response;
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message || t('error.somethingWentWrong'));
      } else {
        setError(t('error.somethingWentWrong'));
      }

      if (failedMessage) {
        toast({
          title: failedMessage,
          status: 'error',
          isClosable: true,
          position: 'top',
        });
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetData = () => {
    setData(undefined);
  };

  return {
    fetchData,
    resetData,
    data,
    error,
    isLoading,
  };
}
