import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  root: {
    borderRadius: '8px',
    boxShadow: '0px 4px 44px 0px rgba(0, 0, 0, 0.07)',
  },
  image: {
    height: '315px',
    width: '100%',
    borderTopRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    _after: {
      zIndex: '12',
      content: "''",
      left: '0',
      marginRight: '0',
      marginBottom: '-1px',
      background: `linear-gradient(0deg, ${colors.background} 12.18%, rgba(255, 255, 255, 0.68) 44.14%, rgba(255, 255, 255, 0.00) 93.11%)`,
      position: 'absolute',
      zIndexndex: 1,
      width: '100%',
      height: '100px',
      top: '100%',
      transform: 'translateY(-100%)',
    },
  },
  imageInnerContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    img: {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'column',
    h: '100%',
    bg: colors.text.light,
    padding: { base: '24px 16px', lg: '32px 48px 48px' },
    borderBottomRadius: '8px',
  },
  mainTitle: {
    zIndex: 1,
    h1: {
      mb: { base: '24px', lg: '32px' },
      fontSize: { base: FontSizes.large, lg: FontSizes.fourXLarge },
      width: 'min-content',
      fontWeight: FontWeights.normal,
      strong: {
        fontWeight: FontWeights.bold,
      },
    },
  },
  articleDescriptionBox: {
    width: '100%',
  },
});
export default style;
