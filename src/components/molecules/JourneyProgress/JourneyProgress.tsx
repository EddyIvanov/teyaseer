import { useContext, useEffect, useMemo } from 'react';

import { HStack, Text, VStack } from '@chakra-ui/react';

import style from './JourneyProgress.style';

import { CircularProgress } from '@/components';
import { TProjectCompletionRes } from '@/components/molecules/JourneyProgress/JourneyProgress.types';
import { formatDate } from '@/helpers/date';
import { useGetData } from '@/hooks/useGetData';
import useTranslate from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import { getProjectCompletionData } from '@/services/users';

const JourneyProgress = () => {
  const { t } = useTranslate();
  const { locale } = useContext(Context);
  const { fetchData, data, isLoading } = useGetData<TProjectCompletionRes>();

  useEffect(() => {
    fetchData(getProjectCompletionData);
  }, []);

  const estimateDate = useMemo(() => {
    return data?.estimatedEndDate
      ? formatDate(data?.estimatedEndDate, 'd MMM yyyy', locale)
      : '';
  }, [data?.estimatedEndDate, locale]);

  return (
    <HStack sx={style.root}>
      <VStack sx={style.textWrapper}>
        <Text sx={style.title}>{t('journey_progress_bar')}</Text>
        {data?.estimatedEndDate && (
          <Text
            variant={'semiTransparent'}
            fontSize={'small'}
            fontWeight={'medium'}
          >
            {`${t('journey_progress_estimated_completion')} ${estimateDate}`}
          </Text>
        )}
      </VStack>
      <VStack>
        <CircularProgress
          isIndeterminate={isLoading}
          value={data?.projectPercentage ?? 0}
        />
      </VStack>
    </HStack>
  );
};

export default JourneyProgress;
