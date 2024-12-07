const ToastNotificationStyle: any = {
  svg: {
    width: '24px',
    height: '18px',
  },
  '.chakra-alert': {
    p: '16px',
    gap: '10px',
  },
  '.chakra-alert__title': {
    color: 'black',
    fontSize: '1.6rem',
    fontWeight: '500',
  },
  '.chakra-alert__desc': {
    color: 'black',
    fontsize: '1.2rem',
    fontWeight: '300',
    lineHeight: '1.5',
  },
  "div[data-status='info']": {
    background: '#d9e8ff',
    '.chakra-alert__icon svg': {
      color: '#a0adca',
    },
  },
  "div[data-status='success']": {
    background: '#CDF2DC',
    '.chakra-alert__icon svg': {
      color: '#8fdcaf',
    },
  },
  "div[data-status='error']": {
    background: '#FFD8DA',
    '.chakra-alert__icon svg ': {
      color: '#f69fa3',
    },
  },
  "div[data-status='warning']": {
    background: '#fff1df',
    '.chakra-alert__icon svg': {
      color: '#ec972d',
    },
  },
  "button[aria-label='Close']": {
    color: 'black',
    top: '-2px',
    position: 'relative',
    svg: {
      width: '10px',
      height: '10px',
    },
  },
};
export default ToastNotificationStyle;
