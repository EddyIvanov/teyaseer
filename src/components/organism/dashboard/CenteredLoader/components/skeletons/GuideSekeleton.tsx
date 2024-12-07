import React from 'react';

import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react';

const GuideSekeleton = () => {
  return (
    <Stack p={'20px'} gap={'20px'}>
      <SkeletonText noOfLines={1} skeletonHeight="5" w="70px" />
      <SkeletonText noOfLines={3} skeletonHeight="3" />
      <Skeleton height={'1px'} />
      <SkeletonText noOfLines={2} skeletonHeight="3" />
      <Skeleton height={'1px'} />
      <SkeletonText noOfLines={3} skeletonHeight="3" />
    </Stack>
  );
};

export default GuideSekeleton;
