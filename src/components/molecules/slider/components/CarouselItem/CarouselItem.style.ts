import { Theme } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const baseStyle = ({ isActive }: { isActive: boolean; theme: Theme }) => ({
  root: {
    padding: {
      base: '0 10px',
      xl: '0 20px',
    },
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    position: 'relative',
    borderRight: `1px solid ${colors.border}`,
    cursor: 'pointer',
    '::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      height: isActive ? '5px' : 0,
      width: '100%',
      backgroundColor: colors.secondaryHover,
    },
  },
});

const theme = { baseStyle };
export default theme;
