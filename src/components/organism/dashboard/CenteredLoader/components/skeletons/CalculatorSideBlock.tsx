import React from 'react';

import { Flex, Skeleton, SkeletonText, Stack } from '@chakra-ui/react';

const CalculatorsideBlock = () => {
  return (
    <Stack gap={'20px'} mb="40px">
      <CalculatorSingleBlock />
      <Skeleton w="100%" h={'1px'} />
      <CalculatorSingleBlock />
    </Stack>
  );
};
const CalculatorSingleBlock = () => {
  return (
    <>
      <SkeletonText
        noOfLines={1}
        w={'170px'}
        maxW={'100%'}
        skeletonHeight={'24px'}
        mb={'16px'}
        mt={'20px'}
      />
      <SkeletonText
        noOfLines={1}
        w={'250px'}
        maxW={'100%'}
        skeletonHeight={'16px'}
      />
      <CalculatorOption />
      <CalculatorOption />
      <CalculatorOption />
    </>
  );
};
const CalculatorOption = () => {
  return (
    <Flex placeItems={'center'} gap="20px">
      <Skeleton height={'86px'} width={'100px'} borderRadius={'10px'} />
      <SkeletonText
        noOfLines={1}
        w={'100%'}
        maxW={'100px'}
        skeletonHeight={'16px'}
      />
    </Flex>
  );
};

export default CalculatorsideBlock;
