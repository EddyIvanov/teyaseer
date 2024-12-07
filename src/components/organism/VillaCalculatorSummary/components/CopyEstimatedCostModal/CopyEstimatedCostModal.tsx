import React from 'react';

import { Button, HStack } from '@chakra-ui/react';

import { ConfirmModal, Input } from '@/components';
import useTranslation from '@/hooks/useTranslate';

type TProps = {
  showCopyModalOpen: boolean;
  shareLink: string;
  isLoading: boolean;
  hasCopied: boolean;
  handleCancelShareLink: () => void;
  onCopy: () => void;
};

export const CopyEstimatedCostModal = ({
  showCopyModalOpen,
  handleCancelShareLink,
  shareLink,
  isLoading,
  hasCopied,
  onCopy,
}: TProps) => {
  const { t } = useTranslation();

  return (
    <ConfirmModal
      title={t('copy_generated_link')}
      isOpen={showCopyModalOpen}
      onCancel={handleCancelShareLink}
    >
      <Input
        placeholder={shareLink}
        label={t('shareLink')}
        mr={2}
        id={'share-input'}
        isDisabled
      />

      <HStack>
        <Button
          variant="outline"
          isLoading={isLoading}
          onClick={handleCancelShareLink}
          minW={'150px'}
        >
          {t('portal_cancel')}
        </Button>
        <Button isLoading={isLoading} onClick={onCopy} minW={'150px'}>
          {hasCopied ? t('copied') : t('copy')}
        </Button>
      </HStack>
    </ConfirmModal>
  );
};
