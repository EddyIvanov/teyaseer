import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const baseStyle = defineStyle((props: any) => {
  const { fixFooter = false } = props;
  return {
    root: {
      position: 'relative',
      bottom: fixFooter ? 0 : 'unset',
      width: fixFooter ? '100%' : 'unset',
      zIndex: 1,
      p: { base: '10px 0', md: '20px 0', '2xl': '30px 0' },
      background: colors.backgroundGrey,
      '.container': {
        gap: '9.6px',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    logos_box: {
      gap: { base: '24px', lg: '32px' },
      mt: { base: '10px', xl: 'unset' },
      mb: { base: '10px', xl: 'unset' },
      justifyContent: 'center',
      alignItems: 'center',
      img: {
        height: 'fit-content',
      },
      '.logos-ADHA-0': {
        mb: '4px',
      },
      '.divider': {
        width: '1px',
        height: '18px',
        background: { base: '#001731;', xl: 'rgba(0, 23, 49, 0.32)' },
        mx: '16px',
      },
    },

    copy_right: {
      fontWeight: 400,
      fontSize: FontSizes.xSmall,
      color: 'rgba(29, 29, 29, 0.56)',
      mt: { base: '5px', xl: '5px' },
    },
    nav: {
      gap: '12px',
      justifyContent: 'center',
      alignitems: 'center',
      position: 'relative',
      a: {
        fontWeight: 400,
        color: '#1D1D1D',
        position: 'relative',
        fontSize: FontSizes.small,
        _rtl: {
          paddingLeft: '12px',
          '&:not(:last-child)': {
            '&:after': {
              left: 0,
            },
          },
        },
        _ltr: {
          paddingRight: '12px',
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
            top: '0',
            bottom: 0,
            height: '80%',
            w: '1.5px',
            bg: 'black',
          },
        },
      },
    },
    nav_box: {
      flexDirection: { base: 'column', lg: 'row' },
      gap: { base: '10px', xl: 'unset' },
      justifyContent: 'space-between',
      alignItems: { base: 'flex-start', lg: 'center' },
      '.grid': {
        div: {
          position: 'relative',
          _rtl: {
            '&:not(:nth-of-type(2n)):not(:last-child)': {
              pl: '24px',
            },
            '&:not(:nth-of-type(2n)):not(:last-child)::after': {
              left: 0,
            },
          },
          _ltr: {
            '&:not(:nth-of-type(2n)):not(:last-child)': {
              pr: '24px',
            },
            '&:not(:nth-of-type(2n)):not(:last-child)::after': {
              right: 0,
            },
          },
          '&:not(:nth-of-type(2n)):not(:last-child)::after': {
            content: "''",
            borderLeft: '1px solid black',
            position: 'absolute',
            top: '0',
            bottom: '0',
            maxHeight: '24px',
            margin: 'auto',
          },
        },
      },
    },

    nav_style: {
      display: { base: 'none', lg: 'flex' },
      minHeight: '32px',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
    social_box: {
      mb: '14px',
      display: { base: 'none', lg: 'block' },
      flexDirection: { base: 'column', xl: 'row' },
      mt: { base: '16px', xl: 'unset' },
      justifyContent: 'space-between',
      alignItems: { base: 'flex-start', xl: 'center' },
      gap: { base: '16px', xl: 'unset' },
    },
  };
});

export default baseStyle;
