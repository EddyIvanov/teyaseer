import React from 'react';

import { Flex, Skeleton, SkeletonText, Spacer, Stack } from '@chakra-ui/react';

const DocumentListSkeleton = () => {
  return (
    <Stack py={'5px'} px={'10px'}>
      <DocRowSkeleton isOpen={true} />
      <Skeleton height={'1px'} />
      <DocRowSkeleton isOpen={false} />
      <Skeleton height={'1px'} />
      <DocRowSkeleton isOpen={false} />
    </Stack>
  );
};

const DocRowSkeleton = ({ isOpen = false }: { isOpen: boolean }) => {
  return (
    <Stack>
      <Flex py="20px" px={'10px'} placeItems="center">
        <SkeletonText noOfLines={1} w={'300px'} skeletonHeight="3" />
      </Flex>
      {isOpen && (
        <>
          <Skeleton height={'1px'} />
          <Flex gap="10px" px={'15px'} py={'10px'}>
            <Skeleton height={'35px'} width={'35px'} />
            <Stack w="100px" alignSelf="center">
              <SkeletonText noOfLines={1} skeletonHeight="3" />
              <SkeletonText noOfLines={1} skeletonHeight="3" />
            </Stack>
            <Spacer />
            <SkeletonText width={'100px'} noOfLines={1} skeletonHeight="3" />
          </Flex>
          <Skeleton height={'1px'} />
          <Flex gap="10px" px={'15px'} py={'10px'}>
            <Skeleton height={'35px'} width={'35px'} />
            <Stack w="100px" alignSelf="center">
              <SkeletonText noOfLines={1} skeletonHeight="3" />
              <SkeletonText noOfLines={1} skeletonHeight="3" />
            </Stack>
            <Spacer />
            <SkeletonText width={'100px'} noOfLines={1} skeletonHeight="3" />
          </Flex>
        </>
      )}
    </Stack>
  );
};

export default DocumentListSkeleton;
