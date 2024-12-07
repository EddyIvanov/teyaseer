import React, { memo } from 'react';

import { Box } from '@chakra-ui/react';

import styles from './Main.style';
import { MainProps } from './Main.types';

const Main = ({ withScrollAnimation, children }: MainProps) => {
  const style = styles({ withScrollAnimation });

  return (
    <Box as="main" sx={style.root}>
      {children}
    </Box>
  );
};

export default memo(Main);
