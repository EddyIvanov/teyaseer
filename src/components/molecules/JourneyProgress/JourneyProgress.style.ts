import { defineStyle } from '@chakra-ui/react';

import borders from '@/styles/themes/brand/borders';

const style = defineStyle({
  root: {
    position: { base: 'static', md: 'absolute' },
    bottom: '100%',
    gap: { base: '24px' },
    justifyContent: 'space-between',
    backgroundColor: { base: '#fff', md: 'inherit' },
    p: { base: '12px 16px', md: '12px 0' },
    maxWidth: { base: '100%', md: '320px' },
    borderRadius: borders.normal,
    mb: { base: '40px', md: '-3px', lg: '14px' },

    _ltr: {
      ml: { base: '0', md: '180px', lg: '0' },
    },
    _rtl: {
      mr: { base: '0', md: '180px', lg: '0' },
    },
  },
  title: {
    fontWeight: 'bold',
  },
  textWrapper: {
    alignItems: 'start',
    gap: { base: '5px', md: '0', lg: '5px' },
  },
});

export default style;
