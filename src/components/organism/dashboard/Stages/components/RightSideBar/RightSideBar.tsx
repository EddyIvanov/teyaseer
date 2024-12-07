import React from 'react';

import { Card, Text } from '@chakra-ui/react';

const RightSideBar = () => {
  return (
    <Card
      sx={{
        borderTopRadius: '10px',
        p: '32px 32px 64px',
        height: 'max-content',
        gap: '8px',
      }}
    >
      <Text fontWeight={700} mb="8px">
        My Villa Requirements
      </Text>
      <Text fontSize="14px" fontWeight={600}>
        Summary of design:
      </Text>
      <Text fontSize="14px" fontWeight={400}>
        Modern style, Rectangular layout, 2 floors, 4 bedrooms, 2 bathrooms
      </Text>
    </Card>
  );
};

export default RightSideBar;
