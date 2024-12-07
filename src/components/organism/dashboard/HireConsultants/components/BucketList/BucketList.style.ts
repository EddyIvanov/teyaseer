import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const styles = defineStyle({
  accordion: {
    bg: '#FAFAFA',
    borderColor: 'transparent',
    mb: '30px',
  },
  accordionButton: {
    cursor: 'pointer',
    p: 0,
    _hover: {
      backgroundColor: 'transparent',
    },
  },
  accordionHeader: {
    jusityContent: 'space-between',
    alignItems: 'center',
    w: '100%',
    p: '22px',
  },
  accordionPanel: {
    p: '30px 0',
    borderTop: `1px solid ${colors.border}`,
  },
  clearButton: {
    textTransform: 'none',
  },
  unselectedViewWrapper: {
    p: '20px',
    bg: '#FAFAFA',
    mb: '30px',
  },
});

export default styles;
