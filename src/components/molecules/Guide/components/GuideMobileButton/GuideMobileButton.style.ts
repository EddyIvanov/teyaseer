import { defineStyle } from '@chakra-ui/react';

const style = defineStyle({
  root: {
    position: 'absolute',
    top: '20px',
    zIndex: 10,

    _ltr: {
      right: { base: '20px', md: '40px' },
    },
    _rtl: {
      left: { base: '20px', md: '40px' },
    },

    '> button': {
      width: '50px',
      height: '50px',
      boxShadow: '0px 4px 10px 0px rgba(26, 37, 80, 0.18)',
    },
  },
});

export default style;
