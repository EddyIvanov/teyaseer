import { useContext, useState } from 'react';

import {
  Button,
  CardHeader,
  Flex,
  useDisclosure,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import SelectedConsultants from '../../../HireConsultants/components/Confirmation/components/SelectedConsultants';
import { ContractorContext } from '../../Contractors.context';

import { InfoModal, Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import { sendContractorProcurementVendors } from '@/services/users';

const Confirmation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { vendors, serviceRequestId } = useContext(ContractorContext);
  const style = useMultiStyleConfig('Card', {});
  const [isLoading, setLoading] = useState(false);
  const [caseNumber, setCaseNumber] = useState<string>('');
  const handleSubmit = () => {
    setLoading(true);
    const vendorIds = vendors.map(item => item.id);
    sendContractorProcurementVendors(serviceRequestId, vendorIds)
      .then((res: any) => {
        const caseNumber = res.data.data?.caseNumber;
        setCaseNumber(caseNumber);
        onOpen();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFinishRequest = () => {
    onClose();
    router.push('/dashboard/services/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Flex gap="8" flex={1} overflow={'hidden'}>
      <Flex flex={1} flexDirection="column" gap="8" overflow={'hidden'}>
        <SelectedConsultants
          cardHeader={
            <CardHeader>
              <Text sx={style.headerTitle}>
                {t('portal_hire_contractor_confirmation_title')}
              </Text>
              <Text sx={style.headerSubtitle}>
                {t('portal_hire_contractor_confirmation_subtitle')}
              </Text>
            </CardHeader>
          }
          title={t('portal_your_selected_contractor_title')}
          items={vendors}
        />
        <Text w="100%" maxW={'620px'} my="4">
          {t('portal_confirmation_footer_subtitle').replace(
            '{type}',
            t('portal_contractors')
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
          <Button onClick={handleGoBack} variant={'secondary'}>
            {t('portal_go_back')}
          </Button>
          <Button isLoading={isLoading} onClick={handleSubmit}>
            {t('portal_continue')}
          </Button>
        </Flex>
      </Flex>

      <InfoModal
        icon="checked"
        isOpen={isOpen}
        onClose={handleFinishRequest}
        title={t('portal_confirmation_success_popup_title')}
        info={t(`portal_confirmation_success_popup_subtitle`)}
        serviceRequestId={caseNumber}
      />
    </Flex>
  );
};

export default Confirmation;
