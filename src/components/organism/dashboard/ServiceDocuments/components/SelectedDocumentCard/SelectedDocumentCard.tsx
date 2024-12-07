import { Box, Button, Flex } from '@chakra-ui/react';

import style from './SelectedDocumentCard.styles';
import { getFileExtension } from '../../../Documents/Document.helper';
import { DocumentFileExtension } from '../../../Documents/Documents.types';
import DocumentIcon from '../../../Documents/components/DocumentIcon/DocumentIcon';
import { IDocumentSelect } from '../../ServiceDocuments.types';

import { Icon, Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';

interface ISelectedDocumentsCardProps {
  document: IDocumentSelect;
  isUploading: boolean;
  onRemove: () => void;
}

const SelectedDocumentCard = ({
  document,
  isUploading,
  onRemove,
}: ISelectedDocumentsCardProps) => {
  const { t } = useTranslation();
  return (
    <Flex
      __css={style.cardWrapper}
      borderStyle={
        document.validationErrors || document.uploadStatus ? 'solid' : 'dashed'
      }
      borderColor={
        document.validationErrors || document.uploadStatus === 'FAILED'
          ? colors.error
          : document.uploadStatus === 'SUCCESS'
          ? colors.success
          : colors.border
      }
    >
      <Box>
        <DocumentIcon
          extension={
            getFileExtension(document.file.name) as DocumentFileExtension
          }
        />
      </Box>

      <Box>
        <Text>{document.file.name}</Text>
        {document.validationErrors?.map((err, index) => (
          <Text key={index} color={colors.error}>
            {err}
          </Text>
        ))}
        {document?.uploadStatus === 'FAILED' && (
          <Text color={colors.error}>{t('portal_document_upload_failed')}</Text>
        )}
        {document?.uploadStatus === 'SUCCESS' && (
          <Text color={colors.success}>
            {t('portal_document_upload_success')}
          </Text>
        )}
      </Box>
      {document.uploadStatus !== 'SUCCESS' && (
        <Button
          isDisabled={isUploading}
          onClick={onRemove}
          position="absolute"
          top="0"
          right="0"
          leftIcon={<Icon name="close" height="8px" width="8px" />}
          variant="unstyled"
        ></Button>
      )}
    </Flex>
  );
};

export default SelectedDocumentCard;
