import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import style from './ServiceStatusBadge.style';

import { Icon } from '@/components';
import useTranslation from '@/hooks/useTranslate';

type ServiceStatusBadgeProps = {
  status: 'active' | 'completed' | 'deactivated';
};

const ServiceStatusBadge = ({ status = 'active' }: ServiceStatusBadgeProps) => {
  const { t } = useTranslation();

  const statusText = (() => {
    if (status === 'deactivated') {
      return t('portal_deactivated');
    } else if (status === 'completed') {
      return t('portal_concluded');
    } else {
      return t('portal_active');
    }
  })();

  const iconName = (() => {
    if (status === 'deactivated') {
      return 'exclamationMark';
    } else {
      return 'tickMark';
    }
  })();

  const modifier = (() => {
    if (status === 'deactivated') {
      return style.deactivated;
    } else if (status === 'completed') {
      return style.completed;
    }
  })();

  return (
    <Flex sx={{ ...style.serviceStatusBadge, ...modifier }}>
      <Icon name={iconName} height="21px" width="20px" />
      <Text>{statusText}</Text>
    </Flex>
  );
};

export default ServiceStatusBadge;
