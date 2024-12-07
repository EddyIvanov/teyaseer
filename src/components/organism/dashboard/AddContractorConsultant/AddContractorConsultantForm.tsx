import React, { useContext, useEffect, useState } from 'react';

import { Button, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { InfoModal, Input } from '@/components';
import {
  TAddContractorTypeReq,
  TAddContractorTypeRes,
} from '@/components/organism/dashboard/AddContractorConsultant/AddContractor.type';
import { postContractorDetails } from '@/components/organism/dashboard/AddContractorConsultant/AddContractorConsultant';
import { addContractorSchema } from '@/components/organism/dashboard/AddContractorConsultant/addAddContractorConsultantValidation';
import { usePostData } from '@/hooks/usePostData';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';

const defInputConfig = {
  type: 'text',
};

const inputMap: Array<{
  name: string;
  config: {
    type: string;
    prefix?: 'phone' | 'currency';
  };
}> = [
  {
    name: 'companyName',
    config: { ...defInputConfig },
  },
  { name: 'contactName', config: { ...defInputConfig } },
  { name: 'email', config: { ...defInputConfig } },
  {
    name: 'contactPhoneNumber',
    config: { ...defInputConfig, type: 'number', prefix: 'phone' },
  },
  {
    name: 'landlinePhoneNumber',
    config: { ...defInputConfig, type: 'number' },
  },
];

type TProps = {
  isConsultant?: boolean;
  updateIsLoading?: (isLoading: boolean) => void;
};

export const AddContractorConsultantForm = ({
  isConsultant,
  updateIsLoading,
}: TProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { query } = router;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, updateDashboardState } = useContext(DashboardContext);

  const [caseNumber, setCaseNumber] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<any>({
    resolver: yupResolver(addContractorSchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      contactPhoneNumber: '',
      landlinePhoneNumber: '',
    },
  });

  const { run, isLoading } = usePostData<
    TAddContractorTypeReq,
    TAddContractorTypeRes
  >();

  const onSubmit: SubmitHandler<TAddContractorTypeReq> = async data => {
    const res = await run(() =>
      postContractorDetails(
        data,
        query?.SRID as string,
        query?.StepTemplateID as string
      )
    );
    if (res?.data?.caseNumber) {
      setCaseNumber(res?.data?.caseNumber);

      onOpen();
      return reset();
    }
  };

  useEffect(() => {
    if (typeof updateIsLoading === 'function') {
      updateIsLoading(isLoading);
    }
  }, [isLoading]);

  const handleFinished = () => {
    onClose();
    router.push('/dashboard/services/');
    // as we are not calling me again we have to update user context manually
    if (user && !user?.isOnboardingComplete) {
      updateDashboardState({
        user: { ...user, isOnboardingComplete: true },
      });
    }
  };

  return (
    <>
      <InfoModal
        icon="checked"
        isOpen={isOpen}
        onClose={handleFinished}
        title={t('portal_add_consultant_success_popup_title')}
        info={t(
          isConsultant
            ? 'portal_add_consultant_success_popup_description'
            : 'portal_add_contractor_success_popup_description'
        )}
        serviceRequestId={caseNumber}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={'16px'} maxWidth={{ md: '460px' }}>
          {inputMap.map(({ name, config: { type, prefix } }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    type={type}
                    label={t(`portal_form_${name}`)}
                    error={t((errors[name]?.message as string) || '')}
                    id={name}
                    value={field.value}
                    register={register}
                    {...(prefix && { prefix })}
                  />
                );
              }}
            />
          ))}
        </VStack>
        <Flex mt="32px" gap="30px" flexWrap="wrap">
          <Button
            isDisabled={Object.keys(errors).length > 0}
            isLoading={isLoading}
            variant="primary"
            type="submit"
            alignSelf="flex-start"
          >
            {t('portal_confirm')}
          </Button>
        </Flex>
      </form>
    </>
  );
};
