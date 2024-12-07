import React from 'react';

import { HStack, Text } from '@chakra-ui/react';

import { Icon } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';

type TProps = {
  value: number;
};

export const InfoBox = ({ value }: TProps) => {
  const { t } = useTranslation();
  return (
    <HStack
      mt={{ base: '24px' }}
      p={{ base: '16px' }}
      sx={{
        border: `1px solid ${colors.backgroundGrey}`,
        borderRadius: '12px',
        width: '100%',
      }}
    >
      <Icon name={'info'} w="20px" h="20px" />
      <Text fontSize={{ base: 'xSmall', md: 'xSmall' }}>
        {value} {t('meter')} {t('is_minimum_required_square_meter_per_room')}
      </Text>
    </HStack>
  );
};
