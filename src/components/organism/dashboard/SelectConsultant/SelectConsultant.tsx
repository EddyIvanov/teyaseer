/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  VStack,
  useDisclosure,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { IConsultantType } from '../HireConsultants/Consultants.type';
import { ConsultantsList } from '../HireConsultants/components';

import { InfoModal, Text } from '@/components';
import AppRoutes from '@/constants/AppRoutes';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import {
  getSelectedConsultantList,
  setAwardedConsultant,
} from '@/services/users';

function SelectConsultant() {
  const { updateUserContext } = useContext(DashboardContext);
  const router = useRouter();
  const { serviceRequestId } = router.query;
  const { t } = useTranslation();
  const cardStyle = useMultiStyleConfig('Card', {});
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<IConsultantType[]>([]);
  const [selectedItem, setSelectedItem] = useState<IConsultantType | undefined>(
    undefined
  );
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caseNumber, setCaseNumber] = useState<string>('');

  useEffect(() => {
    if (router.isReady && serviceRequestId) {
      getSelectedConsultantList(serviceRequestId as string)
        .then(res => {
          setItems(res.data.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router, serviceRequestId]);

  const handleSubmit = async () => {
    if (selectedItem) {
      setIsPosting(true);
      setAwardedConsultant(selectedItem.id, serviceRequestId as string)
        .then(res => {
          const caseNumber = res.data.data.caseNumber;
          setCaseNumber(caseNumber);
          return updateUserContext();
        })
        .then(() => {
          onOpen();
        })
        .finally(() => {
          setIsPosting(false);
        });
    }
  };

  const handleFinished = () => {
    onClose();
    router.push(AppRoutes.Dashboard.Home);
  };

  return (
    <Flex gap="8" flex={1} overflow={'hidden'}>
      <Flex flex={1} flexDirection="column" gap="8" overflow={'hidden'}>
        <Card>
          <CardHeader>
            <VStack gap={'20px'} alignItems={'flex-start'}>
              <Text sx={{ ...cardStyle.headerTitle, ...cardStyle.guideTitle }}>
                {t('portal_select_consultant_title')}
              </Text>
              <Text sx={cardStyle.headerSubtitle}>
                {t('portal_select_consultant_subtitle')}
              </Text>
            </VStack>
          </CardHeader>
          <Divider />
          <CardBody>
            <ConsultantsList
              simpleMode={true}
              items={items}
              loading={loading}
              maxSelectable={10}
              onSelectConsultant={(items: IConsultantType[]) => {
                if (items.length > 1) {
                  setSelectedItem(items[1]);
                } else if (items.length === 1) {
                  setSelectedItem(items[0]);
                } else {
                  setSelectedItem(undefined);
                }
              }}
              selectedItems={selectedItem ? [selectedItem] : []}
            />
          </CardBody>
          <CardFooter>
            <Flex
              sx={{
                flex: 1,
                w: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                isDisabled={!selectedItem?.id}
                isLoading={isPosting}
                onClick={handleSubmit}
              >
                {t('portal_confirm_button')}
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
      <InfoModal
        icon="checked"
        isOpen={isOpen}
        onClose={handleFinished}
        title={t('portal_select_consultant_success_popup_title')}
        info={t('portal_select_consultant_success_popup_description')}
        serviceRequestId={caseNumber}
      />
    </Flex>
  );
}

export default SelectConsultant;
