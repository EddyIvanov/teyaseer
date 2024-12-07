import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const theme = defineStyle({
  root: {
    maxW: { base: '100%', lg: '70%' },
    p: {
      m: '18px 0 0',
    },
    h2: {
      fontSize: { base: FontSizes.large, xl: FontSizes.xLarge },
      fontWeight: FontWeights.medium,
      mt: { base: '48px', xl: '58px' },
    },
    h3: {
      fontSize: { base: FontSizes.xMedium, xl: FontSizes.large },
      fontWeight: FontWeights.normal,
      mt: { base: '38px', xl: '48px' },
    },
  },
});

export default theme;
