import { Box, Flex, Heading } from '@chakra-ui/react';

import DocumentIcon from '../../../Documents/components/DocumentIcon/DocumentIcon';
import { DocumentSampleFile } from '../../ServiceDocuments.types';

import { Link, Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';

type SampleDocumentsProps = {
  sampleFiles: DocumentSampleFile[];
};

const SampleDocuments = ({ sampleFiles }: SampleDocumentsProps) => {
  const { t } = useTranslation();

  return (
    <Flex m={'20px 0 30px'} gap="12px" direction={'column'}>
      <Heading fontSize="normal" fontWeight="semibold" mb={'10px'}>
        {t('portal_sample_document_format')}
      </Heading>
      {sampleFiles.map((item, index) => (
        <Flex
          as={Link}
          variant="unstyled"
          key={index}
          maxW="320px"
          width="100%"
          height="100%"
          padding="16px"
          border={`1px solid ${colors.border}`}
          borderRadius="10px"
          cursor="pointer"
          justifyContent="flex-start"
          href={item.url}
          gap="12px"
          target="_blank"
        >
          <Box minW="35px">
            <DocumentIcon />
          </Box>
          <Text
            fontSize="xSmall"
            fontWeight="medium"
            whiteSpace="break-spaces"
            textAlign="start"
            alignSelf="center"
          >
            {item.title}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default SampleDocuments;
