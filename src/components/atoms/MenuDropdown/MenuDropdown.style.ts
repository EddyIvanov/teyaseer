import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  customFilter: {
    display: 'flex',
    height: '54px',
    padding: '16px 32px',
    textTransform: 'capitalize',
    span: {
      textAlign: 'left',
    },
    minW: 'fit-content',
  },
  customMenuList: {
    backgroundColor: colors.background,
    borderRadius: '6px',
    minW: '130px',
    maxH: '330px',
    overflowY: 'auto',
    border: `1px solid ${colors.secondaryHover}`,
    py: '0px',
  },
});

export default style;
