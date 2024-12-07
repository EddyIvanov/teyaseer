import { defineStyle } from '@chakra-ui/react';

const style = defineStyle({
  accordionButton: {
    padding: '16px',
    justifyContent: 'space-between',
    textAlign: 'left',
    fontSize: { base: 'medium', md: 'xMedium' },
    mb: '20px',

    '> p': {
      _ltr: {
        pr: '20px',
      },
      _rtl: {
        pl: '20px',
      },
    },
  },
  accordionIcon: {
    fontSize: 'large',

    _ltr: {
      mr: { base: '0px', md: '16px' },
    },
    _rtl: {
      ml: { base: '0px', md: '16px' },
    },
  },
});

export default style;
