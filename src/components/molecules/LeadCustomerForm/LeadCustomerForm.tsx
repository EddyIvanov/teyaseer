import { useState } from 'react';

import { Box, Button, VStack, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

import { registerLeadCustomer } from './LeadCustomerForm.api';
import {
  EMAIL_VALIDATE_REGEX,
  EMIRATES_ID_VALIDATE_REGEX,
  UAE_MOBILE_NUMBER_WITHOUT_COUNTRY_CODE_VALIDATE_REGEX,
  UAE_COUNTRY_CODE,
} from './LeadCustomerForm.constants';
import style from './LeadCustomerForm.style';
import { LeadCustomerPayload } from './LeadCustomerForm.type';

import { Input as MyInput } from '@/components';

interface LeadCustomerFormProps {
  localData: any;
}

const LeadCustomerForm = ({ localData }: LeadCustomerFormProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const leadCustomerSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(localData['validation_error_required'])
      .max(40, localData['validation_error_max_character_40'])
      .test(
        'isNotEmpty',
        localData['validation_error_required'],
        value => value?.trim() !== ''
      ),
    lastName: yup
      .string()
      .required(localData['validation_error_required'])
      .max(80, localData['validation_error_max_character_80'])
      .test(
        'isNotEmpty',
        localData['validation_error_required'],
        value => value?.trim() !== ''
      ),
    email: yup
      .string()
      .required(localData['validation_error_required'])
      .matches(EMAIL_VALIDATE_REGEX, localData['validation_error_email']),
    emiratesId: yup
      .string()
      .required(localData['validation_error_required'])
      .matches(
        EMIRATES_ID_VALIDATE_REGEX,
        localData['validation_error_emirates_id']
      ),
    mobilePhone: yup
      .string()
      .required(localData['validation_error_required'])
      .matches(
        UAE_MOBILE_NUMBER_WITHOUT_COUNTRY_CODE_VALIDATE_REGEX,
        localData['validation_error_phone']
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<LeadCustomerPayload>({
    resolver: yupResolver(leadCustomerSchema),
  });

  const [firstName, lastName, email, emiratesId, mobilePhone] = watch([
    'firstName',
    'lastName',
    'email',
    'emiratesId',
    'mobilePhone',
  ]);

  const onSubmit: SubmitHandler<LeadCustomerPayload> = async data => {
    data.emiratesId = data.emiratesId.replace(/-/g, '');
    data.mobilePhone = `${UAE_COUNTRY_CODE}${data.mobilePhone}`;
    setIsLoading(true);

    try {
      await registerLeadCustomer(data);
      setIsLoading(false);
      toast({
        title: localData['message_success'],
        status: 'success',
        isClosable: true,
        position: 'top',
      });
      reset();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        mt: { base: '40px', xl: '80px' },
        mb: { base: '40px', xl: '160px' },
      }}
      __css={style}
      borderWidth="1px"
      borderRadius="2xl"
      p={8}
      boxShadow="md"
      backgroundColor={'background'}
    >
      <h1 className="formTitle">{localData['form_title']}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={5}>
          <MyInput
            label={localData['label_first_name']}
            id="firstName"
            value={firstName}
            error={errors.firstName?.message}
            register={register}
          />

          <MyInput
            label={localData['label_last_name']}
            id="lastName"
            value={lastName}
            error={errors.lastName?.message}
            register={register}
          />

          <MyInput
            label={localData['label_email_address']}
            id="email"
            value={email}
            error={errors.email?.message}
            register={register}
          />

          <MyInput
            label={localData['label_emirates_id']}
            id="emiratesId"
            value={emiratesId}
            error={errors.emiratesId?.message}
            register={register}
          />

          <MyInput
            label={localData['label_mobile_number']}
            id="mobilePhone"
            value={mobilePhone}
            error={errors.mobilePhone?.message}
            register={register}
            type={'number'}
            prefix="phone"
          />
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            variant="primary"
            className="submitButton"
            type="submit"
          >
            {localData['button_submit']}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LeadCustomerForm;
