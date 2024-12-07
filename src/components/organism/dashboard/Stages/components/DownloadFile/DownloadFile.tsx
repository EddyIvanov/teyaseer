import React, { useState } from 'react';

import { Box, Button, Text, Link } from '@chakra-ui/react';

import { File } from '../Service/Service.type';

import { Icon } from '@/components';
import { downloadFile } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';

type Props = {
  item: File;
};

const DownloadFile = ({ item }: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const downloadFilesFromService = async (file: File) => {
    setIsLoading(true);
    try {
      await downloadFile(file);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box>
        <Text className="serviceRequestFlow__title">{item.Title}</Text>
      </Box>
      <Button
        isLoading={isLoading}
        variant={'linkInverted'}
        rightIcon={<Icon name="download" />}
        className="downloadButton"
        onClick={() => downloadFilesFromService(item)}
        as={Link}
      >
        {t('portal_download_responses')}
      </Button>
    </>
  );
};

export default DownloadFile;
