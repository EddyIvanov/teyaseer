import React, { ReactNode } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import style from './ServiceHeaderAndActivityLog.style';
import { ServiceRequestsInstances } from '../Service/Service.type';
import ServiceStepDetails from '../ServiceStepDetails/ServiceStepDetails';

import { Icon } from '@/components';
import useTranslation from '@/hooks/useTranslate';

type ServiceHeaderAndActivityLogProps = {
  highlightText: string;
  title: string;
  description: string;
  serviceStatus: ReactNode;
  activityLogTitle: string;
  activatedServiceLog?: ServiceRequestsInstances;
  classname?: string;
  maxUses?: number;
  daysItTakeForService?: number;
  showMaxUses?: boolean;
  isProjectCompleted?: boolean;
};

const ServiceHeaderAndActivityLog = ({
  highlightText,
  title,
  description,
  serviceStatus,
  activityLogTitle,
  activatedServiceLog,
  classname,
  maxUses,
  daysItTakeForService,
  showMaxUses = false,
  isProjectCompleted,
}: ServiceHeaderAndActivityLogProps) => {
  const { t } = useTranslation();

  const shoulShowActivationDate =
    !!daysItTakeForService && daysItTakeForService > 0;

  const shouldShowActivationStatus =
    showMaxUses && (!!maxUses || shoulShowActivationDate);

  return (
    <Flex sx={style.root} {...(classname && { className: classname })}>
      <Box>
        <Text className="serviceOption">{highlightText}</Text>
        {shouldShowActivationStatus && (
          <Flex className="activationStatus">
            {!!maxUses && (
              <Flex className="activationWrapper">
                <Flex className="activationBadge">
                  <Text>{maxUses ?? 0}x</Text>
                </Flex>
                <Text>{t('portal_service_activations')}</Text>
              </Flex>
            )}
            {shoulShowActivationDate && (
              <Flex className="activationWrapper">
                <Box className="activationDaysClock">
                  <Icon name="clock" height="14px" width="14px" />
                </Box>
                <Text>
                  {t('portal_service_takes_days').replace(
                    '{{daysItTakeForService}}',
                    (daysItTakeForService ?? 0).toString()
                  )}
                </Text>
              </Flex>
            )}
          </Flex>
        )}
      </Box>
      <Flex className="serviceStatus">
        <Text fontWeight={'700'} mt="10px">
          {title}
        </Text>
        {serviceStatus}
      </Flex>
      <Text>{description}</Text>
      {!!activatedServiceLog?.serviceRequestFlowCollection?.items && (
        <ServiceStepDetails
          title={activityLogTitle}
          serviceRequestFlowCollection={
            activatedServiceLog?.serviceRequestFlowCollection?.items
          }
          progress={activatedServiceLog?.maxPercentageOfCompletedSteps}
          isProjectCompleted={isProjectCompleted}
        />
      )}
    </Flex>
  );
};

export default ServiceHeaderAndActivityLog;
