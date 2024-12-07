import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  searchContainer: {
    flexDirection: 'column',
    gap: 7,
    py: 5,
  },
  searchBox: {
    placeItems: 'center',
    background: '#FAFAFA',
  },
  searchButton: {
    position: 'absolute',
    right: '20px',
    zIndex: 2,
  },
  searchIcon: {
    fontSize: FontSizes.small,
  },
  filterBox: {
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
  menuItemOption: {
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
  cardFooterWrapper: {
    flex: 1,
    w: '100%',
    justifyContent: 'flex-end',
    gap: 10,
  },
});

export default style;
