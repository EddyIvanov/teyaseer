import React from 'react';

import { Stack, VStack } from '@chakra-ui/react';

import Loader from '@/components/atoms/Loader';

export const MapLoadingOverlay = () => {
  return (
    <VStack
      justifyContent={'center'}
      height={'100vh'}
      width={'100vw'}
      sx={{
        zIndex: 99999,
        position: 'absolute',
        backgroundColor: 'rgba(211, 211, 211, 0.2)',
        width: '100%',
        height: '100%',
      }}
      pointerEvents="none"
    >
      <Stack
        mb={4}
        p={8}
        gap={12}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          zIndex: 99999,
          borderRadius: '8px',
        }}
      >
        <Loader thickness="3px" size={'xl'} />
      </Stack>
    </VStack>
  );
};
