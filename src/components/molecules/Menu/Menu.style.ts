import { ThemingProps, defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

type BaseStyleProps = ThemingProps & {
  isScrolled: boolean;
};

const style = ({ isScrolled }: BaseStyleProps) => {
  const color = isScrolled ? colors.text.dark : colors.text.light;
  return defineStyle({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      height: '100%',
      '.logo-link': {
        color,
        _rtl: {
          ml: { base: '0', '2xl': '80px' },
        },
        _ltr: {
          mr: { base: '0', '2xl': '80px' },
        },
        svg: {
          height: { base: 'logoMobileSize', '2xl': 'logoDesktopSize' },
        },
      },
      '.language_btn': {
        display: { base: 'none', lg: 'flex' },
        alignSelf: 'center',
        position: 'relative',
        marginLeft: '12px',
        color,
        fontSize: FontSizes.small,
        _rtl: {
          top: '2px',
        },
        _ltr: {
          top: '-2px',
        },
      },
      '.divider': {
        display: { base: 'none', lg: 'flex' },
        width: '1px',
        h: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.32)',
        mx: { base: '14px', xl: '48px' },
      },
      '.get_started': {
        alignSelf: 'center',
        display: { base: 'none', lg: 'flex' },
        h: '54px',
        alignItems: 'center',
        position: 'relative',
      },
      '.mobileMenuBtn': {
        display: { base: 'flex', lg: 'none' },
        button: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        svg: {
          fill: color,
        },
      },
      nav: {
        alignSelf: 'center',
        height: '100%',
        display: { base: 'none', lg: 'flex' },
        gap: { base: '8px', xl: '20px' },
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        a: {
          textTransform: 'uppercase',
          fontWeight: FontWeights.semibold,
          color,
          position: 'relative',
          fontSize: {
            base: FontSizes.xSmall,
            '2xl': FontSizes.small,
          },
          _rtl: {
            paddingLeft: { base: '8px', xl: '20px' },
            '&:not(:last-child)': {
              '&:after': {
                left: 0,
              },
            },
          },
          _ltr: {
            paddingRight: { base: '8px', xl: '20px' },
            '&:not(:last-child)': {
              '&:after': {
                right: 0,
              },
            },
          },

          '&:not(:last-child)': {
            '&:after': {
              content: '""',
              position: 'absolute',
              m: 'auto',
              top: 0,
              bottom: 0,
              height: '80%',
              w: '1px',
              bg: 'white',
            },
          },
        },
      },
    },
    desktopMenuList: {
      backgroundColor: 'white',
      textTransform: 'uppercase',
      borderRadius: '0px',
      padding: '0px',
      boxShadow: '0 1px 16px 0 rgba(0, 0, 0, 0.08)',
      minWidth: '330px',
    },
    customerDesktopMenuList: {
      display: 'flex',
      gap: '24px',
      flexDirection: 'column',
      padding: '32px 30px 24px 30px',
    },
    signUpOverlay: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      zIndex: 1,
    },
  });
};

export default style;
