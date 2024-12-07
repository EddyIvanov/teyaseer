import { defineStyle } from '@chakra-ui/react';

export const SingleChoiceInputStyled = defineStyle({
  root: {
    position: 'relative',
    minWidth: '100px',
  },
  icon: {
    position: 'absolute',
    top: '-10%',
    right: '-12%',
  },
  iconNoImg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
