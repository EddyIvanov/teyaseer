import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  root: {
    alignItems: 'flex-start',
    gap: '24px',
    minH: '150px',
    position: 'relative',
    overflow: 'auto',
    '.chakra-checkbox span': {
      w: '21px',
      h: '21px',
      border: '1px solid',
      borderColor: colors.border,
      svg: {
        color: 'white',
        w: '13px',
        h: '13px',
      },
      _checked: {
        bg: 'black',
      },
    },
  },
  spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 0,
    bottom: 0,
    m: 'auto',
    width: 'fit-content',
    height: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '10px',
  },
});

export default style;
