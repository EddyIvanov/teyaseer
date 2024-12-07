import React from 'react';

import {
  Flex,
  HStack,
  Show,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Stack,
} from '@chakra-ui/react';

import borders from '@/styles/themes/brand/borders';

const MyProfileSkeleton = () => {
  return (
    <HStack gap={'20px'} placeItems="flex-start">
      <Stack gap={8} flex={1}>
        <MyDetails />
        <PlotDetails />
        <Show below={'xl'}>
          <HelpSubmissionForm />
        </Show>
        <Consultant />
        <VillaDetails />
      </Stack>
      <Show above={'xl'}>
        <Stack gap={8}>
          <ProjectInformation />
          <HelpSubmissionForm />
        </Stack>
      </Show>
    </HStack>
  );
};
const MyDetails = () => {
  return (
    <Stack
      minW="100%"
      backgroundColor={'#fff'}
      borderRadius={borders.normal}
      px={'30px'}
      py={'35px'}
    >
      <Flex flexDirection={{ base: 'column', md: 'row' }} gap="10px">
        <SkeletonText noOfLines={1} w="60px" skeletonHeight="3" />
        <Spacer />
        <SkeletonText noOfLines={1} w="250px" skeletonHeight="3" />
      </Flex>

      <SkeletonText
        mt={'60px'}
        mb={'20px'}
        noOfLines={1}
        w="300px"
        skeletonHeight="5"
      />

      <SkeletonText mt={'20px'} noOfLines={1} w="200px" skeletonHeight="3" />
      <Flex>
        <SkeletonText mt={'20px'} noOfLines={1} w="200px" skeletonHeight="3" />
        <Spacer />
        <SkeletonText mt={'20px'} noOfLines={1} w="100px" skeletonHeight="3" />
      </Flex>
      <Flex>
        <SkeletonText mt={'20px'} noOfLines={1} w="200px" skeletonHeight="3" />
        <Spacer />
        <SkeletonText mt={'20px'} noOfLines={1} w="100px" skeletonHeight="3" />
      </Flex>
    </Stack>
  );
};
const PlotDetails = () => {
  return (
    <Stack
      minW="100%"
      backgroundColor={'#fff'}
      borderRadius={borders.normal}
      px={'30px'}
      py={'35px'}
    >
      <SkeletonText noOfLines={1} w="60" skeletonHeight="3" />
      <Flex placeItems="center" gap={'10px'}>
        <SkeletonText mt={'20px'} noOfLines={1} w="60px" skeletonHeight="3" />
        <SkeletonText mt={'20px'} noOfLines={1} w="60px" skeletonHeight="3" />
      </Flex>
      <Flex placeItems="center" gap={'10px'}>
        <SkeletonText mt={'20px'} noOfLines={1} w="60px" skeletonHeight="3" />
        <SkeletonText mt={'20px'} noOfLines={1} w="60px" skeletonHeight="3" />
      </Flex>

      <Flex placeItems="center" gap={'10px'}>
        <SkeletonText mt={'20px'} noOfLines={1} w="60px" skeletonHeight="3" />
        <SkeletonText mt={'20px'} noOfLines={1} w="60px" skeletonHeight="3" />
      </Flex>

      <Flex placeItems="center" gap={'10px'}>
        <SkeletonText mt={'20px'} noOfLines={1} w="60px" skeletonHeight="3" />
        <SkeletonText mt={'20px'} noOfLines={1} w="60px" skeletonHeight="3" />
      </Flex>

      <Flex placeItems="center" gap={'10px'}>
        <SkeletonText mt={'20px'} noOfLines={1} w="100px" skeletonHeight="3" />
        <SkeletonText mt={'20px'} noOfLines={1} w="60px" skeletonHeight="3" />
      </Flex>
    </Stack>
  );
};

