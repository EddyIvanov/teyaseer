import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const style = defineStyle({
  root: {
    height: '36px',
    minWidth: 'max-content',
    padding: '8px 16px',
    borderRadius: 'full',
    cursor: 'pointer',
    '&[data-on-hold=true]': {
      backgroundColor: 'rgba(225, 27, 34, 0.1)',
    },
    '&[data-on-hold=false]': {
      backgroundColor: 'rgba(194, 155, 64, 0.1)',
    },
  },
  label: {
    fontSize: FontSizes.xSmall,
    color: colors.text.dark,
    display: 'inline',
  },
  leftIcon: {
    boxSize: '20px',
    _ltr: {
      mr: '10px',
    },
    _rtl: {
      ml: '10px',
    },
  },
  rightIcon: {
    boxSize: '14px',
    color: 'primary',
    "&[data-on-hold='true']": {
      color: '#E11B22',
      svg: {
        color: '#E11B22',
      },
    },
    _ltr: {
      ml: '10px',
    },
    _rtl: {
      mr: '10px',
    },
  },
});

export default style;
