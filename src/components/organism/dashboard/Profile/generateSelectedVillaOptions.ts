import { IData } from 'teyaseer-calculator-engine/dist/cjs/types/data';

import { T_VillaDetailsRes } from '@/components/organism/dashboard/Profile/Profile.type';

export const generateSelectedVillaOptions = (
  calculatorTabs: IData | null | undefined
): T_VillaDetailsRes | undefined => {
  if (!calculatorTabs) return undefined;

  return calculatorTabs?.calculatorTabCollection.items.reduce<
    Record<string, string | number>
  >((acc, tab) => {
    const { calculatorQuestionsCollection, selectedValue } = tab;

    if (calculatorQuestionsCollection.items.length >= 1) {
      const { questionTag } = calculatorQuestionsCollection.items[0];

      if (questionTag) {
        acc[questionTag] = selectedValue.selected;
      }
    }

    return acc;
  }, {});
};
