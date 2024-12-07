import colors from '@/styles/themes/brand/colors';

const getSwiperPaginationBulletStyle = (
  variant: 'light' | 'dark' | 'calculator'
) => {
  if (variant === 'light') {
    return {
      backgroundColor: 'transparent',
      border: {
        base: `1px solid ${colors.secondaryHover}`,
        lg: `1px solid ${colors.text.light}`,
      },
    };
  } else if (variant === 'dark') {
    return {
      backgroundColor: 'transparent',
      border: `1px solid ${colors.secondaryHover}`,
    };
  }
};

const getSwiperPaginationActiveBulletStyle = (
  variant: 'light' | 'dark' | 'calculator'
) => {
  if (variant === 'light') {
    return {
      backgroundColor: {
        base: colors.secondaryHover,
        lg: colors.text.light,
      },
      border: {
        base: `1px solid ${colors.secondaryHover}`,
        lg: `1px solid ${colors.text.light}`,
      },
    };
  } else if (variant === 'dark') {
    return {
      backgroundColor: colors.secondaryHover,
      border: `1px solid ${colors.secondaryHover}`,
    };
  }
};

const baseStyle = ({
  width = '100%',
  height = '100%',
  variant = 'light',
}: {
  width: string;
  height: string;
  variant: 'light' | 'dark' | 'calculator';
}) => {
  return {
    root: {
      w: width,
      h: height,
      position: 'relative',
      '.swiper': {
        position: 'relative',
        h: '100%',
      },
      '.swiper-pagination-horizontal': {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        justifyContent: { base: 'center', xl: 'unset' },
        paddingX: { base: '0', xl: '100px' },
        marginTop: '-34px',
        paddingBottom: '21px',
        top: { base: '0', xl: '-18px' },
        zIndex: 10,
        '.swiper-pagination-bullet': {
          borderRadius: '50%',
          w: '12px',
          h: '12px',
          opacity: '1',
          ...getSwiperPaginationBulletStyle(variant),
        },
        '.swiper-pagination-bullet.swiper-pagination-bullet-active': {
          ...getSwiperPaginationActiveBulletStyle(variant),
        },
      },
      '.swiper-pagination-v': {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        bottom: 0,
        margin: 'auto 0',
        height: '100%',
        left: '100px',
        justifyContent: 'center',
        gap: '20px',
        '.swiper-pagination-bullet': {
          borderRadius: '50%',
          w: '12px',
          h: '12px',
          background: '#225399',
          opacity: 0.3,
        },
        '.swiper-pagination-bullet.swiper-pagination-bullet-active': {
          opacity: 1,
          w: '12px',
          h: '24px',
          borderRadius: '13px',
        },
      },
      '.swiper-button-prev.swiper-button-disabled,.swiper-button-next.swiper-button-disabled':
        {
          display: 'none',
        },
      '.swiper-button-prev': {
        _ltr: {
          left: 0,
          _after: {
            transform: 'rotate(180deg)',
          },
          background:
            variant === 'calculator'
              ? 'linear-gradient(90deg, #FFF 60%, rgba(255, 255, 255, 0.00) 110.83%)'
              : null,
        },
        _rtl: {
          right: 0,

          background:
            variant === 'calculator'
              ? 'linear-gradient(270deg, #FFF 60%, rgba(255, 255, 255, 0.00) 110.83%)'
              : null,
        },
      },
      '.swiper-button-next': {
        _ltr: {
          right: 0,
          background:
            variant === 'calculator'
              ? 'linear-gradient(270deg, #FFF 60%, rgba(255, 255, 255, 0.00) 110.83%)'
              : null,
        },
        _rtl: {
          left: 0,
          _after: {
            transform: 'rotate(180deg)',
          },

          background:
            variant === 'calculator'
              ? 'linear-gradient(90deg, #FFF 60%, rgba(255, 255, 255, 0.00) 110.83%)'
              : null,
        },
      },
      '.swiper-button-prev,.swiper-button-next': {
        width: { base: '95px', md: '140px' },
        display:
          variant !== 'calculator'
            ? {
                base: 'none',
                lg: 'flex',
              }
            : null,
        _after: {
          background:
            variant === 'calculator'
              ? 'url(/arrowIconCircle.svg) no-repeat'
              : 'url(/filledArrowIconCircle.svg) no-repeat',
          width: { base: '32px', lg: '45px' },
          height: { base: '32px', lg: '45px' },
          content: "''",
        },
      },
    },
  };
};
const theme = { baseStyle };
export default theme;
