import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import style from './InfoBox.style';

import { Icon } from '@/components';
import { IconNames } from '@/components/atoms/Icon/Icon';

const InfoBox = ({ iconName, text }: { iconName: IconNames; text: string }) => {
  return (
    <Flex sx={style.infoBox}>
      <Icon name={iconName} width="24px" minW={'24px'} height="24px" />
      <Text>{text}</Text>
    </Flex>
  );
};

export default InfoBox;
