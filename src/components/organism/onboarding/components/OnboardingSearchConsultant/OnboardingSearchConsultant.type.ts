import { Dispatch, SetStateAction } from 'react';

import { OnboardingQuestions, OnboardingOption } from '@/types/ContentFul.type';

export interface OnboardingSearchConsultantProps {
  questionData: OnboardingQuestions;
  selectedQuestions: Record<string, any>;
  selectedOptions: {
    id: string;
    selectedOptionId: string;
    nextQuestionId: string;
    index: number;
  }[];
  setSelectedQuestions: Dispatch<SetStateAction<Record<string, any>>>;
  setSelectedOptions: Dispatch<
    SetStateAction<
      {
        id: string;
        selectedOptionId: string;
        nextQuestionId: string;
        index: number;
      }[]
    >
  >;
  goToNextQuestion: (
    currentQuestionData: OnboardingQuestions,
    selectedOption: OnboardingOption
  ) => Promise<void>;
  goToPrevQuestion: () => void;
  isLoading?: boolean;
}
