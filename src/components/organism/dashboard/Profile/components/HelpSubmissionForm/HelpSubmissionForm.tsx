import { useContext, useState } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import style from './HelpSubmissionForm.style';
import { ServiceWithReason } from './HelpSubmissionForm.type';

import { InfoModal } from '@/components/molecules';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import { submitHelpForms } from '@/services/users';
import colors from '@/styles/themes/brand/colors';

type HelpSubmissionFormPayload = {
  mainService: string;
  reason: string;
};

type HelpSubmissionFormProps = {
  serviceWithReasons: ServiceWithReason[];
  closeModal: () => void;
};

const HelpSubmissionForm = ({
  serviceWithReasons,
  closeModal,
}: HelpSubmissionFormProps) => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [caseNumber, setCaseNumber] = useState('');
  const { t } = useTranslation();
  const { updateUserContext } = useContext(DashboardContext);

  const submissionFormSchema = yup.object().shape({
    mainService: yup
      .string()
      .required(t('portal_help_submission_form_service_is_required')),
    reason: yup.string().required(t('portal_select_a_reason_for_a_service')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<HelpSubmissionFormPayload>({
    resolver: yupResolver(submissionFormSchema),
  });

  const handleMainServiceLabelClick = (index: number, isExpanded: boolean) => {
    if (!isExpanded) {
      setActiveAccordionIndex(index);
      resetField('reason');
    }
  };

  const handleOnFormSubmit = async (data: HelpSubmissionFormPayload) => {
    setIsLoading(true);

    try {
      const response = await submitHelpForms({
        service: data.mainService,
        reason: data.reason,
      });
      if (response.status === 201) {
        setIsInfoModalOpen(true);
        const caseNumber = response.data?.data?.caseNumber;
        setCaseNumber(caseNumber);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseInfoModal = async () => {
    closeModal();
    await updateUserContext();
  };

  return (
    <Box sx={style.root}>
      <form onSubmit={handleSubmit(handleOnFormSubmit)}>
        <Accordion index={activeAccordionIndex}>
          {serviceWithReasons.map((service, index: number) => (
            <AccordionItem key={index}>
              {({ isExpanded }) => (
                <>
                  <FormLabel
                    htmlFor={service.fields.value}
                    className="mainService"
                    onClick={() =>
                      handleMainServiceLabelClick(index, isExpanded)
                    }
                  >
                    <input
                      type="radio"
                      value={service.fields.value}
                      id={service.fields.value}
                      className="radioButton"
                      {...register('mainService')}
                    />
                    {service.fields.label}
                  </FormLabel>
                  <AccordionButton visibility="hidden" />
                  <AccordionPanel>
                    {service.fields.reasonsList?.map(
                      (reasons: any, index: number) => (
                        <Flex key={index} alignItems="center">
                          <input
                            value={reasons.fields.value}
                            id={service.fields.value + reasons.fields.value}
                            type="radio"
                            className="radioButton"
                            {...register('reason')}
                          />
                          <FormLabel
                            htmlFor={
                              service.fields.value + reasons.fields.value
                            }
                            className="formLabel"
                          >
                            {reasons.fields.label}
                          </FormLabel>
                        </Flex>
                      )
                    )}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
        {errors.mainService?.message && (
          <Text color={colors.error} fontSize="1.2rem">
            {errors.mainService?.message}
          </Text>
        )}
        {!errors.mainService?.message && errors.reason?.message && (
          <Text color={colors.error} fontSize="1.2rem">
            {errors.reason?.message}
          </Text>
        )}

        <Button
          className="submitButton"
          type="submit"
          isDisabled={!!errors.mainService || !!errors.reason}
          isLoading={isLoading}
        >
          {t('portal_submit')}
        </Button>
      </form>
      {isInfoModalOpen && (
        <InfoModal
          icon="checked"
          isOpen={isInfoModalOpen}
          onClose={handleCloseInfoModal}
          title={t('portal_rerequest_sr_success_title')}
          info={t('portal_rerequest_sr_success_description')}
          serviceRequestId={caseNumber}
        />
      )}
    </Box>
  );
};

export default HelpSubmissionForm;
