import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  root: {
    bg: '#F5EFE0',
    border: '1px solid #EC972D',
    p: '20px',
    borderRadius: '8px',
    width: '100%',
    marginBottom: '10px',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: FontSizes.small,
  },
  description: {
    fontWeight: FontWeights.normal,
    fontSize: FontSizes.small,
  },
});

export default style;
