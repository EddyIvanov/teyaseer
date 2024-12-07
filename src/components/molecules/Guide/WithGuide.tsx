import React, { ReactNode } from 'react';

import { Flex, Hide } from '@chakra-ui/react';

import GuideMobileButton from './components/GuideMobileButton';

import { Guide } from '@/components/molecules/Guide/Guide';

type TProps = {
  children: ReactNode;
  guideId: string;
};
export const WithGuide = ({ children, guideId }: TProps) => {
  return (
    <Flex
      flexDirection={{ base: 'column', xl: 'row' }}
      gap={{ base: '30px', xl: '40px' }}
      minW={'100%'}
    >
      <Flex flex={1} w={'100%'} position="relative">
        <Hide above="xl">{guideId && <GuideMobileButton />}</Hide>

        {children}
      </Flex>
      {guideId && (
        <Flex
          id="guide-component"
          sx={{
            flex: 1,
            maxW: {
              base: '100%',
              xl: '340px',
            },
          }}
        >
          <Guide guideId={guideId} />
        </Flex>
      )}
    </Flex>
  );
};
