import React from 'react';

import { Box, Flex, SkeletonText } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const CalculatorCarousel = () => {
  const arr = [...Array(15).keys()];

  return (
    <Flex height={'100%'}>
      {arr.map(index => (
        <CarouselItem key={index} />
      ))}
    </Flex>
  );
};

const CarouselItem = () => (
  <Box
    sx={{
      padding: {
        base: '0 10px',
        xl: '0 20px',
      },
      minWidth: '185px',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      position: 'relative',
      borderRight: `1px solid ${colors.border}`,
      gap: '0.5rem',
      flexDirection: 'column',
    }}
  >
    <SkeletonText
      noOfLines={1}
      w={'100%'}
      maxW={'100px'}
      skeletonHeight={'16px'}
    />
    <SkeletonText
      noOfLines={1}
      w={'100%'}
      maxW={'100px'}
      skeletonHeight={'16px'}
    />
  </Box>
);

export default CalculatorCarousel;
