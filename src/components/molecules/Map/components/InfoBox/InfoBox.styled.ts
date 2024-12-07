import { defineStyle } from '@chakra-ui/react';

import borders from '@/styles/themes/brand/borders';
import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  root: {
    padding: '28px 22px',
    bg: colors.background,
    fontSize: '1.6rem',
    position: 'relative',
    width: '320px',
    borderRadius: borders.normal,
    border: '.5px solid #D9D9D9',
    borderLeft: `3px solid ${colors.primary}`,
    '.icon-wrapper': {
      background: colors.primary,
      padding: '12px',
      borderRadius: '50%',
    },
    '.children-wrapper': {
      ml: 8,
    },
    h4: {
      fontSize: 'xMedium',
      fontWeight: 'bold',
      mb: '10px',
    },
    h6: {
      fontSize: '1.4rem',
      fontWeight: 'semibold',
    },
    p: {
      fontSize: '1.2rem',
    },
    a: {
      mt: '12px',
      width: '207px',
    },
    '.font-normal': {
      fontWeight: 'normal',
    },
    '.m-infoBox__close': {
      position: 'absolute',
      top: '17px',
      h: '12px',
      w: '12px',
      _hover: {
        cursor: 'pointer',
      },
      _rtl: {
        left: '13px',
      },
      _ltr: {
        right: '13px',
      },
    },
    '&::after': {
      content: '""',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderBottom: '6px solid white',
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translate(-50%, -100%)',
    },
  },
});
export default style;
