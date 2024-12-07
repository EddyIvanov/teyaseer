import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Icon, Link } from '@/components';
import useTranslation from '@/hooks/useTranslate';

const BackToServicesButton = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box display="flex" mb="24px" px="12px">
      <Link display="flex" as="button" gap="10px" onClick={() => router.back()}>
        <Icon
          name="arrowBack"
          w="20px"
          h="20px"
          _rtl={{
            transform: 'rotate(180deg)',
          }}
        />
        <Text as="span">{t('portal_back_to_all_services')}</Text>
      </Link>
    </Box>
  );
};

export default BackToServicesButton;
