import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  root: {
    backgroundColor: colors.text.light,
    padding: {
      base: '10px',
      md: '20px',
    },
    borderRadius: '8px',

    '.projectDetails': {
      p: {
        _first: {
          fontWeight: FontWeights.bold,
          mb: '5px',
        },
      },
    },
    '.descriptionNode': {
      p: {
        marginTop: 0,
      },
    },
  },
});

export default style;
