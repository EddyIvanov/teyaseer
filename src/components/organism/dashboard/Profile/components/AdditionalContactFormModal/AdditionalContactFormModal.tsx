import { useContext, useState } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { updateMe } from '../../Profile.api';

import { Input, Text } from '@/components';
import {
  UAE_COUNTRY_CODE,
  UAE_MOBILE_NUMBER_WITHOUT_COUNTRY_CODE_VALIDATE_REGEX,
} from '@/components/molecules/LeadCustomerForm/LeadCustomerForm.constants';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';

interface IContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber?: string;
}

export type AdditionalMobileNumberPayload = {
  alternativeContactNumber: string;
};

const AdditionalContactFormModal = ({
  isOpen,
  onClose,
  phoneNumber,
}: IContactFormModalProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserContext } = useContext(DashboardContext);
  const formSchema = yup.object().shape({
    alternativeContactNumber: yup
      .string()
      .required(t('portal_profile_validation_error_required'))
      .matches(
        UAE_MOBILE_NUMBER_WITHOUT_COUNTRY_CODE_VALIDATE_REGEX,
        t('portal_profile_validation_error_invalid_phone_number')
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<AdditionalMobileNumberPayload>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      alternativeContactNumber: phoneNumber,
    },
  });

  const onSubmit: SubmitHandler<AdditionalMobileNumberPayload> = async data => {
    const alternativeContactNumber = `+${UAE_COUNTRY_CODE}${data.alternativeContactNumber}`;
    setIsLoading(true);

    try {
      const payload = {
        userInfo: {
          alternativeContactNumber,
        },
      };

      await updateMe(payload);
      await updateUserContext();
      toast({
        title: t('portal_profile_update_success'),
        status: 'success',
        isClosable: true,
        position: 'top',
      });
      handleOnClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClose = () => {
    reset();
    onClose();
  };
  return (
    <Modal
      size="4xl"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent p="6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="normal" textAlign="center" fontSize="3xl">
            {t('portal_profile_additional_mobile_number')}
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            pb={6}
          >
            <Text fontSize="xl" mb="6">
              {t('portal_profile_additional_mobile_number_info_message')}
            </Text>

            <VStack w="340px" spacing={5}>
              <Controller
                name={'alternativeContactNumber'}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      type={'number'}
                      label={t('portal_place_holder_mobile')}
                      id="alternativeContactNumber"
                      {...field}
                      error={errors.alternativeContactNumber?.message}
                      register={register}
                      prefix="phone"
                    />
                  );
                }}
              />
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              isDisabled={isLoading}
              variant="outline"
              mr="3"
              _ltr={{
                mr: '6',
              }}
              _rtl={{
                ml: '6',
              }}
              onClick={handleOnClose}
            >
              {t('portal_cancel')}
            </Button>
            <Button isDisabled={isLoading} isLoading={isLoading} type="submit">
              {t('portal_submit')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AdditionalContactFormModal;
