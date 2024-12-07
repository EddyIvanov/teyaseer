import { defineStyle } from '@chakra-ui/react';

const style = defineStyle({
  imageContainer: {
    position: 'relative',
    width: {
      base: '300px',
      md: '500px',
      lg: '600px',
    },
    height: {
      base: '300px',
      md: '500px',
      lg: '600px',
    },
    '.villaImage': {
      objectFit: 'cover',
    },
  },
});

export default style;
