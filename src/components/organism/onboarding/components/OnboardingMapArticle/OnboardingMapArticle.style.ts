import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  root: {
    borderRadius: '8px',
    boxShadow: '0px 4px 44px 0px rgba(0, 0, 0, 0.07)',
    bg: colors.text.light,
    display: 'flex',
    flexDirection: { base: 'column-reverse', md: 'row' },
    height: { base: 'fit-content', md: '500px' },
  },
  titleAndDescription: {
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'center',
    p: {
      mt: 0,
    },
    padding: { base: '40px', md: '0 40px' },
    width: {
      base: '100%',
      md: '60%',
    },
  },
  map: {
    width: { base: '100%', md: '40%' },
    height: { base: '200px', md: '100%' },
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default style;
