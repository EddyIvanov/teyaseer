import React from 'react';

import { Button, Text, VStack } from '@chakra-ui/react';

import useTranslation from '@/hooks/useTranslate';

type TProps = {
  title: string;
  body: string;
  onClose: () => void;
};

export const ModalBody = ({ title, body, onClose }: TProps) => {
  const { t } = useTranslation();

  return (
    <VStack
      sx={{ maxWidth: { base: '80vw', md: '60vw', lg: '800px' } }}
      gap={{ base: '24px' }}
      px={{ md: 'calc(96px - 32px)' }}
      pt={{ base: '32px ' }}
      pb={'48px'}
    >
      <Text fontSize={{ base: '32px' }}>{title}</Text>
      <Text fontWeight={'light'} textAlign={'start'}>
        {body}
      </Text>
      <Button variant={'primary'} mt={'12px'} onClick={onClose}>
        {t('got_it')}
      </Button>
    </VStack>
  );
};
