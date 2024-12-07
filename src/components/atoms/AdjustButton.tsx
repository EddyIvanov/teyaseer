import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

type TProps = {
  variant: 'plus' | 'minus';
  onClick?: () => void;
};

export const AdjustButton = ({ variant, onClick }: TProps) => {
  const isMinus = variant === 'minus';
  return (
    <IconButton
      isRound={true}
      variant="outline"
      width={'28px'}
      height={'28px'}
      aria-label="Done"
      fontSize="20px"
      sx={{
        border: `1px solid ${colors.secondaryHover}`,
      }}
      {...{ onClick }}
      icon={
        <>
          {isMinus ? (
            <Box sx={{ _rtl: { transform: 'translateY(-2px)' } }}>&#45;</Box>
          ) : (
            <Box sx={{ _rtl: { transform: 'translateY(-2px)' } }}>&#43;</Box>
          )}
        </>
      }
    />
  );
};
