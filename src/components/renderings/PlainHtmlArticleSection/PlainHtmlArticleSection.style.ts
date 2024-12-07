import { defineStyle } from '@chakra-ui/react';

import sizes from '@/styles/themes/brand/sizes';

const style = defineStyle(() => {
  return {
    root: {
      height: '100%',
      minH: 'calc(100vh - 200px)',
      maxW: '1000px',
      margin: '0 auto',
      pt: { base: sizes.headerMobileSize, lg: sizes.headerDesktopSize },

      h2: {
        m: { base: '50px 0 0 !important', lg: '70px 0 0 !important' },
      },
    },
  };
});

export default style;
