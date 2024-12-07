import { ReactNode } from 'react';

import { Button, Flex, VStack } from '@chakra-ui/react';

import { Modal, Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';

interface ConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
}

function ConfirmModal(props: ConfirmModalProps) {
  const { t } = useTranslation();
  const {
    isOpen,
    onCancel,
    onConfirm,
    title,
    description,
    isLoading,
    confirmText,
    cancelText,
    children,
  } = props;
  return (
    <Modal
      onClose={onCancel}
      isOpen={isOpen}
      showCloseButton={false}
      size={'6xl'}
    >
      <VStack gap="40px" justifyContent={'space-around'}>
        {title && (
          <Text
            sx={{
              fontSize: '32px',
              textAlign: 'center',
              whiteSpace: 'pre-wrap',
            }}
          >
            {title}
          </Text>
        )}

        {description && (
          <Text
            sx={{
              fontSize: '16px',
              textAlign: 'center',
              whiteSpace: 'pre-wrap',
            }}
          >
            {description}
          </Text>
        )}
        {children}
        {(cancelText || confirmText) && (
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent="center"
            gap={6}
          >
            {cancelText && (
              <Button
                variant="outline"
                isDisabled={isLoading}
                onClick={onCancel}
                minW={'150px'}
              >
                {cancelText || t('portal_cancel')}
              </Button>
            )}
            {confirmText && (
              <Button isLoading={isLoading} onClick={onConfirm} minW={'150px'}>
                {confirmText || t('portal_confirm')}
              </Button>
            )}
          </Flex>
        )}
      </VStack>
    </Modal>
  );
}

export default ConfirmModal;
