import { defineStyle } from '@chakra-ui/react';

const theme = defineStyle(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '150px',
    alignItems: 'center',
    '.separator': {
      height: '2px',
      width: '50px',
      bg: 'text.light',
    },
  },
  button: {
    position: 'relative',
    width: 'fit-content',
  },
  map: {
    _rtl: {
      transform: 'none',
    },
  },
}));

export default theme;
