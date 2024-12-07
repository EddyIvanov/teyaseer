import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';
import sizes from '@/styles/themes/brand/sizes';

const style = defineStyle(() => {
  return {
    root: {
      height: 'auto',
      minH: '100vh',
      pt: {
        base: `calc(${sizes.headerMobileSize} + 32px)`,
        lg: `calc(${sizes.headerDesktopSize} + 42px)`,
        '2xl': `calc(${sizes.headerDesktopSize} + 55px)`,
      },
    },
    headerContainer: {
      gap: '8px',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: `clamp(${FontSizes.small}, 2.9vw, ${FontSizes.fiveXLarge})`,
      fontWeight: FontWeights.medium,
    },
    villasList: {
      flexGrow: 1,
      mt: {
        base: '22px', // 32px - 10px padding below filters to account for scroll
        md: '32px',
        lg: '80px',
      },
      mb: {
        base: '77px',
        lg: '112px',
      },
      gap: {
        base: '48px',
        lg: '111px',
      },
    },
  };
});

export default style;
