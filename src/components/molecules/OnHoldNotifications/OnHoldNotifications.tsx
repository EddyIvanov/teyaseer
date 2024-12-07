import { useContext, useState } from 'react';

import { Button, useToast } from '@chakra-ui/react';

import { OnHoldNotificationProps } from './OnHoldNotifications.type';

import { Icon, InPageNotification, Link } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import { restartServiceRequest } from '@/services/users';

const OnHoldNotifications = ({ onHoldReActivate }: OnHoldNotificationProps) => {
  const { user, updateUserContext } = useContext(DashboardContext);
  const { t } = useTranslation();
  const [isReactivating, setIsReactivating] = useState(false);
  const toast = useToast();

  const projectInfo = user?.userInfo?.projectInfo;
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
        onHoldReActivate && onHoldReActivate();
      })
      .catch(() => {
        setIsReactivating(false);
      });
  };

  return (
    <InPageNotification
      title={t('portal_project_on_hold_title')}
      description={t('portal_project_on_hold_text').replace(
        '{{date}}',
        projectInfo?.projectOnHoldDate || ''
      )}
      rightComponent={
        <Button
          isLoading={isReactivating}
          onClick={handleActivateOnHoldProject}
          as={Link}
          href={`#`}
          variant={'link'}
          fontSize="1.4rem"
          textTransform="none"
          placeItems={'center'}
          gap={'5px'}
        >
          {t('portal_project_on_hold_restart_button_title')}

          <Icon name="roundedTick" height="16px" className="no_flip" />
        </Button>
      }
    />
  );
};

export default OnHoldNotifications;
