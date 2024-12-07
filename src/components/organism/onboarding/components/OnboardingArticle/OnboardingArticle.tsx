import React, { useContext, useMemo, useState } from 'react';

import { Button, Flex, useToast } from '@chakra-ui/react';
import { Document } from '@contentful/rich-text-types';
import { useRouter } from 'next/router';

import style from './OnboardingArticle.style';
import { OnboardingArticleProps } from './OnboardingArticle.type';
import { updateOnboardingStatus } from '../../Onboarding.api';
import BackButton from '../BackButton';
import OnboardingMapArticle from '../OnboardingMapArticle/OnboardingMapArticle';

import { ContentfulRichText, Icon, PulseArticle } from '@/components';
import { ONBOARDING_STEPS } from '@/components/organism/onboarding/constants';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';
import { OnboardingOption } from '@/types/ContentFul.type';

const OnboardingArticle = (props: OnboardingArticleProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter();
  const { questionData, goToNextQuestion, goToPrevQuestion, isLoading } = props;
  const { locale } = useContext(Context);
  const { user, updateDashboardState } = useContext(DashboardContext);
  const [isUpdatingUserData, setIsUpdatingUserData] = useState(false);

  const replaceAmount = (text: Document) => {
    const loanAmount = user?.userInfo?.loanInfo?.totalFunds ?? 0;
    return replaceRichTextPlaceholderWithValue(
      text,
      '{amount}',
      loanAmount.toLocaleString()
    );
  };

  const replaceName = (text: Document) => {
    const username =
      locale === 'ar' ? user?.userInfo?.nameAr : user?.userInfo?.nameEn;

    return replaceRichTextPlaceholderWithValue(
      text,
      '{username}',
      username ?? ''
    );
  };

  const titleDocument = useMemo(() => {
    let text = questionData.fields.title;
    text = replaceAmount(text);
    text = replaceName(text);

    return text;
  }, [user, questionData]);

  const questionTextDocument = useMemo(() => {
    let text = questionData.fields.questionText;
    text = replaceAmount(text);
    text = replaceName(text);

    return text;
  }, [user, questionData]);

  const isCtaDisabled = useMemo(
    () => isLoading || isUpdatingUserData,
    [isLoading, isUpdatingUserData]
  );

  const isOnboardingStepsInStartState = useMemo(
    () => questionData.fields.questionType === ONBOARDING_STEPS.START_STATE,
    [questionData]
  );

  function replaceRichTextPlaceholderWithValue(
    content: Document,
    placeholder: string,
    value: string
  ) {
    let paragraphDoc: any = content;

    if (paragraphDoc?.content?.length) {
      paragraphDoc?.content.map((_: any, parentIndex: number) => {
        if (paragraphDoc?.content[parentIndex]?.content.length) {
          paragraphDoc.content[parentIndex].content.map(
            (item: any, childIndex: number) => {
              if (item.value.includes(placeholder)) {
                paragraphDoc.content[parentIndex].content[childIndex].value =
                  paragraphDoc.content[parentIndex].content[
                    childIndex
                  ].value.replace(placeholder, value);
              }
            }
          );
        }
      });
    } else {
      paragraphDoc = '';
    }

    return paragraphDoc;
  }

  const showErrorToast = () => {
    toast({
      title: t('error.somethingWentWrong'),
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };

  const onNextButtonClick = (selectedOption: OnboardingOption) => {
    goToNextQuestion(questionData, selectedOption);
  };

  const handleRedirect = async () => {
    if (questionData.fields.redirectLink) {
      setIsUpdatingUserData(true);
      try {
        const result = await updateOnboardingStatus();

        if (result.status === 204) {
          if (user) {
            updateDashboardState({
              user: { ...user, isOnboardingComplete: true },
            });
          }
        }
      } catch (e) {
        showErrorToast();
        return;
      }
      setIsUpdatingUserData(false);
      router.push(questionData.fields.redirectLink.fields.href);
    }
  };

  const onBackButtonClick = () => {
    goToPrevQuestion();
  };

  const descriptionNode = (
    <>
      {!!questionData.fields.title && (
        <ContentfulRichText
          document={titleDocument}
          className="onboardingArticleParagraph"
        />
      )}

      {!!questionData.fields.questionText && (
        <ContentfulRichText
          document={questionTextDocument}
          className="onboardingArticleParagraph"
        />
      )}

      <Flex sx={style.onboardingChoices}>
        {questionData.fields.questionOptions &&
        questionData.fields.questionOptions.length > 0 ? (
          <Button
            key={questionData.fields.questionOptions[0].sys.id}
            onClick={() => {
              onNextButtonClick(questionData.fields.questionOptions![0]);
            }}
            variant="primary"
            isDisabled={isCtaDisabled}
          >
            {questionData.fields.questionOptions[0].fields.text}
          </Button>
        ) : null}

        {questionData.fields.redirectLink ? (
          <Button
            key={questionData.fields.redirectLink.sys.id}
            onClick={() => handleRedirect()}
            variant="primary"
            rightIcon={<Icon name="arrowRight" w="18px" h="18px" />}
            isDisabled={isCtaDisabled}
          >
            {questionData.fields.redirectLink.fields.label}
          </Button>
        ) : null}
      </Flex>
    </>
  );

  return isOnboardingStepsInStartState ? (
    <OnboardingMapArticle
      backButtonNode={
        questionData.fields.questionType !== ONBOARDING_STEPS.START_STATE ? (
          <BackButton
            onClick={() => onBackButtonClick()}
            isDisabled={isCtaDisabled}
          />
        ) : undefined
      }
      plotLatitude={user?.userInfo.plotInfo.plotLatitude}
      plotLongitude={user?.userInfo.plotInfo.plotLongitude}
    >
      {descriptionNode}
    </OnboardingMapArticle>
  ) : (
    <PulseArticle
      style={style}
      backgroundImage={questionData.fields.backgroundImage}
      backButtonNode={
        questionData.fields.questionType !== ONBOARDING_STEPS.START_STATE ? (
          <BackButton
            onClick={() => onBackButtonClick()}
            isDisabled={isCtaDisabled}
          />
        ) : undefined
      }
    >
      {descriptionNode}
    </PulseArticle>
  );
};

export default OnboardingArticle;
