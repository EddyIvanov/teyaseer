import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const style = defineStyle({
  root: {
    color: colors.text.dark,
    display: { base: 'flex', xl: 'none' },
    flexDirection: 'column',
    bg: '#FFF',
    gap: '16px',

    position: 'fixed',
    w: '100%',
    h: '100dvh',
    zIndex: 999,
    top: 0,
    _rtl: {
      right: -2000,
    },
    _ltr: {
      left: -2000,
    },
    transition: 'all 0.5s ease',
    ul: {
      display: 'flex',
      flexDirection: 'column',
      listStyle: 'none',
      li: {
        py: '16px',
        a: {
          fontSize: FontSizes.medium,
        },
      },
    },
    '.mobile-header': {
      height: 'headerMobileSize',
    },
    '.primaryNav': {
      borderBottom: '1px solid #171D38',
    },
    '.secondaryNav': {
      'li:first-of-type': {
        borderBottom: '1px solid #171D38',
      },
    },

    "&[data-open='true'] + body": {
      overflow: 'hidden',
    },

    "&[data-open='true']": {
      _rtl: {
        right: 0,
      },
      _ltr: {
        left: 0,
      },
      transition: 'all 0.5s ease',
    },

    '.social_box': {
      alignItems: 'center',
    },
  },
});

export default style;
