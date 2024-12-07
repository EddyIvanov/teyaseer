import { defineStyle } from '@chakra-ui/react';

const style = defineStyle({
  root: {
    width: '100%',
    height: '100%',
    '.m-map__googleMap': {
      width: '100%',
      height: '100%',
    },
    '.m-map__lazyLoading': {
      height: '100%',
      width: '100%',
    },
  },
});
export default style;
