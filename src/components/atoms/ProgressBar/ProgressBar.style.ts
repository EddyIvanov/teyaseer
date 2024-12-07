import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  root: {
    height: '17px',
    padding: '2px',
    borderRadius: '32px',
    bg: colors.backgroundPinkSwan,
    'div[role=progressbar]': {
      borderRadius: 'inherit',
      bg: colors.success,
    },
  },
});

export default style;
