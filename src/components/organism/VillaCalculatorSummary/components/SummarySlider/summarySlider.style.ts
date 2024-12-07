import colors from '@/styles/themes/brand/colors';

export const summarySliderStyles = {
  root: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: {
      base: '373px',
      md: '498px',
      lg: '683px',
    },
    height: '100%',
  },
  carousel: {
    '.swiper-pagination.swiper-pagination-horizontal': {
      top: {
        base: '-45px',
        sm: '-16px',
        lg: '-31px',
      },
      justifyContent: 'flex-end',
      _ltr: {
        pr: {
          base: '24px',
          md: '32px',
          lg: '48px',
        },
      },
      _rtl: {
        pl: {
          base: '24px',
          md: '32px',
          lg: '48px',
        },
      },
      '.swiper-pagination-bullet': {
        backgroundColor: 'transparent',
        border: `1px solid ${colors.text.light}`,
      },
      '.swiper-pagination-bullet.swiper-pagination-bullet-active': {
        backgroundColor: colors.text.light,
        border: `1px solid ${colors.text.light}`,
      },
    },
  },
};
