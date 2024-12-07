import React, { useContext, useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import style from './DashboardProjectCompletionSummary.style';
import CenteredLoader from '../CenteredLoader/CenteredLoader';

import { durationInLocaleString } from '@/helpers/date';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import { getProjectSummary } from '@/services/users';
import FontWeights from '@/styles/themes/brand/fontWeights';
import { ProjectSummaryResponse } from '@/types/response.type';

type DashboardProjectCompletionSummaryProps = {
  triggerLoadingFinished: () => void;
};

const DashboardProjectCompletionSummary = ({
  triggerLoadingFinished,
}: DashboardProjectCompletionSummaryProps) => {
  const [projectSummary, setProjectSummary] =
    useState<ProjectSummaryResponse>();
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();
  const { locale } = useContext(Context);

  useEffect(() => {
    getProjectSummary()
      .then(response => {
        setProjectSummary(response.data.data);
      })
      .catch(() => {
        setProjectSummary(undefined);
      })
      .finally(() => {
        setIsLoading(false);
        triggerLoadingFinished();
      });
  }, []);

  return isLoading ? (
    <CenteredLoader variant="projectCompletionSummary" />
  ) : (
    <Box __css={style.root}>
      <Text fontWeight={FontWeights.medium} mb="10px">
        {t('portal_handover_completion_project_summary_title')}
      </Text>
      <Text fontSize="12px" mb="30px">
        {t('portal_handover_completion_project_summary_description')}
      </Text>
      <Flex flexWrap="wrap" gap="20px 30px">
        <Box className="projectDetails">
          <Text>
            {projectSummary?.durationInMS
              ? durationInLocaleString(projectSummary?.durationInMS, locale)
              : '-'}
          </Text>
          <Text>{t('portal_time_for_completion')}</Text>
        </Box>
        <Box className="projectDetails">
          <Text>{projectSummary?.numberOfTriggeredServices ?? '-'}</Text>
          <Text>{t('portal_teyaseer_services')}</Text>
        </Box>
        <Box className="projectDetails">
          <Text>
            {t('portal_AED')}{' '}
            {projectSummary?.totalFundAmount?.toLocaleString() ?? '-'}
          </Text>
          <Text>{t('portal_total_funds_amount')}</Text>
        </Box>
        <Box className="projectDetails">
          <Text>{projectSummary?.dateOfCompletion ?? '-'}</Text>
          <Text>{t('portal_estimated_completion')}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default DashboardProjectCompletionSummary;
