import React, { ReactNode } from 'react';

import { Flex, HStack, VStack } from '@chakra-ui/react';

import Text from '../../../atoms/Text';

import { Icon } from '@/components';
import { TIconType } from '@/components/organism/VillaCalculatorSummary/villaSummary.types';

const iconsMap: { [key in TIconType]: ReactNode } = {
  money: <Icon name="money" w="24px" h="24px" />,
  plus: <Icon name="plus" w="24px" h="24px" />,
  expandable: <Icon name="expandable" w="24px" h="24px" />,
  nonExpandable: <Icon name="nonExpandable" w="24px" h="24px" />,
  zoomOutArrow: <Icon name="zoomOutArrow" w="24px" h="24px" />,
};

type TProps = {
  value: string;
  icon: TIconType;
  subTitle?: string;
};

export const SummaryCTA = ({ subTitle, value, icon }: TProps) => {
  return (
    <Flex
      alignItems={'center'}
      sx={{
        maxWidth: { md: '321px' },
        background: '#fff',
        padding: '12px 20px',
        borderRadius: '50px',
        boxShadow: '0px 12px 24px 0px rgba(0, 0, 0, 0.10)',
        border: '0.5px solid rgba(0, 0, 0, 0.15)',
        filter:
          'dropShadow(0px 1px 16px rgba(0, 0, 0, 0.04));dropShadow(0px 1px 16px rgba(0, 0, 0, 0.04))',
      }}
    >
      <HStack
        sx={{
          background: 'rgba(194, 155, 64, 0.4)',
          padding: '13px',
          borderRadius: '50%',
        }}
      >
        {iconsMap[icon]}
      </HStack>
      <VStack justifyContent={'space-between'} sx={{ marginLeft: '11px' }}>
        {subTitle && (
          <Text color={'#727272'} fontSize={'small'}>
            {subTitle}
          </Text>
        )}
        <Text fontSize={'xMedium'} fontWeight={'semibold'}>
          {value}
        </Text>
      </VStack>
    </Flex>
  );
};
