import { useContext, useEffect, useMemo, useState } from 'react';

import {
  Box,
  Card,
  Divider,
  Flex,
  Hide,
  Show,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

import style from './Stages.style';
import AvailableServiceInfoBox from './components/AvailableServiceInfoBox/AvailableServiceInfoBox';
import Service from './components/Service/Service';
import {
  ServiceData,
  ServiceRequestStatusEnum,
} from './components/Service/Service.type';
import CenteredLoader from '../CenteredLoader/CenteredLoader';

import { Icon, Image, OnHoldNotifications } from '@/components';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import { HeaderData } from '@/components/organism/dashboard/Stages/Stage.type';
import { normalizeHeaderDataObject } from '@/components/organism/dashboard/Stages/components/data-normanizers';
import { StatusProject } from '@/helpers/statusProject';
import { fetchUrlFromWindowPathName } from '@/helpers/utils';
import { useGetData } from '@/hooks/useGetData';
import useStageData from '@/hooks/useStageData';
import useTranslation from '@/hooks/useTranslate';
import Client from '@/lib/contentFul';
import { DashboardContext } from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';
import colors from '@/styles/themes/brand/colors';

const Stages = () => {
  const { serviceStages, user } = useContext(DashboardContext);
  const { locale } = useContext(Context);
  const [isLastStep, setIslastStep] = useState(false);
  const { id } = useRouter().query;
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const { fetchData: runHeaderData, data: headerData } = useGetData<
    HeaderData,
    any
  >({
    normalizer: normalizeHeaderDataObject,
  });

  useEffect(() => {
    runHeaderData(() =>
      Client.getEntries({
        content_type: 'header',
        'fields.contentType': 'MainHeader',
        locale: locale,
        include: 2,
      })
    );
  }, []);

  const projectInfo = user?.userInfo?.projectInfo;
  const {
    stage: currentStage,
    isHardLoading,
    isSoftLoading,
    isLoading,
    reloadData,
  } = useStageData(pathname);

  const isActivatedOrCompletedDataExists = useMemo(
    () =>
      currentStage?.optionsCollection?.items.some(serviceRequest => {
        if (serviceRequest?.serviceRequestsCollection?.items?.length) {
          if (
            serviceRequest.serviceRequestsCollection.items[0]?.instances
              ?.length ||
            serviceRequest.serviceRequestsCollection.items[0]?.legacySr
          ) {
            return true;
          } else {
            return false;
          }
        }
      }),
    [currentStage]
  );

  const isActivatedDataExists = useMemo(
    () =>
      currentStage?.optionsCollection?.items?.some(serviceRequest =>
        serviceRequest?.serviceRequestsCollection?.items?.length
          ? serviceRequest.serviceRequestsCollection.items[0].instances?.some(
              instance =>
                instance.status === ServiceRequestStatusEnum.IN_PROGRESS
            )
          : false
      ),
    [currentStage]
  );

  const isLastStageHasActivatedServiceRequest = useMemo(
    () =>
      currentStage?.optionsCollection?.items.some(serviceRequest =>
        serviceRequest?.serviceRequestsCollection?.items?.length
          ? serviceRequest.serviceRequestsCollection.items[0]?.instances
              ?.length && isLastStep
          : false
      ),
    [currentStage, isLastStep]
  );

  const sortedInstancesByStatus = useMemo(() => {
    const inprogressInstances: ServiceData[] = [];
    const otherInstances: ServiceData[] = [];
    currentStage?.optionsCollection?.items?.map(option => {
      if (option?.serviceRequestsCollection?.items?.length) {
        option.serviceRequestsCollection.items[0]?.instances.map(instance => {
          const tempServiceOption: ServiceData = {
            ...option,
            serviceRequestsCollection: {
              items: [
                {
                  ...option.serviceRequestsCollection.items[0],
                  instances: [instance],
                },
              ],
              total: option?.serviceRequestsCollection?.total,
            },
          };
          if (
            instance.status === ServiceRequestStatusEnum.IN_PROGRESS ||
            instance.legacySr === true
          ) {
            inprogressInstances.push(tempServiceOption);
          } else {
            otherInstances.push(tempServiceOption);
          }
        });
      }
    });

    const finalInstances = [...inprogressInstances, ...otherInstances];
    return finalInstances;
  }, [currentStage]);

  const totalAvailableServices = useMemo(() => {
    const totalServiceRequests =
      currentStage?.optionsCollection?.items?.reduce(
        (acc: any[], item: any) => {
          const isLegacySR =
            item?.serviceRequestsCollection?.items?.[0]?.legacySr ?? false;
          if (!isLegacySR) {
            acc.push(item);
          }
          return acc;
        },
        []
      ) ?? [];

    return totalServiceRequests.length;
  }, [currentStage]);

  useEffect(() => {
    if (!isLoading && window?.location?.pathname) {
      const slug = fetchUrlFromWindowPathName(window.location.pathname, locale);
      const stageData = serviceStages.filter(
        (item: any) => item.slug == slug
      )[0];
      if (stageData?.stageOrder && serviceStages?.length) {
        setIslastStep(stageData.stageOrder === serviceStages.length);
      }
    }
  }, [isLoading, id]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!isSoftLoading && !isHardLoading && stageData) {
        const { scrollToInstance } = router.query;
        const findTargettedInstanceSection = document.getElementById(
          scrollToInstance as string
        );
        window.scrollTo({
          top: findTargettedInstanceSection?.offsetTop,
          behavior: 'smooth',
        });
      }
    });
  }, [isSoftLoading, isHardLoading]);

  const stageData = currentStage;
  const isProjectOnHold = StatusProject.isOnHold(projectInfo?.projectStatus);

  return (
    <VStack flex={1}>
      {isProjectOnHold && (
        <Hide above="xl">
          <OnHoldNotifications onHoldReActivate={reloadData} />
        </Hide>
      )}
      <WithGuide guideId={`${pathname}`}>
        {isHardLoading ? (
          <CenteredLoader variant="serviceDetailsSkeleton" />
        ) : (
          stageData && (
            <Flex
              key={stageData?.slug}
              sx={{
                ...style.mainContianer,
                pointerEvents: isSoftLoading ? 'none' : 'all',
              }}
            >
              <Flex rowGap={'24px'} direction={'column'} position={'relative'}>
                {isProjectOnHold && (
                  <Hide below="xl">
                    <OnHoldNotifications onHoldReActivate={reloadData} />
                  </Hide>
                )}
                <Card sx={style.root}>
                  {/* service hero component */}
                  <Box className="hero">
                    <Box
                      className="imageWrapper"
                      bg={stageData?.image?.url ? 'none' : '#171D38'}
                    >
                      {stageData?.image && (
                        <Image
                          lazyLoadTheme={'light'}
                          src={stageData?.image?.url || ''}
                          alt={stageData?.title || 'image'}
                          fill
                          loaderOpt={{ h: 300 }}
                        />
                      )}
                    </Box>
                    <Box className="titleSection">
                      <Flex className="titleLeft">
                        <Icon
                          name={stageData.icon}
                          className="icon"
                          height={'40px'}
                          width={'40px'}
                        />
                        <Text className="serialNo">{stageData.stageOrder}</Text>
                        <Divider
                          orientation="vertical"
                          height={'42px'}
                          opacity={'1'}
                        />
                        <Text className="title">{stageData?.title}</Text>
                      </Flex>
                      {stageData?.optionsCollection?.items?.length && (
                        <Show above="lg">
                          <AvailableServiceInfoBox
                            numberOfServices={totalAvailableServices}
                          />
                        </Show>
                      )}
                    </Box>
                  </Box>

                  <Text className="subtitle">{stageData?.description}</Text>
                  {stageData?.optionsCollection?.items?.length && (
                    <Hide above="lg">
                      <Flex p={{ base: '0 20px 20px', md: '0 40px 20px' }}>
                        <AvailableServiceInfoBox
                          numberOfServices={totalAvailableServices}
                        />
                      </Flex>
                    </Hide>
                  )}
                  <Divider color={colors.lineSeparator} />

                  <Flex className="headerSection">
                    <Text className="header">
                      {isActivatedOrCompletedDataExists
                        ? t('portal_teyaseer_activated_services')
                        : t('portal_teyaseer_services')}
                    </Text>
                    {!isLastStep && (
                      <Text fontSize={'1.2rem'}>
                        {t('portal_select_services_from_list')}
                      </Text>
                    )}
                  </Flex>
                  <Divider
                    color={colors.lineSeparator}
                    borderBottomWidth={'1.5px'}
                  />
                  {isActivatedOrCompletedDataExists
                    ? sortedInstancesByStatus?.map((serviceData, index) => (
                        <Service
                          key={index}
                          headerData={headerData}
                          serviceData={serviceData}
                          count={index + 1}
                          componentType="activeService"
                          // we customize the instances list and make only one instances inside sortedInstancesByStatus
                          currentInstanceIndex={0}
                          reloadData={reloadData}
                        />
                      ))
                    : stageData?.optionsCollection?.items?.map(
                        (serviceData, index) => (
                          <Service
                            key={index}
                            headerData={headerData}
                            serviceData={serviceData}
                            count={index + 1}
                            componentType="allService"
                            reloadData={reloadData}
                          />
                        )
                      )}
                </Card>

                {/* regular service card when there is activated service card */}
                {!!isActivatedOrCompletedDataExists &&
                  !isLastStageHasActivatedServiceRequest && (
                    <Card sx={style.root}>
                      <Flex className="headerSection">
                        <Text className="header">
                          {t('portal_teyaseer_services')}
                        </Text>
                        <Text fontSize={'1.2rem'}>
                          {t('portal_select_services_from_list')}
                        </Text>
                      </Flex>
                      <Divider
                        color={colors.lineSeparator}
                        borderBottomWidth={'1.5px'}
                      />
                      {stageData?.optionsCollection?.items?.map(
                        (serviceData, index) => {
                          return !serviceData.serviceRequestsCollection.items[0]
                            .legacySr ? (
                            <Service
                              key={index}
                              headerData={headerData}
                              serviceData={serviceData}
                              count={index + 1}
                              componentType="allService"
                              isActivatedDataExists={isActivatedDataExists}
                              currentInstanceIndex={0}
                              reloadData={reloadData}
                            />
                          ) : null;
                        }
                      )}
                    </Card>
                  )}
                {isSoftLoading && (
                  <Skeleton
                    isLoaded={false}
                    h={'100%'}
                    w="100%"
                    startColor="gray.100"
                    endColor="gray.500"
                    speed={1}
                    position={'absolute'}
                    left={0}
                    top={0}
                    opacity={0.4}
                  />
                )}
              </Flex>

              {/* TODO: might need later  */}
              {/* <RightSideBar /> */}
            </Flex>
          )
        )}
      </WithGuide>
    </VStack>
  );
};

export default Stages;
