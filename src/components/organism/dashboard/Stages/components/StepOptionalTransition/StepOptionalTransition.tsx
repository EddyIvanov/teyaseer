import React, { useState } from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { StepOptionalTransition } from '../Service/Service.type';

import { Icon, Modal } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import { activateOptionalStep } from '@/services/users';
import FontWeights from '@/styles/themes/brand/fontWeights';

type StepOptionalTransitionProps = {
  classname?: string;
  StepOptionalTransition: StepOptionalTransition;
  serviceRequestID: string;
};

const StepOptionalTransition = ({
  classname,
  StepOptionalTransition,
  serviceRequestID,
}: StepOptionalTransitionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { t } = useTranslation();
  const router = useRouter();

  const handleModalOnClose = () => {
    setIsModalOpen(false);
  };

  const confirmModalOnClose = () => {
    setIsConfirmModalOpen(false);
    setIsModalOpen(true);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleLinkClicked = async () => {
    setIsLoading(true);
    try {
      const response = await activateOptionalStep(
        serviceRequestID,
        StepOptionalTransition.targetStatus
      );
      if (response.status === 200 && response?.data?.data?.redirectUrl) {
        router.push(response.data.data.redirectUrl);
      }
      setIsModalOpen(false);
    } catch (e: any) {
      if (
        e?.response?.data?.error?.details?.errorCode?.appKey ===
        'error.customerPortalRetenderMaxUsesConsumedError'
      ) {
        setIsConfirmModalOpen(true);
        setIsModalOpen(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmModalSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await activateOptionalStep(
        serviceRequestID,
        StepOptionalTransition.targetStatus,
        true
      );
      if (response.status === 200) {
        router.reload();
      }
    } catch {
      /* empty */
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <Flex {...(classname && { className: classname })}>
      <Flex
        gap="20px"
        flexDirection={{ base: 'column', md: 'row' }}
        placeContent={{ base: 'flex-start', md: 'space-between' }}
        placeItems={{ base: 'flex-start', md: 'center' }}
        width={'100%'}
      >
        <Text flex={1} fontWeight={FontWeights.bold}>
          {StepOptionalTransition?.displayTitle}
        </Text>
        <Button
          isLoading={isLoading}
          variant="link"
          onClick={handleModalOpen}
          rightIcon={<Icon name={StepOptionalTransition?.icon ?? 'arrow'} />}
          marginEnd={'10px'}
        >
          {StepOptionalTransition?.cta}
        </Button>
      </Flex>
      {/* First dialog */}
      <Modal
        showCloseButton={false}
        size={'5xl'}
        isOpen={isModalOpen}
        onClose={handleModalOnClose}
        title={t('portal_retender_suggestions_title')}
        isTitleCentered
      >
        <Text>{t('portal_retender_suggestions_text')}</Text>
        <Flex
          justifyContent="center"
          width="100%"
          mt="30px"
          gap="20px 40px"
          flexWrap="wrap"
        >
          <Button onClick={handleModalOnClose} variant="outline">
            {t('portal_go_back')}
          </Button>
          <Button onClick={handleLinkClicked} isLoading={isLoading}>
            {StepOptionalTransition?.cta}
          </Button>
        </Flex>
      </Modal>

      {/* reconfirm deactivation dialog */}
      <Modal
        size={'3xl'}
        isOpen={isConfirmModalOpen}
        onClose={confirmModalOnClose}
        title={t('portal_retender_suggestions_title')}
        isTitleCentered
      >
        <Text>{t('portal_retender_maxusage_reconfirm_deactivation')}</Text>

        <Flex justifyContent="center" mt="30px">
          <Button
            onClick={handleConfirmModalSubmit}
            variant="outline"
            isLoading={isLoading}
          >
            {t('portal_confirm')}
          </Button>
        </Flex>
      </Modal>
    </Flex>
  );
};

export default StepOptionalTransition;
