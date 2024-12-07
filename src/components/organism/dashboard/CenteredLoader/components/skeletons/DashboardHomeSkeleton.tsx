import React from 'react';

import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';

import borders from '@/styles/themes/brand/borders';

const DashboardHomeSkeleton = () => {
  return (
    <Stack maxW={'950px'}>
      <SkeletonText
        noOfLines={1}
        w={'400px'}
        maxW={'100%'}
        skeletonHeight={'5'}
      />
      <Stack mt="20px" backgroundColor={'#fff'} borderRadius={borders.normal}>
        <Skeleton height="315px" />
        <Stack px={'48px'} pt={'32px'} pb={'48px'}>
          <SkeletonText
            noOfLines={1}
            w={'400px'}
            maxW={'100%'}
            skeletonHeight={'5'}
            mb={'32px'}
          />
          <SkeletonText noOfLines={2} skeletonHeight={'2'} mb={'48px'} />
          <SkeletonCircle w="150px" h="50px" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DashboardHomeSkeleton;
