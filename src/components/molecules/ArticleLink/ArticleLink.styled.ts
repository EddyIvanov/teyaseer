import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const style = defineStyle({
  root: {
    w: '100%',
    color: colors.text.dark,
    display: 'flex',
    flexDir: 'column',

    '.al-title': {
      height: { base: 'auto', md: '65px', xl: '96px' },
      fontSize: {
        base: FontSizes.xMedium,
        md: FontSizes.large,
        lg: FontSizes.xLarge,
        xl: FontSizes.xxxLarge,
      },
      mt: {
        base: '24px',
        xl: '32px',
      },
      fontWeight: 500,
      flex: '2 1 auto',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      lineClamp: '2',
      WebkitBoxOrient: 'vertical',
    },
    '.al-description': {
      fontSize: {
        base: FontSizes.small,
        xl: '2.0rem', // not standard
      },
      m: { base: '20px 0', md: '5px 0 15px' },
      height: { base: 'auto', md: '40px', xl: '54px' },
      fontWeight: 400,
      flex: '1 0 auto',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      lineClamp: '2',
      WebkitBoxOrient: 'vertical',
    },

    '.al-icon': {
      m: '0 0 0 8px',
      path: {
        strokeWidth: '2',
        stroke: colors.text.light,
      },

      _rtl: {
        m: '0 8px 0 0',
      },
    },
  },
});
export default style;
