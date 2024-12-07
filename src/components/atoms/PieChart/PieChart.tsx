import React, { ReactNode, useEffect, useState } from 'react';

import { Box, Flex, HStack, List, ListItem, VStack } from '@chakra-ui/react';
import { IFormattedCostBreakdownItem } from 'teyaseer-calculator-engine';

import {
  generateGradient,
  pieChartColorPalette,
} from '@/components/atoms/PieChart/pieChartHelpers';
import Text from '@/components/atoms/Text/Text';
import { formatNumberWithCommas } from '@/helpers/formatNumberWithCommas';
import useTranslation from '@/hooks/useTranslate';

type TProps = {
  data: Array<IFormattedCostBreakdownItem>;
  children?: ReactNode;
  total: number;
};

const PieChart = ({ data, children, total }: TProps) => {
  const { t } = useTranslation();
  const [gradient, setGradient] = useState('');

  useEffect(() => {
    const { gradient } = generateGradient(data, total);

    setGradient(gradient);
  }, [data]);

  return (
    <VStack>
      <Flex
        direction={{ base: 'column', '3xl': 'row' }}
        justifyContent={{ base: 'center', md: 'start' }}
        alignItems={{ base: 'center', xl: 'start' }}
        gap={{ base: '40px' }}
        sx={{
          width: { base: '100%', md: '70%', lg: '100%' },
        }}
      >
        <Box
          sx={{ background: gradient, minWidth: '25rem' }}
          position="relative"
          width="250px"
          height="250px"
          borderRadius="50%"
        >
          <Box
            position="absolute"
            top="10%"
            left="10%"
            width="80%"
            height="80%"
            borderRadius="50%"
            bgColor="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box fontSize="lg" fontWeight="bold">
              <Text
                fontSize={'xMedium'}
                textAlign={'center'}
                fontWeight={'bold'}
              >
                {formatNumberWithCommas(total)} <br /> {t('aed_currency')}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box w={'100%'} alignSelf={{ base: 'center' }} suppressHydrationWarning>
          <List spacing={8} suppressHydrationWarning>
            {data?.map(({ title, result }, i) => (
              <ListItem key={title}>
                <HStack justifyContent={'space-between'} w={'100%'} gap={4}>
                  <HStack>
                    <Box
                      sx={{
                        borderRadius: '100%',
                        width: '0.8rem',
                        height: '0.8rem',
                        background: pieChartColorPalette[i],
                        mr: 1,
                      }}
                    />
                    <Text fontSize={{ base: 'small', md: 'normal' }}>
                      {title}
                    </Text>
                  </HStack>
                  <Text
                    fontSize={{ base: 'small', md: 'normal' }}
                    fontWeight={'semibold'}
                  >
                    {formatNumberWithCommas(result)} {t('aed_currency')}
                  </Text>
                </HStack>
              </ListItem>
            ))}
          </List>
          {children}
        </Box>
      </Flex>
    </VStack>
  );
};

export default PieChart;
