import { OnboardingQuestions, OnboardingOption } from '@/types/ContentFul.type';

export interface OnboardingSingleChoiceProps {
  questionData: OnboardingQuestions;
  selectedOptions: {
    id: string;
    selectedOptionId: string;
    nextQuestionId: string;
    index: number;
  }[];
  goToNextQuestion: (
    currentQuestionData: OnboardingQuestions,
    selectedOption: OnboardingOption
  ) => Promise<void>;
  goToPrevQuestion: () => void;
  isLoading?: boolean;
}
