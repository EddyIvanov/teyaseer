import React, { useContext, useEffect, useState } from 'react';

import { Button, Tooltip } from '@chakra-ui/react';

import HelpSubmissionForm from '../HelpSubmissionForm/HelpSubmissionForm';
import { ServiceWithReason } from '../HelpSubmissionForm/HelpSubmissionForm.type';
import InfoPanel from '../InfoPanel';

import { Modal } from '@/components';
import { StatusProject } from '@/helpers/statusProject';
import useTranslation from '@/hooks/useTranslate';
import Client from '@/lib/contentFul';
import { DashboardContext } from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';
import FontWeights from '@/styles/themes/brand/fontWeights';

function HelpSubmissionFormSection() {
  const { locale } = useContext(Context);
  const { user } = useContext(DashboardContext);
  const { t } = useTranslation();
  const [serviceWithReasons, setServiceWithReasons] = useState<
    ServiceWithReason[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadServiceWithReasons = async () => {
    try {
      const response = (await Client.getEntries({
        content_type: 'serviceWithReason',
        locale: locale,
        'fields.reasonsList[exists]': true,
        order: 'fields.order' as any,
        include: 10,
      })) as any;
      setServiceWithReasons(response.items);
    } catch {
      setServiceWithReasons([]);
    }
  };

  useEffect(() => {
    loadServiceWithReasons();
  }, []);

  const isProjectOnHold = StatusProject.isOnHold(
    user?.userInfo.projectInfo.projectStatus
  );
  const isDisabled = user?.isSupportServiceRequestInitiated || isProjectOnHold;
  const disabledMessage = user?.isSupportServiceRequestInitiated
    ? 'portal_support_request_already_submitted_title'
    : 'portal_support_request_project_on_hold_text';

  return (
    <>
      <InfoPanel
        title={t('portal_help_submission_section_title')}
        description={t('portal_help_submission_section_description')}
      >
        <Tooltip
          label={t(`${disabledMessage}`)}
          placement="top"
          hasArrow
          isDisabled={!isDisabled}
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            width="fit-content"
            isDisabled={isDisabled}
          >
            {t('portal_submit')}
          </Button>
        </Tooltip>
      </InfoPanel>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={'6xl'}
        title={t('portal_select_a_reason_for_a_service')}
        contentStyle={{
          height: {
            base: '100vh',
            sm: 'fit-content',
          },
          '.chakra-modal__header': {
            fontWeight: {
              base: FontWeights.medium,
              md: FontWeights.normal,
            },
            minH: 'fit-content',
            pt: { base: '20px', md: '32px' },
            mb: '20px',
          },
        }}
      >
        <HelpSubmissionForm
          serviceWithReasons={serviceWithReasons}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default HelpSubmissionFormSection;
