import { Box, Button, Heading } from '@chakra-ui/react';
import Link from 'next/link';

import style from './PageNotFound.style';

import { Icon } from '@/components';
import useTranslation from '@/hooks/useTranslate';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <Box __css={style} textAlign="center">
      <Heading as={'h1'} className="title">
        404
      </Heading>
      <Heading as={'h3'} className="subTitle">
        {t('404_sub_title')}
      </Heading>
      <Heading as={'h3'} className="errorDescription">
        {t('404_error_description')}
      </Heading>
      <Button
        as={Link}
        href="/"
        leftIcon={<Icon name="arrowBack" />}
        variant="primary"
      >
        {t('go_back_to_home')}
      </Button>
    </Box>
  );
};

export default PageNotFound;
