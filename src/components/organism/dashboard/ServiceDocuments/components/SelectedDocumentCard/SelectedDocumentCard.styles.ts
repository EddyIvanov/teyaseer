import { defineStyle } from '@chakra-ui/react';

const style = defineStyle({
  cardWrapper: {
    display: 'flex',
    borderRadius: '8px',
    border: '1px',
    alignItems: 'center',
    padding: '16px',
    gap: '12px',
    minWidth: '396px',
    maxWidth: 'fit-content',
    position: 'relative',
  },
});

export default style;
