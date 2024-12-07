import React, { useContext } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Flex,
  Text,
} from '@chakra-ui/react';

import style from './VendorCard.style';
import { IAwardedVendors } from '../../Profile.type';
import InfoBox from '../InfoBox/InfoBox';

import { companyName } from '@/helpers/companyNameTranslation';
import { Context } from '@/providers/MainContext';

interface IDesignConsultantDetailsProps {
  title: string;
  data:
    | IAwardedVendors['awardedConsultant']
    | IAwardedVendors['awardedContractor'];
}

const VendorCard = ({ title, data }: IDesignConsultantDetailsProps) => {
  const { locale } = useContext(Context);
  return (
    <Card __css={style.container}>
      <CardHeader __css={style.header}>
        <Heading as="h2">{title}</Heading>
      </CardHeader>
      <CardBody __css={style.body}>
        <Flex>
          <Text sx={style.name}>{companyName(data, locale)}</Text>
        </Flex>
        <Flex __css={style.infoContainer}>
          <Flex __css={style.infoSection}>
            <InfoBox
              iconName="geoLocation"
              text={data.registeredAddress || '-'}
            />
          </Flex>
          <Flex __css={style.infoSection}>
            <InfoBox iconName="mobile" text={data.contactNumber || '-'} />
            <InfoBox iconName="email" text={data.companyEmail || '-'} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default VendorCard;
