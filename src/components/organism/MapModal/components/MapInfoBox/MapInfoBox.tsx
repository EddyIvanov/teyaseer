import { Button, Text } from '@chakra-ui/react';

import { Address } from '../../MapModal.type';

import useTranslation from '@/hooks/useTranslate';

const MapInfoBox = ({
  details,
  openHours,
  phoneNumber,
  latitude,
  longitude,
  email,
}: Address) => {
  const { t } = useTranslation();

  return (
    <>
      <Text as={'h6'} pb="10px">
        {details}
      </Text>
      <Text>
        <b>{t('openHours')}:</b> {openHours}
      </Text>
      <Text>
        <b>{t('contactUs')}:</b>{' '}
        <a dir="ltr" href={`tel:${phoneNumber}`}>
          {phoneNumber}
        </a>
      </Text>
      <Text>
        <b>{t('emailUs')}:</b> <a href={`mailto:${email}`}>{email}</a>
      </Text>
      <Button
        as="a"
        href={`https://www.google.com/maps/dir/current+location/${latitude},${longitude}`}
        target="_blank"
      >
        {t('drivingDirections')}
      </Button>
    </>
  );
};

export default MapInfoBox;
