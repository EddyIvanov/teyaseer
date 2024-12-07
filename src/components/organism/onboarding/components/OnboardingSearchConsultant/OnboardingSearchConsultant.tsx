import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Box, Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';

import onboardingSearchConsultantStyle from './OnboardingSearchConsultant.style';
import { OnboardingSearchConsultantProps } from './OnboardingSearchConsultant.type';
import { searchConsultant, saveSelectedVendor } from '../../Onboarding.api';
import BackButton from '../BackButton';

import {
  ContentfulRichText,
  VendorSearch,
  PulseArticle,
  Icon,
} from '@/components';
import { Vendor } from '@/components/molecules/VendorSearch/VendorSearch.type';
import { AddContractorConsultantForm } from '@/components/organism/dashboard/AddContractorConsultant/AddContractorConsultantForm';
import { companyName } from '@/helpers/companyNameTranslation';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import FontSizes from '@/styles/themes/brand/fontSizes';
import { OnboardingOption } from '@/types/ContentFul.type';

const OnboardingSearchConsultant = (props: OnboardingSearchConsultantProps) => {
  const toast = useToast();
  const { t } = useTranslation();
  const { locale } = useContext(Context);
  const { questionData, goToNextQuestion, goToPrevQuestion } = props;
  const { isLoading: isOnboardingStepUpdating } = props;
  const [consultants, setConsultants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<Vendor | null>(
    null
  );
  const questionOptions = questionData.fields.questionOptions;

  useEffect(() => {
    setIsLoading(!!isOnboardingStepUpdating);
  }, [props.isLoading]);

  const isCtaDisabled = useMemo(() => isLoading, [isLoading]);

  const [isVisibleConsultantForm, setIsVisibleConsultantForm] = useState(false);

  const onNextButtonClick = async (option: OnboardingOption) => {
    setIsLoading(true);
    try {
      const result = await saveSelectedVendor(selectedConsultant?.id as string);

      if (result.status === 201) {
        goToNextQuestion(questionData, option);
      }
    } catch (e) {
      showErrorToast();
    }
    setIsLoading(false);
  };

  const onConsultantNotFoundButtonClick = () => {
    setIsVisibleConsultantForm(true);
  };

  const onBackButtonClick = () => {
    if (isVisibleConsultantForm) {
      setIsVisibleConsultantForm(false);
    } else {
      goToPrevQuestion();
    }
  };

  const showErrorToast = () => {
    toast({
      title: t('error.somethingWentWrong'),
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };

  const onSearchClick = async (searchQuery: string) => {
    if (searchQuery) {
      try {
        setIsLoading(true);
        const result = await searchConsultant(searchQuery);

        setConsultants(result.data.data);
      } catch (e) {
        showErrorToast();
      }
      setIsLoading(false);
    }
  };

  const onVendorSelect = (vendor: Vendor) => {
    setSelectedConsultant(vendor);
  };

  const handleIsLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  return (
    <PulseArticle
      style={onboardingSearchConsultantStyle}
      backgroundImage={questionData.fields.backgroundImage}
      backButtonNode={
        <BackButton
          onClick={() => onBackButtonClick()}
          isDisabled={isCtaDisabled}
        />
      }
    >
      {isVisibleConsultantForm ? (
        <Box>
          <Heading
            as="h2"
            fontSize="clamp(1.8rem, 2.3vw + .4rem, 4rem)"
            mb="clamp(1.6rem, 1.85vw, 3.2rem)"
            mt="32px"
          >
            {t('portal_consultant_form_title')}
          </Heading>
          <Text
            fontSize={{
              base: FontSizes.small,
              md: FontSizes.normal,
              lg: FontSizes.small,
              xl: FontSizes.medium,
              '2xl': FontSizes.medium,
              '3xl': FontSizes.xMedium,
              '4xl': FontSizes.xMedium,
            }}
            mb="32px"
          >
            {t('portal_consultant_form_sub_title')}
          </Text>
          <AddContractorConsultantForm
            isConsultant
            updateIsLoading={handleIsLoading}
          />
        </Box>
      ) : (
        <>
          {!!questionData.fields.title && (
            <ContentfulRichText
              document={questionData.fields.title}
              className="onboardingPulseArticleParagraph"
            />
          )}

          {!!questionData.fields.questionText && (
            <ContentfulRichText
              document={questionData.fields.questionText}
              className="onboardingPulseArticleParagraph"
            />
          )}

          <VendorSearch
            onSearchClick={onSearchClick}
            searchResults={consultants}
            onVendorSelect={onVendorSelect}
            isLoading={isLoading}
          />

          {selectedConsultant && (
            <Flex
              __css={onboardingSearchConsultantStyle.selectedVendorContainer}
            >
              <Flex flexDirection="column">
                <Text sx={onboardingSearchConsultantStyle.companyName}>
                  {companyName(selectedConsultant, locale, true)}
                </Text>
                {selectedConsultant.location && (
                  <Text sx={onboardingSearchConsultantStyle.companyLocation}>
                    {selectedConsultant.location}
                  </Text>
                )}
                {selectedConsultant.contactPhoneNumber && (
                  <Flex sx={onboardingSearchConsultantStyle.companyContact}>
                    <Icon name="devices" height="20px" />
                    <Text>{selectedConsultant.contactPhoneNumber}</Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          )}

          <Flex __css={onboardingSearchConsultantStyle.onboardingChoices}>
            {selectedConsultant && questionOptions && questionOptions[0] && (
              <Button
                onClick={() => {
                  onNextButtonClick(questionOptions[0]);
                }}
                variant="primary"
                isDisabled={isCtaDisabled}
              >
                {questionOptions[0].fields.text}
              </Button>
            )}
            {questionOptions && questionOptions[1] && (
              <Button
                onClick={() => {
                  onConsultantNotFoundButtonClick();
                }}
                variant="link"
                className="onboardingLinkBtn"
                isDisabled={isCtaDisabled}
              >
                {questionOptions[1].fields.text}
              </Button>
            )}
          </Flex>
        </>
      )}
    </PulseArticle>
  );
};

export default OnboardingSearchConsultant;
