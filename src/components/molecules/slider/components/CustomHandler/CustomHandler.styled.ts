import { defineStyle, SystemStyleObject } from '@chakra-ui/react';

export const baseStyles = {
  userSelect: 'none',
  position: 'absolute',
  zIndex: 999,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

const directionStyle: {
  [key in TDirection]: SystemStyleObject;
} = {
  left: {
    zIndex: 900,
    left: { base: -10, md: 0 },
    width: { base: '95px', md: '140px' },
    background:
      'linear-gradient(90deg, #FFF 60%, rgba(255, 255, 255, 0.00) 110.83%)',
  },
  right: {
    top: 0,
    right: { base: 0 },
    width: { base: '45px', md: '140px' },
    background:
      'linear-gradient(270deg, #FFF 60%, rgba(255, 255, 255, 0.00) 110.83%)',
  },
};

export const styles = defineStyle((props: any) => {
  const { direction } = props as {
    direction: TDirection;
    disabled: boolean;
  };
  return {
    handler: {
      ...baseStyles,
      ...directionStyle[direction],
    },
  };
});

export default styles;
