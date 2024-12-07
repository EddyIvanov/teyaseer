import { useState, useEffect, useContext } from 'react';

import { useToast } from '@chakra-ui/react';

import {
  getOnboardingQuestionById,
  saveOnboardingChoices,
} from './Onboarding.api';
import {
  OnboardingProps,
  SoftOnboardingQuestionsResponseType,
} from './Onboarding.type';
import ONBOARDING_RENDERINGS from './constants';

import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';
import { OnboardingOption, OnboardingQuestions } from '@/types/ContentFul.type';
import { IOnboardingQuestions } from '@/types/user.type';

const Onboarding = (props: OnboardingProps) => {
  const { t } = useTranslation();
  const { locale } = useContext(Context);
  const { updateDashboardState, user } = useContext(DashboardContext);
  const toast = useToast();
  const { initialSelectedOptions, initialSelectedQuestions } = props;
  const [selectedQuestions, setSelectedQuestions] = useState(
    initialSelectedQuestions
  );
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getOnboardingRendering();
  }, [selectedOptions]);

  const getOnboardingRendering = () => {
    if (selectedOptions.length === 0) return null;

    const lastSelectedOption = selectedOptions[selectedOptions.length - 1];
    const questionData = selectedQuestions[lastSelectedOption.id];

    const OnboardingRendering = ONBOARDING_RENDERINGS[
      questionData.fields.questionType
    ] as React.ElementType;

    return (
      <OnboardingRendering
        key={questionData.sys.id}
        questionData={questionData}
        selectedQuestions={selectedQuestions}
        selectedOptions={selectedOptions}
        setSelectedQuestions={setSelectedQuestions}
        setSelectedOptions={setSelectedOptions}
        goToNextQuestion={goToNextQuestion}
        goToPrevQuestion={goToPrevQuestion}
        isLoading={isLoading}
      />
    );
  };

  const showErrorToast = () => {
    toast({
      title: t('error.somethingWentWrong'),
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };

  const getQuestionData = async (questionId: string) => {
    try {
      const questionData = await getOnboardingQuestionById(questionId, locale);

      return questionData;
    } catch (error) {
      showErrorToast();
      return;
    }
  };

  const goToNextQuestion = async (
    currentQuestionData: OnboardingQuestions,
    selectedOption: OnboardingOption
  ) => {
    if (!currentQuestionData.fields.questionOptions) return;

    setIsLoading(true);

    const nextQuestionData: any =
      selectedQuestions[selectedOption.fields.nextQuestionId.sys.id] ||
      (await getQuestionData(selectedOption.fields.nextQuestionId.sys.id));

    // Update selected questions array first
    const newSelectedQuestions = {
      ...selectedQuestions,
      [nextQuestionData.sys.id]: {
        fields: {
          ...nextQuestionData.fields,
        },
        sys: {
          ...nextQuestionData.sys,
        },
      },
    };

    // Update selected Options array second as updating
    // the array will trigger the re-render

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[selectedOptions.length - 1].selectedOptionId =
      selectedOption.sys.id;
    newSelectedOptions[selectedOptions.length - 1].nextQuestionId =
      selectedOption.fields.nextQuestionId.sys.id;

    newSelectedOptions.push({
      id: nextQuestionData.sys.id,
      selectedOptionId: '',
      nextQuestionId: '',
      index: selectedOptions.length,
    });

    try {
      const saveChoicesResult = await saveOnboardingChoices(newSelectedOptions);

      if (
        saveChoicesResult.status === 201 &&
        saveChoicesResult?.data?.length &&
        user
      ) {
        const onboardingQuestions: IOnboardingQuestions[] = [];
        saveChoicesResult?.data?.map(
          (item: SoftOnboardingQuestionsResponseType) => {
            const tempOnboardingQuestions = {
              index: item.index,
              id: item.cfId,
              nextQuestionId: item.nextQuestionId,
              selectedOptionId: item.selectedOptionId,
            };
            onboardingQuestions.push(tempOnboardingQuestions);
          }
        );

        // as we are not calling me again we have to update user context manually
        updateDashboardState({
          user: {
            ...user,
            onboardingStepsCompleted: {
              onBoardingQuestions: onboardingQuestions,
            },
          },
        });
      }
    } catch (error) {
      showErrorToast();
      return;
    }

    setSelectedQuestions(newSelectedQuestions);
    setSelectedOptions(newSelectedOptions);
    setIsLoading(false);
  };

  const goToPrevQuestion = async () => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.pop();

    const lastSelectedOption =
      newSelectedOptions[newSelectedOptions.length - 1];
    lastSelectedOption.selectedOptionId = '';

    const prevQuestionData: any =
      selectedQuestions[lastSelectedOption.id] ||
      (await getQuestionData(lastSelectedOption.id));

    const newSelectedQuestions = {
      ...selectedQuestions,
      [prevQuestionData.sys.id]: {
        fields: {
          ...prevQuestionData.fields,
        },
        sys: {
          ...prevQuestionData.sys,
        },
      },
    };

    setSelectedQuestions(newSelectedQuestions);
    setSelectedOptions(newSelectedOptions);
  };

  return <>{getOnboardingRendering()}</>;
};

export default Onboarding;
