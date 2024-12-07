import React, { useContext, useState } from 'react';

import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';

import style from './ProjectInfoModal.style';

import { Icon, Modal } from '@/components';
import { StatusProject } from '@/helpers/statusProject';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import { restartServiceRequest } from '@/services/users';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';
import { ProjectStatus } from '@/types/user.type';

interface ProjectInfoModalProps {
  isProjectInfoModalOpen: boolean;
  toggleProjectInfoModal: () => void;
  projectStatus: ProjectStatus;
}

const ProjectInfoModal = ({
  isProjectInfoModalOpen,
  toggleProjectInfoModal,
  projectStatus,
}: ProjectInfoModalProps) => {
  const { t } = useTranslation();
  const isProjectOnHold = StatusProject.isOnHold(projectStatus);
  const { user, updateUserContext } = useContext(DashboardContext);
  const toast = useToast();

  const [isReactivating, setIsReactivating] = useState(false);

  const handleActivateOnHoldProject = () => {
    setIsReactivating(true);
    restartServiceRequest()
      .then(async () => {
        toast({
          title: t('portal_support_service_request_already_initiated_title'),
          status: 'success',
        });
        await updateUserContext();
        setIsReactivating(false);
        toggleProjectInfoModal();
      })
      .catch(() => {
        setIsReactivating(false);
      });
  };
  return (
    <Modal
      size={'4xl'}
      isOpen={isProjectInfoModalOpen}
      onClose={toggleProjectInfoModal}
    >
      <Flex sx={style.mainContainer}>
        <Icon
          cursor="pointer"
          name={isProjectOnHold ? 'exclamationMark' : 'yellowInfo'}
          width="32px"
          height="32px"
        />

        <Text sx={style.header}>
          {isProjectOnHold
            ? t('project_on_hold_title')
            : t('project_on_going_title')}
        </Text>
        <Box>
          <Text sx={style.body}>
            {isProjectOnHold
              ? t('project_on_hold_description')
              : t('project_on_going_description')}
          </Text>
          {isProjectOnHold && (
            <>
              <Text mt={4}>
                <b>
                  {user?.userInfo?.projectInfo?.onHoldReason &&
                    user.userInfo.projectInfo.onHoldReason}
                </b>
                {user?.userInfo?.projectInfo?.reasonForPuttingOnHold &&
                  ` : ${user.userInfo.projectInfo.reasonForPuttingOnHold}`}
              </Text>
              {user?.isSupportServiceRequestInitiated && (
                <Text
                  mt="20px"
                  fontSize={FontSizes.small}
                  fontWeight={FontWeights.bold}
                >
                  {t('portal_support_service_request_already_initiated_title')}
                </Text>
              )}
            </>
          )}
        </Box>

        <Flex gap={'20px'}>
          <Button variant="secondary" onClick={toggleProjectInfoModal}>
            {t('portal_done')}
          </Button>

          {isProjectOnHold && !user?.isSupportServiceRequestInitiated && (
            <Button
              isLoading={isReactivating}
              variant="primary"
              onClick={handleActivateOnHoldProject}
            >
              {t('portal_project_on_hold_restart_button_title')}
            </Button>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ProjectInfoModal;
