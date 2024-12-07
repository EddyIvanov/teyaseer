import { defineStyle } from '@chakra-ui/react';

import sizes from '@/styles/themes/brand/sizes';

const style = defineStyle({
  map: {
    '.loader': {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    maxW: {
      md: 'calc(100vw - 74px)',
    },
    width: {
      base: 'calc(100vw - 48px)',
      md: '776px',
    },
    maxH: {
      md: 'calc(100vh - 200px)',
    },
    height: {
      base: `calc(100vh - ${sizes.modalHeaderSize})`,
      md: '745px',
    },
    section: {
      height: '100%',
    },
  },
});
export default style;
