import { useContext } from 'react';

import { Box, Button, Text } from '@chakra-ui/react';

import style from './Subtitle.style';
import { SubtitleProps } from './Subtitle.type';

import { Icon, Link } from '@/components';
import { SignInUrls } from '@/constants/signInUrls.constants';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';

const Subtitle = ({ buttonVariant }: SubtitleProps) => {
  const { t } = useTranslation();
  const { locale } = useContext(Context);
  return (
    <Box __css={style.root}>
      <Box __css={style.actionButton}>
        <Button
          as={'a'}
          target="_self"
          href="/login"
          variant={buttonVariant === 'solid' ? 'uaePassWhite' : 'uaePassBlack'}
          leftIcon={
            buttonVariant === 'solid' ? (
              <Icon name="fingerPrint" />
            ) : (
              <Icon name="fingerPrintWhite" />
            )
          }
        >
          {t('continue_with_uae_pass')}
        </Button>
      </Box>
      <Box __css={style.vendorSignUp}>
        <Text as="span">{t('not_customer')}</Text>
        <Link
          href={SignInUrls.VENDOR_REGISTRATION[locale] || 'ar'}
          target="_blank"
        >
          {t('sign_up_as_vendor')}
        </Link>
      </Box>
    </Box>
  );
};
export default Subtitle;
