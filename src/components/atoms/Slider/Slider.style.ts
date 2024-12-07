import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

import colors from '@/styles/themes/brand/colors';

const helpers = createMultiStyleConfigHelpers(['slider', 'track', 'thumb']);

const Slider = helpers.defineMultiStyleConfig({
  baseStyle: {
    slider: {
      borderRadius: '10rem',
    },
    track: {
      borderRadius: '10rem',
      height: '1.3rem',
      background: colors.backgroundGrey,
    },
    thumb: {
      height: '27px',
      width: '1px',
      background: '#000',
      fontsize: '28px',
      outline: 'none',
      '&: focus': {
        outline: 'none',
      },
    },
  },
});

export default Slider;
