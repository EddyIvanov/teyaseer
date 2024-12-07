import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  mainContainer: {
    px: '12px',
    paddingBottom: '16px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  header: {
    fontSize: FontSizes.xxLarge,
  },
  body: {
    fontSize: FontSizes.normal,
    fontWeight: FontWeights.light,
  },
});

export default style;
