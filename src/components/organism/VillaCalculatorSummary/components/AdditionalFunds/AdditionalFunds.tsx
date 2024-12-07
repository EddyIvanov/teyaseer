import React from 'react';

import { Button, HStack, Text } from '@chakra-ui/react';

import { Icon } from '@/components';
import useTranslation from '@/hooks/useTranslate';

type TProps = {
  existingFunds?: number;
  addFundsHandler: () => void;
};

export const AdditionalFunds = ({ existingFunds, addFundsHandler }: TProps) => {
  const { t } = useTranslation();

  return (
    <HStack justifyContent={'space-between'} w={'100%'}>
      {existingFunds ? (
        <>
          <strong>{t('portal_profile_additional_funds')}:</strong>{' '}
          <Text>
            {t('portal_AED')} {existingFunds.toLocaleString() || 0}
          </Text>
          <Button onClick={addFundsHandler} variant="link">
            {t('portal_edit')}
          </Button>
        </>
      ) : (
        <Button
          variant={'link'}
          rightIcon={<Icon name="plus" w="18px" h="18px" />}
          onClick={addFundsHandler}
        >
          {t('add_funds')}
        </Button>
      )}
    </HStack>
  );
};
