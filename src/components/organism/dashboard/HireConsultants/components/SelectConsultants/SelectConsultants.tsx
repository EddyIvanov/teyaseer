import { useContext, useEffect, useState } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Tooltip,
  VStack,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { ISelectConsultants } from './SelectConsultants.type';
import { ConsultantContext } from '../../Consultants.context';
import { IConsultantType } from '../../Consultants.type';
import BucketList from '../BucketList';
import ConsultantsList from '../ConsultantsList';

import { Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import {
  createConsultantServiceRequest,
  getBidderListConfiguration,
  getConsultantBidderList,
} from '@/services/users';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const SelectConsultants = (props: ISelectConsultants) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { serviceRequestId } = router.query;
  const { onSubmit } = props;
  const cardStyle = useMultiStyleConfig('Card', {});
  const [loading, setLoading] = useState<boolean>(true);
  const { updateContextState, bidderList, ...contextData } =
    useContext(ConsultantContext);
  const [isRegenerate, setIsRegenerate] = useState<boolean>(false);
  const [isConfigLoaded, setIsConfigLoaded] = useState<boolean>(false);
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };
  const handleSelectConsultant = (items: IConsultantType[]) => {
    updateContextState({ vendors: items });
  };

  useEffect(() => {
    getBidderListConfiguration()
      .then(res => {
        const minimums = res.data.data.filter(
          (itm: any) =>
            itm.DeveloperName === 'Minimum_Bidders_Selection_Required'
        );
        const minimum: number = minimums[0].DTS_Consultant_procurement__c;
        const maximums = res.data.data.filter(
          (itm: any) =>
            itm.DeveloperName === 'Maximum_Bidders_Selection_Required'
        );
        const maximum: number = maximums[0].DTS_Consultant_procurement__c;
        updateContextState({ minSelected: minimum, maxSelected: maximum });
      })
      .finally(() => {
        setIsConfigLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (bidderList.length === 0) {
      handleLoadBidderList();
    } else {
      setLoading(false);
    }
  }, [contextData.serviceRequestId, bidderList, isConfigLoaded]);

  useEffect(() => {
    if (router.isReady && !contextData.serviceRequestId) {
      if (serviceRequestId) {
        updateContextState({ serviceRequestId: serviceRequestId as string });
      } else {
        createServiceRequestId();
      }
    }
  }, [router, serviceRequestId]);

  const handleLoadBidderList = () => {
    if (contextData.serviceRequestId && isConfigLoaded) {
      getConsultantBidderList(
        contextData.serviceRequestId,
        contextData.maxSelected
      )
        .then(res => {
          updateContextState({ bidderList: res.data.data });
        })
        .catch(() => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
          setIsRegenerate(false);
        });
    }
  };

  const createServiceRequestId = () => {
    createConsultantServiceRequest().then((res: any) => {
      const data = res.data.data;
      const sId = data.serviceRequestId;
      if (sId) {
        updateContextState({ serviceRequestId: sId });
        router.push(
          {
            pathname: router.pathname,
            query: { serviceRequestId: sId },
          },
          undefined,
          { shallow: true }
        );
      }
    });
  };

  const handleRegenerateList = () => {
    setIsRegenerate(true);
    setLoading(true);
    updateContextState({
      bidderList: [],
    });
    handleLoadBidderList();
  };
  return (
    <Flex gap="8" flex={1} overflow={'hidden'}>
      <Flex flex={1} flexDirection="column" gap="8" overflow={'hidden'}>
        <Card>
          <CardHeader>
            <VStack gap={'20px'} alignItems={'flex-start'}>
              <Text sx={{ ...cardStyle.headerTitle, ...cardStyle.guideTitle }}>
                {t('portal-hire-consultant-list-title')}
              </Text>
              <Text sx={cardStyle.headerSubtitle}>
                {t('portal-hire-consultant-list-subtitle-1')}
              </Text>
              <Text>{t('portal-hire-consultant-list-subtitle-2')}</Text>
            </VStack>
          </CardHeader>
          <Divider />
          <Flex justifyContent={'end'} px={'1.25rem'} pt="1.25rem">
            <Button
              onClick={handleRegenerateList}
              isLoading={isRegenerate}
              isDisabled={loading}
              variant={'secondary'}
            >
              <Text
                sx={{
                  fontsize: FontSizes.small,
                  fontWeight: FontWeights.semibold,
                }}
              >
                {t('portal_consultantList_generate_new_list')}
              </Text>
            </Button>
          </Flex>
          <CardBody>
            {!loading && (
              <BucketList
                vendorList={contextData.vendors}
                updateContextState={updateContextState}
              />
            )}
            <ConsultantsList
              items={bidderList}
              selectedItems={contextData.vendors}
              loading={loading}
              maxSelectable={contextData.maxSelected}
              onSelectConsultant={handleSelectConsultant}
            />
          </CardBody>
          <CardFooter>
            <Flex
              sx={{
                flex: 1,
                w: '100%',
                justifyContent: 'flex-end',
                gap: 5,
              }}
            >
              <Button
                onClick={() => {
                  router.push('/dashboard/services/hire-consultant/additional');
                }}
                variant={'secondary'}
              >
                {t('portal_add_additional_cosultant')}
              </Button>
              <Tooltip
                label={
                  contextData.vendors.length < contextData.minSelected
                    ? t('portal_consultant_contractor_min_select_tooltip')
                    : ''
                }
                placement="top"
                hasArrow
              >
                <Button
                  isDisabled={
                    contextData.vendors.length < contextData.minSelected
                  }
                  onClick={handleSubmit}
                >
                  {t('portal_continue')}
                </Button>
              </Tooltip>
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
    </Flex>
  );
};

export default SelectConsultants;
