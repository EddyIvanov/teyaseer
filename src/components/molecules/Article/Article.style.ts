import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import sizes from '@/styles/themes/brand/sizes';

const style = defineStyle({
  root: {
    '.swiperActionBtns': {
      mt: {
        base: '24px',
        md: '32px',
        lg: '32px',
        xl: '40px',
        '2xl': '49.92px',
      },
      gap: {
        base: '16.96px',
        md: '24px',
      },
    },
  },
  articleInnerContainer: {
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
  articleDescriptionBox: {
    display: 'flex',
    flex: 1,
    position: {
      base: 'relative',
    },
    alignItems: 'flex-end',
    mt: { base: 'unset', lg: sizes.headerDesktopSize },
    backgroundColor: colors.background,
    width: { base: '100%', lg: 'homeSideWhiteBox' },
    height: {
      base: 'unset',
      lg: `calc(100vh - ${sizes.headerDesktopSize})`,
    },
    zIndex: 3,
    pb: { base: '48px', lg: '100px' },
    px: { base: '24px', lg: 'unset' },
    _rtl: {
      left: 0,
      pr: { base: '24px', lg: '100px' },
    },
    _ltr: {
      right: 0,
      pl: { base: '24px', lg: '100px' },
    },
  },
  articleDescriptionBoxContent: {
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    gap: '20px',
  },
  articleDescriptionInnerContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mainTitle: {
    display: 'flex',
    alignItems: 'flex-end',
    zIndex: 1,
    flex: { base: 1.5, lg: 1.5 },
    p: { base: '24px', lg: 'unset' },
    h1: {
      mb: '0px !important',
    },
  },
  iconMouseContainer: {
    display: {
      base: 'none',
      lg: 'flex',
    },

    alignItems: 'end',
  },
});
export default style;
