import React from 'react';

import { Box, HStack, List, ListItem, VStack } from '@chakra-ui/react';
import {
  IFormattedCostBreakdownItem,
  useCalculator,
} from 'teyaseer-calculator-engine';

import styles from './VillaCalculatorBreakDown.styled';
import Text from '../../../../atoms/Text';

import PieChart from '@/components/atoms/PieChart/PieChart';
import { formatNumberWithCommas } from '@/helpers/formatNumberWithCommas';
import useTranslation from '@/hooks/useTranslate';

type TProps = {
  data?: Array<IFormattedCostBreakdownItem>;
};

export const VillaCalculatorBreakDown = ({ data }: TProps) => {
  const { t } = useTranslation();
  const style = styles;

  const { monthlyBills, estimatedCost } = useCalculator();

  return (
    <>
      <Box sx={style.wrapper}>
        <Text
          fontSize={'2rem'}
          fontWeight={'semibold'}
          textTransform={'capitalize'}
        >
          {t('cost_breakdown')}
        </Text>
      </Box>
      {data && (
        <PieChart data={data} total={estimatedCost}>
          <VStack
            mt={{ base: '32px' }}
            justifyContent={'space-between'}
            alignItems={'start'}
            gap={5}
          >
            <Text fontWeight={{ base: 'medium', lg: 'semibold' }}>
              {t('estimated_monthly_bills')}
            </Text>
            <List spacing={8} w={'100%'}>
              {monthlyBills?.map(({ title, result }) => (
                <ListItem key={title}>
                  <HStack
                    justifyContent={'space-between'}
                    sx={{ width: '100%' }}
                  >
                    <Text>{title}</Text>
                    <Text fontWeight={'semibold'}>
                      {formatNumberWithCommas(result)} {t('aed_currency')}
                    </Text>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </VStack>
        </PieChart>
      )}
    </>
  );
};
