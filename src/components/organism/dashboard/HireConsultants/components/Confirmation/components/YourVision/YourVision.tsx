import { useContext } from 'react';

import { Card, CardBody, useMultiStyleConfig } from '@chakra-ui/react';

import { ConsultantContext } from '../../../../Consultants.context';

import { Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';

const YourVision = () => {
  const { t } = useTranslation();
  const style = useMultiStyleConfig('Card', {});
  const { yourVision } = useContext(ConsultantContext);
  return (
    <Card>
      <CardBody>
        <Text sx={style.bodyMainTitle}>{t('portal_your_vision_title')}</Text>
        <Text sx={style.bodyValue}>
          {yourVision || t('portal_empty_vision')}
        </Text>
      </CardBody>
    </Card>
  );
};

export default YourVision;
