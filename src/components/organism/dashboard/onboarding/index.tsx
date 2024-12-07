import { useContext, useEffect, useState } from 'react';

import { Box } from '@chakra-ui/react';

import CenteredLoader from '../CenteredLoader/CenteredLoader';

import Onboarding from '@/components/organism/onboarding';
import {
  InitialSelectedOptionsType,
  InitialSelectedQuestions,
} from '@/components/organism/onboarding/Onboarding.type';
import Client from '@/lib/contentFul';
import { DashboardContext } from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';
import colors from '@/styles/themes/brand/colors';
import { ContentTypeResponseType } from '@/types/ContentFul.type';

const OnboardingPage = () => {
  const [initialSelectedOptions, setInitialSelectedOptions] = useState<
    InitialSelectedOptionsType[]
  >([]);

  const [initialSelectedQuestions, setInitialSelectedQuestions] =
    useState<InitialSelectedQuestions>({});

  const { locale } = useContext(Context);
  const { user, userLoading } = useContext(DashboardContext);

  const initializeSelectedOptions = async () => {
    const savedOnboardingState = user;
    let initialSelectedOptions: InitialSelectedOptionsType[] = [];
    const initialSelectedQuestions: InitialSelectedQuestions = {};

    if (!savedOnboardingState?.isOnboardingComplete) {
      if (
        savedOnboardingState?.onboardingStepsCompleted &&
        savedOnboardingState?.onboardingStepsCompleted?.onBoardingQuestions
          ?.length > 0
      ) {
        const savedOnboardingChoices =
          savedOnboardingState.onboardingStepsCompleted.onBoardingQuestions;
        const lastQuestionId =
          savedOnboardingChoices[savedOnboardingChoices.length - 1].id;

        const lastQuestionData: ContentTypeResponseType =
          await Client.getEntries({
            content_type: 'onboardingQuestions',
            'sys.id': lastQuestionId,
            locale: locale,
            include: 3,
          });

        initialSelectedOptions = [...savedOnboardingChoices];

        initialSelectedQuestions[lastQuestionData.items[0].sys.id] = {
          fields: {
            ...lastQuestionData.items[0].fields,
          },
          sys: {
            ...lastQuestionData.items[0].sys,
          },
        };
      }
      // If onboarding is not complete and has just started
      else {
        const firstQuestionData: ContentTypeResponseType =
          await Client.getEntries({
            content_type: 'onboardingQuestions',
            'fields.questionType': 'StartState',
            locale: locale,
            include: 3,
          });

        initialSelectedOptions.push({
          id: firstQuestionData.items[0].sys.id,
          selectedOptionId: '',
          nextQuestionId: firstQuestionData.items[0].fields.questionOptions
            ? firstQuestionData.items[0].fields.questionOptions[0].fields
                .nextQuestionId.sys.id
            : '',
          index: 0,
        });

        initialSelectedQuestions[firstQuestionData.items[0].sys.id] = {
          fields: {
            ...firstQuestionData.items[0].fields,
          },
          sys: {
            ...firstQuestionData.items[0].sys,
          },
        };
      }
    }

    setInitialSelectedOptions(initialSelectedOptions);
    setInitialSelectedQuestions(initialSelectedQuestions);
  };

  useEffect(() => {
    if (user) {
      initializeSelectedOptions();
    }
  }, [userLoading]);

  if (userLoading) {
    return <CenteredLoader />;
  } else if (initialSelectedOptions.length) {
    return (
      <Onboarding
        initialSelectedOptions={initialSelectedOptions}
        initialSelectedQuestions={initialSelectedQuestions}
      />
    );
  } else {
    return (
      <Box
        sx={{
          height: { base: '400px', md: '500px' },
          width: '100%',
          bg: colors.text.light,
        }}
      ></Box>
    );
  }
};

export default OnboardingPage;
