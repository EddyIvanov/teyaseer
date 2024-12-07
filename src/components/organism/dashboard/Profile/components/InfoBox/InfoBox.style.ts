import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';

const style = defineStyle({
  infoBox: {
    gap: '10px',
    alignItems: 'center',
    p: {
      fontSize: FontSizes.small,
      wordBreak: 'break-word',
    },
  },
});
export default style;
