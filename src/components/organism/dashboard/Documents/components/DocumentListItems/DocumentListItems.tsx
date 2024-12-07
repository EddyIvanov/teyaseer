import { useContext, useState } from 'react';

import { Box, Button, Flex } from '@chakra-ui/react';

import { IDocument } from '../../Documents.types';
import DocumentIcon from '../DocumentIcon/DocumentIcon';

import { Icon, Text } from '@/components';
import { formatDate } from '@/helpers/date';
import { downloadFile } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import colors from '@/styles/themes/brand/colors';

interface IDocumentListItemProp {
  document: IDocument;
  downloadEnabled?: boolean;
  editEnabled?: boolean;
  onDocumentRemove?: () => void;
}

const DocumentListItems = ({
  document,
  onDocumentRemove,
  downloadEnabled = true,
  editEnabled = true,
}: IDocumentListItemProp) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { locale } = useContext(Context);
  const handleDownloadClick = async () => {
    setIsLoading(true);
    try {
      await downloadFile(document);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Flex
      padding="20px"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={`1px solid ${colors.border}`}
    >
      <Box display="flex" gap="20px">
        <Box>
          <DocumentIcon extension={document.FileExtension} />
        </Box>
        <Box>
          <Text wordBreak="break-word">{document.Title}</Text>
          <Text fontSize="small">
            {formatDate(document.CreatedDate, 'do LLL yyyy', locale)}
          </Text>
        </Box>
      </Box>
      <Flex gap={'20px'}>
        {editEnabled && (
          <Button
            isLoading={isLoading}
            onClick={() => {
              onDocumentRemove && onDocumentRemove();
            }}
            leftIcon={<Icon name="editBlack" />}
            variant="link"
            textTransform="unset"
          >
            {t('portal_edit')}
          </Button>
        )}
        {downloadEnabled && (
          <Button
            isLoading={isLoading}
            onClick={handleDownloadClick}
            leftIcon={<Icon name="downloadBlack" />}
            variant="link"
            textTransform="unset"
          >
            {t('portal_download')}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default DocumentListItems;
