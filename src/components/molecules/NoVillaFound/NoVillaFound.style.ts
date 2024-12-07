import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  noVillasFoundContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    textAlign: 'center',
  },
  header: {
    mt: '26px',
    fontSize: `clamp(${FontSizes.xxLarge}, 3.8vw, ${FontSizes.sixXLarge})`,
    fontWeight: FontWeights.light,
  },
  subHeader: {
    fontSize: `clamp(${FontSizes.xxLarge}, 3.8vw, ${FontSizes.sixXLarge})`,
    fontWeight: FontWeights.semibold,
  },
  textsContainer: {
    mt: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: `clamp(${FontSizes.small}, 1.3vw, ${FontSizes.xMedium})`,
    fontWeight: FontWeights.normal,
  },
});

export default style;
