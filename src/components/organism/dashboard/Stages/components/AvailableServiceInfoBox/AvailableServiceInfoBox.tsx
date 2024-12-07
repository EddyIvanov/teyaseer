import React from 'react';

import { Box, Text } from '@chakra-ui/react';

import style from './AvailableServiceInfoBox.styles';
import { IAvailableServiceInfoBoxProps } from './AvailableServiceInfoBox.types';

import { Icon } from '@/components';
import useTranslation from '@/hooks/useTranslate';

const AvailableServiceInfoBox = ({
  numberOfServices,
}: IAvailableServiceInfoBoxProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={style.root}>
      <Icon name="bulb" height={'16px'} width={'11px'}></Icon>
      <Text sx={style.label}>
        {`${numberOfServices} ${t('portal_teyaseer_service_available')}`}
      </Text>
    </Box>
  );
};

export default AvailableServiceInfoBox;
