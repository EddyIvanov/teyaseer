import { useContext, useState } from 'react';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import ConsultantBrief from './components/ConsultantBrief';
import LoanDetails from './components/LoanDetails';
import SelectedConsultants from './components/SelectedConsultants';
import VillaDesign from './components/VillaDesign';
import YourVision from './components/YourVision';
import { updateMe } from '../../../Profile/Profile.api';
import { useGetPreselectedVilla } from '../../../Profile/hooks/useGetPreselectedVilla';
import { ConsultantContext } from '../../Consultants.context';

import { InfoModal, Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import { sendConsultantProcurementVendors } from '@/services/users';

const Confirmation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { vendors, yourVision, serviceRequestId } =
    useContext(ConsultantContext);
  const { villa } = useGetPreselectedVilla();
  const [caseNumber, setCaseNumber] = useState<string>('');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [posting, setPosting] = useState<boolean>(false);

  const handleSubmit = () => {
    setPosting(true);
    Promise.all([handleUpdateProfileVision(), handleSubmitConsultantBrief()])
      .catch(() => {
        setPosting(false);
      })
      .then(() => {
        setPosting(false);
        onOpen();
      });
  };

  const handleFinished = () => {
    onClose();
    router.push(`/dashboard/services/`);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleUpdateProfileVision = () => {
    return new Promise((resolve: any) => {
      if (yourVision !== '') {
        updateMe({
          userInfo: {
            plotInfo: {
              visionForDreamHome: yourVision,
            },
          },
        }).finally(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  };
  const handleSubmitConsultantBrief = () => {
    return new Promise((resolve: any, reject: any) => {
      const vendorIds = vendors.map(item => item.id);
      sendConsultantProcurementVendors(serviceRequestId, vendorIds)
        .then((res: any) => {
          const caseNumber = res.data.data.caseNumber;
          setCaseNumber(caseNumber);
          onOpen();
        })
        .catch(() => {
          reject();
        })
        .finally(() => {
          resolve();
        });
    });
  };

  return (
    <Flex gap="8" flex={1} overflow={'hidden'}>
      <Flex flex={1} flexDirection="column" gap="8" overflow={'hidden'}>
        <ConsultantBrief />
        <LoanDetails />
        {villa && <VillaDesign {...villa} />}
        {/* <RoomDetails /> */}
        <YourVision />
        <SelectedConsultants
          title={t('portal_your_selected_consultants_title')}
          items={vendors}
        />
        <Text w="100%" maxW={'620px'} my="4">
          {t('portal_confirmation_footer_subtitle').replace(
            '{type}',
            t('portal_consultants')
          )}
        </Text>
        <Flex
          sx={{
            flex: 1,
            w: '100%',
            justifyContent: 'flex-start',
            gap: '20px',
          }}
        >
          <Button
            isDisabled={posting}
            onClick={handleGoBack}
            variant={'secondary'}
          >
            {t('portal_go_back')}
          </Button>
          <Button isLoading={posting} onClick={handleSubmit}>
            {t('portal_confirm_button')}
          </Button>
        </Flex>
      </Flex>
      <InfoModal
        icon="checked"
        isOpen={isOpen}
        onClose={handleFinished}
        title={t('portal_confirmation_success_brief_popup_title')}
        info={t(`portal_confirmation_success_brief_popup_subtitle`)}
        serviceRequestId={caseNumber}
      />
    </Flex>
  );
};

export default Confirmation;
