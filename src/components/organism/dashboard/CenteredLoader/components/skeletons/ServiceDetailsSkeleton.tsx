import React from 'react';

import {
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Stack,
} from '@chakra-ui/react';

const ServieDetailsSkeleton = () => {
  return (
    <Stack px={{ base: '20px', md: '40px' }} py={{ base: '10px', md: '20px' }}>
      <Skeleton height="300px" />

      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="3" />

      <Skeleton height="1px" my={'20px'} />
      <Flex gap="10px" w="100%" placeItems="center" my="20px">
        <SkeletonText noOfLines={1} skeletonHeight="4" w={'300px'} />
        <SkeletonText noOfLines={1} skeletonHeight="3" w={'200px'} />
      </Flex>

      <Skeleton height="1px" my={'20px'} />
      <ServiceDetailsSectionSkeleton />
      <Skeleton height="1px" my={'20px'} />
      <ServiceDetailsSectionSkeleton />
      <Skeleton height="1px" my={'20px'} />
      <ServiceDetailsSectionSkeleton />
    </Stack>
  );
};

const ServiceDetailsSectionSkeleton = () => {
  return (
    <>
      <SkeletonText noOfLines={1} skeletonHeight="3" w={'50px'} />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="3"
        maxW={'200px'}
      />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="3"
        maxW={'350px'}
      />

      <SkeletonText noOfLines={3} spacing="4" skeletonHeight="3" mt={'10px'} />
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        mt={'20px'}
        gap={'10px'}
        placeItems={{ base: 'start', md: 'center' }}
      >
        <SkeletonText
          noOfLines={1}
          spacing="4"
          skeletonHeight="3"
          w="100%"
          maxW={'350px'}
        />
        <Spacer />
        <SkeletonCircle w="150px" h="50px" />
      </Flex>
    </>
  );
};
export default ServieDetailsSkeleton;
