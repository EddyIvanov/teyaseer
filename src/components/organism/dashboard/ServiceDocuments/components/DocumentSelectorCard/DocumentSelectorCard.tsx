import { ChangeEvent, DragEvent, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
} from '@chakra-ui/react';

import style from './DocumentSelectorCard.styles';
import { CADFileExtensions } from '../../../Documents/Document.constants';
import { getFileExtension } from '../../../Documents/Document.helper';
import { DocumentFileExtension } from '../../../Documents/Documents.types';
import { Document } from '../../../Stages/components/Service/Service.type';
import {
  acceptedFileTypes,
  maxFileSize,
} from '../../ServiceDocuments.constants';
import { ISelectedDocuments } from '../../ServiceDocuments.types';
import SelectedDocumentCard from '../SelectedDocumentCard/SelectedDocumentCard';

import { Icon, Link, Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

interface IDocumentSelectorCardProps {
  documentDetails: Document;
  identifier: string | number;
  isUploading: boolean;
  onDocumentSelect?: (document: ISelectedDocuments) => void;
  onDocumentRemove?: (templateId: Document['sfTemplateId']) => void;
}

const DocumentSelectorCard = ({
  documentDetails,
  identifier,
  isUploading,
  onDocumentSelect,
  onDocumentRemove,
}: IDocumentSelectorCardProps) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<ISelectedDocuments | null>(
    null
  );

  const triggerFileSelector = () => {
    const fileInput = document.getElementById(
      `input-file-selector-${identifier}`
    ) as HTMLElement;
    fileInput.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files: File[] = Array.from(e.target.files);
    handleFileSelection(files[0]);
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer.files) return;

    const files: File[] = Array.from(e.dataTransfer.files);
    handleFileSelection(files[0]);
  };

  const validateFile = (file: File): ISelectedDocuments['validationErrors'] => {
    const errors: ISelectedDocuments['validationErrors'] = [];

    const fileExtension = getFileExtension(file.name);

    if (
      !CADFileExtensions.includes(fileExtension as DocumentFileExtension) && // Skip CAD files type validation
      !acceptedFileTypes.includes(file.type)
    ) {
      errors.push(t('portal_document_validation_error_type'));
    }

    if (file.size > maxFileSize) {
      errors.push(t('portal_document_validation_error_size'));
    }

    return errors.length ? errors : null;
  };

  const handleFileSelection = (file: File) => {
    const newDoc: ISelectedDocuments = {
      file,
      validationErrors: validateFile(file),
      isRequired: documentDetails.isRequired,
      templateId: documentDetails.sfTemplateId,
    };
    setSelectedFile(newDoc);
    onDocumentSelect && onDocumentSelect(newDoc);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onDocumentRemove && onDocumentRemove(documentDetails.sfTemplateId);
  };

  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      placeItems={'center'}
      gap={{ base: '10px', md: '50px' }}
    >
      <Card __css={style.card}>
        <CardHeader __css={style.cardHeader}>
          <Heading fontSize="normal" fontWeight="semibold">
            {documentDetails.name}{' '}
            {documentDetails.isRequired && (
              <span style={style.requiredIndicator}>*</span>
            )}
          </Heading>
        </CardHeader>
        <CardBody __css={style.cardBody}>
          {!selectedFile && (
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
                    // accept={acceptedFileTypes.join(',')}
                  />
                  <Button onClick={triggerFileSelector}>
                    {t('portal_document_upload_select_files')}
                  </Button>
                </Box>
              </Flex>
            </Box>
          )}

          {selectedFile && (
            <SelectedDocumentCard
              document={selectedFile}
              isUploading={isUploading}
              onRemove={handleRemoveFile}
            />
          )}
        </CardBody>
      </Card>
      {documentDetails.sampleFile && (
        <Flex
          as={Link}
          variant="unstyled"
          cursor="pointer"
          placeItems="center"
          href={documentDetails.sampleFile.url}
          gap="12px"
          target="_blank"
          mt={{ base: 'unset', md: '25px' }}
          mb={{ base: '25px', md: 'unset' }}
        >
          <Text
            fontSize={FontSizes.small}
            fontWeight={FontWeights.semibold}
            whiteSpace="break-spaces"
            textAlign="start"
            alignSelf="center"
          >
            {t('portal_docuemnt_upload_show_me_example')}
          </Text>
          <Icon name="arrow" />
        </Flex>
      )}
    </Flex>
  );
};

export default DocumentSelectorCard;
