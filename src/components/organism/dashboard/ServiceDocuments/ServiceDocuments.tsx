import { useContext, useEffect, useRef, useState } from 'react';

import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import {
  completeDocumentUpload,
  getServiceRequestStepAndDocumentsInfo,
  requestDocumentUploadFromConsultant,
  uploadDocuments,
} from './ServiceDocuments.api';
import {
  IDocumentUpload,
  ISelectedDocuments,
  IServiceDocumentsProps,
} from './ServiceDocuments.types';
import DocumentSelectorCard from './components/DocumentSelectorCard/DocumentSelectorCard';
import UploadedDocumentCard from './components/UploadedDocumentCard/UploadedDocumentCard';
import { Document } from '../Stages/components/Service/Service.type';

import { ConfirmModal, InfoModal, Loader, Text } from '@/components';
import { WithGuide } from '@/components/molecules/Guide/WithGuide';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';

const ServiceDocuments = ({
  serviceRequestId: propsServiceRequestId,
  stepTemplateId: propsStepTemplateId,
  useAsComponent = false,
  shouldUploadMySelf = false,
  showButtons = [
    'portal_request_from_consultant',
    'portal_request_upload_document_myself',
  ],
  onFinish,
  guideId,
  hasOptionalUpload = false,
  customTitle,
  customDescription,
}: IServiceDocumentsProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { locale } = useContext(Context);
  const {
    serviceRequestId = propsServiceRequestId,
    stepTemplateId = propsStepTemplateId,
  } = router.query;
  const caseNumber = useRef<string>();
  const stepExternalId = useRef<string>();
  const allDocumentCollections = useRef<Document[]>([]);
  const selectedDocuments = useRef<ISelectedDocuments[]>([]);

  const [title, setTitle] = useState<string | null>();
  const [description, setDescription] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadMyself, setIsUploadMyself] = useState(shouldUploadMySelf);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(
    hasOptionalUpload ? false : true
  );

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isRequestConfirmModalOpen, setIsRequestConfirmModalOpen] =
    useState(false);
  const [isDocumentsCollectionFetching, setIsDocumentsCollectionFetching] =
    useState(true);

  const [documentsCollection, setDocumentCollections] = useState<Document[]>(
    []
  );
  const [documentsCollectionWithFiles, setDocumentsCollectionWithFiles] =
    useState<Document[]>([]);
  const [isDocReceivedModalOpen, setIsDocReceivedModalOpen] = useState(false);
  // const [sampleFiles, setSampleFiles] = useState<DocumentSampleFile[]>([]);

  const handleRequestConfirmModelClose = () => {
    setIsRequestConfirmModalOpen(false);
    router.push('/dashboard/services');
  };

  const handleDocReceivedModelClose = () => {
    setIsDocReceivedModalOpen(false);
    router.push('/dashboard/services');
  };

  const handleRequestFromConsultantClick = () => {
    if (selectedDocuments.current.length) {
      setIsRequestModalOpen(true);
    } else {
      handleRequestFromConsultant();
    }
  };

  const handleRequestFromConsultant = async () => {
    try {
      setIsLoading(prev => !prev);
      const payload = {
        serviceRequestId: serviceRequestId as string,
        stepExternalId: stepExternalId.current as string,
      };
      await requestDocumentUploadFromConsultant(payload);
      setIsRequestModalOpen(false);
      setIsRequestConfirmModalOpen(true);
    } catch (error) {
      setIsRequestModalOpen(false);
    } finally {
      setIsLoading(prev => !prev);
    }
  };

  const checkForEnableSubmit = () => {
    const hasInvalidFiles = selectedDocuments.current.filter(
      item => item.validationErrors
    ).length;

    if (hasInvalidFiles) {
      setIsSubmitDisabled(true);
      return;
    }

    const allRequiredPlaceholders = allDocumentCollections.current.filter(
      item => item.canBeUploadedByCustomer && item.isRequired
    );

    // If no mandatory placeholder files in the list, at least one file need to be selected to submit the request
    if (!allRequiredPlaceholders.length) {
      if (!selectedDocuments.current.length && !hasOptionalUpload) {
        setIsSubmitDisabled(true);
      } else {
        setIsSubmitDisabled(false);
      }

      return;
    }

    // If there is mandatory placeholder files in the list, all the required files need to be selected to submit the request
    const totalMandatoryDocs = documentsCollection.filter(
      item => item.isRequired
    ).length;
    const totalSelectedRequiredDocs = selectedDocuments.current.filter(
      item => item.isRequired
    ).length;

    if (totalMandatoryDocs === totalSelectedRequiredDocs) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  const handleOnDocumentSelect = (doc: ISelectedDocuments) => {
    selectedDocuments.current.push(doc);
    checkForEnableSubmit();
  };

  const handleOnDocumentWithFileRemoveRemove = (
    templateId: Document['sfTemplateId']
  ) => {
    // remove the file from the documentCollectionWithFiles and add it to the documentCollection
    const document = documentsCollectionWithFiles.find(
      item => item.sfTemplateId === templateId
    );
    if (document) {
      setDocumentCollections(prev => [...prev, document]);
      setDocumentsCollectionWithFiles(prev =>
        prev.filter(item => item.sfTemplateId !== templateId)
      );
    }
  };

  const handleOnDocumentRemove = (templateId: Document['sfTemplateId']) => {
    selectedDocuments.current = selectedDocuments.current.filter(
      item => item.templateId !== templateId
    );
    checkForEnableSubmit();
  };

  const handleDocumentsUpload = async () => {
    let hasUploadFailure = false;
    const uploadPromises = selectedDocuments.current.map(async docs => {
      const payload: IDocumentUpload = {
        file: docs.file,
        filename: docs.file.name,
        templateId: docs.templateId,
        serviceRequestId: serviceRequestId as string,
      };
      try {
        await uploadDocuments(payload);
      } catch (error) {
        hasUploadFailure = true;
      }
    });

    setIsUploading(prev => !prev);
    await Promise.all(uploadPromises);
    setIsUploading(prev => !prev);
    selectedDocuments.current = []; // resetting the selected documents
    checkForEnableSubmit();

    if (hasUploadFailure) {
      fetchServiceRequestDocumentCollection();
    } else {
      try {
        // call document upload complete API
        setIsUploading(prev => !prev);
        const payload = {
          serviceRequestId: serviceRequestId as string,
          stepExternalId: stepExternalId.current as string,
        };
        if (uploadPromises.length > 0) {
          await completeDocumentUpload(payload);
        }
        if (onFinish) {
          onFinish();
        } else {
          setIsDocReceivedModalOpen(true);
        }
      } catch (error) {
        fetchServiceRequestDocumentCollection();
      } finally {
        setIsUploading(prev => !prev);
      }
    }
  };

  const fetchServiceRequestDocumentCollection = async () => {
    setIsDocumentsCollectionFetching(true);
    try {
      const response = (
        await getServiceRequestStepAndDocumentsInfo(
          serviceRequestId as string,
          stepTemplateId as string,
          locale
        )
      ).data.data;

      // setSampleFiles(response.sampleFiles);
      setTitle(response.step[0].title);
      setDescription(response.step[0].description);
      stepExternalId.current = response.stepTemplateId;
      caseNumber.current = response.caseNumber;
      const documentList = response.step[0].documentsCollection.items;
      allDocumentCollections.current = documentList;

      const allRequiredPlaceholders = documentList.filter(
        item => item.canBeUploadedByCustomer && item.isRequired
      );
      const withFiles = documentList.filter(
        item => item.files?.length && item.canBeUploadedByCustomer
      );
      const withoutFiles = documentList.filter(
        item => !item.files?.length && item.canBeUploadedByCustomer
      );
      const withFilesRequired = withFiles.filter(item => item.isRequired);

      // If all the placeholders have uploaded files, enable submit button to trigger document upload complete api
      if (allRequiredPlaceholders.length && withFilesRequired.length) {
        // For the file list that has required files

        if (allRequiredPlaceholders.length === withFilesRequired.length) {
          setIsSubmitDisabled(false);
        }
      } else if (withFiles.length && !withoutFiles.length) {
        // For the file list that has no required files

        setIsSubmitDisabled(false);
      }

      setDocumentsCollectionWithFiles(withFiles);
      setDocumentCollections(withoutFiles);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDocumentsCollectionFetching(false);
    }
  };

  useEffect(() => {
    if (serviceRequestId && stepTemplateId) {
      fetchServiceRequestDocumentCollection();
    }
  }, [serviceRequestId, stepTemplateId]);

  return (
    <WithGuide guideId={guideId || `upload-document-${stepTemplateId}`}>
      {isDocumentsCollectionFetching ? (
        <Box width="100%" position="relative" h="100vh" bgColor="#fff">
          <AbsoluteCenter axis="both">
            <Loader thickness="3px" size={'xl'} />
          </AbsoluteCenter>
        </Box>
      ) : (
        <>
          <Box width="100%" overflow={'hidden'}>
            <Card
              borderWidth="1px"
              borderRadius="2xl"
              overflow="hidden"
              borderColor="border"
              direction="column"
              p="6"
            >
              <CardHeader display="flex" flexDirection="column" gap="6">
                <Heading fontSize="xMedium" fontWeight="normal">
                  {customTitle || title}
                </Heading>
              </CardHeader>
              <CardBody display="flex" flexDirection="column" gap="6">
                <Box display="flex" flexDirection="column" gap="8">
                  <Text maxWidth="600px" fontSize="normal">
                    {customDescription || description}
                  </Text>
                  {showButtons.includes('portal_request_from_consultant') && (
                    <Text fontSize="normal">
                      {t('portal_request_from_consultant_info_message')}
                    </Text>
                  )}
                  <Flex flexWrap="wrap" gap="10px">
                    {showButtons.includes('portal_request_from_consultant') && (
                      <Button
                        isLoading={isLoading}
                        isDisabled={isUploading}
                        onClick={handleRequestFromConsultantClick}
                        maxWidth="fit-content"
                        variant="outline"
                      >
                        {t('portal_request_from_consultant')}
                      </Button>
                    )}

                    {!isUploadMyself &&
                      showButtons.includes(
                        'portal_request_upload_document_myself'
                      ) && (
                        <Button
                          isDisabled={isLoading}
                          maxWidth="fit-content"
                          variant="outline"
                          onClick={() => setIsUploadMyself(true)}
                        >
                          {t('portal_request_upload_document_myself')}
                        </Button>
                      )}
                  </Flex>
                </Box>
              </CardBody>
              {isUploadMyself && (
                <>
                  <CardHeader
                    borderTop="1px solid"
                    borderTopColor="border"
                    display="flex"
                    flexDirection="column"
                    gap="6"
                    paddingTop="12"
                  >
                    <Heading fontSize="xMedium" fontWeight="normal">
                      {t('portal_upload_documents_title')}
                    </Heading>
                  </CardHeader>
                  <CardBody display="flex" flexDirection="column" gap="6">
                    <Box display="flex" flexDirection="column" gap="8">
                      <Text maxWidth="600px" fontSize="normal">
                        {t('portal_upload_documents_description')}
                      </Text>

                      {documentsCollectionWithFiles?.map((item, index) => (
                        <UploadedDocumentCard
                          key={index}
                          documentDetails={item}
                          onDocumentRemove={
                            handleOnDocumentWithFileRemoveRemove
                          }
                        />
                      ))}
                      {documentsCollection?.map((item, index) => (
                        <DocumentSelectorCard
                          key={item.name}
                          identifier={index}
                          documentDetails={item}
                          isUploading={isUploading}
                          onDocumentSelect={handleOnDocumentSelect}
                          onDocumentRemove={handleOnDocumentRemove}
                        />
                      ))}
                      <Text mt="10px" color="#ACACAC" fontSize="xSmall">
                        {t('portal_document_upload_instructions')}
                      </Text>
                      <Flex flexWrap="wrap" gap="10px">
                        {useAsComponent && (
                          <Button
                            isDisabled={isUploading}
                            onClick={() => router.back()}
                            variant={'secondary'}
                          >
                            {t('portal_go_back')}
                          </Button>
                        )}
                        <Button
                          isDisabled={
                            isSubmitDisabled ||
                            (!hasOptionalUpload ? isLoading : false)
                          }
                          isLoading={isUploading}
                          onClick={handleDocumentsUpload}
                          maxWidth="fit-content"
                        >
                          {useAsComponent
                            ? t('portal_continue')
                            : t('portal_document_upload_submit')}
                        </Button>
                      </Flex>
                    </Box>
                  </CardBody>
                </>
              )}
            </Card>
          </Box>
          <InfoModal
            isOpen={isRequestConfirmModalOpen}
            serviceRequestId={caseNumber.current}
            icon="activeChecked"
            title={t('portal_request_sent_modal_title')}
            info={t('portal_request_sent_modal_description')}
            onClose={handleRequestConfirmModelClose}
          />
          <InfoModal
            isOpen={isDocReceivedModalOpen}
            serviceRequestId={caseNumber.current}
            icon="activeChecked"
            title={t('portal_document_received_modal_title')}
            info={t('portal_document_received_modal_description')}
            onClose={handleDocReceivedModelClose}
          />
          <ConfirmModal
            isOpen={isRequestModalOpen}
            isLoading={isLoading}
            onCancel={() => setIsRequestModalOpen(false)}
            onConfirm={handleRequestFromConsultant}
            confirmText={t('portal_request')}
            description={t('portal_request_confirmation_message')}
            title={t('portal_request_from_consultant')}
          />
        </>
      )}
    </WithGuide>
  );
};

export default ServiceDocuments;
