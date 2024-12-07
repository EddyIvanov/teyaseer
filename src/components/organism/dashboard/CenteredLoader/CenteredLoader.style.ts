import { defineStyle } from '@chakra-ui/react';

import borders from '@/styles/themes/brand/borders';

const style = defineStyle({
  root: {
    position: 'relative',
    width: '100%',
    minH: '400px',
    backgroundColor: '#fff',
    borderRadius: borders.normal,
    '&.projectCompletionSummary': {
      minHeight: '164px',
    },
  },
});

export default style;
