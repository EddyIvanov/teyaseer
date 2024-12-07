import { useContext, useState } from 'react';

import { Button, useToast } from '@chakra-ui/react';

import { updateMe } from '../../Profile.api';
import { IMeUpdate } from '../../Profile.type';
import InfoPanel from '../InfoPanel';
import PersonOfDeterminationModal from '../PersonOfDeterminstaionModal/PersonOfDeterminationModal';

import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';

const PersonOfDetermination = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const { updateUserContext } = useContext(DashboardContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDismiss = async () => {
    try {
      setIsLoading(true);
      const payload: IMeUpdate = {
        userInfo: {
          isPersonOfDetermination: false,
        },
      };
      await updateMe(payload);
      await updateUserContext();
      toast({
        title: t('portal_profile_update_success'),
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <InfoPanel
        title={t('portal_profile_pod_title')}
        description={t('portal_profile_pod_help_text')}
      >
        <Button onClick={() => setIsModalOpen(true)}>
          {t('portal_find_out_more')}
        </Button>
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          onClick={handleDismiss}
          variant="link"
        >
          {t('portal_dismiss')}
        </Button>
      </InfoPanel>

      <PersonOfDeterminationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(state => !state)}
      />
    </>
  );
};
export default PersonOfDetermination;
