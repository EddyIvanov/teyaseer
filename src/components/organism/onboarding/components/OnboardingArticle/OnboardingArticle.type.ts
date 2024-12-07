import { OnboardingOption, OnboardingQuestions } from '@/types/ContentFul.type';

export interface OnboardingArticleProps {
  questionData: OnboardingQuestions;
  goToNextQuestion: (
    currentQuestionData: OnboardingQuestions,
    selectedOption: OnboardingOption
  ) => Promise<void>;
  goToPrevQuestion: () => void;
  isLoading?: boolean;
}
