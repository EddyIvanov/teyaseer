import React, { useContext } from 'react';

import { Box, HStack, useBreakpointValue, VStack } from '@chakra-ui/react';
import { IDataOptionsCollectionItem } from 'teyaseer-calculator-engine';

import { Note } from '@/components/atoms/Note/Note';
import Text from '@/components/atoms/Text';
import { LevelOfFinishingBar } from '@/components/organism/VillaCalculatorSummary/LevelOfFinishingBar/LevelOfFinishingBar';
import { renderUsersBudget } from '@/components/organism/VillaCalculatorSummary/components/EstimateTotalLoggedIn/utils';
import {
  choiceMapIndexLabel,
  choiceMapLimited,
} from '@/components/organism/VillaCalculatorSummary/constants';
import { parseEstimatedCost } from '@/components/organism/VillaCalculatorSummary/parseEsitmatedCost';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import colors from '@/styles/themes/brand/colors';

type TProps = {
  basic: number;
  midLevel: number;
  highLevel: number;
  selectedLevel: IDataOptionsCollectionItem | null;
  acceptedLoanAmount: number;
  additionalFunds: number;
  title?: string;
};

export const EstimateTotalLoggedIn = ({
  basic,
  midLevel,
  highLevel,
  selectedLevel,
  acceptedLoanAmount,
  additionalFunds,
  title,
}: TProps) => {
  const { t } = useTranslation();
  const { locale } = useContext(Context);

  const isMobile = useBreakpointValue(
    { base: true, xl: false },
    {
      fallback: 'base',
    }
  );

  const {
    result: budgetDetails,
    budgetIndex,
    isCostHigher,
  } = renderUsersBudget(
    acceptedLoanAmount + additionalFunds,
    [
      { level: 'basic', value: basic },
      { level: 'mid', value: midLevel },
      { level: 'high', value: highLevel },
    ],
    selectedLevel?.value
  );

  const isLimitedFinishingLevel = budgetDetails.length === 2;

  return (
    <Box>
      {title && (
        <Text
          fontSize={'2rem'}
          fontWeight={800}
          textTransform="capitalize"
          whiteSpace="nowrap"
        >
          {t(title)}:
        </Text>
      )}
      <Box mt={32} />
      <VStack>
        {selectedLevel && (
          <LevelOfFinishingBar
            isLoggedIn
            selectedLevel={budgetIndex.toString()}
            isLimitedFinishingLevel={isLimitedFinishingLevel}
          />
        )}
        <HStack
          justifyContent={isLimitedFinishingLevel ? 'center' : 'space-between'}
          sx={{ width: '100%', position: 'relative' }}
          px={{ base: 4, md: 24 }}
        >
          {budgetDetails.map(({ level, value }) => (
            <Box
              key={level}
              sx={{
                ...(level === 'yourBudget' && {
                  position: 'absolute',
                  top: ['-65px', '-80px'],
                  transform: 'translateX(-50%)',
                  left: isLimitedFinishingLevel
                    ? choiceMapLimited[budgetIndex]
                    : choiceMapIndexLabel[locale][budgetIndex],
                }),
              }}
            >
              <Text
                key={level}
                fontSize={{ base: 'xSmall', sm: 'small' }}
                textTransform="capitalize"
                whiteSpace="nowrap"
                textAlign={'center'}
                fontWeight={
                  selectedLevel?.value === level ? 'semibold' : 'normal'
                }
                color={
                  selectedLevel?.value === level || level === 'yourBudget'
                    ? colors.text.dark
                    : colors.text.gray
                }
              >
                {t(`${level}_finishing`)}
              </Text>
              <Text
                fontSize={{ base: 'xSmall', sm: 'small' }}
                mt={{ md: '8px' }}
                fontWeight={'semibold'}
                whiteSpace={'nowrap'}
                color={
                  selectedLevel?.value === level || level === 'yourBudget'
                    ? colors.text.dark
                    : colors.text.gray
                }
              >
                {parseEstimatedCost(value, t, isMobile)}
              </Text>
            </Box>
          ))}
        </HStack>

        {isCostHigher && <Note note={'cost_is_higher'} />}
      </VStack>
    </Box>
  );
};
