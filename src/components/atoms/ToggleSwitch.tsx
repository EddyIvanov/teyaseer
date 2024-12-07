import React from 'react';

import { Switch } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

type TProps = {
  checked: boolean;
  onChange: () => void;
};

export const ToggleSwitch = ({ checked, onChange }: TProps) => {
  return (
    <Switch
      isChecked={checked}
      onChange={onChange}
      sx={{
        '.chakra-switch__track': {
          bg: '#e9e9eb',
          _checked: { bg: colors.primary },
          _focus: { boxShadow: 'none' },
          width: '49px',
          height: '28px',
          borderRadius: 'full',
        },
        '.chakra-switch__thumb': {
          width: '27px',
          height: '27px',
          marginTop: '.3px',
          transform: ' translateX(1px)',
          _rtl: {
            transform: 'translateX(-21px)',
          },
          boxShadow: '3px 5px 38px -16px rgba(0,0,0,0.75)',
          _checked: {
            transform: ' translateX(21px)',
            _rtl: {
              transform: 'translateX(0px)',
            },
          },
        },
      }}
    />
  );
};
