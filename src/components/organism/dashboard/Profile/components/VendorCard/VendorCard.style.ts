import { defineStyle } from '@chakra-ui/react';

import borders from '@/styles/themes/brand/borders';
import boxShadows from '@/styles/themes/brand/boxShadows';
import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
    border: '0',
    borderRadius: borders.normal,
    backgroundColor: colors.text.light,
    boxShadow: boxShadows.panelBox,
    p: '32px',
  },
  header: {
    h2: {
      color: colors.text.dark,
      fontWeight: FontWeights.bold,
      fontSize: FontSizes.normal,
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  name: {
    fontSize: 'clamp(2.4rem, 1.7615rem + 1.3319vw, 3.2rem)',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: { base: 'column', sm: 'column', md: 'row' },
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
});

export default style;
