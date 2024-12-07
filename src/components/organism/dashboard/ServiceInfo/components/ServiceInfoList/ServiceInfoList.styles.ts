import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  accordion: {
    maxWidth: '942px',
  },
  accordionItem: {
    border: 'none',
    backgroundColor: colors.background,
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: { base: '12px', md: '20px' },
  },
  accordionButton: {
    padding: 0,
  },
  thumbContainer: {
    height: { base: '80px', md: '130px' },
    width: { base: '80px', md: '130px' },
    minWidth: { base: '80px', md: '130px' },
    position: 'relative',
  },
  thumbIconContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: '9',
  },
  titleContainer: {
    padding: { base: '0 16px', md: '0 32px' },
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 'normal',
    fontWeight: FontWeights.semibold,

    _ltr: {
      textAlign: 'left',
      pr: '16px',
    },
    _rtl: {
      textAlign: 'right',
      pl: '16px',
    },
  },
  description: {
    fontSize: { base: 'small', md: 'normal' },
  },
  accordionPanel: {
    display: 'flex',
    flexDirection: 'column',
    padding: { base: '24px', md: '32px' },
  },
});

export default style;
