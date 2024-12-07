import React, { ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';

type TVillaCalcBlockProps = {
  children: ReactNode;
  hasBorderBottom?: boolean;
};

export const VillaDetailsBlock = ({
  children,
  hasBorderBottom = true,
}: TVillaCalcBlockProps) => {
  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      sx={{
        // border: '5px dotted pink',
        padding: {
          base: '24px 24px 24px 24px',
          md: '48px 80px 68px 48px',
        },
        minHeight: { md: '284px' },
        minWidth: '100%',
        ...(hasBorderBottom && { borderBottom: '1px solid #ADB5BD' }),
      }}
    >
      {children}
    </Flex>
  );
};
