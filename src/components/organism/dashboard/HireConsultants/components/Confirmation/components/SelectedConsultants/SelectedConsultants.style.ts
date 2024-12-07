import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  tr: {
    th: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.medium,
      height: '60px',
    },
    td: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.medium,
      height: '40px',
    },
  },
});

export default style;
