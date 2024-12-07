import { Button, ButtonProps } from '@chakra-ui/react';

import { Icon } from '@/components';
import useTranslation from '@/hooks/useTranslate';

const BackButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      {...props}
      // onClick={() => onBackButtonClick()}
      variant="link"
      leftIcon={<Icon name="arrowBack" />}
      sx={{ span: { marginRight: '10px' } }}
      // isDisabled={isCtaDisabled}
    >
      {t('portal_go_back')}
    </Button>
  );
};

export default BackButton;
