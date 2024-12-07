import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import sizes from '@/styles/themes/brand/sizes';

const style = defineStyle({
  mediaInnerContainer: {
    overflow: 'hidden',
    position: 'relative',
    height: '100vh',
    _ltr: {
      _before: {
        right: 0,
      },
    },
    _rtl: {
      _before: {
        left: 0,
      },
    },
    justifyContent: {
      base: 'space-between',
      lg: 'unset',
    },
    alignItems: 'flex-end',
    _before: {
      display: { base: 'none', lg: 'block' },
      position: 'absolute',
      height: '100%',
      top: sizes.headerDesktopSize,
      background: colors.background,
      content: '""',
      width: '40%',
      zIndex: 1,
    },
    '.container': {
      display: 'flex',
      h: '100%',
      flexDirection: { base: 'column', lg: 'row' },
      p: { base: '0px', lg: '48px' },
      pt: '0px !important',
    },
  },
  mediaItemContainer: {
    height: {
      base: '250px',
      sm: '350px',
      md: '350px',
      lg: '400px',
      xl: '450px',
    },
    position: 'relative',
  },
});
export default style;
