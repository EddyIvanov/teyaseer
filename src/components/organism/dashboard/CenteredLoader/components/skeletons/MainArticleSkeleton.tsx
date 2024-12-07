import React from 'react';

import {
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from '@chakra-ui/react';

export const MainArticleSkeleton = () => {
  return (
    <Flex
      height={'100vh'}
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: 4, md: 24 }}
      px={{ base: '20px', md: '40px' }}
    >
      <Skeleton
        width={{ base: '100%', md: '75%' }}
        height={{ base: '25%', md: '100%' }}
      />

      <VStack
        width={{ base: '100%', md: '25%' }}
        height={{ base: '75%', md: '100%' }}
        alignItems={'start'}
        justifyContent={'space-evenly'}
        pt={{ base: 4, md: '200px' }}
        pb={{ base: 4, md: 8 }}
      >
        <SkeletonText
          mt="4"
          noOfLines={4}
          spacing="4"
          skeletonHeight="13"
          width={'100%'}
        />
        <SkeletonText
          noOfLines={10}
          spacing="4"
          skeletonHeight="3"
          width={'100%'}
        />
        <SkeletonText
          noOfLines={10}
          spacing="4"
          skeletonHeight="3"
          width={'100%'}
        />
        <SkeletonText
          noOfLines={1}
          spacing="4"
          skeletonHeight="3"
          width={'100%'}
        />
        <SkeletonCircle w="150px" h="50px" />
      </VStack>
    </Flex>
  );
};
