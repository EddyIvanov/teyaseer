import React from 'react';

import { Box, Divider, Text } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

type TProps = {
  title: string;
  onEnterSection: () => void;
  children?: React.ReactNode;
  description: string | null;
  isRequired: boolean;
  errorMessage?: string;
};

export const CalculatorBlock = ({
  title,
  onEnterSection,
  children,
  description = '',
  isRequired,
  errorMessage,
}: TProps) => {
  return (
    <Box
      onMouseEnter={onEnterSection}
      sx={{
        div: {
          cursor: 'pointer',
        },
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <Text mt={7} fontSize={{ base: '20px', md: '24px', '2xl': '26px' }}>
        {title}&nbsp;
        {isRequired ? (
          <Text as="span" color={colors.error}>
            *
          </Text>
        ) : null}
      </Text>
      {errorMessage && (
        <Text fontSize={'small'} color={'red'}>
          {errorMessage}
        </Text>
      )}
      <Text mt={'32px'}>{description}</Text>
      {children}

      <Divider my={{ base: '32px' }} />
    </Box>
  );
};
