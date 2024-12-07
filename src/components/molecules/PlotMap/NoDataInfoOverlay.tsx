import React from 'react';

import { Box, Text } from '@chakra-ui/react';

import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';

export const NoDataInfoOverlay = () => {
  const { t } = useTranslation();
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor={colors.semiTransparentOffWhite}
      zIndex={9}
      textAlign={'center'}
      p={{ base: '12px', md: '40px' }}
    >
      <Text fontSize={'small'}>{t('plot_info_no_data')}</Text>
    </Box>
  );
};
