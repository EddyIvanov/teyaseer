const baseStyle = () => ({
  root: {
    '.container': {
      zIndex: 2,
    },
    [`@media screen and (max-width: 1023px)`]: {
      section: { height: 'auto !important', minHeight: '100vh' },
      'section > div': { height: 'auto !important', minH: '100%' },
      '.contentContainer > div': {
        overflow: 'hidden',
      },
      '.swiper-slide': {
        opacity: '0 !important',
      },
      '.swiper-slide-visible': {
        opacity: '1 !important',
      },
    },
  },
});
const theme = { baseStyle };
export default theme;
