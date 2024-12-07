import React from 'react';

import { Box, HStack, useBreakpointValue, VStack } from '@chakra-ui/react';
import { IDataOptionsCollectionItem } from 'teyaseer-calculator-engine';

import Text from '@/components/atoms/Text';
import { LevelOfFinishingBar } from '@/components/organism/VillaCalculatorSummary/LevelOfFinishingBar/LevelOfFinishingBar';
import { parseEstimatedCost } from '@/components/organism/VillaCalculatorSummary/parseEsitmatedCost';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';

const itemStyle = {
  position: 'absolute',
  top: '55px',
  left: '50%',
  transform: 'translateX(-50%)',
};

type TProps = {
  basic?: number;
  midLevel?: number;
  highLevel?: number;
  selectedLevel: IDataOptionsCollectionItem | null;
};

export const EstimateTotalLoggedOut = ({
  basic,
  midLevel,
  highLevel,
  selectedLevel,
}: TProps) => {
  const { t } = useTranslation();

  const isMobile = useBreakpointValue(
    { base: true, xl: false },
    {
      fallback: 'base',
    }
  );

  if (
    typeof basic === 'undefined' ||
    typeof midLevel === 'undefined' ||
    typeof highLevel === 'undefined'
  )
    return null;

  return (
    <VStack>
      <HStack
        justifyContent={'space-between'}
        w={'100%'}
        px={{
          base: '20px',
          md: 0,
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Text
            fontSize={{ base: 'xSmall', sm: 'small' }}
            textTransform={'capitalize'}
            whiteSpace={'nowrap'}
            fontWeight={
              selectedLevel?.value === 'basic' ? 'semibold' : 'normal'
            }
            color={
              selectedLevel?.value === 'basic'
                ? colors.text.dark
                : colors.text.gray
            }
          >
            {t('basic_finishing')}
          </Text>
          <Text
            fontWeight={'semibold'}
            textTransform={'capitalize'}
            whiteSpace={'nowrap'}
            color={
              selectedLevel?.value === 'basic'
                ? colors.text.dark
                : colors.text.gray
            }
            sx={itemStyle}
          >
            {parseEstimatedCost(basic, t, isMobile)}
          </Text>
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Text
            whiteSpace={'nowrap'}
            fontSize={{ base: 'xSmall', sm: 'small' }}
            textTransform={'capitalize'}
            fontWeight={selectedLevel?.value === 'mid' ? 'semibold' : 'normal'}
            color={
              selectedLevel?.value === 'mid'
                ? colors.text.dark
                : colors.text.gray
            }
          >
            {t('mid_finishing')}
          </Text>
          <Text
            fontWeight={'semibold'}
            textTransform={'capitalize'}
            whiteSpace={'nowrap'}
            color={
              selectedLevel?.value === 'mid'
                ? colors.text.dark
                : colors.text.gray
            }
            sx={itemStyle}
          >
            {parseEstimatedCost(midLevel, t, isMobile)}
          </Text>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <Text
            whiteSpace={'nowrap'}
            fontSize={{ base: 'xSmall', sm: 'small' }}
            textTransform={'capitalize'}
            fontWeight={selectedLevel?.value === 'high' ? 'semibold' : 'normal'}
            color={
              selectedLevel?.value === 'high'
                ? colors.text.dark
                : colors.text.gray
            }
          >
            {t('high_finishing')}
          </Text>
          <Text
            fontWeight={'semibold'}
            textTransform={'capitalize'}
            whiteSpace={'nowrap'}
            color={
              selectedLevel?.value === 'high'
                ? colors.text.dark
                : colors.text.gray
            }
            sx={itemStyle}
          >
            {parseEstimatedCost(highLevel, t, isMobile)}
          </Text>
        </Box>
      </HStack>
      {selectedLevel?.value !== undefined && selectedLevel?.value !== null && (
        <LevelOfFinishingBar
          selectedLevel={selectedLevel.value?.toLowerCase()}
        />
      )}
    </VStack>
  );
};
