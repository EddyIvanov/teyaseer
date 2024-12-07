import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';

const baseStyle = defineStyle({
  '.formTitle': {
    fontSize: FontSizes.xMedium,
    marginBottom: '20px',
  },
  '.submitButton': {
    width: '100%',
    textTransform: 'none',
  },
});

export default baseStyle;
