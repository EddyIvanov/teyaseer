export type InitialSelectedOptionsType = {
  id: string;
  selectedOptionId: string;
  nextQuestionId: string;
  index: number;
};

export type InitialSelectedQuestions = Record<string, any>;

export interface OnboardingProps {
  initialSelectedOptions: InitialSelectedOptionsType[];
  initialSelectedQuestions: InitialSelectedQuestions;
}

export interface SoftOnboardingQuestionsResponseType {
  cfId: string;
  createdAt: string;
  id: string;
  index: number;
  nextQuestionId: string;
  selectedOptionId: string;
  updatedAt: string;
  userId: string;
}
