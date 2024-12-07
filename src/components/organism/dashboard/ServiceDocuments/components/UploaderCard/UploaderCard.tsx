import { ChangeEvent, DragEvent, useRef, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
} from '@chakra-ui/react';

import style from './UploadCard.styles';
import DocumentListItems from '../../../Documents/components/DocumentListItems/DocumentListItems';
import { Document } from '../../../Stages/components/Service/Service.type';
import { uploadDocuments } from '../../ServiceDocuments.api';
import {
  acceptedFileTypes,
  maxFileSize,
} from '../../ServiceDocuments.constants';
import {
  FileUploadStatus,
  IDocumentUpload,
  IDocumentSelect,
} from '../../ServiceDocuments.types';
import SelectedDocumentCard from '../SelectedDocumentCard/SelectedDocumentCard';

import { Icon, Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';

interface IUploadCardProps {
  serviceRequestId: string;
  documentDetails: Document;
  identifier: string | number;
}

const UploaderCard = ({
  serviceRequestId,
  documentDetails,
  identifier,
}: IUploadCardProps) => {
  const { t } = useTranslation();
  const uploadFailedRef = useRef(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<IDocumentSelect[]>([]);
  const [fileUploadStatus, setFileUploadStatus] =
    useState<FileUploadStatus>('PENDING');

  const triggerFileSelector = () => {
    const fileInput = document.getElementById(
      `input-file-selector-${identifier}`
    ) as HTMLElement;
    fileInput.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files: File[] = Array.from(e.target.files);
    handleFileSelection(files);
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer.files) return;

    const files: File[] = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  };

  const validateFile = (file: File): IDocumentSelect['validationErrors'] => {
    const errors: IDocumentSelect['validationErrors'] = [];
    if (!acceptedFileTypes.includes(file.type)) {
      errors.push(t('portal_document_validation_error_type'));
    }

    if (file.size > maxFileSize) {
      errors.push(t('portal_document_validation_error_size'));
    }

    return errors.length ? errors : null;
  };

  const handleFileSelection = (files: File[]) => {
    setFileUploadStatus('PENDING');
    files.forEach(file => {
      const newDoc: IDocumentSelect = {
        validationErrors: validateFile(file),
        file,
      };
      setSelectedFiles(prevFiles => [...prevFiles, newDoc]);
    });
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setSelectedFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(indexToRemove, 1);
      return updatedFiles;
    });
  };

  const isUploadDisabled = () => {
    return (
      selectedFiles.length === 0 ||
      selectedFiles.some(file => file.validationErrors !== null)
    );
  };

  const updateUploadStatus = (
    index: number,
    status: IDocumentSelect['uploadStatus']
  ) => {
    setSelectedFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = {
        ...updatedFiles[index],
        uploadStatus: status,
      };
      return updatedFiles;
    });
  };

  const handleFileUpload = async () => {
    uploadFailedRef.current = false;
    setFileUploadStatus('PENDING');
    const validFiles = selectedFiles
      .filter(file => file.validationErrors === null)
      .map(item => item.file);

    const uploadPromises = validFiles.map(async (file, index) => {
      const payload: IDocumentUpload = {
        file: file,
        filename: file.name,
        templateId: documentDetails.sfTemplateId as string,
        serviceRequestId: serviceRequestId as string,
      };
      try {
        await uploadDocuments(payload);
        updateUploadStatus(index, 'SUCCESS');
      } catch (error) {
        updateUploadStatus(index, 'FAILED');
        uploadFailedRef.current = true;
      }
    });

    setIsUploading(prev => !prev);
    await Promise.all(uploadPromises);
    setIsUploading(prev => !prev);

    if (uploadFailedRef.current) {
      setFileUploadStatus('FAILED');
    } else {
      // setSelectedFiles([]);
      setFileUploadStatus('SUCCESS');
      // setIsDocReceivedModalOpen(true);
    }
  };

  return (
    <>
      <Card __css={style.card}>
        <CardHeader __css={style.cardHeader}>
          <Heading fontSize="normal" fontWeight="semibold">
            {documentDetails.name}
          </Heading>
          <Text
            className={fileUploadStatus}
            fontSize="normal"
            fontWeight="semibold"
          >
            {fileUploadStatus === 'SUCCESS'
              ? t('portal_document_upload_status_uploaded')
              : fileUploadStatus === 'FAILED'
              ? t('portal_document_upload_status_failed')
              : ''}
          </Text>
        </CardHeader>
        <CardBody __css={style.cardBody}>
          {!selectedFiles.length && !documentDetails.files?.length && (
            <Box>
              <Flex
                __css={style.fileSelector}
                onDrop={handleFileDrop}
                onDragOver={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Box>
                  <Icon name="documentUploader" height="24px" width="24px" />
                </Box>
                <Box>
                  <Text>{t('portal_document_upload_drop_files')}</Text>
                </Box>
                <Box>
                  <Text>-- {t('portal_document_upload_or')} --</Text>
                </Box>
                <Box>
                  <input
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id={`input-file-selector-${identifier}`}
                    type="file"
                    accept={acceptedFileTypes.join(',')}
                  />
                  <Button onClick={triggerFileSelector}>
                    {t('portal_document_upload_select_files')}
                  </Button>
                </Box>
              </Flex>
              <Text mt="10px" color="#ACACAC" fontSize="xSmall">
                {t('portal_document_upload_instructions')}
              </Text>
            </Box>
          )}

          {selectedFiles.map((item, index) => (
            <SelectedDocumentCard
              key={index}
              document={item}
              isUploading={isUploading}
              onRemove={() => handleRemoveFile(index)}
            />
          ))}
          {documentDetails.files?.map(item => (
            <DocumentListItems document={item} key={item.Id} />
          ))}

          {fileUploadStatus !== 'SUCCESS' && !documentDetails.files?.length && (
            <Flex flexDirection="row-reverse">
              <Button
                isLoading={isUploading}
                onClick={handleFileUpload}
                isDisabled={isUploadDisabled()}
              >
                {t('portal_document_upload_file')}
              </Button>
            </Flex>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default UploaderCard;
