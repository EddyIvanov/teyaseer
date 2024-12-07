import { ICalculatorTabs } from '@/types/user.type';

export const generateSelectedVillaOptions = (
  calculatorTabs: Array<ICalculatorTabs> | null | undefined
): Record<string, string | undefined> | undefined => {
  if (!calculatorTabs) return undefined;

  return calculatorTabs?.reduce<Record<string, string | undefined>>(
    (acc, tab) => {
      const { calculatorQuestions } = tab;

      if (calculatorQuestions.length >= 1) {
        const question = calculatorQuestions[0];
        const selectedOption = question.calculatorOptions.find(
          option => option.isSelected
        );

        const calculatorQuestionRoomSelections =
          question.calculatorQuestionRoomSelections.length;

        if (question.questionTag) {
          acc[question.questionTag] = selectedOption
            ? selectedOption?.title
            : calculatorQuestionRoomSelections.toString();
        }
      }

      return acc;
    },
    {}
  );
};
