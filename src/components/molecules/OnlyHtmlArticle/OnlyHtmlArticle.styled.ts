import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  articleInnerContainer: {
    my: '128px',
    'img.backgroundImage': {
      objectFit: 'cover',
      width: { base: '100% !important', lg: 'calc(100% - 40%) !important' },
    },
    overflow: 'hidden',
    position: 'relative',
    height: '990px',
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
      background: colors.background,
      content: '""',
      width: '35%',
      zIndex: 1,
    },
    '.container': {
      display: 'flex',
      h: '100%',
      flexDirection: { base: 'column', lg: 'row' },
      px: { base: '0px', lg: '48px' },
    },
  },
  articleDescriptionBox: {
    display: 'flex',
    flex: 1,
    position: {
      base: 'relative',
    },
    alignItems: {
      lg: 'flex-end',
    },
    backgroundColor: '#fff',
    width: { base: '100%', lg: '300px' },
    height: '100%',
    zIndex: 3,
    pb: { base: '48px', lg: '100px' },
    px: { base: '24px', lg: 'unset' },
    _rtl: {
      left: 0,
      pr: { base: '24px', lg: '60px', xl: '100px' },
    },
    _ltr: {
      right: 0,
      pl: { base: '24px', lg: '60px', xl: '100px' },
    },
  },
  articleDescriptionBoxContent: {
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    gap: '20px',
    mt: {
      sm: '24px',
      lg: '0',
    },
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
    flex: { base: 1.9, lg: 1.9 },
    p: { base: '24px', lg: 'unset' },
    h1: {
      mb: '0px !important',
    },
  },
});
export default style;
