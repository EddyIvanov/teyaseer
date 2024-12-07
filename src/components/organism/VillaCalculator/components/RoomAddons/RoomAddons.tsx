import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { ToggleSwitch } from '@/components/atoms/ToggleSwitch';

type TProps = {
  title: string;
  checked: boolean;
  onChange: () => void;
};

export const RoomAddons = ({ title, checked, onChange }: TProps) => {
  return (
    <Flex
      direction={'row'}
      justifyContent={'space-between'}
      w={'100%'}
      alignItems={'center'}
    >
      <Text>{title}</Text>
      <ToggleSwitch onChange={onChange} checked={checked} />
    </Flex>
  );
};
