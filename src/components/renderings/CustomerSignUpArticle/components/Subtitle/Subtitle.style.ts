import { defineStyle } from '@chakra-ui/react';

import Colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const theme = defineStyle({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: { base: 'background', lg: 'transparent' },
  },
  actionButton: {
    display: 'flex',
    mb: { base: '24px', lg: '48px' },
  },
  vendorSignUp: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '5px',
    fontSize: FontSizes.normal,
    span: {
      color: { base: Colors.text.dark, lg: Colors.text.light },
      _rtl: {
        ml: '16px',
      },
      _ltr: {
        mr: '16px',
      },
    },
    a: {
      color: { base: Colors.text.dark, lg: Colors.text.light },
      position: 'relative',
      textDecoration: 'underline',
    },
  },
});

export default theme;
