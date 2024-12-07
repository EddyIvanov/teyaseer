import React from 'react';

import { HStack, Text, VStack } from '@chakra-ui/react';

type TProps = {
  title: string;
  details: Array<{ title: string; value: string | number }>;
};

export const LocationDetails = ({ title, details }: TProps) => {
  return (
    <VStack>
      <VStack alignItems={'start'}>
        <Text as={'h4'} sx={{ mb: '0 !important' }}>
          {title}
        </Text>
        {details.map(({ title, value }) => (
          <HStack mt={1} key={title} width={'100%'}>
            <Text as={'h6'}>{title}:</Text>
            <Text as={'h6'} className={'font-normal'}>
              {value}
            </Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
