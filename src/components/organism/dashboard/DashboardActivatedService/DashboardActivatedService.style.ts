import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  root: {
    bg: colors.text.light,
    padding: { base: '20px', md: '40px' },
    boxShadow: '0px 4px 44px 0px #00000012',
  },
});

export default style;
