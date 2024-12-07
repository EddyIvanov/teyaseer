import { defineStyle } from '@chakra-ui/react';

const style = defineStyle(({ showCloseButton, size }: any) => {
  return {
    root: {
      ...{
        '&[data-title=true]': {
          '.chakra-modal__body': {
            p: {
              base: '0 24px 24px',
              md: '0 32px 32px',
            },
          },
        },
        '&[data-title=false]': {
          '.chakra-modal__body': {
            p: {
              base: showCloseButton ? '66px 24px 24px' : '24px',
              md: showCloseButton ? '96px 32px 32px' : '32px',
            },
          },
        },
      },
      ...(!size
        ? {
            maxW: 'fit-content',
            maxH: 'fit-content',
          }
        : {}),
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      fontSize: { base: 'medium', md: 'large' },
      minHeight: { base: '64px', md: '88px' },
      p: {
        base: '0 55px 0 24px',
        md: '0 60px 0 32px',
      },
    },
    headerInnerContainer: {
      display: '-webkit-box',
      WebkitLineClamp: '3',
      webkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',

      '&[data-title-center=true]': {
        textAlign: 'center',
        width: '100%',
      },
    },
    footer: {
      p: {
        base: '0 24px 24px',
        md: '0 32px 32px',
      },
    },
    closeButton: {
      _hover: {
        bg: 'none',
      },
      top: {
        base: '23px',
        md: '38px',
      },
      _rtl: {
        left: {
          base: '24px',
          md: '32px',
        },
        right: 'unset',
      },
      _ltr: {
        right: {
          base: '24px',
          md: '32px',
        },
      },
      svg: {
        height: {
          base: '18px',
          md: '21px',
        },
        width: {
          base: '18px',
          md: '21px',
        },
      },
    },
  };
});
export default style;
