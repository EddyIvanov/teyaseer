import { defineStyle } from '@chakra-ui/react';

const style = defineStyle({
  card: {
    border: 'none',
    p: '0',
    maxWidth: '800px',
    boxShadow: 'none',
  },
  cardHeader: {
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '6',
    padding: '4px 0',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    padding: '4px 0',
  },
});

export default style;
