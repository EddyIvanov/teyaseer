import { useContext, useState } from 'react';

import { Box, Button, Flex, Text, Tooltip, useToast } from '@chakra-ui/react';
import { HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';

import style from './Service.style';
import { ServiceData, ServiceRequestStatusEnum } from './Service.type';
import DownloadFile from '../DownloadFile/DownloadFile';
import ServiceHeaderAndActivityLog from '../ServiceHeaderAndActivityLog/ServiceHeaderAndActivityLog';
import StepOptionalTransition from '../StepOptionalTransition/StepOptionalTransition';
import { normalizeSRDataToObject } from '../data-normanizers';

import { Icon, Link } from '@/components';
import ServiceStatusBadge from '@/components/molecules/ServiceStatusBadge/ServiceStatusBadge';
import { SRModal } from '@/components/organism/SRModal/SRModal';
import {
  HeaderData,
  ServiceDescriptionArticle,
} from '@/components/organism/dashboard/Stages/Stage.type';
import { isExternalUrl } from '@/helpers/isExternalUrl';
import { useGetData } from '@/hooks/useGetData';
import useTranslation from '@/hooks/useTranslate';
import Client from '@/lib/contentFul';
import { Context } from '@/providers/MainContext';
import { activateServiceRequest } from '@/services/users';

type ServiceProps = {
  serviceData: ServiceData;
  count: number;
  componentType: 'activeService' | 'allService';
  isActivatedDataExists?: boolean;
  currentInstanceIndex?: number;
  reloadData: () => void;
  headerData?: HeaderData;
};

const Service = ({
  serviceData,
  count,
  componentType,
  isActivatedDataExists,
  currentInstanceIndex,
  reloadData,
  headerData,
}: ServiceProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();
  const { locale } = useContext(Context);
  const router = useRouter();
  const serviceCollectionFirstItem = serviceData?.serviceRequestsCollection
    ?.items?.length
    ? serviceData?.serviceRequestsCollection?.items[0]
    : undefined;

  const serviceRequestCurrentInstance =
    currentInstanceIndex !== undefined
      ? serviceCollectionFirstItem?.instances[currentInstanceIndex]
      : undefined;

  const canContinueBasedOnPrerequisiteStage = () => {
    const value = serviceCollectionFirstItem?.areServiceRequestPrerequisitesMet;
    if (value !== undefined) {
      return value;
    } else {
      return true;
    }
  };

  const isServiceClosed =
    serviceRequestCurrentInstance?.status === ServiceRequestStatusEnum.CLOSED;

  const isServiceInprogress =
    serviceRequestCurrentInstance?.status ===
    ServiceRequestStatusEnum.IN_PROGRESS;

  const isServiceDeactivated =
    serviceRequestCurrentInstance?.status ===
    ServiceRequestStatusEnum.DEACTIVATED;

  const isActiveServiceButtonDisabled =
    !canContinueBasedOnPrerequisiteStage() ||
    isServiceInprogress ||
    isActivatedDataExists;

  // show those cta only when showing all services
  // if there is no serviceRequest or in handover Step then also don't show those buttons
  const isCtaVisible =
    componentType === 'allService' &&
    !!serviceData?.serviceRequestsCollection?.total &&
    serviceCollectionFirstItem?.canBeTriggeredByCustomer;

  // show understand services links only when showing all services
  const isUnderstandServicesCtaVisible =
    componentType === 'allService' &&
    !!serviceData?.serviceRequestsCollection?.total;

  const activeServiceRedirectUrl =
    serviceCollectionFirstItem?.serviceRedirectUrl;

  const titleForDisabledButton = () => {
    if (serviceCollectionFirstItem?.prerequisitesNotMetErrorMessage) {
      return t(serviceCollectionFirstItem.prerequisitesNotMetErrorMessage);
    } else if (isServiceInprogress) {
      return t('error.serviceIsAlreadyInProgress');
    } else if (isActivatedDataExists) {
      return t('error.otherServicesAlreadyInProgress');
    } else {
      return '';
    }
  };

  const activateCorrespondingService = async (): Promise<void> => {
    // TODO: need to add logic for different type of service request
    if (serviceCollectionFirstItem?.serviceRequestType == 'generic') {
      setIsLoading(true);
      try {
        const response = await activateServiceRequest({
          requestStatus:
            serviceCollectionFirstItem?.dtsRequestStatusC ||
            'Customer Uploads Documents',
          requestSubtype: serviceCollectionFirstItem?.dtsRequestSubtypeC,
          developerName: serviceCollectionFirstItem?.recordTypeDeveloperName,
          templateExternalId:
            serviceCollectionFirstItem?.dtsTemplateExternalIdC,
        });
        toast({
          title: t('portal_your_request_is_sent'),
          status: 'success',
        });

        const redirectUrl = response?.data?.data?.redirectUrl;

        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push(`/dashboard/services/`);
        }
      } catch (e: any) {
        if (e?.response?.status === HttpStatusCode.BadRequest) {
          reloadData();
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      if (activeServiceRedirectUrl) {
        const redirectUrl = serviceCollectionFirstItem?.id
          ? `${activeServiceRedirectUrl}?serviceRequestId=${serviceCollectionFirstItem?.id}`
          : activeServiceRedirectUrl;
        router.push(redirectUrl);
      }
    }
  };

  const [srModalOpen, setSrModalOpen] = useState(false);

  const {
    fetchData,
    resetData,
    data,
    isLoading: isSrDataLoading,
  } = useGetData<ServiceDescriptionArticle, any>({
    normalizer: normalizeSRDataToObject,
  });

  const handleSrModelClose = () => {
    resetData();
    setSrModalOpen(false);
  };

  const handleSRDetailClick = async (type: string) => {
    setSrModalOpen(true);
    await fetchData(() =>
      Client.getEntries({
        content_type: 'serviceDescriptionPage',
        'fields.slug': type,
        locale,
        include: 4,
      })
    );
  };

  return (
    <Box sx={style.root}>
      <SRModal
        isOpen={srModalOpen}
        onClose={handleSrModelClose}
        loading={isSrDataLoading}
        data={{ ...data }}
        {...(headerData && { logo: headerData.logo })}
      >
        {isCtaVisible && (
          <Flex mt={'30px'}>
            <Tooltip label={titleForDisabledButton()} placement="top" hasArrow>
              <Button
                isDisabled={isActiveServiceButtonDisabled}
                onClick={activateCorrespondingService}
                isLoading={isLoading}
                className="activateService"
              >
                {t('portal_activate_service')}
              </Button>
            </Tooltip>
          </Flex>
        )}
      </SRModal>
      <Box
        className="service"
        id={
          componentType === 'activeService'
            ? serviceRequestCurrentInstance?.id
            : ''
        }
      >
        <Flex flexDir={'column'} rowGap={'24px'}>
          <ServiceHeaderAndActivityLog
            showMaxUses={componentType == 'allService'}
            maxUses={serviceCollectionFirstItem?.maxUses}
            daysItTakeForService={
              serviceCollectionFirstItem?.daysItTakeForService
            }
            activatedServiceLog={
              !isServiceDeactivated && componentType == 'activeService'
                ? serviceRequestCurrentInstance
                : undefined
            }
            activityLogTitle={t('portal_service_request_activity_log')}
            classname="leftRightPadding"
            highlightText={`${t('portal_service_option')} ${count}`}
            title={serviceData.title}
            description={serviceData.description}
            serviceStatus={
              <>
                {isServiceInprogress && <ServiceStatusBadge status="active" />}

                {componentType === 'activeService' && (
                  <>
                    {isServiceDeactivated && (
                      <ServiceStatusBadge status="deactivated" />
                    )}

                    {isServiceClosed && (
                      <ServiceStatusBadge status="completed" />
                    )}
                  </>
                )}
              </>
            }
            isProjectCompleted={isServiceClosed}
          />

          {/* show only upload and download option for activate services */}
          {componentType === 'activeService' && (
            <Box>
              {serviceRequestCurrentInstance?.serviceRequestStepLogs?.items?.map(
                (serviceRequestFlow, index) => {
                  const actionUrlExist =
                    serviceRequestFlow?.stageStepServiceRequest?.ctaText &&
                    serviceRequestFlow?.stageStepServiceRequest?.url &&
                    serviceRequestFlow?.stageStepServiceRequest?.urlText;

                  const shouldShowServiceRequestDetailsBox =
                    serviceRequestFlow?.stageStepServiceRequest?.title ||
                    serviceRequestFlow?.stageStepServiceRequest?.description ||
                    actionUrlExist;

                  return (
                    <Box key={index}>
                      {!!shouldShowServiceRequestDetailsBox && (
                        <Flex className="serviceRequestFlow">
                          <Box>
                            {!!serviceRequestFlow?.stageStepServiceRequest
                              ?.title && (
                              <Text className="serviceRequestFlow__title">
                                {
                                  serviceRequestFlow.stageStepServiceRequest
                                    .title
                                }
                              </Text>
                            )}

                            {!!serviceRequestFlow?.stageStepServiceRequest
                              ?.description && (
                              <Text>
                                {
                                  serviceRequestFlow.stageStepServiceRequest
                                    .description
                                }
                              </Text>
                            )}
                          </Box>
                          {!!actionUrlExist && (
                            <Button
                              as={Link}
                              href={`${serviceRequestFlow.stageStepServiceRequest.url}`}
                              variant={'linkInverted'}
                              target={
                                isExternalUrl(
                                  serviceRequestFlow.stageStepServiceRequest.url
                                )
                                  ? '_blank'
                                  : '_self'
                              }
                              {...(!!serviceRequestFlow.icon && {
                                rightIcon: (
                                  <Icon
                                    name={serviceRequestFlow.icon}
                                    sx={
                                      serviceRequestFlow.icon !== 'arrowLink'
                                        ? {
                                            _rtl: {
                                              transform: 'none !important',
                                            },
                                          }
                                        : {}
                                    }
                                  />
                                ),
                              })}
                              fontSize="1.4rem"
                            >
                              {
                                serviceRequestFlow.stageStepServiceRequest
                                  .urlText
                              }
                            </Button>
                          )}
                        </Flex>
                      )}

                      {serviceRequestFlow?.documentsCollection?.items?.map(
                        document =>
                          document?.files?.map(files => (
                            <Flex
                              key={files.Id}
                              className="serviceRequestFlow downloadRequestFlow"
                            >
                              <DownloadFile item={files} />
                            </Flex>
                          ))
                      )}

                      {serviceRequestFlow?.stageStepServiceRequest?.status ===
                        'Pending' &&
                        serviceRequestFlow.stageStepServiceRequest.optionalTransitions?.items?.map(
                          (item, index) => (
                            <StepOptionalTransition
                              key={index}
                              StepOptionalTransition={item}
                              serviceRequestID={
                                serviceRequestFlow.stageStepServiceRequest.id
                              }
                              classname="serviceRequestFlow"
                            />
                          )
                        )}
                    </Box>
                  );
                }
              )}
              {!!serviceRequestCurrentInstance?.deactivationReason && (
                <Box
                  key={`${serviceRequestCurrentInstance.id}_deactivatedReason`}
                >
                  <Flex className="serviceRequestFlow">
                    <Box>
                      <Text className="serviceRequestFlow__title">
                        {t('portal_service_has_been_deactivated')}
                      </Text>
                      <Text>
                        {serviceRequestCurrentInstance?.deactivationReason}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              )}
            </Box>
          )}

          {(isCtaVisible || isUnderstandServicesCtaVisible) && (
            <Flex className="serviceCta leftRightPadding">
              {isUnderstandServicesCtaVisible && (
                <Button
                  onClick={() =>
                    handleSRDetailClick(
                      serviceData.serviceRequestsCollection?.items?.[0]
                        ?.detailsUrlSlug || '#'
                    )
                  }
                  pl="0"
                  color={'brand.primary'}
                  variant={'linkInverted'}
                  rightIcon={<Icon name="arrowRight" w="20px" h="20px" />}
                >
                  {t('portal_understand_service_steps')}
                </Button>
              )}
              {isCtaVisible && (
                <Tooltip
                  label={titleForDisabledButton()}
                  placement="top"
                  hasArrow
                >
                  <Button
                    isDisabled={isActiveServiceButtonDisabled}
                    onClick={activateCorrespondingService}
                    isLoading={isLoading}
                    className="activateService"
                  >
                    {t('portal_activate_service')}
                  </Button>
                </Tooltip>
              )}
            </Flex>
          )}
        </Flex>
      </Box>
      <Box className="serviceSelectionType">
        {serviceCollectionFirstItem?.serviceRequestOptionType && (
          <Flex className="type">
            {serviceCollectionFirstItem?.serviceRequestOptionType}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Service;
