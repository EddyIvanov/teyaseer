import React, { ReactElement } from 'react';

import { Flex, Text, Icon } from '@chakra-ui/react';

import * as Icons from '@/components/atoms/Icon/const';
import SimpleHeaderLayout from '@/components/layouts/SimpleHeaderLayout';

export default function IconDisplay() {
  return (
    <Flex
      position="relative"
      minH="100vh"
      h="100%"
      top="70px"
      flexWrap="wrap"
      bg="red.200"
      justify="center"
      gap="24px"
      p="20px"
    >
      {Object.entries(Icons).map(([iconName, Svg]) => {
        return (
          <Flex
            key={iconName}
            minW="100px"
            h="100px"
            direction="column"
            textAlign="center"
            alignItems="center"
            gap="12px"
          >
            <Icon as={Svg} w="50%" h="50%" />
            <Text>{iconName}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
}

IconDisplay.getLayout = function getLayout(page: ReactElement) {
  return <SimpleHeaderLayout>{page}</SimpleHeaderLayout>;
};
