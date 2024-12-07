import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 0,
    bottom: 0,
    m: 'auto',
    width: 'fit-content',
    height: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '10px',
  },
  table: {
    'tr th:first-of-type,td:first-of-type': {
      position: 'sticky',
      minWidth: '100px',
      _ltr: {
        left: 0,
      },
      _rtl: {
        right: 0,
      },
      zIndex: 0,
      background: colors.background,
      maxWidth: { base: '200px', sm: '300px', lg: '400px', '2xl': 'unset' },
      textWrap: { base: 'wrap', lg: 'nowrap' },
      lineHeight: 'normal',
      overflowWrap: 'word-wrap',
      overflow: 'hidden',
      whiteSpace: 'normal',
      textOverflow: 'clip',
    },
    th: {
      pb: '10px',
      span: {
        fontWeight: FontWeights.semibold,
        fontsize: FontSizes.xMedium,
        py: 4,
        px: 6,
        textAlign: 'start',
        w: '100%',
        textWrap: 'pretty',
        display: 'block',
      },
    },
  },
});
export default style;
