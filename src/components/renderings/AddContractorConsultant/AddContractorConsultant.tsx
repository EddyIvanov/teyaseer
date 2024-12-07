import React from 'react';

import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

import { AddContractorConsultantForm } from '@/components/organism/dashboard/AddContractorConsultant/AddContractorConsultantForm';
import useTranslation from '@/hooks/useTranslate';

type TProps = {
  isConsultant?: boolean;
};

export const AddContractorConsultant = ({ isConsultant }: TProps) => {
  const { t } = useTranslation();

  return (
    <Card
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      borderColor="border"
      direction="column"
      padding="24px"
      w={'100%'}
    >
      <CardHeader display="flex" flexDirection="column" gap="24px">
        <Heading fontSize="xxLarge" fontWeight="normal">
          {isConsultant
            ? t('portal_consultant_form_title')
            : t('portal_contractor_form_title')}
        </Heading>
        <Text fontSize="normal">
          {isConsultant
            ? t('portal_consultant_form_sub_title')
            : t('portal_contractor_form_sub_title')}
        </Text>
      </CardHeader>
      <CardBody>
        <AddContractorConsultantForm isConsultant={isConsultant} />
      </CardBody>
    </Card>
  );
};
