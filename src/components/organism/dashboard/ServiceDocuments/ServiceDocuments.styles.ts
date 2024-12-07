import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  docSample: {
    width: '400px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid',
    borderColor: colors.border,
    borderRadius: '10px',
    padding: '16px',
    gap: '16px',
  },
});

export default style;
