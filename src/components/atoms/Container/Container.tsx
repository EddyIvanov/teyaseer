import React, { PropsWithChildren, memo } from 'react';

import { Box, BoxProps, useMultiStyleConfig } from '@chakra-ui/react';

export interface IContainerProps extends PropsWithChildren, BoxProps {}

const Container = ({ children, ...rest }: IContainerProps) => {
  const style = useMultiStyleConfig('Container', {});
  return (
    <Box className="container" __css={style.root} {...rest}>
      {children}
    </Box>
  );
};

export default memo(Container);
