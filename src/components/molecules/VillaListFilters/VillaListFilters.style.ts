import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  filtersContainer: {
    position: 'relative',
    zIndex: '4',
  },
  filtersInnerContainer: {
    mt: {
      base: '32px',
      lg: '42px',
      '2xl': '48px',
    },
    pb: {
      base: '10px',
      md: 'unset',
    },
    gap: {
      base: '12px',
      lg: '32px',
    },
    overflowX: 'auto',
    overflowY: 'visible',
  },
  customMenuOption: {
    borderRadius: '6px',
    padding: '22px 32px',
    fontSize: FontSizes.small,
    borderBottom: `1px solid ${colors.border}`,
    'span.chakra-menu__icon-wrapper': {
      display: 'none',
    },
    _checked: {
      fontWeight: FontWeights.semibold,
    },
    _last: {
      borderBottom: 'none',
    },
    _ltr: {
      textAlign: 'left',
    },
    _rtl: {
      textAlign: 'right',
    },
  },
});

export default style;
