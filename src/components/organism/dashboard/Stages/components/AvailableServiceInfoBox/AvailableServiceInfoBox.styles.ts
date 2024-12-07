import { defineStyle } from '@chakra-ui/react';

const style = defineStyle({
  root: {
    display: 'flex',
    padding: '10px 15px',
    bg: '#FFF1D0',
    borderRadius: '100px',
    height: '38px',
    minW: 'max-content',
    columnGap: '10px',
    font: '1.2rem',
    fontWeight: '600',
    alignItems: 'center',
  },
  label: {
    fontSize: 'xSmall',
  },
});

export default style;
