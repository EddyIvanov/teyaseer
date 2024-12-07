import React from 'react';

import { VStack } from '@chakra-ui/react';

import { Icon, Modal } from '@/components';
import Text from '@/components/atoms/Text';
import style from '@/components/molecules/VillaDetails/VillaDetails.style';
import useTranslation from '@/hooks/useTranslate';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  hasIcon?: boolean;
};

export const SummaryOverrideConfirmationModal = ({
  isOpen,
  onClose,
  title,
  children,
  hasIcon = true,
}: TProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      closeOnOverlayClick={false}
      size={'5xl'}
    >
      <VStack
        p={{
          base: '0px',
          lg: '32px',
        }}
        gap={{
          base: '24px',
          lg: '32px',
        }}
        sx={{
          maxWidth: '70vw',
        }}
      >
        {hasIcon && <Icon name="jaggedCheck" w="64px" h="64px" />}
        {title && (
          <Text textAlign={'center'} sx={style.savedVillaModalTitle}>
            {t(title)}
          </Text>
        )}
        {children}
      </VStack>
    </Modal>
  );
};
