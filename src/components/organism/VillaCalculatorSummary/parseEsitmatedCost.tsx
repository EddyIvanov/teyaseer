import { convertToMillionString } from '@/components/organism/VillaCalculatorSummary/components/EstimateTotalLoggedOut/convertToMillionString';
import { formatNumberWithCommas } from '@/helpers/formatNumberWithCommas';

export const parseEstimatedCost = (
  finishLevel: number,
  t: (val: string) => string,
  isMobile?: boolean
) => {
  if (finishLevel === 0) return t('not_available');

  return `${t('aed_currency')} ${
    isMobile
      ? convertToMillionString(finishLevel, t('portal_million_symbol'))
      : formatNumberWithCommas(finishLevel)
  }`;
};
