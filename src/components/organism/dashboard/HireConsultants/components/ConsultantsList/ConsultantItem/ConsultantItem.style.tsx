import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  mainList: {
    py: { base: '20px', lg: '0' },
    border: '2px solid transparent ',
    '&[data-checked=true]': {
      border: '2px solid black',
    },
    cursor: 'pointer',
    bg: '#FAFAFA',
    borderRadius: '10px',
    flexDirection: 'column',
    w: '100%',
    position: 'relative',
  },
  listBox: {
    flexDirection: { base: 'column', lg: 'row' },
    alignItems: 'center',
    gap: '30px',
    minW: '100%',
    px: '20px',
    py: { base: '0', lg: '15px' },
    '.sticky': {
      position: 'sticky',
      bg: '#FAFAFA',
      _ltr: {
        left: 0,
      },
      _rtl: {
        right: 0,
      },
      zIndex: 0,
    },
  },
  listItemInner: {
    gap: '8',
    flex: 1,
    w: '100%',
  },
  companyNameStyle: {
    wordWrap: 'break-word',
    display: 'inline-block',
    width: '100%',
  },
  listItemColumn: {
    flexDirection: { base: 'row', lg: 'column' },
    gap: '2',
    justifyContent: { base: 'space-between', lg: 'center' },
    // minW: '200px',
  },
  icon: {
    background: colors.brand.primary,
    width: '30px',
    height: '30px',
    color: 'white',
    p: '7px',
    borderRadius: '100%',
  },
  expandArrow: {
    _expanded: {
      transform: 'rotate(180deg)',
    },
  },
  listBoxInner: {
    transition: 'height 0.3s ease-in-out',
    px: '25px',
    height: { base: 'fit-content', lg: '0' },
    width: '100%',
    overflow: 'hidden',
    _expanded: {
      lg: {
        height: '90px',
        borderTop: `1px solid ${colors.border}`,
      },
    },
    '.sticky': {
      position: 'sticky',
      bg: '#FAFAFA',
      _ltr: {
        left: 0,
      },
      _rtl: {
        right: 0,
      },
      zIndex: 0,
    },
  },
});
export default style;
