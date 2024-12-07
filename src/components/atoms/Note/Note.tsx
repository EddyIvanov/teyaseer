import React from 'react';

import { HStack, Text } from '@chakra-ui/react';

import { Icon } from '@/components';
import useTranslation from '@/hooks/useTranslate';

type TProps = {
  note: string;
};

export const Note = ({ note = '' }: TProps) => {
  const { t } = useTranslation();
  return (
    <HStack
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        width: '100%',
        background: '#FFD8DA',
        borderRadius: '12px',
        p: '16px',
        marginTop: '24px',
      }}
    >
      <Icon name="exclamationMark" mt={2} height="16px" width="16px" />
      <Text fontSize={'12px'}>{t(note)}</Text>
    </HStack>
  );
};
