import React from 'react';

import { Box, Button } from '@chakra-ui/react';

import style from './DashboardActivatedService.style';
import { StageData } from '../Stages/Stage.type';
import ServiceHeaderAndActivityLog from '../Stages/components/ServiceHeaderAndActivityLog/ServiceHeaderAndActivityLog';

import { Icon, Link } from '@/components';
import ServiceStatusBadge from '@/components/molecules/ServiceStatusBadge/ServiceStatusBadge';
import useTranslation from '@/hooks/useTranslate';

type DashboardActivatedServiceProps = {
  activatedServiceData: StageData;
  currentOptionsIndex: number;
};

const DashboardActivatedService = ({
  activatedServiceData,
  currentOptionsIndex,
}: DashboardActivatedServiceProps) => {
  const { t } = useTranslation();
  const { slug } = activatedServiceData;
  const currentOption =
    activatedServiceData?.optionsCollection?.items[currentOptionsIndex];

  const instance =
    currentOption?.serviceRequestsCollection.items[0].instances[0];

  if (instance) {
    return (
      <Box sx={style.root}>
        <ServiceHeaderAndActivityLog
          title={currentOption?.title}
          highlightText={t('portal_service_progress_tracker')}
          description={currentOption?.description}
          serviceStatus={<ServiceStatusBadge status="active" />}
          activatedServiceLog={instance}
          activityLogTitle={t('portal_service_request_activity_log')}
        />
        <Button
          as={Link}
          href={`${slug}?scrollToInstance=${instance.id}`}
          rightIcon={<Icon name="arrow" />}
          mt={'28px'}
        >
          {t('portal_view_service')}
        </Button>
      </Box>
    );
  }
};

export default DashboardActivatedService;