const Consultant = () => {
  return (
    <Stack
      minW="100%"
      backgroundColor={'#fff'}
      borderRadius={borders.normal}
      px={'30px'}
      py={'35px'}
    >
      <SkeletonText noOfLines={1} w="200px" skeletonHeight="3" />

      <SkeletonText
        mt={'30px'}
        mb={'20px'}
        noOfLines={1}
        w="100%"
        maxW={'400px'}
        skeletonHeight="5"
      />

      <Flex mt={'10px'} flexDirection={{ base: 'column', md: 'row' }}>
        <SkeletonText noOfLines={1} w="200px" skeletonHeight="3" />
        <Spacer />
        <SkeletonText noOfLines={1} w="200px" skeletonHeight="3" />
      </Flex>

      <Flex mt={'10px'}>
        <SkeletonText
          noOfLines={1}
          w="100%"
          maxW={'500px'}
          skeletonHeight="3"
        />
        <Spacer />
        <SkeletonText noOfLines={1} w="200px" skeletonHeight="3" />
      </Flex>
    </Stack>
  );
};

const VillaDetails = () => {
  return (
    <Stack backgroundColor={'#fff'} borderRadius={borders.normal} w="100%">
      <Flex
        w="100%"
        placeItems="flex-start"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Stack
          placeItems="flex-start"
          flex={1}
          px={'30px'}
          py={'35px'}
          gap={'10px'}
        >
          <SkeletonText noOfLines={1} w="100px" skeletonHeight="3" />
          <Flex mt={'15px'} placeItems="center" gap={'10px'}>
            <SkeletonText
              mt={'20px'}
              noOfLines={1}
              w="60px"
              skeletonHeight="3"
            />
            <SkeletonText
              mt={'20px'}
              noOfLines={1}
              w="60px"
              skeletonHeight="3"
            />
          </Flex>
          <Flex placeItems="center" gap={'10px'}>
            <SkeletonText
              mt={'20px'}
              noOfLines={1}
              w="60px"
              skeletonHeight="3"
            />
            <SkeletonText
              mt={'20px'}
              noOfLines={1}
              w="60px"
              skeletonHeight="3"
            />
          </Flex>
          <Flex placeItems="center" gap={'10px'}>
            <SkeletonText
              mt={'20px'}
              noOfLines={1}
              w="60px"
              skeletonHeight="3"
            />
            <SkeletonText
              mt={'20px'}
              noOfLines={1}
              w="60px"
              skeletonHeight="3"
            />
          </Flex>

          <SkeletonCircle mt="25px" w="90px" h="50px" />
          <SkeletonText noOfLines={1} w="200px" skeletonHeight="3" />
        </Stack>
        <Skeleton
          h={{ base: '150px', md: '310px' }}
          w={{ base: '100%', md: 'unset' }}
          flex={{ base: 'unset', md: 1 }}
        />
      </Flex>
    </Stack>
  );
};
const ProjectInformation = () => {
  return (
    <Stack
      w="100%"
      maxW={'320px'}
      backgroundColor={'#fff'}
      borderRadius={borders.normal}
      px={'30px'}
      py={'35px'}
      gap={'15px'}
    >
      <SkeletonText noOfLines={1} w="100px" skeletonHeight="3" />

      <SkeletonText mt="20px" noOfLines={1} w="150px" skeletonHeight="3" />
      <SkeletonText noOfLines={1} w="150px" skeletonHeight="3" />
      <SkeletonText noOfLines={1} w="165px" skeletonHeight="3" />
      <SkeletonText noOfLines={1} w="170px" skeletonHeight="3" />

      <Skeleton height="1px" my={'15px'} />

      <SkeletonText noOfLines={1} w="100px" skeletonHeight="3" />

      <SkeletonText mt="20px" noOfLines={1} w="150px" skeletonHeight="3" />
      <SkeletonText noOfLines={1} w="165px" skeletonHeight="3" />
      <SkeletonText noOfLines={1} w="180px" skeletonHeight="3" />
      <SkeletonText noOfLines={1} w="150px" skeletonHeight="3" />
      <SkeletonText noOfLines={1} w="170px" skeletonHeight="3" />
      <SkeletonText noOfLines={1} w="160px" skeletonHeight="3" />
    </Stack>
  );
};

const HelpSubmissionForm = () => {
  return (
    <Stack
      w="100%"
      backgroundColor={'#fff'}
      borderRadius={borders.normal}
      px={'30px'}
      py={'35px'}
      gap={'30px'}
    >
      <SkeletonText noOfLines={1} w="100%" skeletonHeight="3" />
      <SkeletonText noOfLines={1} w="100%" skeletonHeight="3" />
      <Skeleton height="50px" width="100px" borderRadius="40px" />
    </Stack>
  );
};

export default MyProfileSkeleton;
