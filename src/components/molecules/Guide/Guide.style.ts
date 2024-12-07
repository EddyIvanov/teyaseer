import { defineStyle } from '@chakra-ui/react';

const style = defineStyle({
  card: {
    border: 'none',
    boxShadow: '0px 4px 44px 0px rgba(0, 0, 0, 0.07)',
    overflow: 'hidden',
    direction: 'column',
    padding: '0',
    gap: '0',
    position: { base: 'static', xl: 'sticky' },
    top: '10px',
    '.chakra-card__header': {
      padding: '32px 32px 0',
    },
    '.chakra-card__body': {
      padding: '0',
    },
  },
  accordion: {
    padding: '0 0 10px 0',
    '.chakra-accordion .chakra-accordion__item': {
      margin: '0',
    },
    '.chakra-accordion__button': {
      p: '16px 32px',
    },
  },
  p: '5px 13px',
  m: '0 32px 15px',
});
export default style;
