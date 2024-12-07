import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import letterSpacings from '@/styles/themes/brand/letterSpacings';
import sizes, { mobileHeaderHeight } from '@/styles/themes/brand/sizes';

const theme = defineStyle({
  root: {
    width: '100%',
    zIndex: 2,
    transition: 'all 0.4s ease',
    "&[data-open='true']": {
      _ltr: {
        left: '0px',
      },
      _rtl: {
        right: '0px',
      },
    },
    position: {
      base: 'fixed',
      lg: 'sticky',
    },
    _rtl: {
      right: {
        base: '-100%',
        xl: '0px',
      },
    },
    _ltr: {
      left: {
        base: '-100%',
        lg: '0px',
      },
    },
    bottom: 0,

    height: { base: `calc(100% - ${mobileHeaderHeight + 1}px)`, lg: '100vh' },
    minH: { lg: '100vh' },
    top: { lg: 0 },
    maxW: { base: '100%', md: '300px' },
    minW: { base: '100%', md: '300px' },
    bg: 'white',
    pt: '52.8px',
    flexDirection: 'column',
    display: 'flex',
    overflow: 'auto',
    ul: {
      px: '22px',
      flex: 1,
      flexDirection: 'column',
      m: 0,
      gap: { base: '0', lg: '5px' },
      li: {
        flexDirection: 'row',
        svg: {
          color: colors.primary,
        },
        '&[data-active=true]': {
          'a span': {
            fontWeight: 'bold',
          },
          svg: {
            color: 'black',
          },
        },
        py: '16px',
        borderRadius: '12px',
        a: {
          display: 'flex',
          gap: '16px',
          justifyContent: 'flex-start',
          alignItems: 'center',
          span: {
            color: '#1D1D1D',
            letterSpacing: letterSpacings.tighter,
          },
        },
      },
    },
  },
  backdrop: {
    opacity: 0,
    transition: 'all 0.5s',
    visibility: 'hidden',
    "&[data-open='true']": {
      visibility: 'visible',
      opacity: 1,
    },
    content: "''",
    position: 'fixed',
    top: { base: sizes.headerMobileSize, lg: sizes.headerDesktopSize },
    left: 0,
    bottom: 0,
    right: 0,
    bg: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
});

export default theme;
