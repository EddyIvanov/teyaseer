import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const styles = defineStyle({
  searchAndFiltersContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: {
      base: 'column',
      lg: 'row',
    },
    gap: '28px',
  },
  searchBox: {
    direction: 'column',
    gap: '48px',
    maxW: {
      base: '100%',
      lg: '338px',
      '2xl': '388px',
      '3xl': '438px',
      '4xl': '488px',
    },
    w: '100%',
  },
  searchInput: {
    position: 'relative',
    height: {
      base: '40px',
      md: '54px',
    },
    borderRadius: '100px',
    borderColor: colors.secondaryHover,
    fontSize: {
      base: FontSizes.small,
      lg: FontSizes.xMedium,
    },
    _ltr: {
      padding: '16px 56px 16px 32px',
    },
    _rtl: {
      padding: '16px 32px 16px 56px',
    },
  },
  searchInputIcon: {
    top: {
      base: '7px',
      md: '15px',
    },
    cursor: 'pointer',
    _ltr: {
      right: '28px',
    },
    _rtl: {
      right: 'unset',
      left: '28px',
    },
  },
  filtersContainer: {
    gap: {
      base: '20px',
      lg: '32px',
    },
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    pb: {
      base: '10px',
      md: 'unset',
    },
    '.chakra-menu__menu-list': {
      mx: '15px',
    },
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

export default styles;
