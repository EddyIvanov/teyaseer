import React from 'react';

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import {
  choiceMapIndex,
  choiceMapLimited,
} from '@/components/organism/VillaCalculatorSummary/constants';
import colors from '@/styles/themes/brand/colors';

type TProps = {
  selectedLevel: string;
  isLimitedFinishingLevel?: boolean;
  isLoggedIn?: boolean;
};

export const LevelOfFinishingBar = ({
  selectedLevel,
  isLoggedIn = false,
  isLimitedFinishingLevel,
}: TProps) => {
  const router = useRouter();
  const { locale = 'ar' } = router;

  const choiceMap: { [key: string]: string } = {
    basic: '10%',
    mid: '50%',
    high: '90%',
  };

  // had to do this because of the `_rtl` has no effect on the `after` pseudo element
  const isArabic = locale === 'ar';

  return (
    <Box
      bg={colors.backgroundGrey}
      w={'100%'}
      p={'6px'}
      borderRadius={'10rem'}
      mt={2}
      mb={3}
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          top: 0,
          left: 0,
          position: 'absolute',
          height: '100%',
          width: isLoggedIn
            ? isLimitedFinishingLevel
              ? choiceMapLimited[selectedLevel]
              : choiceMapIndex[selectedLevel]
            : choiceMap[selectedLevel],
          background: colors.borderSteelGray,
          borderRadiusLeft: '10rem',
          borderTopLeftRadius: '10rem',
          borderBottomLeftRadius: '10rem',
          _rtl: {
            right: 0,
            borderTopRightRadius: '10rem',
            borderBottomRightRadius: '10rem',
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
          },
          ...(isLoggedIn && {
            _after: {
              content: '""',
              position: 'absolute',
              right: 0,
              top: '-17%',
              width: '2px',
              height: '140%',
              background: '#000',
              ...(isArabic && {
                left: 0,
                right: 'unset',
              }),
            },
          }),
        }}
      />
    </Box>
  );
};
