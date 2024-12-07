import { useContext, useState } from 'react';

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { updateMe } from '../../Profile.api';

import { Input } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';

interface IAdditionalFundFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  fund: number | null;
  onSubmitCB?: (passedAdditionalFunds: number) => void;
}

export type AdditionalFundPayload = {
  additionalFunds: number | null;
};

const AdditionalFundUpdateModal = ({
  isOpen,
  onClose,
  fund,
  onSubmitCB,
}: IAdditionalFundFormModalProps) => {
  const toast = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserContext } = useContext(DashboardContext);
  const formSchema = yup.object().shape({
    additionalFunds: yup
      .number()
      .required(t('portal_profile_validation_error_required'))
      .typeError(t('portal_profile_validation_error_required'))
      .min(0, t('portal_profile_validation_error_negative_value'))
      .integer(t('portal_profile_validation_error_integer'))
      .nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<AdditionalFundPayload>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      additionalFunds: fund === 0 ? null : fund,
    },
  });

  const onSubmit: SubmitHandler<AdditionalFundPayload> = async data => {
    setIsLoading(true);

    try {
      const payload = {
        userInfo: {
          loanInfo: {
            additionalFunds: `${data.additionalFunds}`,
          },
        },
      };
      await updateMe(payload);
      const meData = await updateUserContext();

      const additionalFunds =
        typeof meData?.userInfo?.loanInfo?.additionalFunds === 'number'
          ? meData?.userInfo?.loanInfo?.additionalFunds
          : 0;

      onSubmitCB && onSubmitCB(additionalFunds);
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
            {t('portal_profile_update_additional_funds')}
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            pb={6}
          >
            <Box w="340px">
              <Controller
                name={'additionalFunds'}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      type="number"
                      label={t('portal_profile_placeholder_additional_funds')}
                      error={errors.additionalFunds?.message}
                      id="additionalFunds"
                      value={field.value}
                      register={register}
                      prefix="currency"
                    />
                  );
                }}
              />
            </Box>
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

export default AdditionalFundUpdateModal;
