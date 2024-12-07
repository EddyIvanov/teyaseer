import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

export const GridTypeStyle = defineStyle({
  root: {
    border: `1px solid ${colors.secondaryHover}`,
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    w: { base: '107px', md: '111px' },
    h: { base: '73px', md: '73px' },
  },
  selected: {
    backgroundColor: colors.primary,
    border: 'none',
    color: '#fff',
  },
});
