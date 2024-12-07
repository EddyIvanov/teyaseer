import { useContext, useState } from 'react';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';

import { createServiceRequestForPersonOfInterest } from '../../Profile.api';

import { Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';

interface IPersonOfDeterminationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PersonOfDeterminationModal = ({
  isOpen,
  onClose,
}: IPersonOfDeterminationModalProps) => {
  const toast = useToast();
  const { user } = useContext(DashboardContext);
  const { updateUserContext } = useContext(DashboardContext);

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClose = () => {
    onClose();
  };

  const handleRequestCall = async () => {
    setIsLoading(true);
    try {
      await createServiceRequestForPersonOfInterest();
      await updateUserContext();
      toast({
        title: t('portal_pod_update_success'),
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
      handleOnClose();
    }
  };
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="6">
        <ModalHeader textAlign="center" fontSize="3xl">
          {t('portal_profile_pod_modal_title')}
        </ModalHeader>
        <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          pb={6}
        >
          <Text fontSize="xl" mb="6">
            {t('portal_profile_pod_modal_description')}
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center" gap={'4'}>
          <Button
            isDisabled={isLoading}
            variant="outline"
            onClick={handleOnClose}
          >
            {t('portal_cancel')}
          </Button>
          {!user?.personOfDeterminationMeetingStatus && (
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={handleRequestCall}
              variant="primary"
              type="submit"
            >
              {t('portal_request_call')}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PersonOfDeterminationModal;
