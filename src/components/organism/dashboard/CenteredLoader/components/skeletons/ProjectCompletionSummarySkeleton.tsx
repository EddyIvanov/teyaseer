import React from 'react';

import { Box, Flex, SkeletonText } from '@chakra-ui/react';

const ProjectCompletionSummarySkeleton = () => {
  return (
    <Box p={'20px'} gap={'20px'}>
      <SkeletonText noOfLines={2} skeletonHeight="5" spacing="5" />
      <Flex gap="20px" flexWrap="wrap" mt="30px">
        <SkeletonText
          width="150px"
          noOfLines={2}
          skeletonHeight="5"
          spacing="5"
        />
        <SkeletonText
          width="150px"
          noOfLines={2}
          skeletonHeight="5"
          spacing="5"
        />
        <SkeletonText
          width="150px"
          noOfLines={2}
          skeletonHeight="5"
          spacing="5"
        />
        <SkeletonText
          width="150px"
          noOfLines={2}
          skeletonHeight="5"
          spacing="5"
        />
      </Flex>
    </Box>
  );
};

export default ProjectCompletionSummarySkeleton;
