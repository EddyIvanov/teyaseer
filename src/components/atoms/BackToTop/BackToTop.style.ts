import { defineStyle } from '@chakra-ui/react';

import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle((props: any) => {
  const { show } = props;
  return {
    container: {
      position: 'fixed',
      bottom: 0,
      margin: 'auto',
      right: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: '5',
    },
    button: {
      display: show ? 'flex' : 'none',
      background: 'white',
      border: '1px solid black',
      flexDirection: 'column',
      position: 'absolute',
      _ltr: {
        right: { base: '16px', sm: '40px' },
      },
      _rtl: {
        left: { base: '16px', sm: '40px' },
      },
      height: { base: '50px', sm: '65px' },
      width: { base: '50px', sm: '65px' },
      pointerEvents: 'auto',
      zIndex: '999',
      p: 0,
      bottom: '30px',
      '&.dashboard': {
        position: 'fixed',
        bottom: '15px',
      },
      '&.inFooter:not(.dashboard)': {
        bottom: { base: '100px', sm: '110px' },
      },
    },
    icon: {
      width: { base: '18px', sm: '22px' },
      height: { base: '18px', sm: '22px' },
    },
    text: {
      color: 'black',
      fontWeight: FontWeights.medium,
      whiteSpace: 'normal',
      fontSize: { base: '0.7rem', sm: '0.9rem' },
      textWrap: 'wrap',
      width: '41px',
    },
  };
});

export default style;
