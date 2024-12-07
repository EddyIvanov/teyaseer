import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const style = defineStyle({
  searchWrapper: {
    gap: '12px',
    maxW: '100%',
    width: 'calc(100% - 2px)',
    height: '45px',
    mx: { lg: 'auto' },
    border: `1px solid ${colors.border}`,
    borderRadius: '44px',
    padding: '12px',
    svg: {
      strokeWidth: '2px',
    },
    input: {
      border: 'none',
      ml: '-10px',
      fontSize: FontSizes.small,
    },
    '.serachIcon': {
      minW: 'unset',
    },
  },
});

export default style;
