import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const style = defineStyle({
  tabList: {
    borderBottom: '1px solid',
    borderColor: colors.border,
  },
  tab: {
    fontSize: FontSizes.normal,
    padding: '20px',
    borderTop: `1px solid ${colors.border} !important`,
    color: '#ACACAC',
    "&[aria-selected='true']": {
      color: colors.brand.primary,
    },
    _rtl: {
      borderRight: 0,
      borderLeft: `1px solid ${colors.border} !important`,
    },
    _ltr: {
      borderLeft: 0,
      borderRight: `1px solid ${colors.border} !important`,
    },
  },
  accordionItem: {
    borderTop: 'none',
    '&:last-of-type': {
      borderBottom: 'none',
    },
  },
  title: {
    fontSize: 'xxLarge',
    fontWeight: 'normal',

    _ltr: {
      pr: { base: '70px', xl: '0' },
    },
    _rtl: {
      pl: { base: '70px', xl: '0' },
    },
  },
});

export default style;
